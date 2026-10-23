import type { Project } from './types';

// Facts come from the résumé and the previous version of this site.
// Lines marked "OWNER: verify" explain *why* a stated fact mattered; they are
// reasoned from the résumé rather than quoted from it, so confirm the wording.
// `ownerNotes` list missing details and only render in development.

export const projects: Project[] = [
  {
    slug: 'mobile-financial-services-platform',
    domain: 'FinTech · Mobile Financial Services',
    title: 'One platform behind three mobile money brands',
    company: 'RedDot Digital Limited',
    period: '2024 — 2026',
    summary:
      'Architected and delivered a 27-microservice mobile financial services platform powering LENDEN, TeleCash and MyCash, carrying ~20M BDT in daily transactions with zero settlement mismatch.',
    context:
      'LENDEN, TeleCash and MyCash are mobile financial services (MFS) brands: digital wallets people use to move money from their phones.',
    challenge:
      'Three brands needed reliable, high-availability financial services without three separate codebases drifting apart — and every taka had to settle correctly.',
    role: 'Architected and delivered the platform. Led backend engineering for LENDEN and TeleCash on Node.js, Java and Ruby on Rails, drove system design and code reviews, and owned complex production incidents.',
    outcome:
      '27 microservices with shared service modules reused across brands, 2 web portals and 6 Flutter apps — ~20M BDT a day with zero settlement mismatch.',
    stack: [
      'Java',
      'Spring Boot',
      'Node.js',
      'Ruby on Rails',
      'Kafka',
      'Redis',
      'PostgreSQL',
      'Angular',
      'React',
      'Flutter',
    ],
    figures: [
      { value: '27', label: 'microservices' },
      { value: '~20M BDT', label: 'in daily transactions' },
      { value: '0', label: 'settlement mismatches' },
      { value: '2 + 6', label: 'web portals + Flutter apps' },
    ],
    diagram: 'mfs',
    caseStudy: {
      seoTitle:
        'Case study: a 27-microservice mobile financial services platform',
      seoDescription:
        'How Shahriar Mahmud architected the 27-microservice MFS platform behind LENDEN, TeleCash and MyCash — shared service modules, ~20M BDT in daily transactions and zero settlement mismatch.',
      overview: [
        'LENDEN, TeleCash and MyCash are mobile financial services brands in Bangladesh. At RedDot Digital I architected and delivered the platform behind them: 27 microservices, two web portals (an Angular back office and a React user portal) and six Flutter mobile apps.',
        'The platform carries roughly 20 million Bangladeshi taka in transactions every day, with zero settlement mismatch.',
      ],
      contribution: {
        mine: [
          'Architected the platform and its service decomposition.',
          'Led backend engineering for LENDEN and TeleCash across Node.js, Java and Ruby on Rails services.',
          'Drove system design and code reviews.',
          'Introduced AI-assisted development — LLM chat, custom skills, MCP servers and coding agents — and set the team standards that keep human review gates in front of financial code.',
          'Mentored engineers across development, QA and operations, and owned complex production incidents.',
        ],
        team: 'The portals, mobile apps and individual services were built by a cross-functional team of developers, QA and operations engineers. The figures on this page describe the platform the team delivered, not individual output.',
      },
      requirements: [
        'Serve three brands from one platform while each keeps its own product surface.',
        'Keep money movement correct: every transaction has to settle, at a volume of ~20M BDT per day.',
        'Deliver high-availability financial services — wallets are used whenever customers need them.',
        'Support two web portals and six mobile apps against the same backend services.',
        'Keep regulated financial code correct and auditable as the team adopts AI tooling.',
      ],
      architecture: [
        'Channels — six Flutter apps, a React user portal and an Angular back office — sit on top of three brand platforms. The capabilities those brands have in common are implemented once as shared service modules and reused across all three, rather than copied per brand.',
        'Underneath is a set of 27 microservices across Java/Spring Boot, Node.js and Ruby on Rails, with Kafka for event-driven flows, Redis for caching and PostgreSQL for storage.',
      ],
      decisions: [
        {
          title: 'Shared service modules across brands',
          // OWNER: verify
          why: 'The three brands need the same core money-movement behaviour. Implementing it once means a rule change or a fix reaches every brand together instead of drifting between three copies.',
          tradeoff:
            'Sharing couples the brands: a change to a shared module has to be reviewed and tested with all three in mind.',
        },
        {
          title: 'Decompose by capability into independent services',
          // OWNER: verify
          why: 'Splitting the platform into 27 services lets each capability be developed, deployed and reasoned about on its own, and lets several product surfaces reuse the same backend.',
          tradeoff:
            'More services means more network boundaries, more deployments and more to observe in production.',
        },
        {
          title: 'AI-assisted delivery behind human review gates',
          why: 'LLM chat, custom skills, MCP servers and coding agents shortened code review, test scaffolding and documentation cycles. Because this is regulated financial code, agent output is paired with human review before it is accepted, keeping the code correct and auditable.',
        },
      ],
      reliability: [
        'Zero settlement mismatch while handling ~20M BDT in daily transactions.',
        'Built for high-availability financial services across three brands.',
        'Complex production incidents were owned end to end rather than handed off.',
      ],
      delivery: [
        'System design and code reviews as the default path for change.',
        'AI-assisted test scaffolding and documentation, with human verification in the loop.',
        'Mentoring across development, QA and operations.',
      ],
      outcomes: [
        'A 27-microservice platform powering LENDEN, TeleCash and MyCash.',
        '~20M BDT in daily transactions with zero settlement mismatch.',
        'Two web portals and six Flutter mobile apps on shared backend services.',
        'Shorter code review, test and documentation cycles, with human verification in the loop.',
      ],
      tradeoffs: [
        // OWNER: verify
        'A polyglot backend (Node.js, Java and Ruby on Rails) let teams use the right tool per service, at the cost of a wider operational and hiring surface.',
        'Shared modules pay off only when their boundaries are explicit and someone owns them; otherwise they become the place every change collides.',
        'AI tooling speeds up delivery most when the review standard is agreed first.',
      ],
      ownerNotes: [
        'Name one concrete mechanism that protects settlement correctness (for example idempotent transaction handling, reconciliation jobs, ledger design).',
        'Give one specific use of Kafka or Redis and why it was chosen there.',
        'Add any approved availability, latency or incident-response metrics.',
        'Describe the access-control approach for back-office users if it can be shared.',
      ],
    },
  },
  {
    slug: 'ai-assistant-multi-tenant-saas',
    domain: 'AI · Multi-tenant SaaS',
    title: 'A conversational assistant for workforce data',
    company: 'Inovace Technologies',
    period: '2026 — Present',
    status: 'in-progress',
    summary:
      'Building AI features into a multi-tenant SaaS biometric attendance platform — including an assistant that answers natural-language questions over attendance, leave and workforce data.',
    context:
      'A multi-tenant SaaS biometric attendance platform serving enterprise customers, with AI capabilities built into the product.',
    challenge:
      'Answer questions in plain language over sensitive workforce data — for many customers, each with its own data scope, behaviour and workflows.',
    role: 'Building the AI features and the assistant, integrating LLM services with platform APIs, and owning service design for attendance processing, device integration and reporting.',
    outcome:
      'In progress. Results will be published here once the features are in production.',
    stack: [
      'LLM integration',
      'Retrieval',
      'Prompt design',
      'Guardrails',
      'Evaluation',
      'REST APIs',
    ],
    diagram: 'assistant',
    caseStudy: {
      seoTitle: 'Case study: an AI assistant for a multi-tenant SaaS platform',
      seoDescription:
        'Shahriar Mahmud is building a conversational assistant over attendance, leave and workforce data for a multi-tenant SaaS platform — tenant-specific configuration, retrieval through platform APIs, guardrails and evaluation.',
      overview: [
        'Inovace Technologies runs a multi-tenant SaaS platform for biometric attendance, serving enterprise customers. I joined in September 2026 to build AI features into the product and to own service design for its core attendance services.',
        'The centrepiece is a conversational assistant: users ask about attendance, leave and workforce records in natural language instead of navigating reports.',
      ],
      contribution: {
        mine: [
          'Building AI features into the platform, including the conversational assistant.',
          'Designing tenant-specific, customisable AI features: each customer can tailor assistant behaviour, data scope and workflows.',
          'Integrating LLM services with platform APIs — retrieval over tenant data, prompt design, guardrails and response evaluation.',
          'Owning service design and architecture for attendance processing, device integration and reporting alongside the AI layer.',
        ],
        team: 'This is active work inside a product team. Outcomes will be attributed accurately once the features ship.',
      },
      requirements: [
        'Answer natural-language questions over attendance, leave and workforce data.',
        'Respect each tenant’s data scope — an answer may only draw on that customer’s data.',
        'Let each customer tailor assistant behaviour and workflows without forking the product.',
        'Keep responses grounded and safe through guardrails and evaluation.',
      ],
      architecture: [
        'A question enters with its tenant context: that customer’s assistant configuration and data scope. Relevant records are retrieved through the platform’s own APIs, assembled into a designed prompt, and sent to the model. Guardrails and response evaluation sit between the model and the user.',
        'Alongside the AI layer I own the services it depends on: device integration, attendance processing and reporting.',
      ],
      decisions: [
        {
          title: 'Retrieve through platform APIs',
          // OWNER: verify
          why: 'Going through the platform’s APIs keeps the assistant inside the same service boundaries and tenant scoping as the rest of the product, instead of giving the model a separate path to the data.',
          tradeoff:
            'The assistant can only answer what the APIs expose, so new questions can mean new endpoints.',
        },
        {
          title: 'Tenant configuration as a product feature',
          why: 'Enterprise customers differ in what they want the assistant to do and see. Making behaviour, data scope and workflows configurable per tenant keeps one product serving all of them.',
        },
        {
          title: 'Guardrails and evaluation are part of the feature',
          why: 'Workforce data is sensitive and answers have to be right. Guardrails and response evaluation are designed in alongside prompts and retrieval, not added after launch.',
        },
        {
          title: 'Own the core services next to the AI layer',
          // OWNER: verify
          why: 'Designing attendance processing, device integration and reporting together with the assistant means the data the AI depends on is shaped with that use in mind.',
        },
      ],
      security: [
        'Tenant-specific data scope is part of the assistant’s configuration.',
        'Guardrails sit between the model and the user.',
      ],
      outcomes: [
        'In progress — this section will be updated with production results.',
      ],
      tradeoffs: [
        // OWNER: verify
        'Per-tenant configuration adds flexibility for customers and testing surface for the team.',
        'Evaluation needs realistic questions per tenant, which takes deliberate effort to collect.',
      ],
      ownerNotes: [
        'Add launch status and any approved usage or quality metrics once live.',
        'Note which model providers or hosting approach can be named publicly.',
        'Describe how response evaluation is done (offline sets, human review, automated checks).',
      ],
    },
  },
  {
    slug: 'multi-tenant-commerce-saas',
    domain: 'SaaS · Sales & distribution · eCommerce',
    title: 'Multiple commerce products from a single codebase',
    company: 'RedDot Digital Limited',
    period: '2022 — 2023',
    summary:
      'Developed a multi-tenant SaaS platform for B2B sales & distribution and eCommerce order and delivery, with tenant-level customisation inside a shared Rails platform.',
    context:
      'A multi-category SaaS ecosystem covering B2B sales & distribution and eCommerce order and delivery.',
    challenge:
      'Serve several products and many tenants from one codebase, while still letting each tenant customise how the product behaves.',
    role: 'Built Ruby on Rails backend services enabling tenant-level customisation within the shared platform, and delivered a Next.js storefront and React back office against the Rails APIs.',
    outcome:
      'One shared platform architecture powering multiple products from a single codebase.',
    stack: ['Ruby on Rails', 'PostgreSQL', 'Redis', 'Next.js', 'React'],
    diagram: 'tenancy',
  },
  {
    slug: 'enterprise-workflow-automation',
    domain: 'Enterprise · Workflow automation',
    title: 'Digitising operations for a telecom operator',
    company: 'Together Initiatives (p) Limited',
    period: '2020 — 2022',
    summary:
      'Customised ProcessMaker to deliver 200+ digital workflows for Robi Axiata, replacing manual internal processes, and automated reconciliation of aggregator transaction data.',
    context:
      'Robi Axiata, a major telecom operator in Bangladesh, ran many internal business processes manually.',
    challenge:
      'Turn hundreds of manual processes into reliable digital workflows, each with its own forms, rules and system integrations.',
    role: 'Customised ProcessMaker (open-source BPM) and delivered workflows end to end — custom forms, business logic and integrations — plus reconciliation automation.',
    outcome:
      '200+ digital workflows in use, and manual verification of aggregator transaction data removed through automation.',
    stack: ['ProcessMaker', 'PHP', 'Laravel', 'Java', 'Spring Boot', 'MySQL'],
    figures: [{ value: '200+', label: 'digital workflows delivered' }],
    diagram: 'workflows',
    caseStudy: {
      seoTitle: 'Case study: 200+ digital workflows for a telecom operator',
      seoDescription:
        'How Shahriar Mahmud customised ProcessMaker to deliver 200+ digital workflows for Robi Axiata and automated reconciliation of aggregator transaction data.',
      overview: [
        'At Together Initiatives I customised ProcessMaker, an open-source business process management (BPM) platform, to automate enterprise workflows for Robi Axiata.',
        'Over two years that meant more than 200 digital workflows — each with custom forms, business logic and system integrations — replacing processes that had been handled manually.',
      ],
      contribution: {
        mine: [
          'Customised ProcessMaker and delivered workflows with custom forms, business logic and system integrations.',
          'Automated reconciliation of aggregator transaction data, removing manual verification effort.',
          'Built and maintained a Value-Added Services (VAS) portal for service management and reporting, with Active Directory and OTP login and five role configurations.',
          'Designed and deployed RPA solutions for repetitive network management tasks.',
          'Also built a Spring Boot point-of-sale application with bank reconciliation automation, and Java middleware APIs for a national secure application.',
        ],
        team: 'Delivered as part of the Together Initiatives team engaged by Robi Axiata.',
      },
      requirements: [
        'Model each internal process faithfully: its forms, approvals, rules and hand-offs.',
        'Integrate workflows with the systems the processes already depended on.',
        'Replace manual verification of transaction data with automated reconciliation.',
        'Give different user groups the right level of access in shared portals.',
      ],
      architecture: [
        'Each workflow follows the same anatomy on the BPM platform: a custom form to capture the request, business logic that encodes the rules and routing, and integrations with the surrounding systems. Building on ProcessMaker meant every workflow was configuration plus targeted custom code, rather than a bespoke application.',
      ],
      decisions: [
        {
          title: 'Build on a BPM platform',
          // OWNER: verify
          why: 'At 200+ workflows, a shared engine for routing, forms and state matters more than per-workflow flexibility. Customising ProcessMaker kept each new workflow small.',
          tradeoff:
            'Logic that does not fit the platform’s model needs careful containment so upgrades stay possible.',
        },
        {
          title: 'Automate reconciliation instead of checking by hand',
          why: 'Aggregator transaction data was being verified manually. Encoding the reconciliation rules in software removed that effort.',
        },
        {
          title: 'Role-based access in the VAS portal',
          why: 'Content providers and internal teams needed different views, so the portal uses Active Directory and OTP login with five role configurations and stage management per case.',
        },
      ],
      security: [
        'Active Directory and OTP login for the VAS portal.',
        'Five role configurations controlling what each user group can see and do.',
      ],
      outcomes: [
        '200+ digital workflows delivered, replacing manual internal processes.',
        'Manual verification of aggregator transaction data removed through automated reconciliation.',
        'A VAS portal for service management and reporting.',
        'RPA in place for repetitive network management tasks.',
      ],
      tradeoffs: [
        // OWNER: verify
        'Platform-based automation is fast to extend but ties the work to the platform’s upgrade path.',
        'The hardest part of a workflow is usually agreeing the real process, not implementing it.',
      ],
      ownerNotes: [
        'Add one example workflow (anonymised) with its steps and the time it saved, if approved.',
        'Add the scale of the reconciliation automation (records per day, frequency) if it can be shared.',
      ],
    },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const caseStudies = projects.filter((project) => project.caseStudy);
