import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { Link } from 'react-scroll';
import { TypeAnimation } from 'react-type-animation';
import { useEffect, useState } from 'react';
import { HiArrowDownTray, HiArrowRight, HiArrowTopRightOnSquare } from 'react-icons/hi2';
import { FaGithub, FaLinkedinIn, FaFacebookF, FaInstagram, FaWhatsapp, FaReact, FaNodeJs } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiPostgresql, SiTailwindcss } from 'react-icons/si';
import { usePortfolioData } from '../context/PortfolioContext';

const socialIcons = { FaGithub, FaLinkedinIn, FaFacebookF, FaInstagram, FaWhatsapp };

const dailyStack = [
  { name: 'React', Icon: FaReact, color: '#22a6cf' },
  { name: 'Next.js', Icon: SiNextdotjs, color: 'rgb(var(--ink))' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3b82f6' },
  { name: 'Node.js', Icon: FaNodeJs, color: '#5fa04e' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4f87c4' },
  { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#0ea5e9' },
];

const textContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
const textItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// Counter namespace — unique to this portfolio
const COUNTER_NS = 'mohammed-alazab-portfolio';
const COUNTER_KEY = 'visitors';

function useVisitorCount() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    // Only count once per browser session so page refreshes don't spam the counter
    const alreadyCounted = sessionStorage.getItem('visit_counted');

    const fetchAndIncrement = async () => {
      try {
        const endpoint = alreadyCounted
          ? `https://api.counterapi.dev/v1/${COUNTER_NS}/${COUNTER_KEY}`
          : `https://api.counterapi.dev/v1/${COUNTER_NS}/${COUNTER_KEY}/up`;

        const res = await fetch(endpoint);
        const data = await res.json();
        setCount(data.count ?? data.value ?? null);

        if (!alreadyCounted) sessionStorage.setItem('visit_counted', 'true');
      } catch {
        // Silently fail — don't break the page if the counter API is down
      }
    };

    fetchAndIncrement();
  }, []);

  return count;
}

/* ───────────────────────── Laptop centerpiece ───────────────────────── */

function CodeLine({ n, children }) {
  return (
    <div className="hero-code-line">
      <span className="hero-code-ln">{n}</span>
      <span>{children}</span>
    </div>
  );
}

function Laptop({ name, role, location }) {
  return (
    <div className="hero-laptop">
      <div className="hero-laptop-lid">
        <div className="hero-laptop-screen">
          {/* Window chrome */}
          <div className="hero-window-bar">
            <span className="hero-dot" style={{ background: '#ff5f57' }} />
            <span className="hero-dot" style={{ background: '#febc2e' }} />
            <span className="hero-dot" style={{ background: '#28c840' }} />
            <span className="hero-window-url">azab-portfolio.vercel.app</span>
          </div>

          <div className="hero-screen-body">
            {/* Profile photo pane */}
            <figure className="hero-photo-pane">
              <img
                src="/Al-Azab-picture.jpg"
                alt={`${name} – ${role}`}
                className="hero-photo"
                width="960"
                height="1280"
                fetchpriority="high"
              />
              <figcaption className="hero-photo-caption">
                <span className="hero-live-dot" aria-hidden="true" />
                <span className="hero-caption-text">Open to opportunities</span>
              </figcaption>
            </figure>

            {/* Code pane — built from real portfolio data */}
            <div className="hero-code-pane" aria-hidden="true">
              <div className="hero-code-tab">developer.ts</div>
              <div className="hero-code">
                <CodeLine n={1}><span className="tk-key">const</span> <span className="tk-var">developer</span> = {'{'}</CodeLine>
                <CodeLine n={2}>&nbsp;&nbsp;name: <span className="tk-str">"{name}"</span>,</CodeLine>
                <CodeLine n={3}>&nbsp;&nbsp;role: <span className="tk-str">"{role}"</span>,</CodeLine>
                <CodeLine n={4}>&nbsp;&nbsp;based: <span className="tk-str">"{location}"</span>,</CodeLine>
                <CodeLine n={5}>&nbsp;&nbsp;stack: [<span className="tk-str">"React"</span>, <span className="tk-str">"Next.js"</span>,</CodeLine>
                <CodeLine n={6}>&nbsp;&nbsp;&nbsp;&nbsp;<span className="tk-str">"Node.js"</span>, <span className="tk-str">"PostgreSQL"</span>],</CodeLine>
                <CodeLine n={7}>&nbsp;&nbsp;focus: <span className="tk-str">"web &amp; mobile"</span>,</CodeLine>
                <CodeLine n={8}>{'}'};</CodeLine>
                <CodeLine n={9}>&nbsp;</CodeLine>
                <CodeLine n={10}><span className="tk-key">export default</span> <span className="tk-var">developer</span>;<span className="hero-caret" /></CodeLine>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-laptop-base">
        <span className="hero-laptop-notch" />
      </div>
      <div className="hero-laptop-shadow" aria-hidden="true" />
    </div>
  );
}

