-- Add new columns and tables for project features

-- Add manufacturers array to projects for storing admin-added manufacturers
ALTER TABLE projects ADD COLUMN IF NOT EXISTS manufacturers JSONB DEFAULT '[]'::jsonb;

-- Add tracking events to projects
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tracking_events JSONB DEFAULT '[]'::jsonb;

-- Add photography data to projects
ALTER TABLE projects ADD COLUMN IF NOT EXISTS photography_packages JSONB DEFAULT '[]'::jsonb;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS selected_photography_package JSONB;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS photography_inspiration_files TEXT[] DEFAULT '{}';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS photography_questionnaire_url TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS completed_photography_assets JSONB DEFAULT '[]'::jsonb;

-- Add marketing data to projects
ALTER TABLE projects ADD COLUMN IF NOT EXISTS marketing_packages JSONB DEFAULT '[]'::jsonb;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS selected_marketing_package JSONB;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS marketing_plan_data JSONB;

-- Add payment tracking
ALTER TABLE projects ADD COLUMN IF NOT EXISTS deposit_paid BOOLEAN DEFAULT FALSE;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS deposit_paid_at TIMESTAMPTZ;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS remaining_paid BOOLEAN DEFAULT FALSE;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS remaining_paid_at TIMESTAMPTZ;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS freight_paid BOOLEAN DEFAULT FALSE;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS freight_paid_at TIMESTAMPTZ;

-- Add stripe payment fields
ALTER TABLE projects ADD COLUMN IF NOT EXISTS stripe_deposit_payment_id TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS stripe_remaining_payment_id TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS stripe_freight_payment_id TEXT;
