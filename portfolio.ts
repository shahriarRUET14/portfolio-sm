import {
  EducationType,
  ExperienceType,
  AchievementType,
  ProjectType,
  SkillsSectionType,
  SEODataType,
  SocialLinksType,
  GreetingsType,
  FeedbackType,
} from './types/sections';

export const greetings: GreetingsType = {
  name: 'Shahriar Mahmud',
  title: 'Shahriar Mahmud',
  headline: 'Senior Software Engineer',
  subheadline: 'FinTech & SaaS · Microservices · Enterprise Platforms',
  pitch: [
    '6+ years building large-scale FinTech and SaaS platforms with microservices architecture.',
    'Proven track record mentoring teams and delivering reliable, high-availability production systems.',
  ],
  resumeLink: '/resume.pdf',
  metrics: [
    { value: '27', label: 'microservices (MFS platform)' },
    { value: '~20M BDT', label: 'daily transactions (TeleCash/MyCash)' },
    { value: '6+', label: 'years enterprise delivery' },
  ],
};

export const achievements: AchievementType[] = [
  {
    title: 'FinTech Platform at Scale',
    description:
      'Built and scaled a multi-vendor FinTech platform (LENDEN, TeleCash, MyCash) processing ~20M BDT daily transactions without mismatch.',
  },
  {
    title: 'Full Ecosystem Delivery',
    description:
      'Delivered complete fintech ecosystem — 2 web portals, 6 mobile apps, and 27 microservices — with proven engineering contributions for performance and reliability.',
  },
  {
    title: 'Mentoring & Production Ownership',
    description:
      'Mentored engineers across development, QA, and operations while taking ownership of complex technical challenges and production issues.',
  },
];

export const openSource = {
  githubUserName: 'shahriarRuet14',
};

export const contact = {
  email: 'shahriar.ruet14@gmail.com',
  phone: '+880 1773-071269',
};

export const socialLinks: SocialLinksType = {
  resume: '/resume.pdf',
  linkedin: 'https://www.linkedin.com/in/shahriar-ruet14/',
  github: 'https://github.com/shahriarRuet14',
  instagram: 'https://www.instagram.com/shahriar.ruet14/',
  facebook: 'https://web.facebook.com/shahriarmahmud269/',
};

export const skillsSection: SkillsSectionType = {
  title: 'Skills',
  groups: [
    {
      category: 'Backend & Architecture',
      skills: [
        'Spring Boot',
        'Java',
        'Node.js',
        'Microservices',
        'Kafka',
        'Redis',
        'REST',
        'PostgreSQL',
        'MySQL',
      ],
    },
    {
      category: 'Frontend',
      skills: ['React', 'Next.js', 'Angular', 'TypeScript'],
    },
    {
      category: 'Platform & Delivery',
      skills: ['Docker', 'CI/CD', 'GitHub', 'FinTech', 'E-Commerce', 'RPA'],
    },
    {
      category: 'Leadership',
      skills: [
        'Technical Leadership',
        'Mentoring',
        'Code Review',
        'Client Alignment',
      ],
    },
  ],
};

export const educationInfo: EducationType[] = [
  {
    schoolName: 'Rajshahi University of Engineering & Technology (RUET)',
    subHeader: 'Bachelor of Computer Science and Engineering',
    duration: 'January 2015 – February 2020',
    location: 'Rajshahi, Bangladesh',
    desc: 'Research on analysis of cryptography algorithms for data security on cloud.',
  },
];

export const experience: ExperienceType[] = [
  {
    role: 'Senior Software Engineer',
    company: 'RedDot Digital Limited',
    companyLogo: '/img/reddot.png',
    date: 'November 2022 – Present',
    location: 'Bangladesh',
    descBullets: [
      'Contributed to architecture and development of a 27-microservice MFS platform powering LENDEN, TeleCash, and MyCash.',
      'Led backend development for LENDEN and TeleCash, ensuring scalable, reliable, high-availability financial services.',
      'Developed multi-platform ecosystem: Angular back office, React user portal, and 6 Flutter mobile applications.',
      'Designed common service modules reused across multiple MFS platforms.',
      'Mentored engineers across development, QA, and operations teams.',
      'Took ownership of complex technical challenges and production issues to ensure timely delivery.',
    ],
    techStack: [
      'Spring Boot',
      'Java',
      'Kafka',
      'Redis',
      'PostgreSQL',
      'React',
      'Angular',
      'Flutter',
    ],
    highlight: true,
  },
  {
    role: 'Software Engineer',
    company: 'RedDot Digital Limited',
    companyLogo: '/img/reddot.png',
    date: 'July 2022 – December 2023',
    location: 'Bangladesh',
    descBullets: [
      'Developed multi-tenant SaaS platform supporting B2B sales & distribution and e-commerce order/delivery systems.',
      'Built backend services using Ruby on Rails with scalable tenant-level customization.',
      'Contributed to shared platform architecture powering multiple products from a single codebase.',
      'Worked with Next.js storefront, React backoffice portal, and Ruby on Rails backend.',
    ],
    techStack: ['Ruby on Rails', 'Next.js', 'React', 'PostgreSQL', 'Redis'],
  },
  {
    role: 'Software Engineer',
    company: 'Together Initiatives (p) Limited',
    companyLogo: '/img/together.png',
    date: 'March 2020 – June 2022',
    location: 'Bangladesh',
    descBullets: [
      'Customized ProcessMaker BPM platform for Robi enterprise workflow automation — 200+ digital workflows.',
      'Implemented custom forms, logic, and integrations to support process digitalization.',
      'Built Spring Boot POS application and bank reconciliation automation.',
      'Developed middleware APIs for a national secure application using Java.',
    ],
    techStack: [
      'Spring Boot',
      'Java',
      'ProcessMaker',
      'MySQL',
      'React',
      'PHP',
    ],
  },
];

