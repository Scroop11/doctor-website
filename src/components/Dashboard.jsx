import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  User, 
  LogOut, 
  ChevronRight, 
  Download, 
  Activity, 
  Clock,
  ShieldCheck,
  Bell,
  Menu,
  X,
  Sun,
  Moon,
  Home
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Navigate, Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { isLoggedIn, patientId, logout } = useAuth();
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const menuItems = [
    { id: 'overview', label: t.dashboard.overview, icon: LayoutDashboard },
    { id: 'prescriptions', label: t.dashboard.myPrescriptions, icon: FileText },
    { id: 'appointments', label: t.dashboard.appointments, icon: Calendar },
    { id: 'profile', label: t.dashboard.profile, icon: User },
  ];

  const stats = [
    { label: t.dashboard.stats.visits, value: '12', icon: Activity, color: 'text-blue-500' },
    { label: t.dashboard.stats.prescriptions, value: '05', icon: FileText, color: 'text-[#2dd4bf]' },
    { label: t.dashboard.stats.nextAppt, value: 'Oct 24', icon: Clock, color: 'text-purple-500' },
  ];

  const Sidebar = () => (
    <div className={`
      ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      fixed lg:sticky top-0 left-0 w-64 bg-white dark:bg-[#111118] border-r border-gray-100 dark:border-[#1e1e2e] flex flex-col h-screen z-[100] transition-transform duration-300
    `}>
      <div className="p-6 border-b border-gray-100 dark:border-[#1e1e2e] flex items-center justify-between">
        <Link to="/" className="text-[#2dd4bf] font-heading text-xl font-bold">
          {t.doctor.name}
        </Link>
        <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-[#4b5563] dark:text-[#94a3b8]">
          <X size={24} />
        </button>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              window.scrollTo(0, 0);
              if (window.innerWidth < 1024) setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'bg-[#2dd4bf] text-[#0a0a0f] font-bold shadow-lg shadow-[#2dd4bf]/20' 
                : 'text-[#4b5563] dark:text-[#94a3b8] hover:bg-gray-100 dark:hover:bg-white/5 hover:text-[#0a0a0f] dark:hover:text-white'
            }`}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100 dark:border-[#1e1e2e] space-y-2">
        <button 
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#4b5563] dark:text-[#94a3b8] hover:bg-gray-100 dark:hover:bg-white/5 transition-all font-medium focus:outline-none focus:ring-2 focus:ring-[#2dd4bf]"
        >
          <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
             <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -10, opacity: 0, rotate: -45 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 10, opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </motion.div>
             </AnimatePresence>
          </div>
          {theme === 'dark' ? t.dashboard.lightMode : t.dashboard.darkMode}
        </button>
        <button 
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#4b5563] dark:text-[#94a3b8] hover:bg-gray-100 dark:hover:bg-white/5 transition-all font-medium"
        >
          <Home size={20} />
          {t.nav.home}
        </button>
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all font-medium"
        >
          <LogOut size={20} />
          {t.nav.logout}
        </button>
      </div>
    </div>
  );

  const Header = () => (
    <header className="h-20 border-b border-gray-100 dark:border-[#1e1e2e] flex items-center justify-between px-4 lg:px-8 bg-white/80 dark:bg-[#0a0a0f]/50 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-[#0a0a0f] dark:text-white p-2">
          <Menu size={24} />
        </button>
        <div>
          <h2 className="text-xl font-bold text-[#0a0a0f] dark:text-white capitalize">{menuItems.find(m => m.id === activeTab)?.label || activeTab}</h2>
          <p className="text-[10px] lg:text-xs text-[#4b5563] dark:text-[#4b5563] font-medium">{t.dashboard.welcome}, {patientId}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="hidden sm:block p-2 text-[#4b5563] dark:text-[#94a3b8] hover:text-[#0a0a0f] dark:hover:text-white transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0a0a0f]"></span>
        </button>
        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-tr from-[#2dd4bf] to-blue-500 flex items-center justify-center font-bold text-[#0a0a0f] text-sm lg:text-base shadow-lg shadow-[#2dd4bf]/20">
          {patientId.charAt(0)}
        </div>
      </div>
    </header>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#0a0a0f] transition-colors duration-300">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <Header />
        
        <div className="p-4 md:p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-[#111118] border border-gray-100 dark:border-[#1e1e2e] p-6 rounded-3xl group hover:border-[#2dd4bf]/50 transition-all shadow-sm dark:shadow-none">
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-2xl bg-white dark:bg-white/5 ${stat.color}`}>
                          <stat.icon size={24} />
                        </div>
                        <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full font-bold">+12%</span>
                      </div>
                      <h3 className="text-[#4b5563] dark:text-[#94a3b8] text-sm font-bold mb-1">{stat.label}</h3>
                      <p className="text-3xl font-bold text-[#0a0a0f] dark:text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Main Content Area */}
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-gray-50 dark:bg-[#111118] border border-gray-100 dark:border-[#1e1e2e] rounded-3xl overflow-hidden shadow-sm dark:shadow-none">
                      <div className="p-6 border-b border-gray-100 dark:border-[#1e1e2e] flex justify-between items-center">
                        <h3 className="font-bold text-[#0a0a0f] dark:text-white">{t.dashboard.recentPrescriptions}</h3>
                        <button className="text-[#2dd4bf] text-sm font-bold hover:underline">{t.dashboard.viewAll}</button>
                      </div>
                      <div className="divide-y divide-gray-100 dark:divide-[#1e1e2e]">
                        {[1, 2, 3].map((_, i) => (
                          <div key={i} className="p-4 flex items-center justify-between hover:bg-white dark:hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-[#2dd4bf]/10 flex items-center justify-center text-[#2dd4bf]">
                                <FileText size={20} />
                              </div>
                              <div>
                                <h4 className="text-[#0a0a0f] dark:text-white font-bold text-sm">{t.dashboard.generalCheckup}</h4>
                                <p className="text-xs text-[#4b5563] dark:text-[#4b5563] font-medium">{t.doctor.name} • 12 Oct 2023</p>
                              </div>
                            </div>
                            <button className="p-2 text-[#4b5563] dark:text-[#94a3b8] hover:text-[#2dd4bf] transition-colors">
                              <Download size={18} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-[#2dd4bf] to-blue-600 rounded-3xl p-6 text-white relative overflow-hidden group shadow-lg shadow-[#2dd4bf]/20">
                      <ShieldCheck className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 rotate-12 group-hover:scale-110 transition-transform" />
                      <h3 className="text-xl font-bold mb-2">{t.dashboard.bmdcTitle}</h3>
                      <p className="text-sm font-medium opacity-90 mb-6">{t.dashboard.bmdcDesc}</p>
                      <button className="bg-white text-[#0a0a0f] px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all">
                        {t.dashboard.viewSecurity}
                      </button>
                    </div>

                    <div className="bg-gray-50 dark:bg-[#111118] border border-gray-100 dark:border-[#1e1e2e] rounded-3xl p-6 shadow-sm dark:shadow-none">
                      <h3 className="font-bold text-[#0a0a0f] dark:text-white mb-4">{t.dashboard.support}</h3>
                      <p className="text-sm text-[#4b5563] dark:text-[#94a3b8] mb-4">{t.dashboard.supportDesc}</p>
                      <button className="w-full border border-gray-200 dark:border-[#1e1e2e] text-[#0a0a0f] dark:text-white py-3 rounded-xl font-bold text-sm hover:bg-white dark:hover:bg-white/5 transition-all">
                        {t.dashboard.contactAssistant}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'prescriptions' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-50 dark:bg-[#111118] border border-gray-100 dark:border-[#1e1e2e] rounded-3xl p-8 text-center shadow-sm dark:shadow-none"
              >
                <div className="inline-flex p-4 rounded-full bg-[#2dd4bf]/10 text-[#2dd4bf] mb-6">
                  <FileText size={48} />
                </div>
                <h2 className="text-2xl font-bold text-[#0a0a0f] dark:text-white mb-2">{t.dashboard.myPrescriptions}</h2>
                <p className="text-[#4b5563] dark:text-[#94a3b8] mb-8 max-w-md mx-auto">{t.dashboard.accessDesc}</p>
                <div className="grid gap-4 max-w-2xl mx-auto">
                   <div className="bg-white dark:bg-[#0a0a0f] border border-gray-100 dark:border-[#1e1e2e] p-4 rounded-2xl flex items-center justify-between">
                     <div className="text-left">
                       <p className="text-[#0a0a0f] dark:text-white font-bold">P-12345_Prescription_Oct23.pdf</p>
                       <p className="text-xs text-[#4b5563] dark:text-[#4b5563] font-medium">{t.dashboard.size}: 1.2 MB • {t.dashboard.date}: Oct 23, 2023</p>
                     </div>
                     <button className="bg-[#2dd4bf] text-[#0a0a0f] px-4 py-2 rounded-lg font-bold text-sm shadow-md shadow-[#2dd4bf]/20">{t.prescription.download.button}</button>
                   </div>
                </div>
              </motion.div>
            )}
            
            {/* Other tabs can follow same pattern */}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
