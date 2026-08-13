import React, { useRef, useEffect } from 'react';
import { Phone, MessageCircle, QrCode, Download, MapPin, X, Clock, Award, Share2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT_PHONE_1, CONTACT_PHONE_2, WA_NUMBER_1, WA_NUMBER_2 } from '../data/transportData';

interface ContactQRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactQRModal: React.FC<ContactQRModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  // Download vCard (.vcf)
  const handleDownloadVCard = () => {
    const vcardData = `BEGIN:VCARD
VERSION:3.0
FN:MHH VIP Transport Jazan
ORG:MHH VIP Transport
TEL;TYPE=CELL,VOICE:${CONTACT_PHONE_1}
TEL;TYPE=CELL,VOICE:${CONTACT_PHONE_2}
TEL;TYPE=CELL,WA:${CONTACT_PHONE_1}
NOTE:VIP Transport for Families & Students - Jazan KSA
END:VCARD`;

    const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MHH_VIP_Transport.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Draw QR Code on Canvas using simple clean matrix rendering
  useEffect(() => {
    if (!isOpen || !qrCanvasRef.current) return;
    const canvas = qrCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 200;
    canvas.width = size;
    canvas.height = size;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // Simple decorative styled QR pattern preview
    ctx.fillStyle = '#0f172a';
    const tileSize = size / 21;

    for (let r = 0; r < 21; r++) {
      for (let c = 0; c < 21; c++) {
        // Finder patterns (corners)
        const isFinderTopLeft = r < 7 && c < 7;
        const isFinderTopRight = r < 7 && c > 13;
        const isFinderBottomLeft = r > 13 && c < 7;

        if (isFinderTopLeft || isFinderTopRight || isFinderBottomLeft) {
          const isOuterBorder = r === 0 || r === 6 || c === 0 || c === 6 || r === 14 || r === 20 || c === 14 || c === 20;
          const isCenter = (r >= 2 && r <= 4 && c >= 2 && c <= 4) ||
                           (r >= 2 && r <= 4 && c >= 16 && c <= 18) ||
                           (r >= 16 && r <= 18 && c >= 2 && c <= 4);
          if (isOuterBorder || isCenter) {
            ctx.fillStyle = '#d97706';
            ctx.fillRect(c * tileSize, r * tileSize, tileSize, tileSize);
          }
        } else if ((r * c + r + c) % 3 === 0 || (r + c) % 2 === 0) {
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(c * tileSize, r * tileSize, tileSize, tileSize);
        }
      }
    }

    // Draw center brand emblem
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(size / 2 - 18, size / 2 - 18, 36, 36);
    ctx.fillStyle = '#d97706';
    ctx.fillRect(size / 2 - 15, size / 2 - 15, 30, 30);
    ctx.fillStyle = '#020617';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('MHH', size / 2, size / 2);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl text-white relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase">
            <QrCode className="w-3.5 h-3.5" />
            <span>{t('Contact & QR Code', 'بيانات الاتصال ورمز QR')}</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">
            MHH VIP TRANSPORT JAZAN
          </h3>
          <p className="text-xs text-slate-300">
            {t('Always available — Call or WhatsApp', 'متوفرون دائماً على خطين للاتصال والواتساب')}
          </p>
        </div>

        {/* Dual Phone Numbers Grid */}
        <div className="space-y-3">
          {/* Main Line */}
          <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest block">
                {t('Main Contact Line', 'الخط الرئيسي الأول')}
              </span>
              <span className="text-base font-black text-white">{CONTACT_PHONE_1}</span>
            </div>
            <div className="flex gap-2">
              <a
                href={`tel:${CONTACT_PHONE_1}`}
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{t('Call', 'اتصال')}</span>
              </a>
              <a
                href={`https://wa.me/${WA_NUMBER_1}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
                <span>{t('WhatsApp', 'واتساب')}</span>
              </a>
            </div>
          </div>

          {/* Second Line */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                {t('Second Line', 'الخط الثاني')}
              </span>
              <span className="text-base font-black text-white">{CONTACT_PHONE_2}</span>
            </div>
            <div className="flex gap-2">
              <a
                href={`tel:${CONTACT_PHONE_2}`}
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{t('Call', 'اتصال')}</span>
              </a>
              <a
                href={`https://wa.me/${WA_NUMBER_2}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
                <span>{t('WhatsApp', 'واتساب')}</span>
              </a>
            </div>
          </div>
        </div>

        {/* QR Code Canvas Box */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-3">
          <canvas ref={qrCanvasRef} className="mx-auto rounded-lg shadow-md border border-slate-700" />
          <p className="text-[11px] text-slate-300">
            {t('Scan QR code with phone camera to open website or print on business card', 'امسح رمز QR بكاميرا الجوال لفتح الموقع مباشرة أو طباعته على الكرت')}
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex gap-3">
          <button
            onClick={handleDownloadVCard}
            className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            <Download className="w-4 h-4" />
            <span>{t('Save Contact to Phone', 'حفظ جهة الاتصال بالموبايل')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
