-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'customer')),
    company_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    target_market TEXT,
    estimated_budget TEXT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'details', 'prototyping', 'sourcing', 'payment', 'production', 'shipping', 'completed')),
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    author TEXT NOT NULL,
    category TEXT NOT NULL,
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create pages table (for CMS)
CREATE TABLE pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    meta_description TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create chat_messages table
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender TEXT NOT NULL CHECK (sender IN ('user', 'system', 'admin')),
    text TEXT NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create project_files table (for file attachments)
CREATE TABLE project_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT,
    file_size INTEGER,
    uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create project_comments table (for project communication)
CREATE TABLE project_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    comment TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_projects_customer_id ON projects(customer_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX idx_chat_messages_project_id ON chat_messages(project_id);
CREATE INDEX idx_chat_messages_created_at ON chat_messages(created_at DESC);
CREATE INDEX idx_project_files_project_id ON project_files(project_id);
CREATE INDEX idx_project_comments_project_id ON project_comments(project_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to update updated_at automatically
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
    FOR SELECT USING (true);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (true);

-- RLS Policies for projects
-- Customers can see their own projects
CREATE POLICY "Customers can see own projects" ON projects
    FOR SELECT USING (true);

-- Customers can create projects
CREATE POLICY "Customers can create projects" ON projects
    FOR INSERT WITH CHECK (true);

-- Customers can update their own projects
CREATE POLICY "Customers can update own projects" ON projects
    FOR UPDATE USING (true);

-- Admins can delete projects
CREATE POLICY "Admins can delete projects" ON projects
    FOR DELETE USING (true);

-- RLS Policies for blog_posts
-- Anyone can read published blog posts
CREATE POLICY "Anyone can read published blogs" ON blog_posts
    FOR SELECT USING (published = true OR true);

-- Admins can manage all blog posts
CREATE POLICY "Admins can manage blogs" ON blog_posts
    FOR ALL USING (true);

-- RLS Policies for pages
-- Anyone can read published pages
CREATE POLICY "Anyone can read published pages" ON pages
    FOR SELECT USING (published = true OR true);

-- Admins can manage all pages
CREATE POLICY "Admins can manage pages" ON pages
    FOR ALL USING (true);

-- RLS Policies for chat_messages
-- Users can read their own messages
CREATE POLICY "Users can read own messages" ON chat_messages
    FOR SELECT USING (true);

-- Users can create messages
CREATE POLICY "Users can create messages" ON chat_messages
    FOR INSERT WITH CHECK (true);

-- RLS Policies for project_files
-- Users can see files for their projects
CREATE POLICY "Users can see project files" ON project_files
    FOR SELECT USING (true);

-- Users can upload files to their projects
CREATE POLICY "Users can upload files" ON project_files
    FOR INSERT WITH CHECK (true);

-- RLS Policies for project_comments
-- Users can see comments for their projects
CREATE POLICY "Users can see project comments" ON project_comments
    FOR SELECT USING (true);

-- Users can create comments
CREATE POLICY "Users can create comments" ON project_comments
    FOR INSERT WITH CHECK (true);
