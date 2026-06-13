import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border border-gray-100 dark:border-[#1e1e2e] rounded-xl mb-4 overflow-hidden bg-gray-50 dark:bg-[#16161f] shadow-sm dark:shadow-none">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 dark:hover:bg-[#1e1e2e] transition-colors"
      >
        <span className="font-semibold text-[#0a0a0f] dark:text-white md:text-lg">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[#2dd4bf] flex-shrink-0 ml-4"
        >
          <ChevronDown size={24} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="text-[#4b5563] dark:text-[#94a3b8] px-5 pb-6 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-primary transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-[#0a0a0f] dark:text-white mb-4">{t.faq.title}</h2>
          <div className="w-20 h-1 bg-[#2dd4bf] mx-auto rounded-full"></div>
        </div>

        <div className="space-y-4">
          {t.faq.items.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.q}
              answer={faq.a}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
