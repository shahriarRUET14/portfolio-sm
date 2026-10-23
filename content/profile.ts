import type { Profile } from './types';

// Source: résumé (Shahriar-Mahmud-Sept.pdf). Keep every claim here verifiable.
export const profile: Profile = {
  name: 'Shahriar Mahmud',
  givenName: 'Shahriar',
  familyName: 'Mahmud',
  role: 'Senior Software Engineer',
  roleDetail: 'Senior Software Engineer, AI Software Development',
  headline: 'From complex backend systems to products people depend on.',
  intro:
    "I'm Shahriar Mahmud, a Senior Software Engineer focused on reliable backend systems, distributed architectures, and fintech and SaaS products. I turn complex technical requirements into maintainable software built for real-world use — currently, AI features on a multi-tenant SaaS platform at Inovace Technologies.",
  positioning:
    'Senior Software Engineer — backend systems, distributed architecture, fintech and multi-tenant SaaS.',
  careerStart: '2020-03',
  updated: '2026-10-24',
  current: {
    company: 'Inovace Technologies',
    role: 'Senior Software Engineer, AI Software Development',
    since: '2026-09',
  },
  location: {
    city: 'Dhaka',
    country: 'Bangladesh',
    countryCode: 'BD',
    timeZone: 'Asia/Dhaka',
    utcOffset: 'GMT+6',
  },
  focus: ['Backend systems', 'Distributed architecture', 'AI integration'],
  domains: ['FinTech & MFS', 'Multi-tenant SaaS', 'eCommerce', 'BPM'],
  capabilities: [
    'Java',
    'Spring Boot',
    'Node.js',
    'Ruby on Rails',
    'Kafka',
    'Redis',
    'PostgreSQL',
    'Docker',
    'Kubernetes',
    'LLM integration',
  ],
  email: 'shahriar.ruet14@gmail.com',
  phone: '+880 1773-071269',
  links: {
    linkedin: 'https://www.linkedin.com/in/shahriar-ruet14/',
    github: 'https://github.com/shahriarRuet14',
  },
  resume: {
    href: '/resume.pdf',
    fileName: 'Shahriar-Mahmud-Resume.pdf',
  },
  // A higher-resolution headshot (800px+) will look sharper on retina screens.
  portrait: {
    src: '/images/shahriar-mahmud.jpg',
    width: 330,
    height: 330,
    alt: 'Portrait of Shahriar Mahmud',
  },
  education: {
    degree: 'B.Sc. in Computer Science and Engineering',
    school: 'Rajshahi University of Engineering & Technology',
    schoolShort: 'RUET',
    period: '2015 — 2020',
    location: 'Rajshahi, Bangladesh',
    note: 'Undergraduate research on cryptography algorithms for data security in the cloud.',
  },
};
