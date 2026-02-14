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
    icon: resume,
    iconBg: '#333333',
    date: 'Jun 2003 - Feb 2006',
  },
  {
    title: 'Senior Engineer',
    company_name: 'Eloqua',
    icon: resume,
    iconBg: '#333333',
    date: 'Feb 2006 - Dec 2012',
  },
  {
    title: 'Principal Member of Technical Staff',
    company_name: 'Oracle',
    icon: resume,
    iconBg: '#333333',
    date: 'Jan 2013 - Oct 2016',
  },
  {
    title: 'Staff Developer',
    company_name: 'Nudge',
    icon: resume,
    iconBg: '#333333',
    date: 'Oct 2016 - Mar 2020',
  },
  {
    title: 'Principal Engineer',
    company_name: 'Affinity',
    icon: resume,
    iconBg: '#333333',
    date: 'Mar 2020 - Present',
  },
]

const projects = [
  {
    id: 'project-1',
    name: 'Old Website',
    description: 'This was my old website circa 2000-2010 just for nostalgia.',
    image: oldsite,
    tags: ['Nostalgia', 'HTML/CSS', 'Archive'],
    featured: false,
    demo: 'https://michaelscrivo.com/old',
  },
  {
    id: 'project-2',
    name: 'OotD',
    description:
      'Outlook on the Desktop is a Windows application that keeps your Outlook calendar on your desktop.',
    image: ootd,
    repo: 'https://github.com/mscrivo/OotD',
    tags: ['Windows', 'Productivity', '.NET'],
    featured: true,
    demo: 'https://outlookonthedesktop.com',
  },
]

export { services, technologies, experiences, projects }
