import React from 'react';
import { GraduationCap, ShoppingBag, MapPin, Plane, Car, Users, ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SERVICES, WA_NUMBER_1 } from '../data/transportData';

export const ServicesSection: React.FC = () => {
  const { t } = useLanguage();

  const getIcon = (name: string) => {
    switch (name) {
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-amber-400" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-6 h-6 text-amber-400" />;
      case 'MapPin':
        return <MapPin className="w-6 h-6 text-amber-400" />;
      case 'Plane':
        return <Plane className="w-6 h-6 text-amber-400" />;
      case 'Car':
        return <Car className="w-6 h-6 text-amber-400" />;
      case 'Users':
      default:
        return <Users className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="services" className="py-16 bg-slate-950 text-white border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
            {t('VIP Transport Services', 'خدمات النقل الفاخر')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            {t('Comprehensive Transport Solutions in Jazan & KSA', 'خدمات توصيل شاملة ومجهزة بكافة سبل الراحة')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            {t(
              'From daily student pick-ups to long-distance city transfers and 24/7 airport transfers in private 11-seater Hyundai i800 VIP van.',
              'نلبي جميع احتياجات نقل العائلات، الطالبات، المدارس، والمطارات عبر فان هيونداي سوداء مكيفة ومجهزة.'
            )}
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all hover:-translate-y-1 group flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(srv.icon)}
                  </div>
                  {srv.tagEn && (
                    <span className="text-[11px] font-bold text-amber-400 bg-slate-950 px-2.5 py-1 rounded-full border border-amber-500/30">
                      {t(srv.tagEn, srv.tagAr!)}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {t(srv.titleEn, srv.titleAr)}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t(srv.descEn, srv.descAr)}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                  <Check className="w-4 h-4 text-emerald-400" />
                  {t('15% Discount Applied', 'خصم 15% متاح')}
                </span>

                <a
                  href={`https://wa.me/${WA_NUMBER_1}?text=${encodeURIComponent(
                    t(`Hello MHH VIP Transport, I want to book: ${srv.titleEn}`, `مرحباً MHH للنقل الفاخر، أود الاستفسار وحجز خدمة: ${srv.titleAr}`)
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 group-hover:underline"
                >
                  <span>{t('Book Service', 'طلب الخدمة')}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
