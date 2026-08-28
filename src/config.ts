/**
 * Single place for personal details and the hero copy in both languages.
 * Everything else (skills, education, experience) lives as Markdown
 * in /content.
 */
export const site = {
  name: 'Adrián Núñez Costa',
  shortName: 'Adrián Núñez',
  url: 'https://adrinc6.github.io/myself',
  repo: 'https://github.com/adrinc6/myself',
  email: 'a.nunez.costa@gmail.com',
  linkedin: 'https://www.linkedin.com/in/adrinc6',
  github: 'https://github.com/adrinc6',
  location: 'Madrid, España',
  skills: ['Python', 'SQL', 'LLMs', 'MATLAB', 'AutoCAD'],
} as const;

export const hero = {
  es: {
    role: 'Ingeniero Aeroespacial · AI & Data Engineer',
    title: 'Adrián Núñez Costa',
    intro:
      'Ingeniero aeroespacial y AI & Data Engineer en Madrid. Compagino el Máster en Ingeniería Aeronáutica en la UPM con mi trabajo en Kerox Technology, donde diseño soluciones backend basadas en IA para procesar y analizar datos de texto y audio con Python y SQL.',
    intro2:
      'Me centro en la integración de modelos de lenguaje, en mejorar modelos guiándome por métricas y en construir herramientas que resuelvan problemas reales. Busco proyectos donde el rigor de la ingeniería y el trabajo con datos se encuentren.',
    seoDescription:
      'Portfolio de Adrián Núñez Costa, ingeniero aeroespacial y AI & Data Engineer en Madrid. Proyectos, educación y experiencia.',
  },
  en: {
    role: 'Aerospace Engineer · AI & Data Engineer',
    title: 'Adrián Núñez Costa',
    intro:
      "Aerospace engineer and AI & Data Engineer based in Madrid. I combine a Master's in Aeronautical Engineering at UPM with my work at Kerox Technology, where I design AI-powered backend solutions to process and analyse text and audio data with Python and SQL.",
    intro2:
      'My focus is on integrating large language models, improving models through metric-driven iteration, and building tools that solve real problems. I look for projects where engineering rigour meets data work.',
    seoDescription:
      'Portfolio of Adrián Núñez Costa, aerospace engineer and AI & Data Engineer based in Madrid. Projects, education and experience.',
  },
} as const;
