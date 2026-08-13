import React, { useState } from 'react';
import { MapPin, Navigation, Compass, ArrowRight, MessageCircle, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CITIES, WA_NUMBER_1 } from '../data/transportData';

export const RegionalMap: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCityId, setSelectedCityId] = useState<string>('jazan');

  const selectedCity = CITIES.find((c) => c.id === selectedCityId) || CITIES[0];

  return (
    <section id="coverage" className="py-16 bg-slate-950 border-b border-amber-500/20 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
            {t('Coverage & Destinations', 'مناطق التغطية والمدن المشمولة')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            {t('Serving All Jazan Regions & Highway Routes to Jeddah & Madinah', 'نغطي جميع محافظات جازان وطريق جازان - جدة - المدينة')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            {t(
              'Tap any city or governorate node below to inspect coverage, distances, and instant WhatsApp booking.',
              'اضغط على أي مدينة أو محافظة بالخريطة لمعاينة مسافة الطريق والحجز المباشر.'
            )}
          </p>
        </div>

        {/* Interactive Cities Grid + Detail Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Route Network Visualizer Box */}
          <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-6 border border-amber-500/30 shadow-2xl relative space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-sm text-white">
                  {t('Jazan & Saudi Highways Coverage Map', 'خريطة التغطية والمحافظات')}
                </h3>
              </div>
              <span className="text-[11px] text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded font-bold">
                {CITIES.length} {t('Cities & Hubs', 'مدن ومحافظات')}
              </span>
            </div>

            {/* City Nodes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {CITIES.map((city) => {
                const isSelected = city.id === selectedCityId;
                return (
                  <button
                    key={city.id}
                    onClick={() => setSelectedCityId(city.id)}
                    className={`p-3 rounded-xl text-xs font-bold text-start flex items-center justify-between transition-all border ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg scale-105'
                        : 'bg-slate-950 text-slate-200 border-slate-800 hover:border-amber-500/40 hover:text-amber-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className={`w-4 h-4 shrink-0 ${isSelected ? 'text-slate-950' : 'text-amber-400'}`} />
                      <span className="truncate">{t(city.nameEn, city.nameAr)}</span>
                    </div>
                    {city.isAirport && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase ${isSelected ? 'bg-slate-950 text-amber-400' : 'bg-amber-500/20 text-amber-300'}`}>
                        AIR
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-slate-400 text-center pt-2">
              {t('* We also reach all villages, corniche sites, and university campuses in Jazan region upon request.', '* نصل أيضاً لكافة القرى والأرياف والكورنيش والمقرات الجامعية والمستشفيات بحسب الطلب.')}
            </p>

          </div>

          {/* Selected City Details Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-amber-950/30 p-6 sm:p-8 rounded-2xl border border-amber-500/40 shadow-2xl space-y-6">
            
            <div className="space-y-2 border-b border-amber-500/20 pb-4">
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/30 uppercase">
                {t(selectedCity.regionEn, selectedCity.regionAr)}
              </span>
              <h3 className="text-2xl font-black text-white">
                {t(selectedCity.nameEn, selectedCity.nameAr)}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t(
                `Daily VIP family transport, student subscriptions, and 24/7 airport transfers connecting ${selectedCity.nameEn} with all Saudi cities. Fixed fair rates and strong A/C guaranteed.`,
                `تتوفر خدمة النقل الفاخر للعائلات والطلاب وتوصيل المطار بصفة يومية من وإلى ${selectedCity.nameAr} بكافة الأحياء والقرى بأسعار منافسة وبخصم 15%.`
              )}
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                <span>{t('Service Availability:', 'توفر الخدمة:')}</span>
                <span className="text-emerald-400 font-bold">{t('24/7 Day & Night', '24 ساعة على مدار اليوم')}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                <span>{t('Vehicle Used:', 'نوع المركبة:')}</span>
                <span className="text-amber-400 font-bold">{t('Hyundai i800 VIP Van (11 Seats)', 'فان هيونداي i800 VIP')}</span>
              </div>
            </div>

            <a
              href={`https://wa.me/${WA_NUMBER_1}?text=${encodeURIComponent(
                t(`Hello MHH VIP Transport, I want to book a trip for: ${selectedCity.nameEn}`, `مرحباً MHH للنقل الفاخر، أود حجز مشوار من/إلى: ${selectedCity.nameAr}`)
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-950/50"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>{t(`Book Ride in ${selectedCity.nameEn}`, `احجز رحلتك إلى ${selectedCity.nameAr}`)}</span>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};
