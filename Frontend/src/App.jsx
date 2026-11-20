import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import { Analytics } from '@vercel/analytics/react';
import { PortfolioProvider } from './context/PortfolioContext';

const SectionDivider = () => (
  <div className="section-divider" aria-hidden="true" />
);

function Portfolio() {
  return (
    <div className="min-h-screen text-ink-2 relative">
      <div className="relative z-20">
        <Navbar />
        <main>
          <Hero />
          <SectionDivider />
          <About />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <Projects />
          <SectionDivider />
          <Contact />
        </main>
        <Footer />
      </div>
      <Analytics />
    </div>
  );
}

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <Router>
        <AppContent />
      </Router>
    </PortfolioProvider>
  );
}
