-- Add sampling-related fields to projects table
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS prototype_status TEXT CHECK (prototype_status IN ('producing', 'shipping', 'delivered', 'feedback')),
ADD COLUMN IF NOT EXISTS tracking_number TEXT,
ADD COLUMN IF NOT EXISTS estimated_delivery DATE,
ADD COLUMN IF NOT EXISTS admin_notes TEXT,
ADD COLUMN IF NOT EXISTS delivery_full_name TEXT,
ADD COLUMN IF NOT EXISTS delivery_phone_number TEXT,
ADD COLUMN IF NOT EXISTS delivery_address_line1 TEXT,
ADD COLUMN IF NOT EXISTS delivery_address_line2 TEXT,
ADD COLUMN IF NOT EXISTS delivery_city TEXT,
ADD COLUMN IF NOT EXISTS delivery_state TEXT,
ADD COLUMN IF NOT EXISTS delivery_zip_code TEXT,
ADD COLUMN IF NOT EXISTS delivery_country TEXT,
ADD COLUMN IF NOT EXISTS customer_feedback TEXT,
ADD COLUMN IF NOT EXISTS feedback_images TEXT[]; -- Array of image URLs

-- Create index for prototype_status queries
CREATE INDEX IF NOT EXISTS idx_projects_prototype_status ON projects(prototype_status);

-- Add comment for documentation
COMMENT ON COLUMN projects.prototype_status IS 'Status within the sampling phase: producing, shipping, delivered, feedback';
COMMENT ON COLUMN projects.tracking_number IS 'Shipping tracking number for sample delivery';
COMMENT ON COLUMN projects.estimated_delivery IS 'Estimated delivery date for sample';
COMMENT ON COLUMN projects.admin_notes IS 'Admin notes about sample progress';
COMMENT ON COLUMN projects.delivery_full_name IS 'Customer full name for delivery';
COMMENT ON COLUMN projects.delivery_phone_number IS 'Customer phone number for delivery';
COMMENT ON COLUMN projects.delivery_address_line1 IS 'Delivery address line 1';
COMMENT ON COLUMN projects.delivery_address_line2 IS 'Delivery address line 2';
COMMENT ON COLUMN projects.delivery_city IS 'Delivery city';
COMMENT ON COLUMN projects.delivery_state IS 'Delivery state/province';
COMMENT ON COLUMN projects.delivery_zip_code IS 'Delivery ZIP/postal code';
COMMENT ON COLUMN projects.delivery_country IS 'Delivery country';
COMMENT ON COLUMN projects.customer_feedback IS 'Customer feedback on the sample';
COMMENT ON COLUMN projects.feedback_images IS 'Array of image URLs for feedback';
