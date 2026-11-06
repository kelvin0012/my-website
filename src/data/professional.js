import optusLogo from '../assets/optusLogo.png';
import wsuLogo from '../assets/wsuLogo.jpg';
import unihackIcon from '../assets/unihack2024Icon.png';
import accentureLogo from '../assets/accentureLogo.jpg';
import websiteIcon from '../assets/websiteIcon.png';

import gcpIcon from '../assets/googlecloudplatformIcon.png';
import pythonIcon from '../assets/pythonIcon.png';
import javaIcon from '../assets/javaIcon.png';
import reactIcon from '../assets/reactIcon.png';
import jsIcon from '../assets/jsIcon.png';
import nodeIcon from '../assets/nodejs.png';
import htmlIcon from '../assets/htmlIcon.png';
import cssIcon from '../assets/cssIcon.png';
import mysqlIcon from '../assets/mysqlIcon.png';
import dynamoIcon from '../assets/aws-dynamodb.svg';
import sqlIcon from '../assets/sqlIcon.png';
import risersIcon from '../assets/88risersIcon.svg';

// Source of truth: LinkedIn profile (exported Nov 2026).

export const profile = {
  name: 'Kelvin Gian',
  role: 'Graduate Software Engineer',
  company: 'Optus',
  headline: 'Graduate Software Engineer @ Optus · UNIHACK Organiser',
  location: 'Sydney, NSW, Australia',
  roles: ['Platform Engineer', 'iOS Developer', 'AI Engineer', 'UNIHACK Organiser'],
  blurb:
    "Graduate engineer at Optus, rotating across the stack: AI search and conversational agents, the Optus iOS app, and now cloud platform engineering with GitOps, autoscaling and IAM hardening.",
  links: {
    linkedin: 'https://www.linkedin.com/in/kelvin-gian-228887263/',
    github: 'https://github.com/kelvin0012',
    email: 'kelvingian.business@gmail.com',
  },
};

/**
 * Companies & education. Newest first.
 * An entry with `rotations` renders as a tabbed card (one tab per rotation).
 */
export const experience = [
  {
    org: 'Optus',
    title: 'Graduate Software Engineer',
    date: 'Feb 2025 — Present',
    place: 'Macquarie Park, NSW',
    logo: optusLogo,
    current: true,
    rotations: [
      {
        name: 'Platform Engineering',
        date: 'Aug 2026 — Present',
        summary: 'Cloud orchestration, GitOps and platform security in a pull-based Agile team.',
        highlights: [
          ['Cost optimisation', 'Implemented off-hours scaling with KRO and KEDA, writing CEL logic to scale non-production workloads to zero so Karpenter can reclaim idle nodes.'],
          ['Security hardening', 'Led the remediation of legacy IAM roles, designing least-privilege AWS IAM roles with explicit permission boundaries.'],
          ['GitOps', 'Migrated critical infrastructure manifests to a centralised GitOps config registry, retiring legacy ArgoCD applications across dev and prod.'],
        ],
        tech: ['AWS IAM', 'Kubernetes', 'KEDA', 'KRO', 'Karpenter', 'CEL', 'ArgoCD', 'GitOps'],
      },
      {
        name: 'Mobile iOS Engineering',
        date: 'Oct 2025 — Jul 2026',
        summary: 'Native mobile development in a fast-paced consumer tech environment.',
        highlights: [
          ['App development', 'Built and maintained features for the Optus iOS app in Swift, integrating backend APIs for millions of customers.'],
          ['Agile engineering', 'Worked closely with design and QA to ship polished mobile interfaces through rigorous code review and CI/CD.'],
        ],
        tech: ['Swift', 'iOS', 'REST APIs', 'CI/CD'],
      },
      {
        name: 'AI Engineering',
        date: 'Feb 2025 — Oct 2025',
        summary: 'Core AI features spanning web search, intelligent provisioning workflows and conversational AI.',
        highlights: [
          ['AI search', 'Engineered AI-driven search for the Optus website and My Optus app, building scalable backend services with Java, Spring Boot, Python and GCP.'],
          ['Mobile provisioning', 'Developed provisioning workflows with Kotlin and Docker, and orchestrated LLM system prompts in GCP to automate customer-facing processes.'],
          ['Conversational agents', 'Built conversational AI playbooks and intelligent routing/roaming agents that interpret user intent and streamline customer interactions.'],
        ],
        award: 'Optus × GitHub Copilot Hack-AI-thon Finalist',
        tech: ['Java', 'Spring Boot', 'Python', 'Kotlin', 'Docker', 'GCP', 'Conversational AI', 'LLMs'],
      },
    ],
  },
  {
    org: 'Western Sydney University',
    title: 'Software Engineer Intern',
    date: 'Mar 2024 — Nov 2024',
    place: 'Parramatta, NSW',
    logo: wsuLogo,
    summary: 'Full-stack developer on the Workplace Management Information System project.',
    highlights: [
      ['Front-end', 'Built features with React, TailwindCSS and TanStack Query.'],
      ['Back-end', 'Built back-end services with Node.js, Express.js and MySQL.'],
      ['Agile Scrum', 'Ran sprints and task tracking in Jira as part of a Scrum team.'],
    ],
    tech: ['React', 'TailwindCSS', 'TanStack Query', 'Node.js', 'Express.js', 'MySQL', 'Jira'],
  },
  {
    org: 'Western Sydney University',
    title: "Bachelor's degree, Computer Science",
    date: '2020 — 2023',
    place: 'Sydney, NSW',
    logo: wsuLogo,
    summary: "Computer Science with an Artificial Intelligence major. Named to the Dean's Merit List in 2022 and 2023.",
    tech: ["Dean's Merit List 2022", "Dean's Merit List 2023"],
    education: true,
  },
];

