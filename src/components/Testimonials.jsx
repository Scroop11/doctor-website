import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Testimonials = () => {
  const { t } = useLanguage();
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate for seamless scroll
  const extendedTestimonials = [...t.testimonials.items, ...t.testimonials.items];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += 1;
        }
      }, 20);
    }

    return () => clearInterval(interval);
  }, [isPaused, extendedTestimonials]);

  return (
    <section className="py-24 bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <h2 className="text-4xl font-heading font-bold text-white mb-4">{t.testimonials.title}</h2>
        <p className="text-[#94a3b8] text-lg">{t.testimonials.subtitle}</p>
      </div>

      <div 
        ref={scrollRef}
        className="flex overflow-x-hidden whitespace-nowrap py-4 cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {extendedTestimonials.map((testimonial, index) => (
          <div 
            key={index}
            className="inline-block min-w-[320px] md:min-w-[400px] bg-[#16161f] border border-[#1e1e2e] rounded-2xl p-8 mx-4 whitespace-normal transition-all duration-300 hover:border-[#2dd4bf]/30"
          >
            <div className="text-yellow-400 text-xl mb-4">★★★★★</div>
            <p className="text-[#94a3b8] italic leading-relaxed mb-8 text-lg">"{testimonial.quote}"</p>
            <div className="flex items-center gap-4">
              <img 
                src={`https://placehold.co/50x50/16161f/2dd4bf?text=${testimonial.name.split(' ').map(n => n[0]).join('')}`} 
                alt={testimonial.name} 
                className="w-12 h-12 rounded-full border-2 border-[#2dd4bf]"
              />
              <div>
                <div className="font-bold text-white">{testimonial.name}</div>
                <div className="text-[#2dd4bf] text-sm font-medium">{testimonial.city}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
