export type Profile = {
  name: string;
  givenName: string;
  familyName: string;
  role: string;
  roleDetail: string;
  /** Shown as the large hero headline. */
  headline: string;
  intro: string;
  /** One-line positioning used in the footer and social cards. */
  positioning: string;
  /** First month of professional work (YYYY-MM); experience is derived from it. */
  careerStart: string;
  /** Last time the profile content was reviewed (YYYY-MM-DD). */
  updated: string;
  current: { company: string; role: string; since: string };
  location: {
    city: string;
    country: string;
    countryCode: string;
    timeZone: string;
    utcOffset: string;
  };
  focus: string[];
  domains: string[];
  capabilities: string[];
  email: string;
  phone?: string;
  links: { linkedin: string; github: string };
  resume?: { href: string; fileName: string };
  portrait?: { src: string; width: number; height: number; alt: string };
  education: {
    degree: string;
    school: string;
    schoolShort: string;
    period: string;
    location: string;
    note?: string;
  };
};

export type Figure = {
  value: string;
  label: string;
};

export type ProjectDiagram = 'mfs' | 'assistant' | 'tenancy' | 'workflows';

export type Decision = {
  title: string;
  why: string;
  tradeoff?: string;
};

export type CaseStudy = {
  seoTitle: string;
  seoDescription: string;
  overview: string[];
  contribution: { mine: string[]; team: string };
  requirements: string[];
  architecture: string[];
  decisions: Decision[];
  reliability?: string[];
  security?: string[];
  delivery?: string[];
  outcomes: string[];
  tradeoffs: string[];
  /** Missing facts for the owner to supply. Rendered only in development. */
  ownerNotes?: string[];
};

export type Project = {
  slug: string;
  domain: string;
  title: string;
  company: string;
  period: string;
  status?: 'in-progress';
  summary: string;
  context: string;
  challenge: string;
  role: string;
  outcome: string;
  stack: string[];
  figures?: Figure[];
  diagram: ProjectDiagram;
  caseStudy?: CaseStudy;
};

export type Principle = {
  title: string;
  body: string;
  inPractice: string;
};

export type Capability = {
  name: string;
  tools: string[];
  evidence?: string;
};

export type Role = {
  title: string;
  company: string;
  start: string;
  end?: string;
  summary: string;
};

export type LeadershipTheme = {
  title: string;
  body: string;
};
