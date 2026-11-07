import React, { createContext, useContext, useState, useEffect } from 'react';

// ─── FALLBACK DATA (Used while loading or if API fails) ────────────────────
// This data is used as a fallback if the API is not available

const FALLBACK_DATA = {
  // Hero
  name: 'Mohammed Alazab',
  role: 'Software Engineer | Full-Stack & Web Developer',
  typingPhrases: [
    'Software Engineer',
    'Full-Stack Developer',
    'Web Developer',
    'React & Next.js Engineer',
    'Mobile App Developer',
    'Backend Developer',
    'Problem Solver',
  ],
  heroDescription:
    'I am a Computer Science undergraduate with a focus on software engineering and full-stack development. I build modern, scalable, user-focused web and mobile applications, with hands-on experience developing business management systems, corporate websites, and cross-platform productivity applications.',
  cvUrl: '/Mohammed_Al-Azab_Resume.pdf',

  // About
  about: {
    introHeading: 'Software Engineer',
    introHeadingHighlight: 'Full-Stack Developer',
    introDescription:
      "I am Mohammed Alazab, a Bachelor of Computer Science (Honours) student at Albukhary International University, Malaysia, with a strong interest in software engineering, full-stack development, and building practical technology solutions. My experience includes corporate websites, administrative dashboards, business management systems, and cross-platform applications. I enjoy frontend and backend engineering, designing database-driven systems, integrating APIs, and improving usability, performance, and maintainability. My goal is to contribute to real-world software projects, learn from engineering teams, and build reliable solutions to meaningful problems.",
    yearsOfExperience: 2,
    projectsDone: 4,
    location: 'Malaysia (Available Remotely)',
    role: 'Software Engineer | Full-Stack & Web Developer',
    education: 'Bachelor of Computer Science (Honours), Albukhary International University',
    languages: 'Arabic (Native), English (Fluent), Turkish (Fluent), German (Beginner)',
    highlights: [
      'Full-stack web and mobile application development',
      'Corporate websites and admin dashboards',
      'Business management systems',
      'Cross-platform productivity applications',
      'Database-driven architectures and API integration',
    ],
  },

  // Social Links
  socials: [
    { id: 'github',    label: 'GitHub',    href: 'https://github.com/alazab346',                                      icon: 'FaGithub'    },
    { id: 'linkedin',  label: 'LinkedIn',  href: 'https://www.linkedin.com/in/mohammed-alazab-6bb07a311',             icon: 'FaLinkedinIn'},
    { id: 'facebook',  label: 'Facebook',  href: 'https://www.facebook.com/share/1EsqK1PCoF/',                        icon: 'FaFacebookF' },
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/alazab.era/',                             icon: 'FaInstagram' },
    { id: 'whatsapp',  label: 'WhatsApp',  href: 'https://wa.me/60173141245',                                         icon: 'FaWhatsapp'  },
  ],

  // Contact
  contact: {
    email: 'alazabmohammed00@gmail.com',
    phone: '+60 17-314 1245',
    location: 'Malaysia (Available Remotely)',
  },

  // Skills
  skillCategories: [
    {
      name: 'Programming Languages',
      color: '#00d4ff',
      emoji: '💻',
      skills: [
        { name: 'JavaScript',    level: 90, icon: 'SiJavascript',        color: '#f7df1e' },
        { name: 'TypeScript',    level: 85, icon: 'SiTypescript',        color: '#3178c6' },
        { name: 'Python',        level: 80, icon: 'FaPython',            color: '#3776ab' },
        { name: 'Java',          level: 75, icon: 'FaJava',              color: '#f89820' },
        { name: 'SQL',           level: 80, icon: 'SiPostgresql',        color: '#336791' },
        { name: 'HTML5',         level: 95, icon: 'FaHtml5',             color: '#e34f26' },
        { name: 'CSS3',          level: 90, icon: 'FaCss3Alt',           color: '#1572b6' },
      ],
    },
    {
      name: 'Web & Mobile Development',
      color: '#7c3aed',
      emoji: '🚀',
      skills: [
        { name: 'React',         level: 90, icon: 'FaReact',             color: '#61dafb' },
        { name: 'Next.js',       level: 88, icon: 'SiNextdotjs',         color: '#ffffff' },
        { name: 'React Native',  level: 85, icon: 'FaReact',             color: '#61dafb' },
        { name: 'Expo',          level: 85, icon: 'SiExpo',              color: '#000020' },
        { name: 'Node.js',       level: 82, icon: 'FaNodeJs',            color: '#339933' },
        { name: 'Express.js',    level: 80, icon: 'SiExpress',           color: '#000000' },
        { name: 'Django',        level: 75, icon: 'SiDjango',            color: '#092e20' },
        { name: 'Tailwind CSS',  level: 90, icon: 'SiTailwindcss',       color: '#06b6d4' },
        { name: 'Electron',      level: 70, icon: 'SiElectron',          color: '#47848f' },
        { name: 'REST APIs',     level: 85, icon: 'SiPostman',           color: '#ff6c37' },
      ],
    },
    {
      name: 'Databases & Backend',
      color: '#10b981',
      emoji: '🗄️',
      skills: [
        { name: 'PostgreSQL',    level: 85, icon: 'SiPostgresql',        color: '#336791' },
        { name: 'Supabase',      level: 80, icon: 'SiSupabase',          color: '#3ecf8e' },
        { name: 'Prisma',        level: 78, icon: 'SiPrisma',            color: '#2d3748' },
        { name: 'NextAuth.js',   level: 75, icon: 'SiAuth0',             color: '#000000' },
        { name: 'JWT',           level: 80, icon: 'SiJsonwebtokens',     color: '#000000' },
      ],
    },
    {
      name: 'Development Tools & Cloud',
      color: '#f59e0b',
      emoji: '🛠️',
      skills: [
        { name: 'Git',           level: 88, icon: 'FaGithub',            color: '#f54d27' },
        { name: 'GitHub',        level: 88, icon: 'FaGithub',            color: '#181717' },
        { name: 'VS Code',       level: 95, icon: 'SiVisualstudiocode',  color: '#007acc' },
        { name: 'Android Studio',level: 70, icon: 'SiAndroidstudio',     color: '#3ddc84' },
        { name: 'Postman',       level: 82, icon: 'SiPostman',           color: '#ff6c37' },
        { name: 'Figma',         level: 75, icon: 'FaFigma',             color: '#f24e1e' },
        { name: 'Vercel',        level: 85, icon: 'SiVercel',            color: '#000000' },
        { name: 'Netlify',       level: 80, icon: 'SiNetlify',           color: '#00c7b7' },
        { name: 'Cloudflare',    level: 75, icon: 'SiCloudflare',        color: '#f38020' },
        { name: 'Zustand',       level: 78, icon: 'FaReact',             color: '#61dafb' },
        { name: 'TanStack Query',level: 75, icon: 'SiReactquery',        color: '#ff4154' },
      ],
    },
  ],

  // Projects
  projects: [
    {
      id: 1,
      title: 'Al Matar Car Wash Management System',
      description:
        'Developed a web-based car wash management system to streamline daily operations, customer information, service packages, subscriptions, and administrative workflows. The application combines an operational management interface with a customer-facing website and centralized data management.',
      gradientStart: '#00d4ff',
      gradientEnd: '#7c3aed',
      accentColor: '#00d4ff',
      tags: 'TypeScript, Next.js, React, Tailwind CSS, Supabase, PostgreSQL, Vercel',
      githubUrl: '',
      liveUrl: '',
      image: '/Almatar_car_wash_photo.png',
      emoji: '🚗',
      isFeatured: true,
    },
    {
      id: 2,
      title: 'My Planner: Cross-Platform Productivity App',
      description:
        'Developed a cross-platform productivity application designed to organize tasks, manage schedules, and improve daily planning. The architecture uses a shared backend and database to support mobile, desktop, and web experiences with React Native, Expo, Electron, and a REST API backend.',
      gradientStart: '#7c3aed',
      gradientEnd: '#3b82f6',
      accentColor: '#7c3aed',
      tags: 'React Native, Expo, Node.js, Express.js, PostgreSQL, Electron, JWT, Zustand, TanStack Query',
      githubUrl: 'https://github.com/alazab346/my-planner-app',
      liveUrl: '',
      image: '/my_planner_app_photo.png',
      emoji: '📋',
      isFeatured: true,
    },
    {
      id: 3,
      title: 'ProEx Nova: Corporate Website & Admin Dashboard',
      description:
        'Developed and maintained a professional corporate website and administrative dashboard for ProEx Nova, supporting online business presence, content administration, and site operations. Includes frontend/backend integration, database, authentication, deployment, and ongoing enhancements.',
      gradientStart: '#f59e0b',
      gradientEnd: '#ef4444',
      accentColor: '#f59e0b',
      tags: 'JavaScript, Next.js, React, PostgreSQL, Prisma, NextAuth.js, Netlify, Cloudflare',
      githubUrl: '',
      liveUrl: 'http://proexnova.com/',
      image: '/proex_company_photo.png',
      emoji: '🏢',
      isFeatured: true,
    },
    {
      id: 4,
      title: 'Craft Hub: Manufacturing Management System',
      description:
        'A software project focused on supporting manufacturing-related management processes through a centralized application. Designed to streamline operations and improve workflow efficiency.',
      gradientStart: '#10b981',
      gradientEnd: '#059669',
      accentColor: '#10b981',
      tags: 'Management System, Business Operations',
      githubUrl: 'https://github.com/alazab346/Craft_HubWeb',
      liveUrl: '',
      image: '/craft_hub_photo.png',
      emoji: '🏭',
      isFeatured: false,
    },
  ],
};

