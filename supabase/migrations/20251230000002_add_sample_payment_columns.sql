-- Add sample payment and pricing columns to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS sample_price decimal(10,2);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS sample_payment_complete boolean DEFAULT false;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS sample_payment_date timestamptz;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS stripe_sample_payment_id text;

-- Add sample approval tracking
ALTER TABLE projects ADD COLUMN IF NOT EXISTS sample_approved boolean DEFAULT false;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS sample_approved_at timestamptz;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS sample_revision_count integer DEFAULT 0;