/* ───────────────────────── Floating panels ───────────────────────── */

function TerminalCard({ className = '' }) {
  return (
    <div className={`hero-panel hero-terminal ${className}`}>
      <div className="hero-panel-head">
        <span className="hero-mono hero-dim">~/portfolio</span>
        <span className="hero-mono hero-branch">main</span>
      </div>
      <div className="hero-mono hero-terminal-body">
        <p><span className="hero-prompt">$</span> <span className="hero-text">npm run build</span></p>
        <p className="hero-ok">✓ built successfully</p>
        <p><span className="hero-prompt">$</span> <span className="hero-text">git push origin main</span></p>
        <p className="hero-ok">✓ deployed to Vercel</p>
      </div>
    </div>
  );
}

function ProjectCard({ project, className = '' }) {
  if (!project) return null;
  const [title, subtitle] = project.title.split(':').map((s) => s.trim());
  const tags = project.tags.split(',').map((t) => t.trim()).slice(0, 3);
  const href = project.liveUrl || project.githubUrl;

  return (
    <div className={`hero-panel hero-project ${className}`}>
      <div className="hero-panel-head">
        <span className="hero-eyebrow">Featured project</span>
        {project.liveUrl && <span className="hero-live-pill">Live</span>}
      </div>
      <p className="hero-project-title">{title}</p>
      {subtitle && <p className="hero-project-sub">{subtitle}</p>}
      <div className="hero-tags">
        {tags.map((t) => <span key={t} className="hero-tag">{t}</span>)}
      </div>
      {href && (
        <a href={href} target="_blank" rel="noopener noreferrer" className="hero-project-link">
          Visit project <HiArrowTopRightOnSquare className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

function StackCard({ className = '' }) {
  return (
    <div className={`hero-panel hero-stack ${className}`}>
      <span className="hero-eyebrow">Daily stack</span>
      <ul className="hero-stack-grid">
        {dailyStack.map(({ name, Icon, color }) => (
          <li key={name} className="hero-stack-item" title={name}>
            <Icon className="w-5 h-5" style={{ color }} aria-hidden="true" />
            <span className="sr-only">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

export default function Hero() {
  const { portfolioData, loading } = usePortfolioData();
  const visitorCount = useVisitorCount();
  const reduceMotion = useReducedMotion();

  // Subtle pointer-driven parallax for the laptop scene (desktop pointers only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.6 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [5, -5]);
  const panelX = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const panelY = useTransform(sy, [-0.5, 0.5], [-8, 8]);

  const handlePointerMove = (e) => {
    if (reduceMotion || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const resetPointer = () => { mx.set(0); my.set(0); };

  if (loading) {
    return (
      <section id="home" className="hero relative min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  const typingSequence = portfolioData.typingPhrases.flatMap((p) => [p, 2000]);
  const shortRole = (portfolioData.role || '').split('|')[0].trim();
  const roleLine = (portfolioData.role || '').replace('|', '·');
  const location = (portfolioData.contact?.location || '').split('(')[0].trim();
  const techCount = portfolioData.skillCategories.reduce((n, c) => n + c.skills.length, 0);
  const featured = portfolioData.projects.find((p) => p.liveUrl) || portfolioData.projects[0];
  const [firstName, ...restName] = portfolioData.name.split(' ');

  const stats = [
    { value: `${portfolioData.about.yearsOfExperience}+`, label: 'Years building' },
    { value: `${portfolioData.about.projectsDone}`, label: 'Featured projects' },
    { value: `${techCount}+`, label: 'Technologies' },
    { value: visitorCount !== null ? visitorCount.toLocaleString() : '—', label: 'Portfolio views' },
  ];

  const parallax = reduceMotion ? {} : { x: panelX, y: panelY };

  return (
    <section id="home" className="hero relative isolate overflow-hidden" aria-label="Introduction">
      {/* Background layers */}
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="container-custom relative z-10">
        <div className="hero-inner">
        <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)] gap-14 lg:gap-8 xl:gap-12 items-center">
          {/* ── Copy ── */}
          <motion.div
            className="text-center lg:text-left"
            variants={textContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={textItem} className="flex justify-center lg:justify-start">
              <span className="hero-chip">
                <span className="hero-live-dot" aria-hidden="true" />
                <span className="hero-chip-text">Available for work{location ? ` · ${location}` : ''}</span>
              </span>
            </motion.div>

            <motion.h1 variants={textItem} className="hero-title font-display">
              <span className="hero-title-first">{firstName}</span>{' '}
              <span className="hero-title-last text-gradient">{restName.join(' ')}</span>
            </motion.h1>

            <motion.p variants={textItem} className="hero-role">{roleLine}</motion.p>

            <motion.div variants={textItem} className="hero-whoami hero-mono" aria-hidden="true">
              <span className="hero-prompt">~$</span>
              <span className="hero-dim">whoami</span>
              <span className="hero-arrow">→</span>
              <TypeAnimation
                sequence={typingSequence}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="hero-typed"
              />
            </motion.div>

            <motion.p variants={textItem} className="hero-lead">
              {portfolioData.heroDescription}
            </motion.p>

            <motion.div variants={textItem} className="hero-btn-row">
              <Link to="projects" smooth duration={600} offset={-80} href="#projects" className="btn-primary" id="hero-view-work">
                View my work
                <HiArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href={portfolioData.cvUrl || '#'}
                download
                id="hero-download-cv"
                className="btn-secondary"
                onClick={(e) => {
                  if (!portfolioData.cvUrl) {
                    e.preventDefault();
                    alert('CV not available');
                  }
                }}
              >
                <HiArrowDownTray className="w-4 h-4" aria-hidden="true" />
                Download CV
              </a>
              <Link to="contact" smooth duration={600} offset={-80} href="#contact" className="btn-link" id="hero-hire-me">
                Let’s talk
              </Link>
            </motion.div>

            <motion.div variants={textItem} className="hero-socials">
              {portfolioData.socials.map(({ id, label, href, icon }) => {
                const Icon = socialIcons[icon];
                return (
                  <a
                    key={id}
                    id={`hero-social-${id}`}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="hero-social"
                  >
                    {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* ── Laptop scene ── */}
          <motion.div
            className="hero-scene"
            onPointerMove={handlePointerMove}
            onPointerLeave={resetPointer}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-horizon" aria-hidden="true" />

            <motion.div
              className="hero-laptop-wrap"
              style={reduceMotion ? undefined : { rotateX, rotateY }}
            >
              <Laptop name={portfolioData.name} role={shortRole} location={location} />
            </motion.div>

            {/* Floating panels (large screens) */}
            <motion.div className="hero-float-slot hero-slot-terminal" style={parallax}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.6 }}>
              <TerminalCard className="hero-float hero-float-a" />
            </motion.div>
            <motion.div className="hero-float-slot hero-slot-project" style={parallax}
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 0.6 }}>
              <ProjectCard project={featured} className="hero-float hero-float-b" />
            </motion.div>
            <motion.div className="hero-float-slot hero-slot-stack" style={parallax}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1, duration: 0.6 }}>
              <StackCard className="hero-float hero-float-c" />
            </motion.div>
          </motion.div>

          {/* Panels as a static row on smaller screens */}
          <div className="hero-panels-mobile">
            <ProjectCard project={featured} />
            <TerminalCard className="hidden sm:block" />
          </div>
        </div>

        {/* ── Stats ── */}
        <motion.dl
          className="hero-stats"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="hero-stat">
              <dt className="hero-stat-label">{label}</dt>
              <dd className="hero-stat-value font-display">{value}</dd>
            </div>
          ))}
        </motion.dl>
        </div>
      </div>
    </section>
  );
}
