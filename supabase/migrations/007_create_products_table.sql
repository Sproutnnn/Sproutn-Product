-- Create products table for service offerings/packages
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    category TEXT,
    featured BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for active products (frequently queried)
CREATE INDEX idx_products_active ON products(active);

-- Create index for featured products
CREATE INDEX idx_products_featured ON products(featured);

-- Create index for category filtering
CREATE INDEX idx_products_category ON products(category);

-- Add trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_products_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_products_updated_at();

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active products
CREATE POLICY "Anyone can view active products"
    ON products
    FOR SELECT
    USING (active = true);

-- Policy: Admins can view all products
CREATE POLICY "Admins can view all products"
    ON products
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id::text = auth.uid()::text
            AND users.role = 'admin'
        )
    );

-- Policy: Admins can insert products
CREATE POLICY "Admins can insert products"
    ON products
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id::text = auth.uid()::text
            AND users.role = 'admin'
        )
    );

-- Policy: Admins can update products
CREATE POLICY "Admins can update products"
    ON products
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id::text = auth.uid()::text
            AND users.role = 'admin'
        )
    );

-- Policy: Admins can delete products
CREATE POLICY "Admins can delete products"
    ON products
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id::text = auth.uid()::text
            AND users.role = 'admin'
        )
    );

-- Insert some sample service offerings
INSERT INTO products (name, description, category, featured, active) VALUES
    (
        'Rapid Prototyping Service',
        'Transform your ideas into physical prototypes within 2-4 weeks. Includes 3D modeling, material selection, and iterative design refinement.',
        'prototyping',
        true,
        true
    ),
    (
        'Component Sourcing Package',
        'Expert sourcing of quality components and materials from verified suppliers. We handle negotiations, quality checks, and logistics.',
        'sourcing',
        true,
        true
    ),
    (
        'Quality Testing & Validation',
        'Comprehensive testing suite including functionality, durability, and compliance testing to ensure your product meets industry standards.',
        'testing',
        false,
        true
    ),
    (
        'Manufacturing Setup',
        'End-to-end manufacturing setup including supplier selection, production planning, and quality control processes.',
        'manufacturing',
        true,
        true
    ),
    (
        'Product Design Consultation',
        'Expert consultation on product design, user experience, and manufacturability. Includes design review and recommendations.',
        'consulting',
        false,
        true
    );

-- Add comment for documentation
COMMENT ON TABLE products IS 'Service offerings and packages available for customers';
