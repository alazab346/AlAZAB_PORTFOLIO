import { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePortfolioData } from '../context/PortfolioContext';
import { useTheme } from '../theme';
import {
  FaReact, FaHtml5, FaCss3Alt, FaPython, FaNodeJs, FaJava, FaFigma, FaCode,
  FaDatabase, FaLayerGroup,
} from 'react-icons/fa';
import {
  SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiDjango, SiPostman,
  SiPostgresql, SiVercel, SiExpo, SiExpress, SiElectron, SiSupabase, SiPrisma,
  SiAuth0, SiJsonwebtokens, SiGit, SiGithub, SiAndroidstudio, SiNetlify,
  SiCloudflare, SiReactquery,
} from 'react-icons/si';

const iconMap = {
  FaReact, FaHtml5, FaCss3Alt, FaPython, FaNodeJs, FaJava, FaFigma, FaCode,
  FaDatabase, FaLayerGroup,
  SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiDjango, SiPostman,
  SiPostgresql, SiVercel, SiExpo, SiExpress, SiElectron, SiSupabase, SiPrisma,
  SiAuth0, SiJsonwebtokens, SiGit, SiGithub, SiAndroidstudio, SiNetlify,
  SiCloudflare, SiReactquery,
  SiVisualstudiocode: FaCode,
};

// Brand colours are tuned per theme so every logo keeps enough contrast:
// near-black logos are lightened on dark cards, pale ones (JS yellow, Vercel white) are darkened on light cards.
function readableColor(hex, isDark) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
  if (!m) return isDark ? '#e2e8f0' : '#334155';
  const n = parseInt(m[1], 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  const perceived = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const mixTo = (target, amt) => (c) => Math.round(c + (target - c) * amt);

  if (isDark) {
    if (perceived < 0.15) return '#e2e8f0';
    if (perceived < 0.42) {
      const f = mixTo(255, 0.45);
      return `rgb(${f(r)}, ${f(g)}, ${f(b)})`;
    }
    return hex;
  }
  if (perceived > 0.85) return '#334155';
  if (perceived > 0.6) {
    const f = mixTo(0, 0.42);
    return `rgb(${f(r)}, ${f(g)}, ${f(b)})`;
  }
  return hex;
}

// Gentle sine offset (px) for the wave; scaled down on small screens via CSS.
const waveOffset = (index) => Math.round(Math.sin((index * 2 * Math.PI) / 5) * 10);

function Counter({ value }) {
  const ref = useRef(null);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 1500, bounce: 0 });
  const display = useTransform(spring, (v) => Math.round(v));
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) motionVal.set(value);
  }, [isInView, motionVal, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

function TechCard({ skill, index }) {
  const Icon = iconMap[skill.icon] || FaCode;
  const { isDark } = useTheme();
  const color = readableColor(skill.color, isDark);

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.45, delay: Math.min(index, 8) * 0.05 }}
      className="tech-wave-item w-[calc(50%-0.5rem)] sm:w-44 lg:w-48"
      style={{ '--wave-y': `${waveOffset(index)}px` }}
    >
      <div className="tech-wave-float" style={{ animationDelay: `${-index * 0.45}s` }}>
        <div
          className="tech-card glass-card group flex items-center gap-3 px-4 py-3.5"
          style={{ '--tech-color': color }}
        >
          <Icon className="w-6 h-6 shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ color }} aria-hidden="true" />
          <span className="text-sm font-semibold text-ink-2 truncate">{skill.name}</span>
        </div>
      </div>
    </motion.li>
  );
}

