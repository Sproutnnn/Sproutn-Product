-- Add recommended package fields to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS recommended_package_url TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS recommended_package_name TEXT;
