import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Van3DViewer } from './components/Van3DViewer';
import { FareCalculator } from './components/FareCalculator';
import { ServicesSection } from './components/ServicesSection';
import { AirportSection } from './components/AirportSection';
import { RegionalMap } from './components/RegionalMap';
import { BookingForm } from './components/BookingForm';
import { Footer } from './components/Footer';
import { AIConcierge } from './components/AIConcierge';
import { ContactQRModal } from './components/ContactQRModal';
import { Sparkles, MessageCircle, Phone, QrCode } from 'lucide-react';
import { CONTACT_PHONE_1, WA_NUMBER_1 } from './data/transportData';

function AppContent() {
  const [aiOpen, setAiOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar onOpenQR={() => setQrOpen(true)} onOpenAI={() => setAiOpen(true)} />

      {/* Main Sections */}
      <main>
        <Hero onOpenAI={() => setAiOpen(true)} />
        <Van3DViewer />
        <FareCalculator />
        <ServicesSection />
        <AirportSection />
        <RegionalMap />
        <BookingForm />
      </main>

      {/* Footer */}
      <Footer />

      {/* AI Assistant Drawer */}
      <AIConcierge isOpen={aiOpen} onClose={() => setAiOpen(false)} />

      {/* QR Code & Contact Modal */}
      <ContactQRModal isOpen={qrOpen} onClose={() => setQrOpen(false)} />

      {/* Floating Action Buttons (Bottom Right / Left) */}
      <div className="fixed bottom-5 right-5 ltr:right-5 rtl:left-5 z-40 flex flex-col gap-3">
        {/* Floating AI Button */}
        <button
          onClick={() => setAiOpen(true)}
          className="p-3.5 rounded-full bg-indigo-900 border-2 border-indigo-400 text-amber-300 shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group relative"
          title="Open AI Concierge Assistant"
        >
          <Sparkles className="w-6 h-6 animate-pulse" />
          <span className="absolute right-14 rtl:left-14 rtl:right-auto bg-slate-900 text-slate-100 text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            مساعد AI الذكي
          </span>
        </button>

        {/* Floating WhatsApp Button */}
        <a
          href={`https://wa.me/${WA_NUMBER_1}?text=${encodeURIComponent('مرحباً MHH للنقل الفاخر، أود الاستفسار وحجز رحلة بخصم 15%')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-full bg-emerald-600 text-white shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group relative"
          title="Direct WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
          <span className="absolute right-14 rtl:left-14 rtl:right-auto bg-slate-900 text-slate-100 text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            واتساب مباشر 0555295362
          </span>
        </a>
      </div>

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
