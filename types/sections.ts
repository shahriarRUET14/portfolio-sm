export type SEODataType = {
  title: string;
  author?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords: string[];
};

export type SocialLinksType = {
  linkedin?: string;
  github?: string;
  instagram?: string;
  facebook?: string;
  resume?: string;
};

export type GreetingsType = {
  name: string;
  title: string;
  headline: string;
  subheadline: string;
  pitch: string[];
  resumeLink?: string;
  metrics: MetricType[];
};

export type MetricType = {
  value: string;
  label: string;
};

export type AchievementType = {
  title: string;
  description: string;
};

export type SkillGroupType = {
  category: string;
  skills: string[];
};

export type SkillsSectionType = {
  title: string;
  groups: SkillGroupType[];
};

export type EducationType = {
  schoolName: string;
  subHeader: string;
  duration: string;
  desc?: string;
  grade?: string;
  descBullets?: string[];
  location?: string;
};

export type ExperienceType = {
  role: string;
  company: string;
  companyLogo?: string;
  date: string;
  location?: string;
  desc?: string;
  descBullets: string[];
  techStack: string[];
  highlight?: boolean;
};

export type ProjectType = {
  name: string;
  problem: string;
  role: string;
  stack: string[];
  impact: string;
  link?: string;
  github?: string;
};

export type FeedbackType = {
  name: string;
  feedback: string;
};
