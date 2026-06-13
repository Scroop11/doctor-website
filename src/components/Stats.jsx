import React, { useState, useEffect, useRef } from 'react';
import { useCounterAnimation } from '../hooks/useCounterAnimation';
import doctorData from '../data/content.js';
import { useLanguage } from '../context/LanguageContext';

const StatItem = ({ end, suffix, label, isVisible, showDivider }) => {
  const count = useCounterAnimation(end, isVisible);

  return (
    <div className={`relative flex flex-col items-center text-center px-4 ${showDivider ? 'lg:border-r border-[#1e1e2e]' : ''}`}>
      <div className="text-5xl font-bold text-[#2dd4bf] mb-2 tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-[#94a3b8] text-sm font-bold uppercase tracking-widest mt-2">
        {label}
      </div>
    </div>
  );
};

const Stats = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const statsData = [
    { end: parseInt(doctorData.patients), suffix: "+", label: t.stats.stat1 },
    { end: parseInt(doctorData.experience), suffix: "+", label: t.hero.yearsExp },
    { end: parseInt(doctorData.satisfaction), suffix: "%", label: t.hero.satisfaction },
    { end: parseInt(doctorData.consultations), suffix: "+", label: t.stats.stat3 },
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-[#111118] border-y border-[#1e1e2e] px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0">
          {statsData.map((stat, index) => (
            <StatItem 
              key={index}
              {...stat}
              isVisible={isVisible}
              showDivider={index !== statsData.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
