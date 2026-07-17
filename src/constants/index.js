import {
  backend,
  sre,
  devops,
  perf,
  git,
  k8s,
  docker,
  dotnet,
  postgresql,
  rubyrails,
  ruby,
  ootd,
  oldsite,
  smr,
  terraform,
  macos,
  linux,
  windows,
  resume,
} from '../assets'

export const navLinks = [
  {
    id: 'about',
    title: 'About',
  },
  {
    id: 'projects',
    title: 'Projects',
  },
  {
    id: 'work',
    title: 'Experience',
  },
  {
    id: 'contact',
    title: 'Contact',
  },
]

const services = [
  {
    title: 'Backend Developer',
    icon: backend,
  },
  {
    title: 'Devops & Tooling',
    icon: devops,
  },
  {
    title: 'Performance Optimization',
    icon: perf,
  },
  {
    title: 'SRE',
    icon: sre,
  },
]

const technologies = [
  {
    name: 'Ruby',
    icon: ruby,
  },
  {
    name: 'Rails',
    icon: rubyrails,
  },
  {
    name: 'PostgreSQL',
    icon: postgresql,
  },
  {
    name: 'Git',
    icon: git,
  },
  {
    name: 'Docker',
    icon: docker,
  },
  {
    name: 'Kubernetes',
    icon: k8s,
  },
  {
    name: '.net core',
    icon: dotnet,
  },
  {
    name: 'Terraform',
    icon: terraform,
  },
  {
    name: 'macOS',
    icon: macos,
  },
  {
    name: 'Linux',
    icon: linux,
  },
  {
    name: 'Windows',
    icon: windows,
  },
]

const experiences = [
  {
    title: 'Application Developer',
    company_name: 'InfoTRAC Solutions Inc',
    company_url: 'https://www.infotracsolutions.com/',
    icon: resume,
    iconBg: '#333333',
    date: 'Jun 2003 - Feb 2006',
    points: [
      'Built a calendaring component for the main app from scratch — both the back-end storage/logic and the complete UI — seamlessly integrating it with the rest of the app.',
    ],
  },
  {
    title: 'Senior Engineer',
    company_name: 'Eloqua',
    company_url: 'https://www.oracle.com/ca-en/cx/marketing/automation',
    icon: resume,
    iconBg: '#333333',
    date: 'Feb 2006 - Dec 2012',
    points: [
      'Delivered highly scalable, robust solutions as the platform hit scale problems driven by explosive growth.',
      'Drove early CI adoption, writing a tool from scratch to build, package, and deploy code and DB migrations across a fleet of data-center servers — still used at Oracle 10+ years later.',
      'Led a seamless migration from SVN to Git with 50+ developers committing daily, plus efforts around database object versioning and eliminating legacy VB6 code.',
    ],
  },
  {
    title: 'Principal Member of Technical Staff',
    company_name: 'Oracle',
    company_url: 'https://www.oracle.com',
    icon: resume,
    iconBg: '#333333',
    date: 'Jan 2013 - Oct 2016',
    points: [
      'Continued evolving the Eloqua product post-acquisition, focused on scale & performance, app security, and platform modernization.',
    ],
  },
  {
    title: 'Staff Developer',
    company_name: 'Nudge',
    company_url: 'https://nudge.ai',
    icon: resume,
    iconBg: '#333333',
    date: 'Oct 2016 - Mar 2020',
    points: [
      'Led a full platform shift from .NET Framework/Windows VMs to .NET Core 3.1/Linux containers, including rewrites to move off unsupported tech.',
      'Performance obsessed: tracked down excessive CPU usage and memory leaks, drastically cutting the VM count needed and stabilizing resource usage.',
      'Built and maintained the account/team-based system with billing handled through Stripe.',
    ],
  },
  {
    title: 'Principal Engineer',
    company_name: 'Affinity',
    company_url: 'https://affinity.co',
    icon: resume,
    iconBg: '#333333',
    date: 'Mar 2020 - Present',
    points: [
      'Led efforts to massively increase the performance, reliability, and scalability of the platform.',
      'Largely responsible for building and maintaining a robust, fast CI pipeline — well above industry norms on build times, test flakiness, and success/fail ratios.',
      'Own the local developer setup that runs the full stack end-to-end on a laptop with no cloud required — new engineers regularly remark on how much better it is than their previous shops.',
      'Largely responsible for keeping infrastructure components like Kubernetes clusters and databases up to date and running smoothly.',
    ],
  },
]

const projects = [
  {
    id: 'project-1',
    name: 'OotD',
    description:
      'Outlook on the Desktop is a Windows application that keeps your Outlook calendar on your desktop.',
    image: ootd,
    repo: 'https://github.com/mscrivo/OotD',
    tags: ['Windows', 'Productivity', '.NET'],
    demo: 'https://outlookonthedesktop.com',
  },
  {
    id: 'project-2',
    name: 'SMR Computer Services',
    description:
      'My side business — a local partner for custom PC builds, networks, surveillance, remote support, and software, serving homes and small businesses across the Greater Toronto Area.',
    image: smr,
    tags: ['Small Business', 'IT Services', 'GTA'],
    demo: 'https://smrcomputers.ca/',
  },
  {
    id: 'project-3',
    name: 'Old Website',
    description: 'This was my old website circa 2000-2010 just for nostalgia.',
    image: oldsite,
    tags: ['Nostalgia', 'HTML/CSS', 'Archive'],
    demo: 'https://michaelscrivo.com/old',
  },
]

export { services, technologies, experiences, projects }