export default function Skills() {
  const { portfolioData, loading } = usePortfolioData();
  const categories = portfolioData.skillCategories;

  if (loading) {
    return (
      <section id="skills" className="py-24 md:py-32 relative overflow-hidden bg-page">
        <div className="container-custom flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted">Loading skills...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">

      <div className="container-custom relative z-10">
        
        {/* Header Section */}
        <div className="mb-20 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-[2.75rem] font-bold text-ink leading-tight mb-5">
              Skills & <span className="text-accent-text">Technologies</span>
            </h2>
            <p className="text-muted text-lg">
              Tools and technologies I work with to bring ideas to life.
            </p>
          </div>
          
          {/* Top Right Stats */}
          <div className="flex flex-wrap gap-4 select-none">
            <div className="bg-surface border border-line rounded-2xl px-6 py-4 flex flex-col items-center hover:border-line transition-colors">
              <span className="text-2xl font-bold text-ink mb-1"><Counter value={portfolioData.about.yearsOfExperience} />+</span>
              <span className="text-[10px] text-faint uppercase tracking-widest font-semibold">Years Exp</span>
            </div>
            <div className="bg-surface border border-line rounded-2xl px-6 py-4 flex flex-col items-center hover:border-line transition-colors">
              <span className="text-2xl font-bold text-ink mb-1"><Counter value={portfolioData.about.projectsDone} />+</span>
              <span className="text-[10px] text-faint uppercase tracking-widest font-semibold">Projects</span>
            </div>
            <div className="bg-surface border border-line rounded-2xl px-6 py-4 flex flex-col items-center hover:border-line transition-colors">
              <span className="text-2xl font-bold text-ink mb-1"><Counter value={portfolioData.skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)} />+</span>
              <span className="text-[10px] text-faint uppercase tracking-widest font-semibold">Tech Stack</span>
            </div>
          </div>
        </div>

        {/* All Categories Sequential List */}
        <div className="flex flex-col gap-16 md:gap-20">
          {categories.map((cat, catIdx) => (
            <div key={cat.id || `${cat.name}-${catIdx}`} className="flex flex-col gap-8">
              
              {/* Category Header */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4 w-full"
              >
                <div 
                  className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center bg-surface border border-line"
                >
                  <div 
                    className="w-3 h-3 rounded-full animate-pulse" 
                    style={{ backgroundColor: 'rgb(var(--accent))', boxShadow: '0 0 10px rgb(var(--accent)/0.5)' }} 
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-ink tracking-wide shrink-0">
                  {cat.name}
                </h3>

                {/* Modern Tech Animated Line */}
                <div className="flex-1 flex items-center gap-2 ml-2 md:ml-4 overflow-hidden opacity-80">
                  <div className="h-px w-full bg-page-2 relative overflow-hidden rounded-full">
                    {/* Fast moving data packet */}
                    <motion.div
                      className="absolute top-0 bottom-0 w-32"
                      style={{ 
                        background: 'linear-gradient(90deg, transparent, rgb(var(--accent)), transparent)',
                        boxShadow: '0 0 8px rgb(var(--accent)/0.5)'
                      }}
                      animate={{ x: ['-200%', '500%'] }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "linear",
                        delay: catIdx * 0.4 // Stagger the animation per category
                      }}
                    />
                    {/* Slow moving ambient glow */}
                    <motion.div
                      className="absolute top-0 bottom-0 w-full"
                      style={{ 
                        background: 'linear-gradient(90deg, transparent, rgb(var(--accent)/0.25), transparent)',
                      }}
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ 
                        duration: 7, 
                        repeat: Infinity, 
                        ease: "linear",
                        delay: catIdx * 0.2
                      }}
                    />
                  </div>
                  {/* Circuit/tech node at the end */}
                  <div 
                    className="w-1.5 h-1.5 shrink-0 rounded-sm" 
                    style={{ backgroundColor: 'rgb(var(--accent))', boxShadow: '0 0 6px rgb(var(--accent)/0.5)' }}
                  />
                  <div 
                    className="w-1 h-3 shrink-0 rounded-sm opacity-50" 
                    style={{ backgroundColor: 'rgb(var(--accent))' }}
                  />
                </div>
              </motion.div>

              {/* Wave-flow technology cards */}
              <ul className="tech-wave flex flex-wrap justify-center gap-x-4 gap-y-10 py-4 list-none p-0 m-0" aria-label={cat.name}>
                {cat.skills.map((skill, index) => (
                  <TechCard key={skill.name} skill={skill} index={index} />
                ))}
              </ul>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
