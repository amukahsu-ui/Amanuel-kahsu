import React from 'react';
import { Car, Phone, MessageCircle, MapPin, ShieldCheck, Award, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT_PHONE_1, CONTACT_PHONE_2, WA_NUMBER_1, WA_NUMBER_2 } from '../data/transportData';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-white border-t border-amber-500/20 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-md shadow-amber-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Car className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white">
                  MHH VIP
                </span>
                <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">
                  TRANSPORT JAZAN
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {t(
                'Safe, comfortable, and licensed VIP transportation for families, ladies, and students across Jazan region, Jeddah, Al Madinah, Sabya, Abu Arish, and all Saudi cities.',
                'خدمة توصيل ونقل فاخرة وآمنة للعائلات والطلاب والطالبات بين كافة محافظات جازان ومطارات جدة والمدينة المنورة بأسعار منافسة.'
              )}
            </p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <Award className="w-3.5 h-3.5" />
              <span>{t('15% Website Booking Discount', 'خصم 15% فوري للموقع')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-amber-400 uppercase tracking-wider">
              {t('Quick Navigation', 'روابط سريعة')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#services" className="hover:text-amber-400 transition-colors">{t('Services Catalog', 'قائمة الخدمات')}</a></li>
              <li><a href="#van-3d" className="hover:text-amber-400 transition-colors">{t('3D Hyundai i800 Specs', 'المواصفات 3D')}</a></li>
              <li><a href="#calculator" className="hover:text-amber-400 transition-colors">{t('Trip Price Calculator', 'حاسبة الأسعار')}</a></li>
              <li><a href="#airport" className="hover:text-amber-400 transition-colors">{t('Airport Transfers', 'توصيل المطارات')}</a></li>
              <li><a href="#coverage" className="hover:text-amber-400 transition-colors">{t('Cities & Coverage Map', 'مناطق التغطية')}</a></li>
              <li><a href="#booking" className="hover:text-amber-400 transition-colors">{t('Book Ride Form', 'نموذج الحجز المباشر')}</a></li>
            </ul>
          </div>

          {/* Direct Contacts */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-amber-400 uppercase tracking-wider">
              {t('Contact Numbers', 'أرقام التواصل والتوصيل')}
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block">{t('Main Line', 'الخط الرئيسي')}</span>
                  <span className="font-bold text-white">{CONTACT_PHONE_1}</span>
                </div>
                <a href={`tel:${CONTACT_PHONE_1}`} className="text-amber-400 font-bold hover:underline">{t('Call', 'اتصال')}</a>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block">{t('Second Line', 'الخط الثاني')}</span>
                  <span className="font-bold text-white">{CONTACT_PHONE_2}</span>
                </div>
                <a href={`tel:${CONTACT_PHONE_2}`} className="text-amber-400 font-bold hover:underline">{t('Call', 'اتصال')}</a>
              </div>
            </div>
          </div>

          {/* Regions & Location */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-amber-400 uppercase tracking-wider">
              {t('Operating Headquarters', 'منطقة الخدمة والتغطية')}
            </h4>
            <p className="text-xs text-slate-300 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{t('Jazan Region, Saudi Arabia — Serving Jazan, Jeddah, Al Madinah, Sabya, Abu Arish, Samtah, Baish & all districts.', 'منطقة جازان، المملكة العربية السعودية — نخدم جازان، جدة، المدينة المنورة، صبيا، أبو عريش، صامطة وكافة القرى.')}</span>
            </p>
            <p className="text-[11px] text-slate-400">
              {t('Vehicle: Hyundai i800 VIP Black Van (11 Seats, Dual A/C, 6 Suitcases)', 'المركبة: فان هيونداي i800 سوداء ملكية (11 راكب، مكيفين، 6 حقائب)')}
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>
            © 2026 MHH VIP TRANSPORT · Jazan, Saudi Arabia · {CONTACT_PHONE_1} · {CONTACT_PHONE_2}
          </p>
          <div className="flex items-center gap-4">
            <a href={`https://wa.me/${WA_NUMBER_1}`} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">
              WhatsApp 0555295362
            </a>
            <a href={`https://wa.me/${WA_NUMBER_2}`} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">
              WhatsApp 0566830405
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