/** Projects, hackathons & bootcamps. */
export const projects = [
  {
    name: '88 Risers',
    event: 'Co-founder · Live site',
    date: 'Oct 2026 — Present',
    logo: risersIcon,
    summary: 'Website for a social arm wrestling club in Rhodes, Sydney. Members register for a permanent Riser ID, every match is logged to a public database, and tournament winners earn a champion card.',
    tech: ['Next.js', 'React', 'Vercel'],
    accent: '#d5b67a',
    href: 'https://www.88risers.com/',
  },
  {
    name: 'AI Slack Summariser',
    event: 'Atlassian × UNIHACK',
    date: 'Mar 2024',
    logo: unihackIcon,
    summary: 'A Slackbot that uses AI to summarise conversations from the past N days, hours or messages, then shows the digest on a companion website.',
    tech: ['React', 'Python', 'Figma'],
    accent: '#7c5cff',
  },
  {
    name: 'TripMama',
    event: 'Accenture Tech Bootcamp',
    date: 'Feb 2024',
    logo: accentureLogo,
    summary: 'An AI-powered travel planning assistant that builds personalised itineraries and travel times for each user’s trip.',
    tech: ['Python', 'AWS DynamoDB', 'React'],
    accent: '#a100ff',
  },
  {
    name: 'This Portfolio',
    event: 'Side project',
    date: 'Feb 2024 — Present',
    logo: websiteIcon,
    summary: 'Two sites in one: a professional portfolio and a gaming-inspired playground, built with hand-made animations and no UI framework.',
    tech: ['React', 'Vite', 'Canvas', 'CSS'],
    accent: '#00e0b8',
    href: 'https://github.com/kelvin0012/my-website',
  },
];

/** Awards & community. Shown as a strip under projects. */
export const recognition = [
  { label: 'Finalist', name: 'Optus × GitHub Copilot Hack-AI-thon', year: 'Optus' },
  { label: 'Organiser', name: 'UNIHACK', year: 'Now' },
  { label: 'Award', name: "Dean's Merit List", year: '2022 & 2023' },
];

export const certifications = [
  { name: 'Amazon Web Services Cloud Practitioner', issuer: 'Amazon Web Services', mark: 'AWS' },
  { name: 'Building a Virtual Agent with Dialogflow CX', issuer: 'Google Cloud', mark: 'GC' },
  { name: 'Google Cloud Best of Next', issuer: 'Google Cloud', mark: 'GC' },
  { name: 'Certificate of Completion: Sunflower', issuer: 'Sunflower', mark: '✿' },
  { name: 'Working with Children Check', issuer: 'NSW', mark: 'WWC' },
];

/** Skills with an icon get an image tile; the rest render as a monogram tile. */
export const skills = [
  { name: 'Java', icon: javaIcon },
  { name: 'Kotlin', mono: 'Kt', color: '#7f52ff' },
  { name: 'Swift', mono: 'Sw', color: '#f05138' },
  { name: 'Python', icon: pythonIcon },
  { name: 'Google Cloud', icon: gcpIcon },
  { name: 'AWS', mono: 'AWS', color: '#ff9900' },
  { name: 'GitLab', mono: 'GL', color: '#fc6d26' },
  { name: 'Docker', mono: 'Dk', color: '#2496ed' },
  { name: 'Kubernetes', mono: 'K8s', color: '#326ce5' },
  { name: 'React', icon: reactIcon },
  { name: 'JavaScript', icon: jsIcon },
  { name: 'Node.js', icon: nodeIcon },
  { name: 'MySQL', icon: mysqlIcon },
  { name: 'SQL', icon: sqlIcon },
  { name: 'DynamoDB', icon: dynamoIcon },
  { name: 'HTML', icon: htmlIcon },
  { name: 'CSS', icon: cssIcon },
];

export const extraTech = [
  'Spring Boot', 'BigQuery', 'Dialogflow CX', 'ArgoCD', 'KEDA', 'Karpenter', 'KRO', 'AWS IAM',
  'GitOps', 'CI/CD', 'TailwindCSS', 'TanStack Query', 'Express.js', 'Jira', 'Bamboo', 'Figma',
];
