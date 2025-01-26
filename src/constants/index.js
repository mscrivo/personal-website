import {
  backend,
  sre,
  devops,
  perf,
  git,
  docker,
  postgresql,
  rubyrails,
  ootd,
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
    name: 'Rails',
    icon: rubyrails,
  },
  {
    name: 'postgresql',
    icon: postgresql,
  },
  {
    name: 'git',
    icon: git,
  },
  {
    name: 'docker',
    icon: docker,
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
    title: 'Senior Developer',
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
    name: 'OotD',
    description:
      'Outlook on the Desktop is a Windows application that keeps your Outlook calendar on your desktop.',
    image: ootd,
    repo: 'https://github.com/mscrivo/OotD',
    demo: 'https://outlookonthedesktop.com',
  },
]

export { services, technologies, experiences, projects }
