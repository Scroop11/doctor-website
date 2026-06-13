import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Search, CheckCircle, FileText, Loader2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const PrescriptionSystem = () => {
  const { t } = useLanguage();
  const { patientId: authPatientId } = useAuth();
  const [patientId, setPatientId] = useState(authPatientId || '');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (authPatientId) {
      setPatientId(authPatientId);
    }
  }, [authPatientId]);

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!patientId) return;
    
    setIsSearching(true);
    setSearchError('');
    
    // Simulate API search
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demonstration, only "P-12345" works
    if (patientId.toUpperCase() === 'P-12345') {
      // Simulate file download
      const link = document.createElement('a');
      link.href = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
      link.download = `Prescription_${patientId}.pdf`;
      link.target = "_blank";
      link.click();
    } else {
      setSearchError(t.prescription.download.notFound);
    }
    setIsSearching(false);
  };

  const handleSubmitConsultation = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const fieldClasses = "w-full bg-white dark:bg-[#0a0a0f] border border-gray-200 dark:border-[#1e1e2e] rounded-xl px-4 py-3 text-[#0a0a0f] dark:text-white focus:border-[#2dd4bf] focus:outline-none transition-colors placeholder:text-[#94a3b8]";

  return (
    <section id="prescriptions" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-primary border-t border-gray-100 dark:border-[#1e1e2e] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Side: Online Consultation Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-[#2dd4bf] text-sm font-bold uppercase tracking-[0.2em]">
                {t.prescription.consultation.badge}
              </span>
              <h2 className="text-4xl font-heading font-bold text-[#0a0a0f] dark:text-white leading-tight">
                {t.prescription.consultation.title}
              </h2>
              <p className="text-[#4b5563] dark:text-[#94a3b8] text-lg">
                {t.prescription.consultation.subtitle}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-[#111118] border border-gray-100 dark:border-[#1e1e2e] p-8 rounded-3xl relative overflow-hidden shadow-xl dark:shadow-none">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                  <div className="bg-[#2dd4bf]/10 p-4 rounded-full">
                    <CheckCircle className="text-[#2dd4bf]" size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0a0a0f] dark:text-white">{t.prescription.consultation.success}</h3>
                </div>
              ) : (
                <form onSubmit={handleSubmitConsultation} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[#0a0a0f] dark:text-white font-medium text-sm">{t.prescription.consultation.symptoms}</label>
                    <textarea 
                      rows={4}
                      className={fieldClasses}
                      placeholder="..."
                      required
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[#0a0a0f] dark:text-white font-medium text-sm">{t.prescription.consultation.attachments}</label>
                    <div className="relative group">
                      <input 
                        type="file" 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        multiple
                      />
                      <div className="border-2 border-dashed border-gray-100 dark:border-[#1e1e2e] group-hover:border-[#2dd4bf] rounded-xl p-8 transition-colors flex flex-col items-center gap-3">
                        <Upload className="text-[#94a3b8] group-hover:text-[#2dd4bf] transition-colors" size={32} />
                        <span className="text-[#94a3b8] text-sm">{t.prescription.consultation.attachments}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#2dd4bf] text-[#0a0a0f] font-bold py-4 rounded-xl hover:bg-[#14b8a6] transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-[#2dd4bf]/20"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <FileText size={20} />}
                    {t.prescription.consultation.submit}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right Side: Download Prescription Portal */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-[#2dd4bf] text-sm font-bold uppercase tracking-[0.2em]">
                {t.prescription.download.badge}
              </span>
              <h2 className="text-4xl font-heading font-bold text-[#0a0a0f] dark:text-white leading-tight">
                {t.prescription.download.title}
              </h2>
              <p className="text-[#4b5563] dark:text-[#94a3b8] text-lg">
                {t.prescription.download.subtitle}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-[#111118] border border-gray-100 dark:border-[#1e1e2e] p-8 rounded-3xl shadow-xl dark:shadow-none">
              <form onSubmit={handleDownload} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4b5563]" size={20} />
                    <input 
                      type="text" 
                      value={patientId}
                      onChange={(e) => setPatientId(e.target.value)}
                      placeholder={t.prescription.download.placeholder}
                      className={`${fieldClasses} pl-12`}
                      required
                    />
                  </div>
                  
                  {searchError && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 p-4 rounded-xl flex items-center gap-3 text-sm"
                    >
                      <AlertCircle size={18} />
                      {searchError}
                    </motion.div>
                  )}
                </div>

                <button 
                  type="submit"
                  disabled={isSearching}
                  className="w-full bg-[#2dd4bf] text-[#0a0a0f] font-bold py-4 rounded-xl hover:bg-[#14b8a6] transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-[#2dd4bf]/20"
                >
                  {isSearching ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
                  {t.prescription.download.button}
                </button>

                <div className="pt-6 border-t border-gray-100 dark:border-[#1e1e2e]">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-[#0a0a0f] border border-gray-100 dark:border-[#1e1e2e]">
                    <div className="bg-[#2dd4bf]/10 p-2.5 rounded-lg">
                      <AlertCircle className="text-[#2dd4bf]" size={20} />
                    </div>
                    <div className="text-xs text-[#4b5563] dark:text-[#94a3b8] leading-relaxed">
                      {t.nav.testId} <span className="text-[#0a0a0f] dark:text-white font-mono">{authPatientId || 'P-12345'}</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default PrescriptionSystem;
