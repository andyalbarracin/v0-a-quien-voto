-- Add political compass coordinates to parties table
-- X axis: Economic (-10 = Socialist/Statist, +10 = Libertarian/Capitalist)
-- Y axis: Social (-10 = Authoritarian/Conservative, +10 = Liberal/Progressive)

ALTER TABLE public.political_parties ADD COLUMN IF NOT EXISTS economic_axis DECIMAL(4,2) DEFAULT 0;
ALTER TABLE public.political_parties ADD COLUMN IF NOT EXISTS social_axis DECIMAL(4,2) DEFAULT 0;

-- Update parties with correct political compass coordinates based on their actual positions

-- La Libertad Avanza (LLA)
-- Economic: +9 (Extremely libertarian/capitalist - free markets, minimal state, privatization)
-- Social: +3 (Moderately liberal - some progressive positions but tough on crime)
UPDATE public.political_parties 
SET 
  economic_axis = 9.0,
  social_axis = 3.0
WHERE acronym = 'LLA';

-- Unión por la Patria / Fuerza Patria (UP)
-- Economic: -6 (Statist - high public spending, subsidies, state intervention, price controls)
-- Social: +6 (Progressive - social rights, gender equality, human rights focus)
UPDATE public.political_parties 
SET 
  economic_axis = -6.0,
  social_axis = 6.0
WHERE acronym = 'UP' OR name LIKE '%Patria%';

-- Propuesta Republicana (PRO)
-- Economic: +5 (Center-right - pro-market but not extreme, moderate reforms)
-- Social: +2 (Slightly liberal - institutional focus, moderate on social issues)
UPDATE public.political_parties 
SET 
  economic_axis = 5.0,
  social_axis = 2.0
WHERE acronym = 'PRO';

-- Unión Cívica Radical (UCR)
-- Economic: -2 (Center-left - balanced state/market, public services)
-- Social: +5 (Liberal - education, democracy, civil rights)
UPDATE public.political_parties 
SET 
  economic_axis = -2.0,
  social_axis = 5.0
WHERE acronym = 'UCR';

-- Frente de Izquierda (FIT-U)
-- Economic: -9 (Extremely socialist - nationalizations, worker control, no debt payment)
-- Social: +8 (Very progressive - feminism, LGBTQ+ rights, internationalism)
UPDATE public.political_parties 
SET 
  economic_axis = -9.0,
  social_axis = 8.0
WHERE acronym = 'FIT' OR acronym = 'FIT-U';

-- Add axis weights to positions table to determine which axis each position affects
ALTER TABLE public.positions ADD COLUMN IF NOT EXISTS economic_weight DECIMAL(3,2) DEFAULT 0;
ALTER TABLE public.positions ADD COLUMN IF NOT EXISTS social_weight DECIMAL(3,2) DEFAULT 0;

-- Update positions with axis weights
-- Economic positions (affect X axis)
UPDATE public.positions SET economic_weight = 1.0, social_weight = 0.0 
WHERE title IN (
  'Reducción del gasto público',
  'Libre mercado',
  'Flexibilización laboral'
);

UPDATE public.positions SET economic_weight = -1.0, social_weight = 0.0 
WHERE title IN (
  'Aumento de inversión social',
  'Intervención estatal',
  'Protección de derechos laborales',
  'Banco Central coordinado'
);

-- Social positions (affect Y axis)
UPDATE public.positions SET economic_weight = 0.0, social_weight = -1.0 
WHERE title IN (
  'Mano dura contra el crimen',
  'Bajar edad de imputabilidad'
);

UPDATE public.positions SET economic_weight = 0.0, social_weight = 1.0 
WHERE title IN (
  'Enfoque en prevención',
  'Mantener edad actual',
  'Aborto legal'
);

-- Mixed positions (affect both axes)
UPDATE public.positions SET economic_weight = 0.5, social_weight = 0.5 
WHERE title IN (
  'Educación pública de calidad',
  'Sistema público universal'
);

UPDATE public.positions SET economic_weight = 0.5, social_weight = -0.5 
WHERE title IN (
  'Libertad de elección educativa',
  'Sistema mixto con privados'
);

UPDATE public.positions SET economic_weight = 0.0, social_weight = 0.8 
WHERE title IN (
  'Lucha prioritaria contra corrupción'
);

UPDATE public.positions SET economic_weight = 0.0, social_weight = 0.3 
WHERE title IN (
  'Reformas graduales'
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_parties_compass ON public.political_parties(economic_axis, social_axis);
