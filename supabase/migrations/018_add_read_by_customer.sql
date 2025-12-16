-- Add read_by_customer column to track when customer has seen admin messages
ALTER TABLE chat_messages ADD COLUMN IF NOT EXISTS read_by_customer TIMESTAMPTZ DEFAULT NULL;
