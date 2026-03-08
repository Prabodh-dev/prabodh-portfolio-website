import { PortfolioData } from '@/types/portfolio';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

const defaultData: PortfolioData = {
  hero: {
    name: 'Your Name',
    role: 'Developer & Student',
    tagline: 'Building tomorrow\'s solutions today',
    description: 'A passionate developer crafting meaningful digital experiences. Edit this content from the admin panel.',
    profileImage: '',
    buttons: [
      { label: 'View Projects', link: '#projects', type: 'primary' },
      { label: 'Download Resume', link: '#resume', type: 'secondary' },
      { label: 'GitHub', link: 'https://github.com', type: 'secondary' },
      { label: 'LinkedIn', link: 'https://linkedin.com', type: 'secondary' },
    ],
  },
  about: {
    summary: 'A dedicated student and developer passionate about creating innovative solutions. Currently pursuing studies in Computer Science with a focus on full-stack development and emerging technologies.',
    detailed: 'I am deeply interested in software engineering, artificial intelligence, and building products that make a difference. Through various projects and experiences, I have developed strong problem-solving skills and a commitment to continuous learning.',
    education: 'Bachelor of Technology in Computer Science',
    currentFocus: 'Full-stack development, AI/ML, and open-source contributions',
    personalStatement: 'I believe in the power of technology to transform lives and solve real-world problems.',
  },
  skillCategories: [
    {
      id: 'languages',
      name: 'Programming Languages',
      order: 1,
      skills: [
        { id: 'python', name: 'Python' },
        { id: 'javascript', name: 'JavaScript' },
        { id: 'typescript', name: 'TypeScript' },
        { id: 'java', name: 'Java' },
      ],
    },
    {
      id: 'frontend',
      name: 'Frontend',
      order: 2,
      skills: [
        { id: 'react', name: 'React' },
        { id: 'nextjs', name: 'Next.js' },
        { id: 'tailwind', name: 'Tailwind CSS' },
      ],
    },
    {
      id: 'backend',
      name: 'Backend',
      order: 3,
      skills: [
        { id: 'nodejs', name: 'Node.js' },
        { id: 'express', name: 'Express' },
        { id: 'django', name: 'Django' },
      ],
    },
    {
      id: 'tools',
      name: 'Tools & Platforms',
      order: 4,
      skills: [
        { id: 'git', name: 'Git' },
        { id: 'docker', name: 'Docker' },
        { id: 'vscode', name: 'VS Code' },
      ],
    },
  ],
  projects: [
    {
      id: 'project-1',
      title: 'Sample Project One',
      summary: 'A comprehensive web application demonstrating full-stack capabilities',
      description: 'This is a placeholder project. Replace it with your actual projects from the admin panel.',
      problemStatement: 'Identified the need for a streamlined solution to manage complex workflows.',
      features: [
        'User authentication and authorization',
        'Real-time data synchronization',
        'Responsive design for all devices',
        'RESTful API integration',
      ],
      techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
      role: 'Full-stack Developer',
      githubLink: 'https://github.com',
      liveLink: '',
      thumbnail: '',
      gallery: [],
      status: 'completed',
      featured: true,
      tags: ['Web Development', 'Full Stack', 'React'],
      order: 1,
    },
    {
      id: 'project-2',
      title: 'Sample Project Two',
      summary: 'An innovative solution leveraging modern technologies',
      description: 'Another placeholder project showcasing technical skills and problem-solving abilities.',
      features: [
        'Machine learning integration',
        'Data visualization dashboard',
        'Automated reporting system',
      ],
      techStack: ['Python', 'TensorFlow', 'Flask', 'PostgreSQL'],
      role: 'Backend Developer',
      githubLink: 'https://github.com',
      status: 'ongoing',
      featured: false,
      tags: ['Machine Learning', 'Python', 'AI'],
      order: 2,
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'Sample Certification',
      issuer: 'Platform Name',
      issueDate: '2024-01-15',
      credentialLink: '',
      certificateImage: '',
      description: 'Completed comprehensive training in relevant technology domain.',
      order: 1,
    },
  ],
  achievements: [
    {
      id: 'achievement-1',
      title: 'Hackathon Winner',
      subtitle: 'National Level Competition',
      date: '2024-03-20',
      description: 'Secured first place among 100+ teams for innovative solution.',
      order: 1,
    },
    {
      id: 'achievement-2',
      title: 'Open Source Contributor',
      date: '2024',
      description: 'Active contributor to multiple open-source projects with 50+ merged pull requests.',
      order: 2,
    },
  ],
  experiences: [
    {
      id: 'exp-1',
      title: 'Technical Team Lead',
      organization: 'University Tech Club',
      duration: '2023 - Present',
      description: 'Leading a team of developers in building technical solutions for campus community.',
      highlights: [
        'Managed team of 10+ developers',
        'Organized 5+ technical workshops',
        'Mentored junior members in web development',
      ],
      order: 1,
    },
    {
      id: 'exp-2',
      title: 'Software Development Intern',
      organization: 'Tech Company',
      duration: 'Summer 2024',
      description: 'Worked on enterprise-level applications and gained hands-on industry experience.',
      highlights: [
        'Developed features for production application',
        'Collaborated with cross-functional teams',
        'Participated in code reviews and agile ceremonies',
      ],
      order: 2,
    },
  ],
  resume: {
    fileName: '',
    uploadDate: '',
  },
  contact: {
    email: 'your.email@example.com',
    phone: '+1 (555) 123-4567',
    location: 'City, Country',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
    customLinks: [],
  },
  footer: {
    text: 'Built with passion and dedication',
    copyright: '© 2024 Your Name. All rights reserved.',
    quickLinks: [
      { label: 'About', link: '#about' },
      { label: 'Projects', link: '#projects' },
      { label: 'Contact', link: '#contact' },
    ],
    socialLinks: [
      { platform: 'GitHub', url: 'https://github.com' },
      { platform: 'LinkedIn', url: 'https://linkedin.com' },
    ],
  },
};

function ensureDbExists() {
  const dataDir = path.join(process.cwd(), 'data');
  
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultData, null, 2));
  }
}

export function readDb(): PortfolioData {
  ensureDbExists();
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

export function writeDb(data: PortfolioData) {
  ensureDbExists();
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export function updateSection<K extends keyof PortfolioData>(
  section: K,
  data: PortfolioData[K]
) {
  const currentData = readDb();
  currentData[section] = data;
  writeDb(currentData);
}
