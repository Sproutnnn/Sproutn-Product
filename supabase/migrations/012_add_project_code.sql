-- Add project_code column to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS project_code VARCHAR(13) UNIQUE;

-- Create an index on project_code for faster lookups
CREATE INDEX IF NOT EXISTS idx_projects_project_code ON projects(project_code);

-- Function to generate a unique 6-digit project code
CREATE OR REPLACE FUNCTION generate_project_code()
RETURNS VARCHAR(13) AS $$
DECLARE
    new_code VARCHAR(13);
    code_exists BOOLEAN;
BEGIN
    LOOP
        -- Generate random 6-digit number
        new_code := 'SPRTN_' || LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');

        -- Check if code already exists
        SELECT EXISTS(SELECT 1 FROM projects WHERE project_code = new_code) INTO code_exists;

        -- Exit loop if code is unique
        EXIT WHEN NOT code_exists;
    END LOOP;

    RETURN new_code;
END;
$$ LANGUAGE plpgsql;

-- Trigger function to auto-generate project code on insert
CREATE OR REPLACE FUNCTION set_project_code()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.project_code IS NULL THEN
        NEW.project_code := generate_project_code();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate project code
DROP TRIGGER IF EXISTS trigger_set_project_code ON projects;
CREATE TRIGGER trigger_set_project_code
    BEFORE INSERT ON projects
    FOR EACH ROW
    EXECUTE FUNCTION set_project_code();

-- Assign project codes to existing projects that don't have one
DO $$
DECLARE
    project_record RECORD;
BEGIN
    FOR project_record IN SELECT id FROM projects WHERE project_code IS NULL
    LOOP
        UPDATE projects
        SET project_code = generate_project_code()
        WHERE id = project_record.id;
    END LOOP;
END $$;

-- Make project_code NOT NULL after populating existing records
ALTER TABLE projects ALTER COLUMN project_code SET NOT NULL;
