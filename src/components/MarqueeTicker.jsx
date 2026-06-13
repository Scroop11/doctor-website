import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const MarqueeTicker = () => {
  const { t } = useLanguage();
  const tickerText = t.ticker;

  return (
    <div className="bg-[#16161f] border-y border-[#1e1e2e] py-4 overflow-hidden select-none">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* First set of text */}
        <div className="flex items-center">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center">
              {tickerText.split(' · ').map((text, idx) => (
                <span key={idx} className="flex items-center">
                  <span className="text-[#94a3b8] text-sm uppercase tracking-widest font-medium">
                    {text}
                  </span>
                  <span className="text-[#2dd4bf] font-bold mx-8 text-lg">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
        
        {/* Second set of text for seamless loop */}
        <div className="flex items-center">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center">
              {tickerText.split(' · ').map((text, idx) => (
                <span key={idx} className="flex items-center">
                  <span className="text-[#94a3b8] text-sm uppercase tracking-widest font-medium">
                    {text}
                  </span>
                  <span className="text-[#2dd4bf] font-bold mx-8 text-lg">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeTicker;
