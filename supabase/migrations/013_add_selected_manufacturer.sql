-- Add selected_manufacturer column to projects table to store the customer's chosen manufacturer
ALTER TABLE projects ADD COLUMN IF NOT EXISTS selected_manufacturer JSONB;

-- The JSONB field will store:
-- {
--   "id": "m1",
--   "name": "TechPro Manufacturing",
--   "minOrderQuantity": 500,
--   "leadTime": "30-45 days",
--   "price": 15.75,
--   "details": "Description...",
--   "advantages": ["advantage1", "advantage2"],
--   "disadvantages": ["disadvantage1", "disadvantage2"],
--   "recommended": true,
--   "selectedAt": "2025-12-16T00:00:00.000Z"
-- }
