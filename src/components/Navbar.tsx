import React, { useState } from 'react';
import { Phone, MessageCircle, Globe, Menu, X, Car, Sparkles, QrCode, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT_PHONE_1, WA_NUMBER_1 } from '../data/transportData';

interface NavbarProps {
  onOpenQR: () => void;
  onOpenAI: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQR, onOpenAI }) => {
  const { lang, toggleLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#services', label: t('Services', 'الخدمات') },
    { href: '#van-3d', label: t('3D Vehicle', 'السيارة 3D') },
    { href: '#calculator', label: t('Price Calculator', 'حاسبة الأسعار') },
    { href: '#airport', label: t('Airport Transfers', 'المطارات') },
    { href: '#coverage', label: t('Cities Served', 'المدن والتغطية') },
    { href: '#booking', label: t('Book Ride', 'حجز رحلة') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-amber-500/20 text-white shadow-lg transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-slate-950 px-4 py-1.5 text-xs md:text-sm font-semibold flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="bg-slate-950 text-amber-400 px-2 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase">
            15% OFF
          </span>
          <span>{t('Book via website & enjoy 15% discount on all city trips & airport transfers!', 'احجز عبر الموقع واحصل على خصم 15% فوري على كافة السفرات ونقل المطارات!')}</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs">
          <button 
            onClick={onOpenQR} 
            className="flex items-center gap-1 hover:underline cursor-pointer bg-slate-950/20 px-2 py-0.5 rounded"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>{t('QR Code & Contact', 'رمز QR والاتصال')}</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Car className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                MHH
              </span>
              <span className="text-xs px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold rounded-full">
                VIP
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide">
              {t('VIP TRANSPORT JAZAN', 'النقل الفاخر بجازان والمملكة')}
            </p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-slate-300 hover:text-amber-400 transition-colors py-1 border-b-2 border-transparent hover:border-amber-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Switch */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-slate-200 text-xs font-semibold transition-all"
            title="Switch Language / تغيير اللغة"
          >
            <Globe className="w-4 h-4 text-amber-400" />
            <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
          </button>

          {/* AI Concierge Launcher */}
          <button
            onClick={onOpenAI}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/80 border border-indigo-500/40 text-indigo-200 text-xs font-semibold hover:bg-indigo-900 transition-all shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{t('AI Assistant', 'مساعد الذكاء الاصطناعي')}</span>
          </button>

          {/* Call Direct */}
          <a
            href={`tel:${CONTACT_PHONE_1}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:border-amber-500 text-xs font-semibold transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>{CONTACT_PHONE_1}</span>
          </a>

          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/${WA_NUMBER_1}?text=${encodeURIComponent(t('Hello MHH VIP Transport, I want to inquire about a ride with 15% discount.', 'مرحباً MHH للنقل الفاخر، أود الاستفسار عن حجز رحلة بخصم 15%'))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-900/30"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
            <span>{t('WhatsApp', 'واتساب')}</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleLang}
            className="px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded text-amber-400 font-bold"
          >
            {lang === 'ar' ? 'EN' : 'عربي'}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-amber-400 rounded-lg bg-slate-900 border border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-slate-950 border-b border-amber-500/20 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            <button
              onClick={() => { onOpenAI(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-indigo-950 border border-indigo-500/40 text-indigo-200 text-xs font-bold"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t('AI Assistant', 'مساعد AI')}</span>
            </button>
            <button
              onClick={() => { onOpenQR(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-slate-900 border border-slate-800 text-slate-200 text-xs font-bold"
            >
              <QrCode className="w-4 h-4 text-amber-400" />
              <span>{t('QR Code', 'رمز QR')}</span>
            </button>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-200 hover:text-amber-400 py-2 text-sm font-medium border-b border-slate-900"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 grid grid-cols-2 gap-2">
            <a
              href={`tel:${CONTACT_PHONE_1}`}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded bg-slate-900 text-amber-400 font-bold text-xs border border-slate-800"
            >
              <Phone className="w-4 h-4" />
              <span>0555295362</span>
            </a>
            <a
              href={`https://wa.me/${WA_NUMBER_1}?text=${encodeURIComponent(t('Hello MHH VIP Transport, I want to book a ride.', 'مرحباً MHH للنقل الفاخر، أود حجز رحلة'))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 rounded bg-emerald-600 text-white font-bold text-xs"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>{t('WhatsApp Book', 'حجز واتساب')}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
