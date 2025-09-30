-- Create political parties table
CREATE TABLE IF NOT EXISTS public.political_parties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  acronym TEXT NOT NULL,
  description TEXT,
  ideology TEXT,
  founded_year INTEGER,
  logo_url TEXT,
  website_url TEXT,
  international_examples JSONB, -- stores array of similar international implementations
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create candidates table
CREATE TABLE IF NOT EXISTS public.candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  party_id UUID REFERENCES public.political_parties(id) ON DELETE CASCADE,
  position TEXT, -- e.g., "Diputado", "Senador"
  province TEXT, -- province they're running in
  list_position INTEGER, -- position in the party list
  photo_url TEXT,
  bio TEXT,
  birth_date DATE,
  key_proposals TEXT, -- main campaign proposals
  voting_analysis TEXT, -- analysis of their voting history
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create topics table
CREATE TABLE IF NOT EXISTS public.topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create positions table
CREATE TABLE IF NOT EXISTS public.positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID REFERENCES public.topics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  weight INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create voting records table
CREATE TABLE IF NOT EXISTS public.voting_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID REFERENCES public.candidates(id) ON DELETE CASCADE,
  position_id UUID REFERENCES public.positions(id) ON DELETE CASCADE,
  vote_type TEXT NOT NULL,
  vote_date DATE,
  legislative_session TEXT,
  bill_name TEXT,
  source_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create public statements table
CREATE TABLE IF NOT EXISTS public.public_statements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID REFERENCES public.candidates(id) ON DELETE CASCADE,
  party_id UUID REFERENCES public.political_parties(id) ON DELETE CASCADE,
  position_id UUID REFERENCES public.positions(id) ON DELETE CASCADE,
  statement_text TEXT NOT NULL,
  statement_date DATE,
  source_url TEXT,
  source_type TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz questions table
CREATE TABLE IF NOT EXISTS public.quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID REFERENCES public.topics(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_order INTEGER,
  weight INTEGER DEFAULT 1,
  educational_content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz answers table
CREATE TABLE IF NOT EXISTS public.quiz_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES public.quiz_questions(id) ON DELETE CASCADE,
  position_id UUID REFERENCES public.positions(id) ON DELETE CASCADE,
  answer_text TEXT NOT NULL,
  answer_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user quiz results table
CREATE TABLE IF NOT EXISTS public.quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  answers JSONB NOT NULL,
  results JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_candidates_party ON public.candidates(party_id);
CREATE INDEX IF NOT EXISTS idx_voting_records_candidate ON public.voting_records(candidate_id);
CREATE INDEX IF NOT EXISTS idx_voting_records_position ON public.voting_records(position_id);
CREATE INDEX IF NOT EXISTS idx_public_statements_candidate ON public.public_statements(candidate_id);
CREATE INDEX IF NOT EXISTS idx_public_statements_party ON public.public_statements(party_id);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_topic ON public.quiz_questions(topic_id);
CREATE INDEX IF NOT EXISTS idx_quiz_answers_question ON public.quiz_answers(question_id);

-- Enable Row Level Security
ALTER TABLE public.political_parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voting_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.public_statements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to parties" ON public.political_parties FOR SELECT USING (true);
CREATE POLICY "Allow public read access to candidates" ON public.candidates FOR SELECT USING (true);
CREATE POLICY "Allow public read access to topics" ON public.topics FOR SELECT USING (true);
CREATE POLICY "Allow public read access to positions" ON public.positions FOR SELECT USING (true);
CREATE POLICY "Allow public read access to voting records" ON public.voting_records FOR SELECT USING (true);
CREATE POLICY "Allow public read access to statements" ON public.public_statements FOR SELECT USING (true);
CREATE POLICY "Allow public read access to quiz questions" ON public.quiz_questions FOR SELECT USING (true);
CREATE POLICY "Allow public read access to quiz answers" ON public.quiz_answers FOR SELECT USING (true);
CREATE POLICY "Allow insert quiz results" ON public.quiz_results FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow read own quiz results" ON public.quiz_results FOR SELECT USING (true);
