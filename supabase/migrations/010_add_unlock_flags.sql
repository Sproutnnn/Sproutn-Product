-- Add flags to track if photography and marketing sections have been unlocked
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS photography_unlocked BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS marketing_unlocked BOOLEAN DEFAULT false;

-- Add comments for documentation
COMMENT ON COLUMN projects.photography_unlocked IS 'Whether photography section has been unlocked (remains unlocked permanently)';
COMMENT ON COLUMN projects.marketing_unlocked IS 'Whether marketing section has been unlocked (remains unlocked permanently)';

-- Update existing projects in production/shipping/completed status to unlock photography and marketing
UPDATE projects
SET
  photography_unlocked = true,
  marketing_unlocked = true
WHERE status IN ('production', 'shipping', 'completed');
