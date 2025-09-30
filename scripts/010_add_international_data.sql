-- Add international comparison data to political parties
ALTER TABLE public.political_parties
ADD COLUMN IF NOT EXISTS international_examples JSONB;

-- Update parties with international comparison data
UPDATE public.political_parties
SET international_examples = '[
  {
    "country": "Nueva Zelanda",
    "period": "1984-1993",
    "policies": "Liberalización económica, reducción del Estado, apertura comercial",
    "results": {
      "economy": "Crecimiento del PIB promedio 3.2% anual, inflación controlada bajo 3%",
      "education": "Sistema educativo mixto con vouchers, mejora en rankings PISA",
      "quality_of_life": "IDH alto (0.931), desempleo reducido de 10% a 6%"
    }
  },
  {
    "country": "Estonia",
    "period": "1992-presente",
    "policies": "Economía digital, impuesto plano, Estado eficiente y pequeño",
    "results": {
      "economy": "Crecimiento promedio 4.5% anual, deuda pública bajo 20% del PIB",
      "education": "Líder en educación digital, top 5 en PISA",
      "quality_of_life": "IDH muy alto (0.890), salarios reales triplicados desde 1995"
    }
  }
]'::jsonb
WHERE acronym = 'LLA';

UPDATE public.political_parties
SET international_examples = '[
  {
    "country": "Chile",
    "period": "2010-2018",
    "policies": "Reformas graduales, economía de mercado con regulación, inversión en educación",
    "results": {
      "economy": "Crecimiento promedio 3.8% anual, inflación estable 3%",
      "education": "Aumento de cobertura universitaria del 38% al 51%",
      "quality_of_life": "IDH alto (0.855), pobreza reducida de 15% a 8.6%"
    }
  },
  {
    "country": "Polonia",
    "period": "2007-2015",
    "policies": "Reformas de mercado moderadas, inversión en infraestructura, integración europea",
    "results": {
      "economy": "Único país UE sin recesión en 2008-2009, crecimiento 4% anual",
      "education": "Top 10 mundial en PISA, inversión educativa aumentó 40%",
      "quality_of_life": "IDH muy alto (0.876), salarios reales aumentaron 50%"
    }
  }
]'::jsonb
WHERE acronym = 'JxC';

UPDATE public.political_parties
SET international_examples = '[
  {
    "country": "Brasil",
    "period": "2003-2010",
    "policies": "Programas sociales masivos (Bolsa Familia), aumento del salario mínimo, gasto social",
    "results": {
      "economy": "Crecimiento promedio 4.5% anual, pero inflación creciente",
      "education": "Aumento de matrícula universitaria, pero calidad estancada",
      "quality_of_life": "Pobreza extrema reducida de 25% a 11%, pero desigualdad persistente"
    }
  },
  {
    "country": "Argentina",
    "period": "2003-2015",
    "policies": "Nacionalizaciones, controles de precios, aumento del gasto público",
    "results": {
      "economy": "Crecimiento inicial, luego estancamiento e inflación creciente (25-40%)",
      "education": "Inversión aumentó pero calidad cayó en rankings internacionales",
      "quality_of_life": "Pobreza redujo inicialmente, luego aumentó a 32% en 2015"
    }
  }
]'::jsonb
WHERE acronym = 'UP';

UPDATE public.political_parties
SET international_examples = '[
  {
    "country": "Venezuela",
    "period": "1999-2013",
    "policies": "Nacionalizaciones masivas, controles de precios, economía estatizada",
    "results": {
      "economy": "Colapso económico, hiperinflación, PIB cayó 75% desde 2013",
      "education": "Éxodo de profesores, cierre de universidades, fuga de cerebros",
      "quality_of_life": "Pobreza extrema 96%, crisis humanitaria, 7 millones emigraron"
    }
  },
  {
    "country": "Cuba",
    "period": "1959-presente",
    "policies": "Economía planificada, propiedad estatal, igualitarismo forzado",
    "results": {
      "economy": "Estancamiento crónico, salario promedio $30/mes, escasez generalizada",
      "education": "Alta alfabetización pero sin libertad académica ni innovación",
      "quality_of_life": "Pobreza generalizada, represión política, éxodo masivo"
    }
  }
]'::jsonb
WHERE acronym = 'FIT';

UPDATE public.political_parties
SET international_examples = '[
  {
    "country": "Uruguay",
    "period": "2005-2020",
    "policies": "Pragmatismo económico, inversión social focalizada, institucionalidad fuerte",
    "results": {
      "economy": "Crecimiento promedio 3.5% anual, inflación controlada 7-8%",
      "education": "Plan Ceibal (laptop por niño), mejora gradual en PISA",
      "quality_of_life": "IDH muy alto (0.817), pobreza reducida de 32% a 8%"
    }
  },
  {
    "country": "Costa Rica",
    "period": "1990-presente",
    "policies": "Democracia estable, inversión en educación y salud, economía mixta",
    "results": {
      "economy": "Crecimiento promedio 4% anual, diversificación económica exitosa",
      "education": "Inversión 7% del PIB, alfabetización 98%, hub tecnológico regional",
      "quality_of_life": "IDH alto (0.810), esperanza de vida 80 años, estabilidad política"
    }
  }
]'::jsonb
WHERE acronym = 'HNP';
