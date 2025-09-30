-- Add missing columns to existing tables
ALTER TABLE public.quiz_answers ADD COLUMN IF NOT EXISTS context_title TEXT;
ALTER TABLE public.quiz_answers ADD COLUMN IF NOT EXISTS context_description TEXT;
ALTER TABLE public.quiz_answers ADD COLUMN IF NOT EXISTS context_data TEXT;
ALTER TABLE public.quiz_answers ADD COLUMN IF NOT EXISTS context_examples TEXT;
ALTER TABLE public.quiz_answers ADD COLUMN IF NOT EXISTS wikipedia_links JSONB;

ALTER TABLE public.candidates ADD COLUMN IF NOT EXISTS criminal_record TEXT;
ALTER TABLE public.candidates ADD COLUMN IF NOT EXISTS wikipedia_url TEXT;

ALTER TABLE public.political_parties ADD COLUMN IF NOT EXISTS color TEXT DEFAULT '#6B7280';

-- Create party_positions table
CREATE TABLE IF NOT EXISTS public.party_positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  party_id UUID REFERENCES public.political_parties(id) ON DELETE CASCADE,
  position_id UUID REFERENCES public.positions(id) ON DELETE CASCADE,
  stance TEXT NOT NULL,
  strength INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(party_id, position_id)
);

CREATE INDEX IF NOT EXISTS idx_party_positions_party ON public.party_positions(party_id);
CREATE INDEX IF NOT EXISTS idx_party_positions_position ON public.party_positions(position_id);

ALTER TABLE public.party_positions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to party positions" ON public.party_positions FOR SELECT USING (true);
