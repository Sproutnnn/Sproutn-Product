-- Create storage bucket for project files if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-files', 'project-files', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon read" ON storage.objects;

-- Allow anonymous uploads (app uses anon key without session persistence)
CREATE POLICY "Allow anon uploads"
ON storage.objects FOR INSERT
TO anon
WITH CHECK (bucket_id = 'project-files');

-- Allow anonymous read access
CREATE POLICY "Allow anon read"
ON storage.objects FOR SELECT
TO anon
USING (bucket_id = 'project-files');
