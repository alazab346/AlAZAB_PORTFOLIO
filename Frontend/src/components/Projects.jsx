import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import { HiArrowTopRightOnSquare } from 'react-icons/hi2';
import { usePortfolioData } from '../context/PortfolioContext';

// Helper function to get image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  return imagePath;
};

function ProjectSlideshow({ images, title, hovered }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // 5 seconds rotation

    return () => clearInterval(timer);
  }, [images.length]);

  const currentImageUrl = getImageUrl(images[currentIndex]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={currentImageUrl || 'https://via.placeholder.com/600x400?text=Project'}
          alt={`${title} - slide ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover object-top"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: 1, 
            scale: hovered ? 1.05 : 1,
            filter: hovered ? 'brightness(1.1) contrast(1.1)' : 'brightness(0.9) contrast(1)'
          }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </AnimatePresence>
      
      {/* Tech Scanning Overlay */}
      <motion.div 
        className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 z-10"
        animate={{ 
          top: ["-10%", "110%"],
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />

      {/* Slide Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {images.map((_, i) => (
          <div 
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex ? 'bg-cyan-400 w-4' : 'bg-ink/20'
            }`}
          />
        ))}
      </div>

      {/* Corner Markers */}
      <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-cyan-400/50 z-20" />
      <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-cyan-400/50 z-20" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-cyan-400/50 z-20" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-cyan-400/50 z-20" />

      {/* Digital Grid Overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.03] pointer-events-none" />
    </div>
  );
}

function ProjectTag({ tag }) {
  return (
    <span className="group/tag flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-line bg-ink/[0.04] text-muted
      hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/10 hover:text-accent-text transition-all duration-300 cursor-default">
      <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
      {tag}
    </span>
  );
}

function ProjectTitle({ title }) {
  return (
    <h3 className="text-lg font-bold font-display text-ink hover:text-accent-text mb-2 transition-colors duration-300 line-clamp-1 w-fit cursor-default">
      {title}
    </h3>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const imageSrc = project.image ? getImageUrl(project.image) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-50px' }}
      className="project-card glass-card rounded-2xl overflow-hidden group cursor-default flex flex-col h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      id={`project-card-${project.id}`}
    >
      {/* Project visual */}
      <div className="relative h-48 sm:h-52 overflow-hidden shrink-0 bg-page-2">
        {project.images ? (
          <ProjectSlideshow images={project.images} title={project.title} hovered={hovered} />
        ) : imageSrc ? (
          <div className="relative w-full h-full overflow-hidden">
            {/* Project Image */}
            <motion.img
              src={imageSrc}
              alt={project.title}
              className="w-full h-full object-cover object-top"
              animate={{ 
                scale: hovered ? 1.05 : 1,
                filter: hovered ? 'brightness(1.1) contrast(1.1)' : 'brightness(0.9) contrast(1)'
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            
            {/* Tech Scanning Overlay */}
            <motion.div 
              className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 z-10"
              animate={{ 
                top: ["-10%", "110%"],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />

            {/* Corner Markers */}
            <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-cyan-400/50 z-20" />
            <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-cyan-400/50 z-20" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-cyan-400/50 z-20" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-cyan-400/50 z-20" />

            {/* Digital Grid Overlay */}
            <div className="absolute inset-0 bg-grid-white/[0.03] pointer-events-none" />
          </div>
        ) : (
          <>
            <div
              className="absolute inset-0 opacity-20"
              style={{ background: 'linear-gradient(135deg, rgb(var(--accent)), rgb(var(--accent-strong)))' }}
            />
            <div className="absolute inset-0 dot-grid opacity-30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <span className="text-6xl mb-4 opacity-30 group-hover:scale-110 transition-transform duration-500">
                {project.emoji || '🚀'}
              </span>
              <span className="text-xl font-bold font-display text-ink/40 tracking-wider uppercase group-hover:text-ink/60 transition-colors duration-500">
                {project.title}
              </span>
            </div>
          </>
        )}
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-4 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ background: 'rgb(var(--page) / 0.8)', backdropFilter: 'blur(4px)' }}
        >
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-card text-ink
                hover:text-accent-text hover:border-accent/30 transition-all duration-200 text-sm font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub className="w-4 h-4" />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary py-2.5 text-sm px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <HiArrowTopRightOnSquare className="w-4 h-4 flex-shrink-0" />
              Live
            </a>
          )}
        </motion.div>

        {/* Status / Featured badge */}
        <div className="absolute top-3 right-3 z-30 flex flex-col items-end gap-1.5">
          {project.status && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 backdrop-blur">
              {project.status}
            </span>
          )}
          {project.isFeatured && !project.status && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent-text backdrop-blur">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <ProjectTitle title={project.title} />
        {project.subtitle && (
          <p className="text-xs font-medium text-accent-text/80 mb-1.5 tracking-wide">{project.subtitle}</p>
        )}
        <p className="text-sm text-muted leading-relaxed mb-6 flex-grow mt-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto relative z-10 pointer-events-auto">
          {project.tags.split(',').map((tag_item) => {
            const tag = tag_item.trim();
            return <ProjectTag key={tag} tag={tag} />;
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { portfolioData, loading } = usePortfolioData();

  if (loading) {
    return (
      <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
        <div className="container-custom flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      <div className="blob w-[500px] h-[500px] bg-accent-strong top-1/2 right-0 opacity-[0.07] -translate-y-1/2" />
      <div className="blob w-[400px] h-[400px] bg-accent bottom-0 left-1/4 opacity-[0.05]" />

      <div className="container-custom relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-left mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl">
            A selection of projects that showcase my skills and passion for building great products
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* View More CTA */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://github.com/alazab346"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-3 px-8 py-4 rounded-xl overflow-hidden
              bg-ink/[0.03] border border-line hover:border-accent/50
              transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            
            {/* Scan line animation */}
            <motion.div 
              className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-60 z-10"
              animate={{ 
                top: ["-10%", "110%"],
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "linear",
                repeatDelay: 1
              }}
            />
            
            {/* Glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-accent/5 blur-xl" />
            </div>

            {/* Content */}
            <motion.div
              className="relative z-10"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <FaGithub className="w-5 h-5 text-muted group-hover:text-accent-text transition-colors duration-300" />
            </motion.div>
            
            <span className="relative z-10 text-sm font-medium text-muted group-hover:text-ink transition-colors duration-300">
              View more on GitHub
            </span>

            {/* Arrow animation */}
            <motion.div
              className="relative z-10 text-muted group-hover:text-accent-text transition-colors duration-300"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <HiArrowTopRightOnSquare className="w-4 h-4" />
            </motion.div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-accent/0 group-hover:border-accent/50 transition-all duration-300" />
            <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-accent/0 group-hover:border-accent/50 transition-all duration-300" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-accent/0 group-hover:border-accent/50 transition-all duration-300" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-accent/0 group-hover:border-accent/50 transition-all duration-300" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
