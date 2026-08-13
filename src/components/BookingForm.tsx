import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Calendar, Clock, User, Phone, MapPin, Users, MessageSquare, Send, CheckCircle2, Copy, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CITIES, WA_NUMBER_1, WA_NUMBER_2 } from '../data/transportData';

export const BookingForm: React.FC = () => {
  const { t } = useLanguage();

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [tripType, setTripType] = useState('one_way');
  const [fromLocation, setFromLocation] = useState('Jazan');
  const [toLocation, setToLocation] = useState('Jeddah');
  const [tripDate, setTripDate] = useState('');
  const [tripTime, setTripTime] = useState('');
  const [passengers, setPassengers] = useState(4);
  const [notes, setNotes] = useState('');

  const [submittedModalOpen, setSubmittedModalOpen] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const formattedMsg = `مرحباً MHH للنقل الفاخر 🚖
طلب حجز رحلة عبر الموقع (خصم 15%):
👤 الاسم: ${customerName || 'عميل محترم'}
📱 الجوال: ${phoneNumber || 'غير محدد'}
🚗 نوع الخدمة: ${
    tripType === 'one_way'
      ? 'ذهاب فقط'
      : tripType === 'round_trip'
      ? 'ذهاب وإياد'
      : tripType === 'airport'
      ? 'توصيل مطار'
      : tripType === 'monthly'
      ? 'اشتراك شهري للمدارس'
      : 'ساعات متعددة'
  }
📍 من: ${fromLocation}
🏁 إلى: ${toLocation}
📅 التاريخ: ${tripDate || 'حسب التنسيق'}
⏰ الوقت: ${tripTime || 'حسب التنسيق'}
👥 عدد الركاب: ${passengers}
📝 ملاحظات: ${notes || 'لا يوجد'}

الرجاء تأكيد السعر المحتسب والتوقيت. شكراً!`;

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err) {
      // fallback
    }

    setSubmittedModalOpen(true);

    const waUrl = `https://wa.me/${WA_NUMBER_1}?text=${encodeURIComponent(formattedMsg)}`;
    window.open(waUrl, '_blank');
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(formattedMsg);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <section id="booking" className="py-16 bg-slate-900 border-b border-amber-500/20 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
            {t('Direct Ride Reservation', 'حجز رحلتك الفوري')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            {t('Book Your Ride Straight to WhatsApp', 'حجز مباشر وسريع يتم إرساله للواتساب')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            {t(
              'Fill in your details below. Your reservation request will be sent directly to our dispatch WhatsApp with your 15% website discount locked in.',
              'أدخل بيانات رحلتك وسوف يتم تجهيز الرسالة مباشرة عبر الواتساب للحصول على خصم 15% الفوري.'
            )}
          </p>
        </div>

        {/* Form Main Box */}
        <div className="max-w-3xl mx-auto bg-slate-950 p-6 sm:p-10 rounded-2xl border border-amber-500/30 shadow-2xl space-y-6">
          
          <form onSubmit={handleSubmitWhatsApp} className="space-y-6">
            
            {/* Customer Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {t('Your Name', 'الاسم الكامل')}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-amber-400 absolute left-3 top-3.5 rtl:right-3 rtl:left-auto" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={t('e.g., Mohammed Al-Otaibi', 'مثال: محمد العتيبي')}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-10 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {t('Phone Number', 'رقم الجوال')}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-amber-400 absolute left-3 top-3.5 rtl:right-3 rtl:left-auto" />
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="05XXXXXXXX"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-10 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Trip Type */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                {t('Trip Service Category', 'نوع الرحلة أو الخدمة')}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'one_way', en: 'One Way', ar: 'ذهاب فقط' },
                  { id: 'round_trip', en: 'Round Trip', ar: 'ذهاب وإياد' },
                  { id: 'airport', en: 'Airport Transfer', ar: 'توصيل مطار' },
                  { id: 'monthly', en: 'Monthly Subscription', ar: 'اشتراك شهري' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTripType(item.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      tripType === item.id
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {t(item.en, item.ar)}
                  </button>
                ))}
              </div>
            </div>

            {/* From & To Locations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {t('From (City / District)', 'من (المدينة أو الحي)')}
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-amber-400 absolute left-3 top-3.5 rtl:right-3 rtl:left-auto" />
                  <input
                    type="text"
                    required
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    placeholder={t('e.g., Jazan - Al Shati District', 'مثال: جازان - حي الشاطئ')}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-10 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {t('To (Destination)', 'إلى (الوجهة أو المطار)')}
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-amber-400 absolute left-3 top-3.5 rtl:right-3 rtl:left-auto" />
                  <input
                    type="text"
                    required
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    placeholder={t('e.g., Jeddah Airport KAIA', 'مثال: مطار الملك عبد العزيز بجدة')}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-10 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Date, Time & Passengers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {t('Date', 'تاريخ الرحلة')}
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-amber-400 absolute left-3 top-3.5 rtl:right-3 rtl:left-auto" />
                  <input
                    type="date"
                    required
                    value={tripDate}
                    onChange={(e) => setTripDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-10 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {t('Time', 'الوقت المحدد')}
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-amber-400 absolute left-3 top-3.5 rtl:right-3 rtl:left-auto" />
                  <input
                    type="time"
                    required
                    value={tripTime}
                    onChange={(e) => setTripTime(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-10 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {t('Passengers (1–11)', 'عدد الركاب (1-11)')}
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-3 text-xs sm:text-sm text-white font-bold focus:outline-none focus:border-amber-500"
                  >
                    {[...Array(11)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {t('Seats', 'ركاب')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                {t('Notes / Luggage Details / Flight No.', 'ملاحظات إضافية / رقم الرحلة / عدد الشنط')}
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t('e.g., We have 4 large suitcases and need child seat...', 'مثال: لدينا 4 شنط كبيرة ونحتاج التواجد عند المخرج...')}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
              <span>{t('Send Request on WhatsApp (Get 15% Off)', 'إرسال الحجز عبر الواتساب (خصم 15%)')}</span>
            </button>

          </form>

        </div>

      </div>

      {/* Submission Confirmation Modal */}
      {submittedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 sm:p-8 max-w-md w-full text-center space-y-4 shadow-2xl text-white">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-extrabold text-white">
              {t('WhatsApp Opened!', 'تم تجهيز رسالة الحجز بالواتساب!')}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              {t(
                'Your booking details are prepared in WhatsApp with your 15% discount applied. If WhatsApp did not open automatically, copy the message text below:',
                'تم إعداد نص الرسالة بالكامل مخصومة بـ 15%. إذا لم يفتح الواتساب تلقائياً يمكنك نسخ الرسالة أدناه مباشرة:'
              )}
            </p>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono text-start max-h-40 overflow-y-auto whitespace-pre-line">
              {formattedMsg}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleCopyMessage}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 border border-slate-700 text-amber-400 font-bold text-xs hover:bg-slate-700 flex items-center justify-center gap-1.5"
              >
                <Copy className="w-4 h-4" />
                <span>{copiedText ? t('Copied!', 'تم النسخ!') : t('Copy Message', 'نسخ الرسالة')}</span>
              </button>

              <button
                onClick={() => setSubmittedModalOpen(false)}
                className="py-2.5 px-4 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400"
              >
                {t('Close', 'إغلاق')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
