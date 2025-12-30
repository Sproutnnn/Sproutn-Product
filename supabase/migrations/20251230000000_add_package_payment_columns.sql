-- Add photography and marketing payment tracking columns to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS photography_payment_complete boolean DEFAULT false;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS photography_payment_date timestamptz;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS stripe_photography_payment_id text;

ALTER TABLE projects ADD COLUMN IF NOT EXISTS marketing_payment_complete boolean DEFAULT false;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS marketing_payment_date timestamptz;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS stripe_marketing_payment_id text;