// Transform database data to match frontend format
const transformPortfolioData = (dbData) => {
  if (!dbData) return FALLBACK_DATA;

  return {
    // Hero
    name: dbData.profile?.name || FALLBACK_DATA.name,
    role: dbData.profile?.title || FALLBACK_DATA.role,
    typingPhrases: FALLBACK_DATA.typingPhrases, // Keep static for now
    heroDescription: dbData.profile?.bio || FALLBACK_DATA.heroDescription,
    cvUrl: dbData.profile?.resume || FALLBACK_DATA.cvUrl,

    // Profile
    profile: {
      name: dbData.profile?.name || FALLBACK_DATA.name,
      title: dbData.profile?.title || FALLBACK_DATA.role,
      profileImage: dbData.profile?.profileImage || null,
      email: dbData.profile?.email || FALLBACK_DATA.contact.email,
    },

    // About
    about: {
      introHeading: dbData.profile?.title || FALLBACK_DATA.about.introHeading,
      introHeadingHighlight: 'Creative Problem Solver',
      introDescription: dbData.about?.description || FALLBACK_DATA.about.introDescription,
      yearsOfExperience: dbData.experience?.filter(exp => exp.current).length || 1,
      projectsDone: dbData.projects?.length || 0,
      location: dbData.profile?.location || FALLBACK_DATA.about.location,
      role: dbData.profile?.title || FALLBACK_DATA.about.role,
      education: dbData.education?.[0]?.degree || FALLBACK_DATA.about.education,
      languages: FALLBACK_DATA.about.languages,
      highlights: dbData.about?.highlights || FALLBACK_DATA.about.highlights,
    },

    // Social Links - Keep static for now
    socials: FALLBACK_DATA.socials,

    // Contact
    contact: {
      email: dbData.contact?.email || FALLBACK_DATA.contact.email,
      phone: dbData.contact?.phone || FALLBACK_DATA.contact.phone,
      location: dbData.profile?.location || FALLBACK_DATA.contact.location,
    },

    // Skills - Transform from database format
    // Prioritize techStack over skills if it exists
    skillCategories: (() => {
      // If techStack exists and has data, use it
      if (dbData.techStack?.length > 0) {
        // Group techStack by category
        const grouped = dbData.techStack.reduce((acc, tech) => {
          // Trim whitespace from category name to avoid duplicates
          const category = (tech.category || 'Tools').trim();
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push({
            name: tech.name,
            level: 85,
            icon: tech.icon || 'FaCode',
            color: '#00d4ff'
          });
          return acc;
        }, {});

        // Map to category format with colors
        const categoryConfig = {
          'Frontend': { color: '#00d4ff', emoji: '🎨' },
          'Backend': { color: '#7c3aed', emoji: '⚙️' },
          'Tools & Cloud': { color: '#10b981', emoji: '🛠️' },
          'Database': { color: '#f59e0b', emoji: '🗄️' },
          'Cloud': { color: '#10b981', emoji: '☁️' },
          'Tools': { color: '#10b981', emoji: '🛠️' },
        };

        return Object.entries(grouped).map(([category, skills], index) => {
          const config = categoryConfig[category] || { color: '#00d4ff', emoji: '🎨' };
          return {
            id: `${category}-${index}`,
            name: category,
            color: config.color,
            emoji: config.emoji,
            skills: skills.map(skill => ({
              ...skill,
              color: config.color
            }))
          };
        });
      }
      
      // Fallback to skills field if techStack is empty
      if (dbData.skills?.length > 0) {
        return dbData.skills.map((skillCategory, index) => {
          const categoryConfig = {
            'Frontend': { color: '#00d4ff', emoji: '🎨' },
            'Backend': { color: '#7c3aed', emoji: '⚙️' },
            'Tools & Cloud': { color: '#10b981', emoji: '🛠️' },
            'Database': { color: '#f59e0b', emoji: '🗄️' },
            'Tools': { color: '#10b981', emoji: '🛠️' },
          };
          
          const config = categoryConfig[skillCategory.category] || { color: '#00d4ff', emoji: '🎨' };
          
          return {
            id: `${skillCategory.category}-${index}`,
            name: skillCategory.category,
            color: config.color,
            emoji: config.emoji,
            skills: skillCategory.items?.map(item => ({
              name: item,
              level: 85,
              icon: 'FaCode',
              color: config.color
            })) || []
          };
        });
      }
      
      // Final fallback to static data
      return FALLBACK_DATA.skillCategories;
    })(),

    // Projects - Transform from database format
    projects: dbData.projects?.map((project, index) => ({
      id: project._id || index + 1,
      title: project.title,
      description: project.description,
      gradientStart: '#00d4ff',
      gradientEnd: '#7c3aed',
      accentColor: project.featured ? '#00d4ff' : '#7c3aed',
      tags: project.technologies?.join(', ') || '',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      image: project.image || null,
      emoji: '🚀',
      isFeatured: project.featured || false,
    })) || FALLBACK_DATA.projects,
  };
};

// Context
const PortfolioContext = createContext(null);

export const usePortfolioData = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState(FALLBACK_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Since there's no backend, we just use the fallback data
  useEffect(() => {
    setLoading(false);
    setPortfolioData(FALLBACK_DATA);
  }, []);

  const refreshPortfolio = async () => {
    // No backend, so just return the fallback data
    return FALLBACK_DATA;
  };

  return (
    <PortfolioContext.Provider value={{ 
      portfolioData, 
      loading, 
      error,
      refreshPortfolio 
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

// Export for backward compatibility
export const PORTFOLIO_DATA = FALLBACK_DATA;
