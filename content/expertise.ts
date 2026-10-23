import type { Capability } from './types';

export const capabilities: Capability[] = [
  {
    name: 'Architecture & distributed systems',
    tools: [
      'Microservices',
      'Event-driven design with Kafka',
      'Redis caching',
      'Service decomposition',
      'Shared service modules',
      'High-availability flows',
    ],
    evidence:
      'Architected the 27-microservice MFS platform behind three brands at RedDot Digital.',
  },
  {
    name: 'Backend & APIs',
    tools: [
      'Java / Spring Boot',
      'Node.js',
      'Ruby on Rails',
      'TypeScript',
      'REST APIs',
    ],
    evidence:
      'LENDEN and TeleCash backends (Node.js, Java, Rails); multi-tenant SaaS services (Rails); a Spring Boot POS and Java middleware APIs.',
  },
  {
    name: 'AI engineering',
    tools: [
      'LLM integration',
      'Conversational assistants',
      'Retrieval over tenant data',
      'Prompt design',
      'Guardrails',
      'MCP servers',
      'Coding agents',
      'Local models via Ollama',
    ],
    evidence:
      'A workforce-data assistant at Inovace Technologies; AI-assisted delivery standards at RedDot Digital.',
  },
  {
    name: 'Data & infrastructure',
    tools: [
      'PostgreSQL',
      'MySQL',
      'Docker',
      'Kubernetes',
      'CI/CD pipelines',
      'Multi-repo Git workflows',
    ],
    evidence:
      'PostgreSQL on the MFS and commerce SaaS platforms; MySQL on enterprise workflow systems.',
  },
  {
    name: 'Frontend & product surfaces',
    tools: ['Angular', 'React', 'Next.js', 'TypeScript'],
    evidence:
      'Angular back office and React user portal for MFS; Next.js storefront and React back office for commerce SaaS.',
  },
  {
    name: 'Domains',
    tools: [
      'Multi-tenant SaaS',
      'Biometric attendance',
      'Mobile Financial Services',
      'Digital wallets',
      'Settlement & reconciliation',
      'eCommerce',
      'BPM / RPA',
    ],
  },
];