export const projects: ProjectType[] = [
  {
    name: 'MFS Platform (LENDEN / TeleCash / MyCash)',
    problem:
      'Build a scalable mobile financial services platform supporting multiple brands with high-volume daily transactions.',
    role: 'Senior Software Engineer — backend architecture & platform delivery',
    stack: [
      'Spring Boot',
      'Kafka',
      'Redis',
      'PostgreSQL',
      'React',
      'Angular',
      'Flutter',
    ],
    impact:
      '27 microservices, 2 web portals, 6 mobile apps processing ~20M BDT daily transactions without mismatch.',
  },
  {
    name: 'Sales & Distribution SaaS',
    problem:
      'Multi-tenant B2B sales and distribution platform requiring tenant-level customization from a shared codebase.',
    role: 'Software Engineer — backend & platform architecture',
    stack: ['Ruby on Rails', 'Next.js', 'React', 'PostgreSQL'],
    impact:
      'Shared platform architecture powering multiple products with scalable tenant-level customization.',
  },
  {
    name: 'Enterprise Workflow Automation (Robi)',
    problem:
      'Automate 200+ internal business processes for a major telecom enterprise.',
    role: 'Software Engineer — BPM customization & integration',
    stack: ['ProcessMaker', 'PHP', 'Java', 'MySQL'],
    impact:
      '200+ digital workflows deployed, reconciliation automation, and significant operational efficiency gains.',
  },
  {
    name: 'VAS Content Provider Portal',
    problem:
      'Streamline communication between VAS team and content providers with role-based access and stage management.',
    role: 'Full Stack Developer',
    stack: ['Laravel', 'PHP', 'MySQL', 'ProcessMaker'],
    impact:
      'Enterprise integration with AD/OTP login, five role configurations, and medium-complex stage management per case.',
    link: 'https://vascp.robi.com.bd/login',
  },
];

export const feedbacks: FeedbackType[] = [];

export const showContactUs: boolean = true;

export const seoData: SEODataType = {
  title:
    'Shahriar Mahmud | Senior Software Engineer — FinTech Microservices & Spring Boot',
  description:
    'Shahriar Mahmud is a Senior Software Engineer in Dhaka, Bangladesh with 6+ years building FinTech and SaaS platforms. Expertise in Spring Boot microservices, high-volume MFS systems (LENDEN, TeleCash, MyCash), Node.js, React, and enterprise delivery.',
  author: 'Shahriar Mahmud',
  siteName: 'Shahriar Mahmud Portfolio',
  jobTitle: 'Senior Software Engineer',
  location: 'Dhaka, Bangladesh',
  email: 'shahriar.ruet14@gmail.com',
  phone: '+8801773071269',
  url: 'https://portfolio-sm-ten.vercel.app/',
  image: 'https://github.com/shahriarRuet14.png',
  locale: 'en_US',
  sameAs: [
    'https://www.linkedin.com/in/shahriar-ruet14/',
    'https://github.com/shahriarRuet14',
  ],
  keywords: [
    'Shahriar Mahmud',
    'Shahriar Mahmud Senior Software Engineer',
    'Shahriar Mahmud FinTech',
    'Shahriar Mahmud Spring Boot',
    'Shahriar Mahmud portfolio',
    'shahriar.ruet14',
    'shahriarRuet14',
    'Senior Software Engineer Bangladesh',
    'Senior Software Engineer Dhaka',
    'FinTech Software Engineer Bangladesh',
    'Spring Boot developer Bangladesh',
    'Microservices architect Bangladesh',
    'MFS platform engineer',
    'Mobile Financial Services developer',
    'LENDEN',
    'TeleCash',
    'MyCash',
    'RedDot Digital',
    'Spring Boot',
    'Java microservices',
    'Kafka',
    'Redis',
    'Node.js',
    'React',
    'Next.js',
    'Ruby on Rails',
    'enterprise SaaS',
    'high-volume transactions',
  ],
};
