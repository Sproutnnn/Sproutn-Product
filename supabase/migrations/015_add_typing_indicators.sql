-- Add typing indicators table
CREATE TABLE IF NOT EXISTS typing_indicators (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE typing_indicators ENABLE ROW LEVEL SECURITY;

-- Allow users to update their own typing status
CREATE POLICY "Users can manage their own typing status"
  ON typing_indicators
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow admins to read all typing statuses
CREATE POLICY "Admins can read all typing statuses"
  ON typing_indicators
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );
