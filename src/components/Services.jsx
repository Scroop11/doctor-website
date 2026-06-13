import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Activity, HeartPulse, Wind, Pill, Video } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../context/LanguageContext';

const Services = () => {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();

  const services = [
    {
      icon: <Stethoscope />,
      title: t.services.general.title,
      desc: t.services.general.desc
    },
    {
      icon: <Activity />,
      title: t.services.diabetes.title,
      desc: t.services.diabetes.desc
    },
    {
      icon: <HeartPulse />,
      title: t.services.hypertension.title,
      desc: t.services.hypertension.desc
    },
    {
      icon: <Wind />,
      title: t.services.respiratory.title,
      desc: t.services.respiratory.desc
    },
    {
      icon: <Pill />,
      title: t.services.gastro.title,
      desc: t.services.gastro.desc
    },
    {
      icon: <Video />,
      title: t.services.online.title,
      desc: t.services.online.desc
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-secondary transition-colors duration-300">
      <div ref={sectionRef} className="max-w-7xl mx-auto section-fade">
        <div className="text-center space-y-4 mb-16">
          <span className="text-[#2dd4bf] text-sm font-bold uppercase tracking-[0.2em]">
            {t.services.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#0a0a0f] dark:text-white">
            {t.services.title}
          </h2>
          <p className="text-[#4b5563] dark:text-[#94a3b8] max-w-2xl mx-auto text-lg">
            {t.services.subtitle}
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-gray-50 dark:bg-[#16161f] border border-gray-100 dark:border-[#1e1e2e] rounded-2xl p-8 hover:border-[#2dd4bf] hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] hover:-translate-y-1 transition-all duration-300 group shadow-sm dark:shadow-none"
            >
              <div className="bg-white dark:bg-[#0a0a0f] p-4 rounded-xl w-fit text-[#2dd4bf] mb-6 group-hover:scale-110 transition-transform duration-300 border border-gray-100 dark:border-none">
                {React.cloneElement(service.icon, { size: 24 })}
              </div>
              <h3 className="text-xl font-bold text-[#0a0a0f] dark:text-white mb-4">
                {service.title}
              </h3>
              <p className="text-[#4b5563] dark:text-[#94a3b8] leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
