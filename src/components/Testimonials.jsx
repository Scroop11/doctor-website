import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Testimonials = () => {
  const { t } = useLanguage();
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate for seamless scroll
  const extendedTestimonials = React.useMemo(() => 
    [...t.testimonials.items, ...t.testimonials.items], 
    [t.testimonials.items]
  );

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId;
    const scroll = () => {
      if (!isPaused) {
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += 1;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  return (
    <section className="py-24 bg-white dark:bg-secondary overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <h2 className="text-4xl font-heading font-bold text-[#0a0a0f] dark:text-white mb-4">{t.testimonials.title}</h2>
        <p className="text-[#4b5563] dark:text-[#94a3b8] text-lg">{t.testimonials.subtitle}</p>
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
            className="inline-block min-w-[320px] md:min-w-[400px] bg-gray-50 dark:bg-[#16161f] border border-gray-100 dark:border-[#1e1e2e] rounded-2xl p-8 mx-4 whitespace-normal transition-all duration-300 hover:border-[#2dd4bf]/30 shadow-sm dark:shadow-none"
          >
            <div className="text-yellow-500 text-xl mb-4">★★★★★</div>
            <p className="text-[#4b5563] dark:text-[#94a3b8] italic leading-relaxed mb-8 text-lg">"{testimonial.quote}"</p>
            <div className="flex items-center gap-4">
              <img 
                src={`https://placehold.co/50x50/2dd4bf/ffffff?text=${testimonial.name.split(' ').map(n => n[0]).join('')}`} 
                alt={testimonial.name} 
                className="w-12 h-12 rounded-full border-2 border-[#2dd4bf] shadow-md shadow-[#2dd4bf]/10"
              />
              <div>
                <div className="font-bold text-[#0a0a0f] dark:text-white">{testimonial.name}</div>
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
