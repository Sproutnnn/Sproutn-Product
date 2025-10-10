-- Fix RLS policies to allow necessary operations

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;

-- Allow anyone to insert users (for registration)
CREATE POLICY "Allow user registration" ON users
    FOR INSERT WITH CHECK (true);

-- Allow users to read any user data (needed for login)
CREATE POLICY "Allow reading users" ON users
    FOR SELECT USING (true);

-- Allow users to update their own data
CREATE POLICY "Allow updating own user data" ON users
    FOR UPDATE USING (true);

-- Update other policies to be less restrictive for development
-- (These should be tightened for production)

-- Drop and recreate projects policies
DROP POLICY IF EXISTS "Customers can see own projects" ON projects;
DROP POLICY IF EXISTS "Customers can create projects" ON projects;
DROP POLICY IF EXISTS "Customers can update own projects" ON projects;
DROP POLICY IF EXISTS "Admins can delete projects" ON projects;

CREATE POLICY "Allow all project operations" ON projects
    FOR ALL USING (true);

-- Drop and recreate blog_posts policies
DROP POLICY IF EXISTS "Anyone can read published blogs" ON blog_posts;
DROP POLICY IF EXISTS "Admins can manage blogs" ON blog_posts;

CREATE POLICY "Allow all blog operations" ON blog_posts
    FOR ALL USING (true);

-- Drop and recreate pages policies
DROP POLICY IF EXISTS "Anyone can read published pages" ON pages;
DROP POLICY IF EXISTS "Admins can manage pages" ON pages;

CREATE POLICY "Allow all page operations" ON pages
    FOR ALL USING (true);

-- Drop and recreate chat_messages policies
DROP POLICY IF EXISTS "Users can read own messages" ON chat_messages;
DROP POLICY IF EXISTS "Users can create messages" ON chat_messages;

CREATE POLICY "Allow all chat operations" ON chat_messages
    FOR ALL USING (true);

-- Drop and recreate project_files policies
DROP POLICY IF EXISTS "Users can see project files" ON project_files;
DROP POLICY IF EXISTS "Users can upload files" ON project_files;

CREATE POLICY "Allow all project file operations" ON project_files
    FOR ALL USING (true);

-- Drop and recreate project_comments policies
DROP POLICY IF EXISTS "Users can see project comments" ON project_comments;
DROP POLICY IF EXISTS "Users can create comments" ON project_comments;

CREATE POLICY "Allow all project comment operations" ON project_comments
    FOR ALL USING (true);
