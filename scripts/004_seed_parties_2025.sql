-- Insert political parties for 2025 elections with international examples

INSERT INTO public.political_parties (name, acronym, description, ideology, founded_year, international_examples) VALUES
(
  'La Libertad Avanza',
  'LLA',
  'Partido libertario liderado por Javier Milei, enfocado en reducción drástica del Estado, libertad económica y políticas de seguridad de mano dura.',
  'Libertarismo, Liberalismo económico',
  2021,
  '[
    {
      "country": "Nueva Zelanda",
      "period": "1984-1993",
      "policies": "Reformas de mercado libre, reducción del Estado, apertura comercial",
      "results": {
        "economy": "Crecimiento del PIB de 2.5% anual promedio, inflación controlada bajo 3%",
        "education": "Sistema educativo mejorado con mayor autonomía escolar",
        "quality_of_life": "IDH aumentó de 0.85 a 0.92, desempleo redujo de 10% a 6%"
      }
    },
    {
      "country": "Estonia",
      "period": "1992-presente",
      "policies": "Economía digital, impuesto plano, Estado mínimo eficiente",
      "results": {
        "economy": "Crecimiento promedio 4% anual, deuda pública bajo 20% del PIB",
        "education": "Líder en educación digital, top 5 en PISA",
        "quality_of_life": "IDH 0.89, salarios reales triplicados desde 1995"
      }
    }
  ]'::jsonb
),
(
  'Unión por la Patria',
  'UP',
  'Coalición peronista que agrupa al Frente de Todos y sectores kirchneristas, enfocada en justicia social, derechos laborales y rol activo del Estado.',
  'Peronismo, Progresismo',
  2023,
  '[
    {
      "country": "Uruguay",
      "period": "2005-2020",
      "policies": "Políticas sociales progresivas con responsabilidad fiscal, inversión en educación",
      "results": {
        "economy": "Crecimiento promedio 3.5% anual, inflación promedio 8%",
        "education": "Cobertura educativa 95%, Plan Ceibal (una laptop por niño)",
        "quality_of_life": "Pobreza redujo de 32% a 8%, IDH 0.81"
      }
    },
    {
      "country": "Portugal",
      "period": "2015-2022",
      "policies": "Inversión social con disciplina fiscal, fortalecimiento de servicios públicos",
      "results": {
        "economy": "Déficit redujo de 7% a 0.2% del PIB, desempleo de 17% a 6%",
        "education": "Inversión educativa aumentó 15%, abandono escolar redujo a la mitad",
        "quality_of_life": "Salario mínimo aumentó 40%, pobreza redujo de 19% a 16%"
      }
    }
  ]'::jsonb
),
(
  'Propuesta Republicana',
  'PRO',
  'Partido de centroderecha fundado por Mauricio Macri, enfocado en institucionalidad, modernización del Estado y políticas pro-mercado moderadas.',
  'Centroderecha, Republicanismo',
  2005,
  '[
    {
      "country": "Chile",
      "period": "1990-2010",
      "policies": "Economía de mercado con red de protección social, institucionalidad fuerte",
      "results": {
        "economy": "Crecimiento promedio 5% anual, inflación bajo 4%",
        "education": "Cobertura universitaria aumentó de 16% a 42%",
        "quality_of_life": "Pobreza redujo de 38% a 11%, IDH de 0.70 a 0.84"
      }
    },
    {
      "country": "Colombia",
      "period": "2002-2010",
      "policies": "Seguridad democrática, inversión extranjera, modernización institucional",
      "results": {
        "economy": "Crecimiento promedio 4.5% anual, inversión extranjera triplicada",
        "education": "Cobertura educativa aumentó 20%",
        "quality_of_life": "Homicidios redujeron 45%, pobreza de 50% a 37%"
      }
    }
  ]'::jsonb
),
(
  'Unión Cívica Radical',
  'UCR',
  'Partido centenario de centroizquierda, enfocado en democracia, educación pública y equilibrio entre Estado y mercado.',
  'Socialdemocracia, Radicalismo',
  1891,
  '[
    {
      "country": "Costa Rica",
      "period": "1950-presente",
      "policies": "Inversión en educación y salud pública, democracia estable, sin ejército",
      "results": {
        "economy": "Crecimiento promedio 4% anual, economía diversificada",
        "education": "Alfabetización 97%, inversión educativa 7% del PIB",
        "quality_of_life": "IDH 0.81, esperanza de vida 80 años, democracia más estable de Latinoamérica"
      }
    }
  ]'::jsonb
),
(
  'Frente de Izquierda',
  'FIT',
  'Coalición de partidos trotskistas y socialistas, enfocada en derechos de trabajadores, nacionalizaciones y transformación socialista.',
  'Socialismo, Trotskismo',
  2011,
  '[
    {
      "country": "Bolivia",
      "period": "2006-2019",
      "policies": "Nacionalización de recursos, redistribución de riqueza, derechos indígenas",
      "results": {
        "economy": "Crecimiento promedio 4.9% anual, reservas internacionales de $1.7B a $15B",
        "education": "Analfabetismo redujo de 13% a 3%",
        "quality_of_life": "Pobreza extrema redujo de 38% a 15%, IDH de 0.65 a 0.72"
      }
    }
  ]'::jsonb
)
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  ideology = EXCLUDED.ideology,
  international_examples = EXCLUDED.international_examples;
