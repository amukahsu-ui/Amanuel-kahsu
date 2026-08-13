import React from 'react';
import { Plane, Luggage, Clock, ShieldCheck, MapPin, CheckCircle2, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { WA_NUMBER_1 } from '../data/transportData';

export const AirportSection: React.FC = () => {
  const { t } = useLanguage();

  const vanHeroImg = "/src/assets/images/mhh_van_hero_1786578377678.jpg";

  return (
    <section id="airport" className="py-16 bg-slate-900 border-b border-amber-500/20 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl bg-slate-950 group">
              <img
                src={vanHeroImg}
                alt="Black Hyundai i800 VIP Van at Jazan Airport"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/90 backdrop-blur-md border border-amber-500/30">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1">
                  <Plane className="w-4 h-4" />
                  <span>{t('24/7 Airport Transfers', 'توصيل مطارات 24 ساعة')}</span>
                </div>
                <h4 className="text-sm font-extrabold text-white">
                  {t('Jazan · Jeddah · Al Madinah Airports', 'مطارات جازان · جدة · المدينة المنورة')}
                </h4>
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Plane className="w-4 h-4" />
              <span>{t('Airport Departures & Arrivals', 'توصيل واستقبال المطارات')}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              {t(
                'Stress-Free Airport Transfers with Flight Tracking & Luggage Help',
                'خدمة استقبال وتوصيل لمطارات جازان، جدة والمدينة مع متابعة الرحلات'
              )}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t(
                'Departures and arrivals for Jazan King Abdullah Airport, Jeddah King Abdulaziz (KAIA), and Al Madinah Prince Mohammed bin Abdulaziz Airport. We monitor your flight schedule, wait for delays, and assist with up to 6 large suitcases.',
                'استقبال وتوصيل لمطارات جازان، جدة، والمدينة المنورة. نتابع مواعيد الطيران وننتظر في حال التأخير ونساعد بحمل الحقائب حتى 6 شنط سفر كبيرة بكل سهولة.'
              )}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-200">
                  {t('Free waiting time for delayed flights', 'انتظار مجاني في حال تأخر الرحلة')}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                <Luggage className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-200">
                  {t('Fits up to 6 large suitcases easily', 'تتسع لـ 6 حقائب سفر كبيرة')}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-200">
                  {t('Pick-up from home, hotel or any district', 'الاستقبال من المنزل أو الفندق أو أي حي')}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-200">
                  {t('Fixed price agreed before the trip', 'سعر ثابت ومحدد مسبقاً قبل الرحلة')}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${WA_NUMBER_1}?text=${encodeURIComponent(
                  t('Hello MHH VIP Transport, I want to book an Airport Transfer with 15% discount.', 'مرحباً MHH للنقل الفاخر، أود حجز توصيل مطار بخصم 15%')
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-xl transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>{t('Book Airport Transfer on WhatsApp', 'احجز توصيل المطار عبر الواتساب')}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
