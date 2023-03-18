import emoji from 'react-easy-emoji';
import {
  EducationType,
  ExperienceType,
  FeedbackType,
  ProjectType,
  SkillsSectionType,
  SkillBarsType,
  SEODataType,
  SocialLinksType,
  GreetingsType,
} from './types/sections';

export const greetings: GreetingsType = {
  name: 'ShahriarMahmud',
  title: 'Shahriar Mahmud',
  description:
    "I'm a skilled full-stack web developer with expertise in JavaScript-based technologies like TypeScript, ReactJS, NextJS, and NodeJS, as well as Spring Boot and databases like MySQL and MongoDB. I excel in all aspects of web development and keep up with the latest trends. I'm highly adaptable, collaborative, and dedicated to delivering high-quality work.",
  resumeLink:
    'https://drive.google.com/file/d/17KhsZihJhnkjgN0YoSztDOr2idrCNDgr/view?usp=share_link',
};

export const openSource = {
  githubUserName: 'shahriarRuet14',
};

export const contact = {};

export const socialLinks: SocialLinksType = {
  url: 'https://github.com/shahriarRUET14',
  linkedin: 'https://www.linkedin.com/in/shahriar-ruet14/',
  github: 'https://github.com/shahriarRUET14',
  instagram: 'https://www.instagram.com/shahriar.ruet14/',
  facebook: 'https://web.facebook.com/shahriarmahmud269/',
};

export const skillsSection: SkillsSectionType = {
  title: 'What I do',
  subTitle: 'FULL STACK WEB DEVELOPER',
  data: [
    {
      title: 'Front End Web Development',
      lottieAnimationFile: '/lottie/skills/fullstack.json', // Path of Lottie Animation JSON File
      skills: [
        emoji(
          '⚛️ Building responsive Single-Page-Apps (SPA) in React.js,NextJS'
        ),
        emoji('💻 Design and develop the UI of websites and web applications'),
        emoji('🤝 Collaborate with stakeholders & Maintain documentation'),
        emoji(
          '🔗 Integrate APIs and libraries & 🌐 Test cross-browser compatibility'
        ),
        emoji('📱 Create responsive designs & ♿ Ensure web accessibility'),
        emoji('🚀 Optimize performance &  Provide ongoing support/maintenance'),
        emoji('📈 Stay up to date with trends'),
      ],
      softwareSkills: [
        {
          skillName: 'HTML-5',
          fontAwesomeClassName: 'vscode-icons:file-type-html',
        },
        {
          skillName: 'CSS-3',
          fontAwesomeClassName: 'vscode-icons:file-type-css',
        },
        {
          skillName: 'Reactjs',
          fontAwesomeClassName: 'vscode-icons:file-type-reactjs',
        },
        {
          skillName: 'Nextjs',
          fontAwesomeClassName: 'vscode-icons:file-type-light-next',
        },

        {
          skillName: 'Redux',
          fontAwesomeClassName: 'logos:redux',
        },
        {
          skillName: 'JavaScript',
          fontAwesomeClassName: 'skill-icons:javascript',
        },
        {
          skillName: 'TypeScript',
          fontAwesomeClassName: 'logos:typescript-icon-round',
        },
      ],
    },
    {
      title: 'Backend Web Development',
      lottieAnimationFile: '/lottie/skills/cloudinfra.json', // Path of Lottie Animation JSON File
      skills: [
        emoji(
          '🤝 Design and develop APIs to support client-side functionality'
        ),
        emoji(
          '💻 Write server-side code in a programming language such as  Java(Spring Boot), JS(Nodejs) PHP(Laravel) to support application functionality'
        ),
        emoji(
          '🗃️ Manage and maintain databases, including backups, migrations, and data integrity'
        ),
        emoji(
          '🚀 Optimize database performance and scalability through indexing, caching, and other techniques'
        ),
        emoji(
          '🔒 Implement data security and privacy measures, such as encryption and access control'
        ),
        emoji(
          '🐛 Debug and troubleshoot issues related to server-side code or database'
        ),
        emoji(
          '👥 Collaborate with front-end developers to ensure efficient data exchange between the client and server'
        ),
        emoji(
          '📝 Write and maintain technical documentation for server-side code and APIs'
        ),
      ],
      softwareSkills: [
        // ? Check README To get icon details
        {
          skillName: 'NodeJS',
          fontAwesomeClassName: 'la:node',
        },
        {
          skillName: 'Spring Boot',
          fontAwesomeClassName: 'logos:spring-icon',
        },
        {
          skillName: 'PHP',
          fontAwesomeClassName: 'logos:php',
        },
        {
          skillName: 'MySQL',
          fontAwesomeClassName: 'logos:mysql',
        },
        {
          skillName: 'MongoDB',
          fontAwesomeClassName: 'logos:mongodb',
        },
        {
          skillName: 'Github',
          fontAwesomeClassName: 'akar-icons:github-fill',
        },
        {
          skillName: 'Docker',
          fontAwesomeClassName: 'logos:docker-icon',
        },
      ],
    },
  ],
};

