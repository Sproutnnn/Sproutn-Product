-- Seed initial users

-- Create initial admin user
-- Email: admin@sproutn.com
-- Password: admin123
INSERT INTO users (email, name, password_hash, role)
VALUES (
  'admin@sproutn.com',
  'Admin User',
  '$2a$10$rOqWJmP5KqPLQHCVqAQFXeJ8KqR3V5YPz2KGkxLXzWH8HV8VHT7Ou',
  'admin'
)
ON CONFLICT (email) DO NOTHING;

-- Create a demo customer user
-- Email: customer@example.com
-- Password: customer123
INSERT INTO users (email, name, password_hash, role, company_name)
VALUES (
  'customer@example.com',
  'Demo Customer',
  '$2a$10$8J5QLqKqH5L8vZ8nXJQQ4eJKX5YxQH5L8vZ8nXJQQ4eJKX5YxQH5L.',
  'customer',
  'Demo Company'
)
ON CONFLICT (email) DO NOTHING;
