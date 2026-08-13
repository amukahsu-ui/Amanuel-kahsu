import React from 'react';
import { ShieldCheck, Snowflake, Users, Briefcase, Phone, MessageCircle, Sparkles, ChevronDown, CheckCircle2, Award, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT_PHONE_1, CONTACT_PHONE_2, WA_NUMBER_1 } from '../data/transportData';

interface HeroProps {
  onOpenAI: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAI }) => {
  const { t } = useLanguage();

  const heroVanImg = "/src/assets/images/mhh_van_hero_1786578377678.jpg";
  const jazanCoastImg = "/src/assets/images/mhh_jazan_coast_1786578391566.jpg";

  return (
    <section className="relative min-h-[85vh] flex items-center bg-slate-950 text-white overflow-hidden py-12 lg:py-20 border-b border-amber-500/20">
      {/* Background Lighting & Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-25 bg-cover bg-center mix-blend-luminosity scale-105 filter blur-[1px]" style={{ backgroundImage: `url(${jazanCoastImg})` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/70 z-0" />
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold tracking-wide">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{t('Licensed VIP Family & Student Transport in Saudi Arabia', 'مرخص وآمن لنقل العائلات والطلاب في جازان وكافة المناطق')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {t('Safe & Comfortable VIP Rides for Families & Students', 'رحلات VIP آمنة ومريحة للعائلات والطلاب والمعلمات')}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t(
                'Private Hyundai i800 VIP van serving Jazan, Jeddah, Al Madinah, Sabya, Abu Arish, Samtah, Baish and all Jazan districts, plus 24/7 airport transfers with flight tracking.',
                'فان هيونداي i800 VIP مخصصة للتوصيل بين جازان، جدة، المدينة المنورة، صبيا، أبو عريش، صامطة، الدرب وكافة محافظات جازان والمطارات أسعار ثابتة ومواعيد دقيقة.'
              )}
            </p>

            {/* Special 15% Discount Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/80 via-amber-900/40 to-slate-900 border border-amber-500/40 shadow-lg shadow-amber-950/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold text-sm shrink-0">
                  15%
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-300">
                    {t('Special Website Offer: 15% Off', 'عرض خاص: خصم 15% عند الحجز بالموقع')}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {t('Get 15% discount on city trips, airport transfers & monthly passes.', 'خصم مباشر 15% على السفريات، توصيل المطارات واشتراكات المدارس.')}
                  </p>
                </div>
              </div>
              <a
                href="#calculator"
                className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 whitespace-nowrap transition-colors"
              >
                {t('Calculate Fare', 'حساب السعر')}
              </a>
            </div>

            {/* Core Feature Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <Users className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                <span className="text-xs font-bold block text-white">{t('11 VIP Seats', '11 راكب VIP')}</span>
                <span className="text-[10px] text-slate-400">{t('Spacious & Clean', 'واسع ونظيف')}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <Snowflake className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                <span className="text-xs font-bold block text-white">{t('Strong A/C', 'تكييف بوري قوي')}</span>
                <span className="text-[10px] text-slate-400">{t('Front + Rear Vents', 'أمامي وخلفي')}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <Briefcase className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                <span className="text-xs font-bold block text-white">{t('6 Suitcases', '6 حقائب كبيرة')}</span>
                <span className="text-[10px] text-slate-400">{t('Large Trunk', 'شنطة واسعة')}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <Clock className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <span className="text-xs font-bold block text-white">{t('Punctual 24/7', 'دقة بالإنضباط')}</span>
                <span className="text-[10px] text-slate-400">{t('Always On Time', 'على الوقت تماماً')}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                href={`https://wa.me/${WA_NUMBER_1}?text=${encodeURIComponent(t('Hello MHH VIP Transport, I want to book a trip with 15% discount.', 'مرحباً MHH للنقل الفاخر، أود حجز رحلة بخصم 15%'))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/50 transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>{t('Book via WhatsApp (15% Off)', 'حجز واتساب فوري (خصم 15%)')}</span>
              </a>

              <a
                href={`tel:${CONTACT_PHONE_1}`}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-400 font-bold text-sm transition-all"
              >
                <Phone className="w-5 h-5" />
                <span>{t('Call Now: 0555295362', 'اتصال مباشر: 0555295362')}</span>
              </a>

              <button
                onClick={onOpenAI}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-indigo-950 hover:bg-indigo-900 border border-indigo-500/50 text-indigo-200 font-bold text-sm transition-all shadow-lg shadow-indigo-950/40"
              >
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>{t('Chat with AI Concierge', 'استفسر مع الذكاء الاصطناعي')}</span>
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t('Fixed Fair Prices', 'أسعار معلنة وثابتة')}</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t('Family Privacy', 'خصوصية تامة للعوائل')}</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t('Direct WhatsApp', 'رد سريع بالواتساب')}</span>
              </div>
            </div>

          </div>

          {/* Right Image Showcase Column */}
          <div className="lg:col-span-5 relative">
            {/* VIP Card Wrapper */}
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-slate-900 shadow-2xl group">
              <img
                src={heroVanImg}
                alt="MHH Black Hyundai i800 VIP Van in Jazan"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Floating Vehicle Info Tag */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/90 backdrop-blur-md border border-amber-500/30 text-white flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block">
                    HYUNDAI i800 VIP EDITION
                  </span>
                  <h3 className="text-sm font-extrabold text-white">
                    {t('Black Executive Van — 11 Seats', 'فان هيونداي الملكية السوداء - 11 راكب')}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {t('Jazan · Jeddah · Madinah · Airport', 'جازان · جدة · المدينة المنورة · المطار')}
                  </p>
                </div>
                <a
                  href="#van-3d"
                  className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
                >
                  {t('3D View', 'معاينة 3D')}
                </a>
              </div>
            </div>

            {/* Floating Contact Card */}
            <div className="mt-4 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-semibold text-white">{t('Driver Status: Ready for booking', 'حالة السائق: جاهز للتوصيل والخدمة')}</span>
              </div>
              <span className="text-amber-400 font-bold">{CONTACT_PHONE_1}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