export const SkillBars: SkillBarsType[] = [
  {
    Stack: 'Frontend', //Insert stack or technology you have experience in
    progressPercentage: '80', //Insert relative proficiency in percentage
  },
  {
    Stack: 'Backend',
    progressPercentage: '65',
  },
  {
    Stack: 'Programming',
    progressPercentage: '70',
  },
];

export const educationInfo: EducationType[] = [
  {
    schoolName: 'Rajshahi University of Engineering Technology',
    subHeader: 'Bachelor in Computer Science and Engineering',
    duration: 'January 2015 - February 2020',
    desc: 'Reasearch on Analysis of Cryptography Algorithms for Data Security on Cloud.',
    grade: 'GPA 2.88 Out of 4.00',
    descBullets: [
      'Conduct a comprehensive analysis of encryption algorithms and develop a data security model that utilizes advanced techniques such as access control and encryption to protect against unauthorized access and analysis by third parties.',
      'Learned Programming ethics and almost every basic idea of study in CSE',
    ],
  },
];

export const experience: ExperienceType[] = [
  {
    role: 'Full Stack Developer',
    company: 'Red.Digital Limited',
    companyLogo: '/img/icons/common/RedDot.png',
    date: 'Jul 2022 –  Working',
    desc: 'I worked as frontend web developer to design web based admin dashboards for mulitple apps using Django, Bootstrap, jQuery, Chart.js and some other libraries.',
    descBullets: [
      'VAS_CP: Laravel Project for connecting Content Provider to VAS team. (My Role Full Stack Developer)',
      'SHOPOTH: FrontEnd Developer for this eCommerce sites and its all of admin pannels',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'TOGETHER INITIATIVES LTD.',
    companyLogo: '/img/icons/common/i2Gether_logo.png',
    date: 'Mar 2020 – Jun 2022',
    desc: 'My time at I2Gether was awesome. I not only learned a lot about software development but also gained valuable experience in IT culture and discipline.',
    descBullets: [
      'Joined as Process Developer at Processmaker, a BPMN solution.',
      'Worked as a FullStack developer using Springboot, MYSQL, and Reactjs for a Point Of Sale application.',
      "Developed Middleware API's for a national Secure application using Java.",
      'Worked on Bank Reconciliation as a FullStack developer using PHP, HTML, and Bootstrap.',
    ],
  },
];

export const projects: ProjectType[] = [
  {
    name: 'developer-portfolio',
    desc: 'Software Developer Portfolio Template built with react.js and next.js bootstrap that helps you showcase your work and skills as a software developer.',
    github: 'https://github.com/shahriarRUET14/portfolio-sm',
    link: 'https://portfolio-sm-ten.vercel.app/',
  },
  // {
  //   name: 'AtlasMart',
  //   desc: 'With Atlas Mart, it’s easy to find the products with the best price and ship them straight to your door.',
  //   github: 'https://github.com/1hanzla100/Django-React-Marketplace',
  // },
  // {
  //   name: 'Technota (Forum)',
  //   desc: 'Get hands-on experience in technical skills with Technota',
  //   github: 'https://github.com/1hanzla100/django-react-forum',
  // },
  // {
  //   name: 'Shopaza (Ecommerce)',
  //   desc: 'Now your reach to all your favorite entertainment and luxury items is just one touch apart',
  //   github: 'https://github.com/1hanzla100/Django-ecommerce',
  // },
];

export const feedbacks: FeedbackType[] = [
  {
    name: 'John Smith',
    feedback:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, vel illo. Eum magnam beatae ratione eos natus accusamus unde pariatur fugiat at facilis, modi molestiae? Labore odio sit eligendi. Tenetur.',
  },
  {
    name: 'John Smith',
    feedback:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, vel illo. Eum magnam beatae ratione eos natus accusamus unde pariatur fugiat at facilis, modi molestiae? Labore odio sit eligendi. Tenetur.',
  },
];

// option to hide or show the ContactUs component
export const showContactUs: boolean = true;

// See object prototype on /types/section.ts page
export const seoData: SEODataType = {
  title: 'Shahriar Mahmud',
  description:
    'A passionate Full Stack Web Developer and Blockchain Developer.',
  author: 'Shahriar Mahmud',
  image: 'https://avatars3.githubusercontent.com/u/59178380?v=4',
  url: 'https://developer-portfolio-1hanzla100.vercel.app',
  keywords: [
    'Hanzla',
    'Shahriar Mahmud',
    '@1hanzla100',
    '1hanzla100',
    'Portfolio',
    'Hanzla Portfolio ',
    'Shahriar Mahmud Portfolio',
  ],
};
