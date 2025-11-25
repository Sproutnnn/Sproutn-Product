-- Add brief-related fields to projects table
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS key_features TEXT[], -- Array of key features
ADD COLUMN IF NOT EXISTS uploaded_files TEXT[], -- Array of file URLs
ADD COLUMN IF NOT EXISTS starter_fee DECIMAL(10,2); -- Editable starter fee

-- Add comments for documentation
COMMENT ON COLUMN projects.key_features IS 'Array of key product features from brief';
COMMENT ON COLUMN projects.uploaded_files IS 'Array of file URLs uploaded in brief';
COMMENT ON COLUMN projects.starter_fee IS 'Starter fee set by admin for this project';

-- Note: description and target_market already exist in the projects table
