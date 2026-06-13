import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { Routes, Route, Navigate, useLocation, BrowserRouter } from 'react-router-dom';

// Context Providers
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

// Component Imports
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
import Dashboard from './components/Dashboard';

// 1. Simple Loading Screen (No complex dependencies)
const LoadingScreen = () => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-[#0a0a0f] transition-colors duration-500">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-4xl md:text-6xl font-bold text-[#2dd4bf] tracking-tighter"
    >
      DJ.
    </motion.div>
  </div>
);

// 2. Home Page Composition
const HomePage = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <MarqueeTicker />
      <section id="about"><About /></section>
      <section id="services"><Services /></section>
      <Stats />
      <section id="appointment"><Appointment /></section>
      {isLoggedIn && <PrescriptionSystem />}
      <Testimonials />
      <FAQ />
    </div>
  );
};

// 3. Main App Layout Logic
const AppLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith('/dashboard');

  useEffect(() => {
    // Ensuring loading state resolves even if there are micro-bottlenecks
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 selection:bg-[#2dd4bf]/30 transition-colors duration-300">
      {!isDashboard && <Navbar />}
      
      <main className="relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isDashboard && <Footer />}

      {/* Persistent Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && !isDashboard && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 p-4 bg-[#2dd4bf] text-[#0a0a0f] rounded-2xl shadow-xl hover:shadow-[#2dd4bf]/20 hover:-translate-y-1 transition-all active:scale-95"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

// 4. Root Entry Point
export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <LanguageProvider>
            <Suspense fallback={<LoadingScreen />}>
              <AppLayout />
            </Suspense>
          </LanguageProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
