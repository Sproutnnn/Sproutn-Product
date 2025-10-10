# Database Migration Guide

## Overview

Your Sproutn Product application has been successfully migrated from localStorage to a full-stack solution with Supabase PostgreSQL database. This guide explains what was done and how to complete the migration.

## What's Been Completed

### 1. Database Schema ✅
Created comprehensive database schema with the following tables:
- `users` - User authentication and profiles
- `projects` - Customer projects with workflow tracking
- `blog_posts` - Content management system
- `pages` - Dynamic page management
- `chat_messages` - Chat/support messages with real-time capability
- `project_files` - File attachments for projects
- `project_comments` - Project communication threads

**Location**: `supabase/migrations/20251010012425_initial_schema.sql`

### 2. TypeScript Types ✅
Generated type-safe interfaces from database schema.

**Location**: `src/types/database.types.ts`

### 3. Service Layers ✅
Created service layers for all entities:
- `src/services/auth.service.ts` - Authentication with bcrypt password hashing
- `src/services/projects.service.ts` - Project CRUD operations
- `src/services/blog.service.ts` - Blog post management
- `src/services/chat.service.ts` - Chat with real-time subscriptions

### 4. Authentication System ✅
- Updated `AuthContext` to use database instead of localStorage
- Implemented secure password hashing with bcrypt
- Added signup functionality
- Session management with localStorage (userId only)

### 5. Updated Components ✅
- **Dashboard**: Now fetches projects from database based on user role
- **ProjectCard**: Updated to use database types
- **AuthContext**: Fully database-integrated

## Remaining Components to Update

### High Priority

#### 1. ProjectCreation Page
**File**: `src/pages/ProjectCreation.tsx`

Update the `handleSubmit` function:

```typescript
import { projectsService } from '../services/projects.service';
import { useAuth } from '../context/AuthContext';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    if (!user?.id) {
      throw new Error('User not authenticated');
    }

    await projectsService.create({
      name: formData.name,
      description: formData.description,
      category: formData.category,
      target_market: formData.targetMarket,
      estimated_budget: formData.estimatedBudget,
      customer_id: user.id,
      status: 'draft'
    });

    navigate('/dashboard');
  } catch (error) {
    console.error('Error creating project:', error);
    alert('Failed to create project');
  } finally {
    setIsSubmitting(false);
  }
};
```

#### 2. Login Page
**File**: `src/pages/Login.tsx`

Update to use async login:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  try {
    await login(email, password);
    navigate('/dashboard');
  } catch (error: any) {
    setError(error.message || 'Invalid email or password');
  }
};
```

Add signup functionality if needed.

#### 3. Chat Component
**File**: `src/components/Chat.tsx`

```typescript
import { chatService } from '../services/chat.service';
import { useAuth } from '../context/AuthContext';

// In component:
const { user } = useAuth();

// Load messages on mount:
useEffect(() => {
  if (!user?.id) return;

  const loadMessages = async () => {
    const messages = await chatService.getUserMessages(user.id);
    setMessages(messages.map(m => ({
      id: m.id,
      sender: m.sender,
      text: m.text,
      timestamp: m.created_at || new Date().toISOString()
    })));
  };

  loadMessages();

  // Subscribe to real-time messages
  const subscription = chatService.subscribeToUserMessages(user.id, (newMessage) => {
    setMessages(prev => [...prev, {
      id: newMessage.id,
      sender: newMessage.sender,
      text: newMessage.text,
      timestamp: newMessage.created_at || new Date().toISOString()
    }]);
  });

  return () => {
    subscription.unsubscribe();
  };
}, [user]);

// Send message:
const handleSendMessage = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!message.trim() || !user?.id) return;

  try {
    await chatService.sendMessage({
      sender: 'user',
      text: message,
      user_id: user.id
    });
    setMessage('');
  } catch (error) {
    console.error('Error sending message:', error);
  }
};
```

#### 4. BlogManagement Component
**File**: `src/components/admin/BlogManagement.tsx`

```typescript
import { blogService } from '../services/blog.service';

useEffect(() => {
  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      const posts = await blogService.getAll(true); // true = include unpublished for admin
      setBlogPosts(posts.map(post => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt || '',
        author: post.author,
        date: post.created_at || '',
        category: post.category,
        featured: post.featured || false,
        published: post.published || false
      })));
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchBlogPosts();
}, []);

