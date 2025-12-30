-- Add images column to feedback_threads table
ALTER TABLE feedback_threads ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';
