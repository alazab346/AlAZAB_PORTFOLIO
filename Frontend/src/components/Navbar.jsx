import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { HiArrowDownTray, HiSwatch } from 'react-icons/hi2';
import { PORTFOLIO_DATA } from '../context/PortfolioContext';
import { useTheme } from '../theme';

const navLinks = [
  { label: 'Home',     to: 'home'     },
  { label: 'About',   to: 'about'   },
  { label: 'Skills',  to: 'skills'  },
  { label: 'Projects',to: 'projects'},
  { label: 'Contact', to: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-page/85 backdrop-blur-xl border-b border-line shadow-[0_8px_30px_-18px_rgb(var(--shadow)/0.5)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-accent-strong flex items-center justify-center shadow-[0_6px_16px_-6px_rgb(var(--accent)/0.7)]">
                <span className="text-white font-bold text-sm font-display">M</span>
              </div>
              <span className="text-ink font-display font-bold text-lg">
                Mohammed Alazab <span className="text-gradient text-base">Portfolio</span>
              </span>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                >
                  <Link
                    to={link.to}
                    spy={true}
                    smooth={true}
                    duration={600}
                    offset={-80}
                    onSetActive={() => setActiveSection(link.to)}
                    className={`nav-link cursor-pointer ${activeSection === link.to ? 'active' : ''}`}
                    id={`nav-${link.to}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="hidden md:flex items-center gap-2"
            >
              {/* Theme Toggle Button */}
              <motion.button
                onClick={toggleTheme}
                className="p-2.5 rounded-lg glass-card text-accent-text hover:border-accent/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <motion.div
                  animate={{ rotate: isDark ? 0 : 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <HiSwatch className="w-4 h-4" />
                </motion.div>
              </motion.button>

              <a
                href={PORTFOLIO_DATA.cvUrl}
                download
                id="nav-download-cv"
                className="btn-primary text-sm py-2.5 px-5"
              >
                <HiArrowDownTray className="w-4 h-4" />
                Download CV
              </a>
            </motion.div>

            {/* Hamburger */}
            <button
              id="mobile-menu-toggle"
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl glass-card text-ink-2 hover:text-ink transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <HiX className="w-5 h-5" /> : <HiMenuAlt3 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden bg-page/95 backdrop-blur-xl border-b border-line overflow-hidden"
          >
            <div className="container-custom py-6 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    to={link.to}
                    spy={true}
                    smooth={true}
                    duration={600}
                    offset={-80}
                    className="block py-3 px-4 rounded-xl nav-link text-base hover:bg-ink/[0.05] cursor-pointer"
                    onClick={() => setMenuOpen(false)}
                    id={`mobile-nav-${link.to}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-2 border-t border-line space-y-3"
              >
                <button
                  onClick={toggleTheme}
                  className="btn-outline w-full justify-center"
                >
                  <HiSwatch className="w-4 h-4" />
                  Toggle Theme
                </button>
                <a href={PORTFOLIO_DATA.cvUrl} download id="mobile-download-cv" className="btn-primary w-full justify-center">
                  <HiArrowDownTray className="w-4 h-4" />
                  Download CV
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