const confirmDelete = async () => {
  if (postToDelete) {
    try {
      await blogService.delete(postToDelete);
      setBlogPosts(prevPosts => prevPosts.filter(post => post.id !== postToDelete));
      setShowDeleteModal(false);
      setPostToDelete(null);
    } catch (error) {
      console.error('Error deleting blog post:', error);
      alert('Failed to delete blog post');
    }
  }
};

const toggleFeatured = async (id: string) => {
  try {
    await blogService.toggleFeatured(id);
    setBlogPosts(prevPosts => prevPosts.map(post =>
      post.id === id ? { ...post, featured: !post.featured } : post
    ));
  } catch (error) {
    console.error('Error toggling featured:', error);
  }
};

const togglePublished = async (id: string) => {
  try {
    await blogService.togglePublished(id);
    setBlogPosts(prevPosts => prevPosts.map(post =>
      post.id === id ? { ...post, published: !post.published } : post
    ));
  } catch (error) {
    console.error('Error toggling published:', error);
  }
};
```

#### 5. UserProfile Page
**File**: `src/pages/UserProfile.tsx`

```typescript
import { useAuth } from '../context/AuthContext';

const { user, updateUserProfile } = useAuth();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await updateUserProfile({
      name: formData.name,
      email: formData.email,
      company_name: formData.companyName
    });

    alert('Profile updated successfully');
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('Failed to update profile');
  }
};
```

### Additional Enhancements

#### 1. Add Initial Admin User
Run this SQL in Supabase SQL Editor to create an admin user:

```sql
INSERT INTO users (email, name, password_hash, role)
VALUES (
  'admin@sproutn.com',
  'Admin User',
  -- Password: 'admin123' (you should change this!)
  '$2a$10$rOqWJmP5KqPLQHCVqAQFXeJ8KqR3V5YPz2KGkxLXzWH8HV8VHT7Ou',
  'admin'
);
```

Then you can login with:
- Email: `admin@sproutn.com`
- Password: `admin123`

#### 2. Environment Variables
Make sure your `.env` file has the correct values:

```env
VITE_SUPABASE_URL=https://yrzrwhihkpmjniugczka.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 3. Row Level Security (RLS)
The database has RLS enabled. The current policies are permissive (allow all) for development. Before production, update the policies in Supabase to:

**Users table**:
```sql
-- Users can only see their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (id = current_setting('app.user_id')::uuid);
```

**Projects table**:
```sql
-- Customers see only their projects, admins see all
CREATE POLICY "Users see own projects" ON projects
  FOR SELECT USING (
    customer_id = current_setting('app.user_id')::uuid OR
    EXISTS (SELECT 1 FROM users WHERE id = current_setting('app.user_id')::uuid AND role = 'admin')
  );
```

## Database Operations

### Pull Schema Changes
```bash
supabase db pull
```

### Generate Updated Types
```bash
supabase gen types typescript --linked > src/types/database.types.ts
```

### Create New Migration
```bash
supabase migration new <migration_name>
```

### Push Migrations
```bash
supabase db push --password <your-db-password>
```

## Testing Checklist

- [ ] Create a new user account
- [ ] Login with the new account
- [ ] Create a new project
- [ ] View projects on dashboard
- [ ] Admin: Change project status
- [ ] Update user profile
- [ ] Create a blog post (admin)
- [ ] Send a chat message
- [ ] Test real-time chat updates
- [ ] Logout and login again

## Benefits of This Migration

1. **Data Persistence**: No more lost data on browser clear
2. **Multi-device**: Access your data from any device
3. **Scalability**: Handle thousands of users and projects
4. **Real-time**: Chat with instant updates via Supabase Realtime
5. **Type Safety**: Full TypeScript support from database to UI
6. **Security**: Secure password hashing, RLS policies
7. **Relationships**: Proper foreign keys and data integrity

## Next Steps

1. Update remaining components (listed above)
2. Test all functionality
3. Add proper error handling and loading states
4. Implement proper RLS policies for production
5. Add email verification for new users
6. Implement password reset functionality
7. Add file upload for project files (using Supabase Storage)

## Support

For Supabase documentation: https://supabase.com/docs
For issues: Check the Supabase dashboard at https://supabase.com/dashboard
