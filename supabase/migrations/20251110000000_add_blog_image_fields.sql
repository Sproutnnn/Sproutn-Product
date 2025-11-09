-- Add image_url and read_time fields to blog_posts table
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS read_time TEXT DEFAULT '5 min read';

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete blog images" ON storage.objects;

-- Create policy to allow public read access to blog images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'blog-images' );

-- Create policy to allow authenticated uploads to blog images
CREATE POLICY "Authenticated users can upload blog images"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'blog-images' );

-- Create policy to allow authenticated updates to blog images
CREATE POLICY "Authenticated users can update blog images"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'blog-images' );

-- Create policy to allow authenticated deletes of blog images
CREATE POLICY "Authenticated users can delete blog images"
ON storage.objects FOR DELETE
USING ( bucket_id = 'blog-images' );
