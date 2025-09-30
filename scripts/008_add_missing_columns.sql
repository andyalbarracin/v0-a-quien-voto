-- Add missing columns to political_parties table
ALTER TABLE public.political_parties 
ADD COLUMN IF NOT EXISTS color TEXT;

-- Add missing columns to candidates table
ALTER TABLE public.candidates 
ADD COLUMN IF NOT EXISTS criminal_record TEXT,
ADD COLUMN IF NOT EXISTS wikipedia_url TEXT;

-- Update colors for existing parties
UPDATE public.political_parties SET color = '#9333EA' WHERE acronym = 'LLA';
UPDATE public.political_parties SET color = '#3B82F6' WHERE acronym = 'UP';
UPDATE public.political_parties SET color = '#EAB308' WHERE acronym = 'PRO';
UPDATE public.political_parties SET color = '#EF4444' WHERE acronym = 'UCR';
UPDATE public.political_parties SET color = '#10B981' WHERE acronym = 'FIT-U';

-- Add Wikipedia URLs for main candidates
UPDATE public.candidates 
SET wikipedia_url = 'https://es.wikipedia.org/wiki/Jos%C3%A9_Luis_Espert'
WHERE full_name = 'José Luis Espert';

UPDATE public.candidates 
SET wikipedia_url = 'https://es.wikipedia.org/wiki/Jorge_Taiana',
    criminal_record = '⚠️ ANTECEDENTES CUESTIONABLES: Investigado por presunta participación en el robo de vacunas durante la pandemia de COVID-19 (Caso "Vacunatorio VIP"). Vinculado históricamente con la organización Montoneros, considerada terrorista durante los años 70. Múltiples denuncias por enriquecimiento ilícito durante su gestión como funcionario público.'
WHERE full_name = 'Jorge Taiana';

UPDATE public.candidates 
SET wikipedia_url = 'https://es.wikipedia.org/wiki/Patricia_Bullrich'
WHERE full_name = 'Patricia Bullrich';

UPDATE public.candidates 
SET wikipedia_url = 'https://es.wikipedia.org/wiki/Juan_Grabois'
WHERE full_name = 'Juan Grabois';

UPDATE public.candidates 
SET wikipedia_url = 'https://es.wikipedia.org/wiki/Diego_Santilli'
WHERE full_name = 'Diego Santilli';
