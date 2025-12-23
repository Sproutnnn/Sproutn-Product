-- Create feedback threads table
CREATE TABLE IF NOT EXISTS feedback_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  initial_feedback TEXT NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'resolved', 'pending')),
  category TEXT DEFAULT 'general' CHECK (category IN ('general', 'design', 'quality', 'shipping', 'other')),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create feedback replies table
CREATE TABLE IF NOT EXISTS feedback_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID REFERENCES feedback_threads(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  message TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_feedback_threads_project_id ON feedback_threads(project_id);
CREATE INDEX IF NOT EXISTS idx_feedback_threads_status ON feedback_threads(status);
CREATE INDEX IF NOT EXISTS idx_feedback_replies_thread_id ON feedback_replies(thread_id);

-- Add trigger to update updated_at on feedback_threads
CREATE OR REPLACE FUNCTION update_feedback_thread_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS feedback_thread_updated_at ON feedback_threads;
CREATE TRIGGER feedback_thread_updated_at
  BEFORE UPDATE ON feedback_threads
  FOR EACH ROW
  EXECUTE FUNCTION update_feedback_thread_timestamp();
