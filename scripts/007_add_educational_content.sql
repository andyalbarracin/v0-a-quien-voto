-- Add educational content and weight to quiz questions
ALTER TABLE public.quiz_questions 
ADD COLUMN IF NOT EXISTS educational_content TEXT,
ADD COLUMN IF NOT EXISTS weight INTEGER DEFAULT 1;

-- Add international comparison data to positions
ALTER TABLE public.positions
ADD COLUMN IF NOT EXISTS international_examples JSONB;

-- Update quiz questions table to support the new structure
COMMENT ON COLUMN public.quiz_questions.educational_content IS 'Educational information explaining why this topic matters';
COMMENT ON COLUMN public.quiz_questions.weight IS 'Weight/importance of this question (1-5, where 5 is most important)';
COMMENT ON COLUMN public.positions.international_examples IS 'JSON array of countries that implemented similar policies with results';
