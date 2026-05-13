export type ProjectCategory = 'frontend' | 'backend' | 'fullstack';

export type LocalizedText = {
  es: string;
  en: string;
};

export type PortfolioProject = {
  title: string;
  category: ProjectCategory;
  ownership: 'own' | 'work';
  accent: 'teal' | 'orange' | 'brown';
  description: LocalizedText;
  features: LocalizedText[];
  stack: string[];
  architecture?: LocalizedText;
  url?: string;
  secondaryUrl?: string;
  secondaryLabel?: string;
};

export const portfolioProjects: readonly PortfolioProject[] = [
  {
    title: 'Fundación AXiO Landing Page',
    category: 'frontend',
    ownership: 'work',
    accent: 'teal',
    description: {
      es: 'Landing page para Fundación AXiO A.C. y su plataforma de gestión administrativa con cursos y aprendizaje.',
      en: 'Landing page for Fundacion AXiO A.C. and its administrative management platform with courses and learning.',
    },
    features: [
      {
        es: 'Análisis de requerimientos, diseño UI/UX, desarrollo frontend y despliegue',
        en: 'Requirements analysis, UI/UX design, frontend development and deployment',
      },
      {
        es: 'Diseño responsivo y optimizado para comunicar la propuesta institucional',
        en: 'Responsive design optimized to communicate the institutional value proposition',
      },
      {
        es: 'Participación en el ciclo completo de vida de la landing page',
        en: 'Participation across the full landing page lifecycle',
      },
    ],
    stack: ['Figma', 'UI/UX', 'React', 'Tailwind CSS'],
    url: 'https://fundacionaxio.org/',
  },
  {
    title: 'AXiO App',
    category: 'fullstack',
    ownership: 'work',
    accent: 'brown',
    description: {
      es: 'Plataforma de gestión administrativa con app para cursos y aprendizaje, enfocada en mejorar interfaces web y móviles.',
      en: 'Administrative management platform with an app for courses and learning, focused on improving web and mobile interfaces.',
    },
    features: [
      {
        es: 'Rediseño parcial y optimización de interfaces web y móviles',
        en: 'Partial redesign and optimization of web and mobile interfaces',
      },
      {
        es: 'Propuestas visuales y de usabilidad alineadas con cronogramas de entrega',
        en: 'Visual and usability proposals aligned with delivery schedules',
      },
      {
        es: 'Integración de experiencia multiplataforma para aprendizaje',
        en: 'Cross-platform learning experience integration',
      },
    ],
    stack: ['Figma', 'UI/UX', 'Full Stack', 'REST API', 'Blog CMS', 'Multiplataforma'],
  },
  {
    title: 'AXiO One',
    category: 'fullstack',
    ownership: 'work',
    accent: 'teal',
    description: {
      es: 'Sistema administrativo con panel de noticias, blog corporativo y notificaciones interconectadas entre módulos.',
      en: 'Administrative system with news panel, corporate blog and interconnected notifications across modules.',
    },
    features: [
      {
        es: 'Rediseño y desarrollo general de la plataforma administrativa',
        en: 'General redesign and development of the administrative platform',
      },
      {
        es: 'Diseño de panel de noticias, blog y notificaciones',
        en: 'Design of news, blog and notification panels',
      },
      {
        es: 'Mejoras de consistencia visual en módulos web y móviles',
        en: 'Visual consistency improvements across web and mobile modules',
      },
    ],
    stack: ['Figma', 'Full Stack', 'REST API', 'Blog CMS', 'Multiplataforma'],
  },
  {
    title: 'Synapsis Web/App',
    category: 'fullstack',
    ownership: 'work',
    accent: 'orange',
    description: {
      es: 'Plataforma web y móvil para búsqueda y reservación de puntos de reparación de vehículos, con panel administrativo.',
      en: 'Web and mobile platform for searching and booking vehicle repair points, with an administrative panel.',
    },
    features: [
      {
        es: 'Definición visual y UX/UI para plataformas web y móviles',
        en: 'Visual and UX/UI definition for web and mobile platforms',
      },
      {
        es: 'Creación de flujos, wireframes y componentes finales',
        en: 'Creation of flows, wireframes and final components',
      },
      {
        es: 'Diseños funcionales, responsivos y alineados con plazos de dirección',
        en: 'Functional, responsive designs aligned with leadership deadlines',
      },
    ],
    stack: ['Figma', 'Full Stack', 'REST API', 'Blog CMS', 'Multiplataforma'],
  },
  {
    title: 'EveryMed Admin',
    category: 'frontend',
    ownership: 'own',
    accent: 'teal',
    description: {
      es: 'Aplicación web progresiva y móvil nativa de gestión médica desarrollada con Angular, con participación como diseñador líder y desarrollador backend dirigiendo un equipo mediano.',
      en: 'Progressive web and native mobile medical management app built with Angular, contributing as lead designer and backend developer while guiding a mid-sized team.',
    },
    features: [
      {
        es: 'Diseño responsive para escritorio, web móvil y app nativa',
        en: 'Responsive design for desktop, mobile web and native app',
      },
      {
        es: 'Autenticación, roles, expedientes compatibles con NOM-024-SSA3 y citas',
        en: 'Authentication, roles, NOM-024-SSA3 compatible records and appointments',
      },
      {
        es: 'Notificaciones con Capacitor, dashboards, perfiles y planes con Stripe',
        en: 'Notifications with Capacitor, dashboards, profiles and plans with Stripe',
      },
    ],
    stack: ['Figma', 'Angular 20/21', 'TypeScript', 'Tailwind CSS', 'Capacitor', 'PWA', 'Stripe'],
    architecture: {
      es: 'PWA/Web/Móvil nativa con componentes standalone y enfoque multiplataforma',
      en: 'PWA/Web/native mobile app with standalone components and a cross-platform approach',
    },
    url: 'https://everymed.app.falcodex.online/',
    secondaryUrl: 'https://everymed.falcodex.online/',
    secondaryLabel: 'Landing',
  },
  {
    title: 'EveryMed API',
    category: 'backend',
    ownership: 'own',
    accent: 'orange',
    description: {
      es: 'API REST desarrollada con .NET 9 siguiendo Clean Architecture, principios SOLID, autenticación JWT y módulos administrativos para EveryMed.',
      en: 'REST API built with .NET 9 following Clean Architecture, SOLID principles, JWT authentication and administrative modules for EveryMed.',
    },
    features: [
      {
        es: 'Clean Architecture, separación de capas y principios SOLID',
        en: 'Clean Architecture, layered separation and SOLID principles',
      },
      {
        es: 'Autenticación JWT, gestión de roles y Entity Framework Core con SQL Server',
        en: 'JWT authentication, role management and Entity Framework Core with SQL Server',
      },
      {
        es: 'Integración de correo con MailKit y notificaciones en tiempo real',
        en: 'MailKit email integration and real-time notifications',
      },
    ],
    stack: ['.NET 9', 'ASP.NET Core', 'Entity Framework Core', 'SQL Server', 'JWT', 'MailKit'],
    architecture: {
      es: 'Clean Architecture con capas Domain, Application, Infrastructure y Presentation',
      en: 'Clean Architecture with Domain, Application, Infrastructure and Presentation layers',
    },
    url: 'https://everymed.app.falcodex.online/',
    secondaryUrl: 'https://everymed.falcodex.online/',
    secondaryLabel: 'Landing',
  },
  {
    title: 'EveryMed Landing Page',
    category: 'frontend',
    ownership: 'own',
    accent: 'teal',
    description: {
      es: 'Landing page moderna y responsive para EveryMed, con sección demo para mostrar la interfaz de administración en tiempo real.',
      en: 'Modern responsive landing page for EveryMed, with a demo section that previews the administration interface in real time.',
    },
    features: [
      {
        es: 'Diseño UI/UX, frontend y despliegue desde cero',
        en: 'UI/UX design, frontend and deployment from scratch',
      },
      {
        es: 'Sección demo con animaciones suaves y vista de la plataforma',
        en: 'Demo section with smooth animations and platform preview',
      },
      {
        es: 'Ciclo completo desde requerimientos hasta solución optimizada',
        en: 'Full lifecycle from requirements to optimized solution',
      },
    ],
    stack: ['Figma', 'Angular 20', 'TypeScript', 'Tailwind CSS'],
    url: 'https://everymed.falcodex.online/',
    secondaryUrl: 'https://everymed.app.falcodex.online/',
    secondaryLabel: 'App',
  },
  {
    title: 'Grupo Monzalvo Landing Page',
    category: 'frontend',
    ownership: 'work',
    accent: 'brown',
    description: {
      es: 'Landing page responsiva para Grupo Monzalvo, orientada a rendimiento, accesibilidad y una experiencia amigable para usuarios.',
      en: 'Responsive landing page for Grupo Monzalvo, focused on performance, accessibility and a friendly user experience.',
    },
    features: [
      {
        es: 'Rendimiento mayor a 90 en Lighthouse',
        en: 'Lighthouse performance score above 90',
      },
      {
        es: 'Diseño atractivo, accesible y compatible con todo tipo de dispositivo',
        en: 'Attractive, accessible design compatible with all device types',
      },
      {
        es: 'Responsable del ciclo completo: análisis, UI/UX, frontend y despliegue',
        en: 'Responsible for the full cycle: analysis, UI/UX, frontend and deployment',
      },
    ],
    stack: ['Figma', 'Angular 20', 'TypeScript', 'Tailwind CSS', 'Lighthouse'],
  },
  {
    title: 'GuiArt',
    category: 'fullstack',
    ownership: 'own',
    accent: 'orange',
    description: {
      es: 'Nuevo concepto de plataforma de cursos bajo FALCodeX, pensado para una experiencia de aprendizaje clara, visual y escalable.',
      en: 'New course platform concept under FALCodeX, designed for a clear, visual and scalable learning experience.',
    },
    features: [
      {
        es: 'Landing pública para presentar el concepto, propuesta de valor y acceso a la plataforma',
        en: 'Public landing page to present the concept, value proposition and platform access',
      },
      {
        es: 'Aplicación web separada para la experiencia de cursos',
        en: 'Separate web app for the course experience',
      },
      {
        es: 'Proyecto en desarrollo activo dentro del ecosistema FALCodeX',
        en: 'Actively developed project within the FALCodeX ecosystem',
      },
    ],
    stack: ['Angular', 'TypeScript', 'Tailwind CSS', 'FALCodeX', 'Cursos', 'SaaS'],
    architecture: {
      es: 'Landing pública y aplicación web desacopladas',
      en: 'Decoupled public landing and web application',
    },
    url: 'https://guiart.falcodex.online/',
    secondaryUrl: 'https://guiart.app.falcodex.online/',
    secondaryLabel: 'App',
  },
];
