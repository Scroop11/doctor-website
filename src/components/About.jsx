import React from 'react';
import { CheckCircle } from 'lucide-react';
import doctorData from '../data/content.js';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();

  const credentials = [
    { text: `MBBS — ${t.doctor.medicalCollege}` },
    { text: t.about.fcps },
    { text: `${t.about.bmdc} ${doctorData.bmdcReg}` },
    { text: t.about.member },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-primary">
      <div 
        ref={sectionRef}
        className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center section-fade"
      >
        {/* Left Column: Image with Decoration */}
        <div className="relative">
          <div className="relative z-10 w-full rounded-2xl border-2 border-[#1e1e2e] overflow-hidden">
            <img 
              src={doctorData.aboutImage} 
              alt={t.doctor.name} 
              className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          {/* Decoration Line */}
          <div className="absolute -bottom-4 -right-4 border-2 border-[#2dd4bf] rounded-2xl w-full h-full -z-0" />
        </div>

        {/* Right Column: Text Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="text-[#2dd4bf] text-sm font-bold uppercase tracking-[0.2em]">
              {t.about.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white leading-tight">
              {t.about.title}
            </h2>
          </div>

          <div className="space-y-6 text-[#94a3b8] leading-relaxed">
            <p>
              {t.doctor.name} {t.about.p1} {t.doctor.specialty} {t.about.p2} {doctorData.experience} {t.about.p3} 
            </p>
            <p>
              {t.about.p4}
            </p>
          </div>

          <div className="space-y-4">
            {credentials.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="text-[#2dd4bf] flex-shrink-0" size={18} />
                <span className="text-[#f8fafc] font-medium">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <button className="border border-[#2dd4bf] text-[#2dd4bf] px-10 py-4 rounded-full font-bold hover:bg-[#2dd4bf] hover:text-[#0a0a0f] transition-all duration-300">
              {t.about.download}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
