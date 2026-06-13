import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogIn, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [patientId, setPatientId] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (patientId.toUpperCase() === 'P-12345') {
      login(patientId);
      onClose();
      navigate('/dashboard');
    } else {
      setError(t.prescription.download.notFound);
    }
    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0a0a0f]/40 dark:bg-black/80 backdrop-blur-sm z-[200]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-4 md:p-6 z-[201]"
          >
            <div className="bg-white dark:bg-[#111118] border border-gray-100 dark:border-[#1e1e2e] rounded-3xl p-8 shadow-2xl relative overflow-hidden transition-colors duration-300">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-[#4b5563] dark:text-[#94a3b8] hover:text-[#0a0a0f] dark:hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="inline-flex p-3 rounded-2xl bg-[#2dd4bf]/10 text-[#2dd4bf] mb-2">
                    <LogIn size={28} />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0a0a0f] dark:text-white">{t.nav.patientLogin}</h2>
                  <p className="text-[#4b5563] dark:text-[#94a3b8]">{t.nav.patientLoginSubtitle}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#4b5563] dark:text-[#94a3b8]">{t.nav.patientId}</label>
                    <input
                      type="text"
                      value={patientId}
                      onChange={(e) => setPatientId(e.target.value)}
                      placeholder={t.nav.idPlaceholder}
                      className="w-full bg-gray-50 dark:bg-[#0a0a0f] border border-gray-200 dark:border-[#1e1e2e] rounded-xl px-4 py-3 text-[#0a0a0f] dark:text-white focus:border-[#2dd4bf] focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-500 dark:text-red-400 bg-red-500/10 p-3 rounded-lg text-sm border border-red-500/20"
                    >
                      <AlertCircle size={16} />
                      {error}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#2dd4bf] text-[#0a0a0f] font-bold py-3.5 rounded-xl hover:bg-[#14b8a6] transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-[#2dd4bf]/20"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <LogIn size={20} />}
                    {t.nav.login}
                  </button>
                </form>

                <div className="pt-4 border-t border-gray-100 dark:border-[#1e1e2e] text-center">
                  <p className="text-xs text-[#94a3b8]">
                    {t.nav.testId} <span className="text-[#0a0a0f] dark:text-white font-mono">P-12345</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
