import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';
import doctorData from '../data/content.js';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="bg-white dark:bg-[#080810] border-t border-gray-100 dark:border-[#1e1e2e] pt-16 pb-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
        
        {/* Column 1 - Brand */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-[#2dd4bf] text-2xl font-heading font-bold">{t.doctor.name}</h2>
            <div className="inline-block px-3 py-1 bg-[#2dd4bf]/10 border border-[#2dd4bf]/20 rounded-full text-[#2dd4bf] text-xs font-semibold">
              {t.doctor.degree}
            </div>
          </div>
          <p className="text-[#4b5563] dark:text-[#94a3b8] leading-relaxed max-w-sm">
            {t.footer.tagline} {doctorData.experience} {t.footer.experienceSuffix}
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div className="lg:pl-20">
          <h3 className="text-[#0a0a0f] dark:text-white font-bold text-lg mb-6">{t.footer.quickLinks}</h3>
          <ul className="space-y-3">
            {[
              { name: t.nav.home, href: '#' },
              { name: t.nav.about, href: '#about' },
              { name: t.nav.services, href: '#services' },
              { name: t.nav.appointment, href: '#appointment' },
              { name: t.nav.contact, href: '#contact' },
            ].map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href}
                  className="text-[#4b5563] dark:text-[#94a3b8] hover:text-[#2dd4bf] transition-colors duration-300 block"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 - Contact Info */}
        <div className="space-y-6">
          <h3 className="text-[#0a0a0f] dark:text-white font-bold text-lg mb-6">{t.footer.contactInfo}</h3>
          <div className="space-y-4">
            <div className="flex gap-3 text-[#4b5563] dark:text-[#94a3b8]">
              <MapPin className="text-[#2dd4bf] flex-shrink-0" size={20} />
              <span>{t.doctor.chamber}</span>
            </div>
            <div className="flex gap-3 text-[#4b5563] dark:text-[#94a3b8]">
              <Phone className="text-[#2dd4bf] flex-shrink-0" size={20} />
              <span>{doctorData.phone}</span>
            </div>
            <div className="flex gap-3 text-[#4b5563] dark:text-[#94a3b8]">
              <Mail className="text-[#2dd4bf] flex-shrink-0" size={20} />
              <span>{doctorData.email}</span>
            </div>
            <div className="flex gap-3 text-[#4b5563] dark:text-[#94a3b8]">
              <Clock className="text-[#2dd4bf] flex-shrink-0" size={20} />
              <span>{t.doctor.availableDays}</span>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="bg-gray-50 dark:bg-[#16161f] border border-gray-100 dark:border-[#1e1e2e] p-2.5 rounded-lg text-[#4b5563] dark:text-[#94a3b8] hover:border-[#2dd4bf] hover:text-[#2dd4bf] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2dd4bf]"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-100 dark:border-[#1e1e2e]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-[#4b5563] dark:text-[#94a3b8] text-sm">
            © {new Date().getFullYear()} {t.doctor.name}. {t.footer.rights}
          </p>
          <p className="text-[#4b5563] dark:text-[#94a3b8] text-sm font-medium">
            {doctorData.bmdcReg}
          </p>
        </div>
        <p className="text-[#4b5563] dark:text-[#94a3b8] text-xs text-center mt-6 opacity-60">
          {t.footer.emergency}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
