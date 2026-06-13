import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeTicker from './components/MarqueeTicker';
import About from './components/About';
import Services from './components/Services';
import Stats from './components/Stats';
import Appointment from './components/Appointment';
import PrescriptionSystem from './components/PrescriptionSystem';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import doctorData from './data/content.js';
import { useLanguage } from './context/LanguageContext';

const LoadingScreen = () => {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      onAnimationComplete={() => document.body.style.overflow = 'auto'}
      className="fixed inset-0 z-[10000] bg-[#0a0a0f] flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
        transition={{ duration: 1.5, times: [0, 0.2, 0.8, 1] }}
        className="text-3xl md:text-5xl font-heading font-bold text-[#2dd4bf]"
      >
        {t.doctor.name}
      </motion.div>
    </motion.div>
  );
};

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => setIsLoading(false), 2000);
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <main className={`bg-primary min-h-screen ${isLoading ? 'invisible' : 'visible'}`}>
        <Navbar />
        <div id="home">
          <Hero />
        </div>
        <MarqueeTicker />
        <div id="about">
          <About />
        </div>
        <div id="services">
          <Services />
        </div>
        <Stats />
        <div id="appointment">
          <Appointment />
        </div>
        <PrescriptionSystem />
        <Testimonials />
        <FAQ />
        <Footer />

        {/* Scroll To Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 z-[60] bg-[#2dd4bf] text-[#0a0a0f] p-3 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
            >
              <ArrowUp size={24} strokeWidth={3} />
            </motion.button>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}

export default App;
