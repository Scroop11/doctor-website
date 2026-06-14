import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Languages, LogIn, LogOut, LayoutDashboard, Sun, Moon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import doctorData from '../data/content.js';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import LoginModal from './LoginModal';

const Navbar = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { isLoggedIn, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const isDashboard = location.pathname === '/dashboard';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = isDashboard ? [
    { name: t.nav.home, href: '/', isExternal: true },
    { name: t.nav.dashboard, href: '/dashboard', isExternal: true },
  ] : [
    { name: t.nav.home, href: '#' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.services, href: '#services' },
    { name: t.prescription.nav, href: isLoggedIn ? '#prescriptions' : '#', isPrescription: true },
    { name: t.nav.appointment, href: '#appointment' },
    ...(isLoggedIn ? [{ name: t.nav.dashboard, href: '/dashboard', isExternal: true }] : []),
  ];

  const handleNavLinkClick = (e, link) => {
    if (link.isPrescription && !isLoggedIn) {
      e.preventDefault();
      setIsLoginModalOpen(true);
      return;
    }
    
    if (link.isExternal) {
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      return;
    }

    if (isDashboard && !link.isExternal) {
      e.preventDefault();
      navigate('/' + link.href);
    }

    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
          isScrolled 
            ? 'bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-md py-3 shadow-lg' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-[#2dd4bf] font-heading text-xl md:text-2xl font-bold cursor-pointer"
              onClick={() => {
                navigate('/');
                setIsMobileMenuOpen(false);
              }}
            >
              {t.doctor.name}
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="hidden md:flex items-center space-x-4 lg:space-x-6"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link)}
                  variants={itemVariants}
                  className="text-[#4b5563] dark:text-[#94a3b8] hover:text-[#2dd4bf] dark:hover:text-white transition-colors font-medium text-sm lg:text-base"
                >
                  {link.name}
                </motion.a>
              ))}
              
              <div className="flex items-center gap-2 border-l border-gray-200 dark:border-[#1e1e2e] ml-4 pl-4">
                <div className="relative overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.button
                      key={theme}
                      initial={{ y: -20, opacity: 0, rotate: -90, scale: 0.5 }}
                      animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ y: 20, opacity: 0, rotate: 90, scale: 0.5 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      onClick={toggleTheme}
                      className="p-2 rounded-lg text-[#4b5563] dark:text-[#94a3b8] hover:bg-gray-100 dark:hover:bg-white/5 hover:text-[#2dd4bf] transition-all focus:outline-none focus:ring-2 focus:ring-[#2dd4bf] focus:ring-offset-2 dark:focus:ring-offset-[#0a0a0f]"
                      aria-label="Toggle Theme"
                    >
                      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </motion.button>
                  </AnimatePresence>
                </div>

                <motion.button
                  variants={itemVariants}
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 text-[#4b5563] dark:text-[#94a3b8] hover:text-[#2dd4bf] transition-colors border border-gray-200 dark:border-[#1e1e2e] px-3 py-1.5 rounded-lg text-sm font-bold"
                >
                  <Languages size={18} />
                  {language === 'en' ? 'BN' : 'EN'}
                </motion.button>
              </div>

              {isLoggedIn && (
                <motion.button
                  variants={itemVariants}
                  onClick={logout}
                  className="flex items-center gap-2 text-[#4b5563] dark:text-[#94a3b8] hover:text-red-500 transition-colors font-semibold text-sm"
                >
                  <LogOut size={18} />
                  {t.nav.logout}
                </motion.button>
              )}

              <motion.a
                variants={itemVariants}
                href="#appointment"
                className="bg-[#2dd4bf] text-[#0a0a0f] px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-[#2dd4bf]/20 transition-all text-sm lg:text-base"
              >
                {t.nav.bookNow}
              </motion.a>
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 text-[#4b5563] dark:text-[#94a3b8] hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
              </button>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative z-[70] w-10 h-10 flex flex-col items-center justify-center space-y-1.5 focus:outline-none"
                aria-label="Toggle Menu"
              >
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 8 : 0,
                  }}
                  className="w-7 h-0.5 bg-[#0a0a0f] dark:bg-white rounded-full block"
                />
                <motion.span
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                    x: isMobileMenuOpen ? 20 : 0,
                  }}
                  className="w-7 h-0.5 bg-[#0a0a0f] dark:bg-white rounded-full block"
                />
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -8 : 0,
                  }}
                  className="w-7 h-0.5 bg-[#0a0a0f] dark:bg-white rounded-full block"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Hamburger Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-white/95 dark:bg-[#0a0a0f]/95 backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col items-center space-y-6 w-full max-w-sm"
                >
                  {navLinks.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavLinkClick(e, link)}
                      variants={itemVariants}
                      className="text-2xl font-bold text-[#4b5563] dark:text-[#94a3b8] hover:text-[#2dd4bf] dark:hover:text-white transition-all transform hover:scale-105"
                    >
                      {link.name}
                    </motion.a>
                  ))}

                  <motion.div variants={itemVariants} className="w-full h-px bg-gray-200 dark:bg-white/10 my-4" />

                  <motion.div variants={itemVariants} className="flex flex-col gap-4 w-full">
                    <button
                      onClick={toggleLanguage}
                      className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-[#4b5563] dark:text-[#94a3b8] font-bold text-lg hover:border-[#2dd4bf]/50 transition-all"
                    >
                      <Languages size={22} className="text-[#2dd4bf]" />
                      {language === 'en' ? t.nav.bengali : t.nav.english}
                    </button>

                    {isLoggedIn ? (
                      <button
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 font-bold text-lg"
                      >
                        <LogOut size={22} />
                        {t.nav.logout}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setIsLoginModalOpen(true);
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl bg-[#2dd4bf]/10 border border-[#2dd4bf]/20 text-[#2dd4bf] font-bold text-lg"
                      >
                        <LogIn size={22} />
                        {t.nav.login}
                      </button>
                    )}
                  </motion.div>

                  <motion.a
                    variants={itemVariants}
                    href="#appointment"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full bg-[#2dd4bf] text-[#0a0a0f] py-5 rounded-2xl font-black text-xl shadow-xl shadow-[#2dd4bf]/20 active:scale-95 transition-all mt-4"
                  >
                    {t.nav.bookNow}
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;
