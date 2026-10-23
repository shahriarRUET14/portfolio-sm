import type { LeadershipTheme, Role } from './types';

// OWNER: this narrative is written from the résumé — adjust the voice freely.
export const about = {
  heading: 'An engineer for the parts that have to be right.',
  paragraphs: [
    'I build the parts of products that people only notice when they fail: transaction flows in mobile financial services, tenant boundaries in SaaS platforms, and now the AI layer of a multi-tenant attendance platform.',
    'My career started in enterprise workflow automation at Together Initiatives, delivering more than 200 digital workflows for Robi Axiata. At RedDot Digital I moved into multi-tenant commerce SaaS, then into mobile financial services, where I architected the 27-microservice platform behind LENDEN, TeleCash and MyCash and led backend engineering for two of those brands. Since September 2026 I have been at Inovace Technologies, building AI features and owning service design for a multi-tenant biometric attendance platform.',
    'I care about the decisions that keep software maintainable after launch: clear service boundaries, shared modules where they genuinely reduce duplication, and review practices that keep quality high as teams adopt AI tooling. I work closely with product, QA and operations, and I am most useful where correctness, scale and long-term maintainability all matter.',
    'I am working toward software architecture, and I am a good fit for teams building fintech, multi-tenant SaaS or AI-enabled products that need someone to own complex backend systems end to end.',
  ],
};

export const roles: Role[] = [
  {
    title: 'Senior Software Engineer, AI Software Development',
    company: 'Inovace Technologies',
    start: '2026-09',
    summary:
      'AI features and service design for a multi-tenant SaaS biometric attendance platform.',
  },
  {
    title: 'Senior Software Engineer',
    company: 'RedDot Digital Limited',
    start: '2024-01',
    end: '2026-08',
    summary:
      'Architected the 27-microservice MFS platform behind LENDEN, TeleCash and MyCash; led backend for LENDEN and TeleCash.',
  },
  {
    title: 'Software Engineer',
    company: 'RedDot Digital Limited',
    start: '2022-07',
    end: '2023-12',
    summary:
      'Multi-tenant SaaS for B2B sales & distribution and eCommerce on Ruby on Rails, Next.js and React.',
  },
  {
    title: 'Software Engineer',
    company: 'Together Initiatives (p) Limited',
    start: '2020-03',
    end: '2022-06',
    summary:
      '200+ ProcessMaker workflows for Robi Axiata, reconciliation automation, a VAS portal and RPA.',
  },
];

export const leadership: LeadershipTheme[] = [
  {
    title: 'System design & code review',
    body: 'Drove system design and code reviews on the MFS platform, and led backend engineering for LENDEN and TeleCash.',
  },
  {
    title: 'Mentoring across functions',
    body: 'Mentored engineers across development, QA and operations — not only the people writing backend code.',
  },
  {
    title: 'Production ownership',
    body: 'Owned complex production incidents on a platform carrying ~20M BDT in transactions a day.',
  },
  {
    title: 'Standards for AI-assisted work',
    body: 'Brought LLM chat, custom skills, MCP servers and coding agents into daily delivery, with human review gates that keep regulated code auditable.',
  },
  {
    title: 'Cross-team collaboration',
    body: 'Clear communication with product, QA and operations, and working through disagreements toward a decision the team can own.',
  },
  {
    title: 'Modernising from the inside',
    body: 'Turned manual internal processes into 200+ digital workflows and automated reconciliation that used to be checked by hand.',
  },
];
