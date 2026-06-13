import React from 'react';
import { motion } from 'framer-motion';
import doctorData from '../data/content.js';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="min-h-screen bg-[#0a0a0f] flex items-center pt-24 lg:pt-0 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-block px-4 py-1.5 rounded-full border border-[#2dd4bf]/30 text-[#2dd4bf] text-xs md:text-sm font-medium bg-[#2dd4bf]/5"
          >
            {t.hero.badge}
          </motion.div>

          <div className="space-y-2">
            <motion.h1 className="text-5xl md:text-7xl font-heading font-bold text-white leading-tight">
              <motion.span variants={wordVariants} className="block">{t.hero.title1}</motion.span>
              <motion.span variants={wordVariants} className="block text-[#2dd4bf]">{t.hero.title2}</motion.span>
              <motion.span variants={wordVariants} className="block">{t.hero.title3}</motion.span>
            </motion.h1>
          </div>

          <motion.p variants={itemVariants} className="text-[#94a3b8] text-lg md:text-xl max-w-lg leading-relaxed">
            {doctorData.experience} {t.hero.description}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <a 
              href="#appointment"
              className="bg-[#2dd4bf] text-[#0a0a0f] px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2"
            >
              {t.hero.bookButton} <span className="text-xl">→</span>
            </a>
            <a 
              href="#about"
              className="border border-[#2dd4bf] text-[#2dd4bf] px-8 py-4 rounded-full font-bold hover:bg-[#2dd4bf]/10 transition-colors"
            >
              {t.hero.learnMore}
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-6 pt-4">
            <div className="border border-[#1e1e2e] rounded-xl p-4 bg-[#111118]">
              <div className="text-2xl font-bold text-white">{doctorData.patients}</div>
              <div className="text-xs text-[#94a3b8] uppercase tracking-wider">{t.hero.patients}</div>
            </div>
            <div className="border border-[#1e1e2e] rounded-xl p-4 bg-[#111118]">
              <div className="text-2xl font-bold text-white">{doctorData.experience.split(' ')[0]}</div>
              <div className="text-xs text-[#94a3b8] uppercase tracking-wider">{t.hero.yearsExp}</div>
            </div>
            <div className="border border-[#1e1e2e] rounded-xl p-4 bg-[#111118]">
              <div className="text-2xl font-bold text-white">{doctorData.satisfaction}</div>
              <div className="text-xs text-[#94a3b8] uppercase tracking-wider">{t.hero.satisfaction}</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side Content */}
        <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-0">
          {/* Blurred Background Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#2dd4bf] rounded-full blur-3xl opacity-20 pointer-events-none" />
          
          <div className="relative">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="animate-float"
            >
              <img 
                src={doctorData.heroImage} 
                alt={t.doctor.name}
                className="w-full max-w-[450px] md:max-w-[500px] h-auto object-cover rounded-3xl"
              />
            </motion.div>

            {/* Floating Card 1 */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -top-6 -right-6 md:right-0 bg-[#16161f] border border-[#1e1e2e] rounded-xl px-5 py-3 text-sm text-white shadow-2xl flex items-center gap-2"
            >
              <span className="text-lg">⭐</span> {t.hero.topRated}
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 md:left-0 bg-[#16161f] border border-[#1e1e2e] rounded-xl px-5 py-3 text-sm text-white shadow-2xl flex items-center gap-2"
            >
              <span className="text-[#2dd4bf]">✅</span> {t.hero.bmdcVerified}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
