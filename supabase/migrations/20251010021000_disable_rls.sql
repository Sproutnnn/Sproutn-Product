-- Disable RLS on all tables since we're using custom authentication
-- RLS policies expect Supabase auth, but we're using database-level authentication with bcrypt

-- Disable RLS on users table
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies on users
DROP POLICY IF EXISTS "Allow user registration" ON users;
DROP POLICY IF EXISTS "Allow reading users" ON users;
DROP POLICY IF EXISTS "Allow updating own user data" ON users;

-- Disable RLS on projects table
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies on projects
DROP POLICY IF EXISTS "Allow all project operations" ON projects;

-- Disable RLS on blog_posts table
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies on blog_posts
DROP POLICY IF EXISTS "Allow all blog operations" ON blog_posts;

-- Disable RLS on pages table
ALTER TABLE pages DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies on pages
DROP POLICY IF EXISTS "Allow all page operations" ON pages;

-- Disable RLS on chat_messages table
ALTER TABLE chat_messages DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies on chat_messages
DROP POLICY IF EXISTS "Allow all chat operations" ON chat_messages;

-- Disable RLS on project_files table
ALTER TABLE project_files DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies on project_files
DROP POLICY IF EXISTS "Allow all project file operations" ON project_files;

-- Disable RLS on project_comments table
ALTER TABLE project_comments DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies on project_comments
DROP POLICY IF EXISTS "Allow all project comment operations" ON project_comments;
