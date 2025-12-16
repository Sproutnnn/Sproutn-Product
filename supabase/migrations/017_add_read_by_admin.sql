-- Add read_by_admin column to track which messages have been read by admin
ALTER TABLE chat_messages ADD COLUMN IF NOT EXISTS read_by_admin TIMESTAMPTZ DEFAULT NULL;
