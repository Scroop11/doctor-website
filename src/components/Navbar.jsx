import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Languages } from 'lucide-react';
import doctorData from '../data/content.js';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.services, href: '#services' },
    { name: t.prescription.nav, href: '#prescriptions' },
    { name: t.nav.appointment, href: '#appointment' },
    { name: t.nav.contact, href: '#contact' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#2dd4bf] origin-left z-[100]"
        style={{ scaleX }}
      />
      
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/60 backdrop-blur-md py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-[#2dd4bf] font-heading text-xl md:text-2xl font-bold"
            >
              {t.doctor.name}
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="hidden md:flex items-center space-x-8"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  variants={itemVariants}
                  className="text-[#94a3b8] hover:text-white transition-colors font-medium text-sm lg:text-base"
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.button
                variants={itemVariants}
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-[#94a3b8] hover:text-[#2dd4bf] transition-colors border border-[#1e1e2e] px-3 py-1.5 rounded-lg text-sm font-bold uppercase"
              >
                <Languages size={18} />
                {language === 'en' ? 'BN' : 'EN'}
              </motion.button>

              <motion.a
                variants={itemVariants}
                href="#appointment"
                className="bg-[#2dd4bf] text-[#0a0a0f] px-6 py-2.5 rounded-full font-semibold hover:bg-opacity-90 transition-all text-sm lg:text-base"
              >
                {t.nav.bookNow}
              </motion.a>
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={toggleLanguage}
                className="text-[#94a3b8] hover:text-[#2dd4bf] transition-colors border border-[#1e1e2e] px-2 py-1 rounded-md text-xs font-bold"
              >
                {language === 'en' ? 'BN' : 'EN'}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-white p-2"
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Hamburger Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-[#0a0a0f] flex flex-col items-center justify-center"
            >
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-6 right-6 text-white p-2"
              >
                <X size={32} />
              </button>
              
              <div className="flex flex-col items-center space-y-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl text-[#94a3b8] hover:text-[#2dd4bf] transition-colors font-semibold"
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="#appointment"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-[#2dd4bf] text-[#0a0a0f] px-10 py-4 rounded-full font-bold text-xl"
                >
                  {t.nav.bookNow}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
