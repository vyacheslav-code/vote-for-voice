-- Create phrases table
CREATE TABLE IF NOT EXISTS phrases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL UNIQUE,
  votes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster sorting by votes
CREATE INDEX IF NOT EXISTS idx_phrases_votes ON phrases(votes DESC);

-- Create votes table (optional - for tracking individual votes)
CREATE TABLE IF NOT EXISTS vote_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  winner_id UUID REFERENCES phrases(id) ON DELETE CASCADE,
  loser_id UUID REFERENCES phrases(id) ON DELETE CASCADE,
  voted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for vote records
CREATE INDEX IF NOT EXISTS idx_vote_records_voted_at ON vote_records(voted_at DESC);

-- Enable Row Level Security (optional, but recommended)
ALTER TABLE phrases ENABLE ROW LEVEL SECURITY;
ALTER TABLE vote_records ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
CREATE POLICY "Allow public read access on phrases"
  ON phrases FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on vote_records"
  ON vote_records FOR SELECT
  TO public
  USING (true);

-- Create policies to allow public insert access (for voting)
CREATE POLICY "Allow public insert on vote_records"
  ON vote_records FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policies to allow public update access (for vote counts)
CREATE POLICY "Allow public update on phrases"
  ON phrases FOR UPDATE
  TO public
  USING (true);

-- Create function to atomically increment votes
CREATE OR REPLACE FUNCTION increment_votes(phrase_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE phrases
  SET votes = votes + 1
  WHERE id = phrase_id;
END;
$$;
