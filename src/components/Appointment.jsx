import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, Clock, Phone, Video, CheckCircle, Loader2 } from 'lucide-react';
import doctorData from '../data/content.js';
import { useLanguage } from '../context/LanguageContext';

const Appointment = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const infoItems = [
    { icon: <MapPin size={20} />, label: t.footer.contactInfo, value: t.doctor.chamber },
    { icon: <Clock size={20} />, label: t.appointment.hours, value: t.doctor.availableDays },
    { icon: <Phone size={20} />, label: t.appointment.phone, value: doctorData.phone },
    { icon: <Video size={20} />, label: t.services.online.title, value: t.services.online.desc },
  ];

  const fieldClasses = "w-full bg-gray-50 dark:bg-[#16161f] border border-gray-200 dark:border-[#1e1e2e] rounded-xl px-4 py-3 text-[#0a0a0f] dark:text-white focus:border-[#2dd4bf] focus:outline-none transition-colors placeholder:text-[#94a3b8]";

  return (
    <section id="appointment" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12 lg:gap-20">
        
        {/* Left Info Panel */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <span className="text-[#2dd4bf] text-sm font-bold uppercase tracking-[0.2em]">
              {t.appointment.badge}
            </span>
            <h2 className="text-4xl font-heading font-bold text-[#0a0a0f] dark:text-white leading-tight">
              {t.appointment.title}
            </h2>
            <p className="text-[#4b5563] dark:text-[#94a3b8] text-lg">
              {t.appointment.subtitle}
            </p>
          </div>

          <div className="space-y-6">
            {infoItems.map((item, index) => (
              <div key={index} className={`flex gap-4 items-start ${index !== infoItems.length - 1 ? 'border-b border-gray-100 dark:border-[#1e1e2e] pb-6' : ''}`}>
                <div className="text-[#2dd4bf] mt-1">{item.icon}</div>
                <div>
                  <div className="text-[#0a0a0f] dark:text-white font-semibold text-sm uppercase tracking-wider mb-1">{item.label}</div>
                  <div className="text-[#4b5563] dark:text-[#94a3b8]">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="lg:col-span-3">
          <div className="bg-gray-50 dark:bg-[#111118] border border-gray-100 dark:border-[#1e1e2e] p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <div className="bg-[#2dd4bf]/10 p-4 rounded-full">
                  <CheckCircle className="text-[#2dd4bf]" size={48} />
                </div>
                <h3 className="text-2xl font-bold text-[#0a0a0f] dark:text-white">{t.appointment.success}</h3>
                <p className="text-[#4b5563] dark:text-[#94a3b8] max-w-xs">
                  {t.appointment.success}
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="text-[#2dd4bf] font-semibold hover:underline mt-4"
                >
                  {t.hero.bookButton}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <input
                      type="text"
                      placeholder={t.appointment.fullName}
                      className={fieldClasses}
                      {...register("name", { required: true, minLength: 3 })}
                    />
                    {errors.name && <p className="text-red-400 text-xs">{t.appointment.required}</p>}
                  </div>
                  <div className="space-y-1">
                    <input
                      type="tel"
                      placeholder={t.appointment.phone}
                      className={fieldClasses}
                      {...register("phone", { 
                        required: true, 
                        pattern: /^(?:\+88|88)?(01[3-9]\d{8})$/
                      })}
                    />
                    {errors.phone && <p className="text-red-400 text-xs">{t.appointment.invalidPhone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <input
                      type="email"
                      placeholder={t.appointment.email}
                      className={fieldClasses}
                      {...register("email", { 
                        required: true, 
                        pattern: /^\S+@\S+$/i
                      })}
                    />
                    {errors.email && <p className="text-red-400 text-xs">{t.appointment.invalidEmail}</p>}
                  </div>
                  <div className="space-y-1">
                    <select
                      className={fieldClasses}
                      {...register("type", { required: true })}
                    >
                      <option value="">{t.appointment.type}</option>
                      <option value="In-Person">{t.appointment.inPerson}</option>
                      <option value="Online">{t.appointment.online}</option>
                    </select>
                    {errors.type && <p className="text-red-400 text-xs">{t.appointment.required}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <input
                      type="date"
                      className={`${fieldClasses} [color-scheme:light] dark:[color-scheme:dark]`}
                      {...register("date", { required: true })}
                    />
                    {errors.date && <p className="text-red-400 text-xs">{t.appointment.required}</p>}
                  </div>
                  <div className="space-y-1">
                    <select
                      className={fieldClasses}
                      {...register("time", { required: true })}
                    >
                      <option value="">{t.appointment.time}</option>
                      {t.appointment.timeSlots.map((slot, i) => (
                        <option key={i} value={slot}>{slot}</option>
                      ))}
                    </select>
                    {errors.time && <p className="text-red-400 text-xs">{t.appointment.required}</p>}
                  </div>
                </div>

                <div className="space-y-1">
                  <textarea
                    placeholder={t.appointment.message}
                    rows={4}
                    className={fieldClasses}
                    {...register("problem")}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#2dd4bf] text-[#0a0a0f] font-bold py-4 rounded-xl hover:bg-[#14b8a6] transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-[#2dd4bf]/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      {t.appointment.submitting}
                    </>
                  ) : (
                    `${t.appointment.submit} →`
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
