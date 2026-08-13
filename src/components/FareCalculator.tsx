import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRightLeft, Sparkles, MessageCircle, MapPin, Calendar, Clock, Tag, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CITIES, ROUTE_PRICING, WA_NUMBER_1 } from '../data/transportData';

export const FareCalculator: React.FC = () => {
  const { t } = useLanguage();

  const [fromCityId, setFromCityId] = useState<string>('jazan');
  const [toCityId, setToCityId] = useState<string>('jeddah_airport');
  const [tripType, setTripType] = useState<'one_way' | 'round_trip' | 'airport' | 'monthly_school'>('one_way');
  const [passengers, setPassengers] = useState<number>(4);

  // Swap From & To cities
  const handleSwapCities = () => {
    const temp = fromCityId;
    setFromCityId(toCityId);
    setToCityId(temp);
  };

  // Find price or calculate fallback distance/rate
  const fareResult = useMemo(() => {
    const fromCity = CITIES.find((c) => c.id === fromCityId);
    const toCity = CITIES.find((c) => c.id === toCityId);

    if (fromCityId === toCityId) {
      return {
        distanceKm: 15,
        estMinutes: 25,
        basePriceSAR: 90,
        discountedPriceSAR: 76.5,
        discountAmountSAR: 13.5,
        isSameCity: true,
      };
    }

    const exactRoute = ROUTE_PRICING.find(
      (r) => (r.fromId === fromCityId && r.toId === toCityId) || (r.fromId === toCityId && r.toId === fromCityId)
    );

    let distanceKm = exactRoute ? exactRoute.distanceKm : 180;
    let estMinutes = exactRoute ? exactRoute.estMinutes : 120;
    let basePriceSAR = exactRoute ? exactRoute.basePriceSAR : 350;

    // Adjust for Trip Type
    if (tripType === 'round_trip') {
      basePriceSAR = Math.round(basePriceSAR * 1.75); // Discounted round trip rate
    } else if (tripType === 'monthly_school') {
      basePriceSAR = 850; // Average monthly student subscription rate inside Jazan/Sabya
      distanceKm = 25;
      estMinutes = 30;
    }

    const discountAmountSAR = Math.round(basePriceSAR * 0.15);
    const discountedPriceSAR = basePriceSAR - discountAmountSAR;

    return {
      distanceKm,
      estMinutes,
      basePriceSAR,
      discountedPriceSAR,
      discountAmountSAR,
      isSameCity: false,
      fromCityName: t(fromCity?.nameEn || '', fromCity?.nameAr || ''),
      toCityName: t(toCity?.nameEn || '', toCity?.nameAr || ''),
    };
  }, [fromCityId, toCityId, tripType, t]);

  // Construct WhatsApp Message
  const whatsappBookingUrl = useMemo(() => {
    const fromCity = CITIES.find((c) => c.id === fromCityId);
    const toCity = CITIES.find((c) => c.id === toCityId);

    const tripTypeLabel =
      tripType === 'one_way'
        ? t('One Way', 'ذهاب فقط')
        : tripType === 'round_trip'
        ? t('Round Trip', 'ذهاب وإياد')
        : tripType === 'airport'
        ? t('Airport Transfer', 'توصيل مطار')
        : t('Monthly School Subscription', 'اشتراك شهري للمدرسة/الجامعة');

    const msg = `مرحباً MHH للنقل الفاخر 👋
أود حجز رحلة محتسبة عبر الموقع (خصم 15%):
📍 من: ${toCity ? fromCity?.nameAr : fromCityId}
🏁 إلى: ${toCity ? toCity?.nameAr : toCityId}
🚗 نوع الرحلة: ${tripTypeLabel}
👥 عدد الركاب: ${passengers}
💰 السعر التقديري بعد خصم 15%: ${fareResult.discountedPriceSAR} ريال سعودي
الرجاء تأكيد الحجز والتوقيت.`;

    return `https://wa.me/${WA_NUMBER_1}?text=${encodeURIComponent(msg)}`;
  }, [fromCityId, toCityId, tripType, passengers, fareResult, t]);

  return (
    <section id="calculator" className="py-16 bg-slate-900 border-b border-amber-500/20 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
            {t('Instant Price Estimator', 'حاسبة أسعار الرحلات الفورية')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            {t('Calculate Fare & Book with 15% Discount', 'احسب سعر رحلتك واحجز مباشرة بخصم 15%')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            {t(
              'Select your departure and destination cities across Jazan, Jeddah, and Al Madinah. Transparent, fixed pricing with no hidden charges.',
              'حدد وجهتك بين مدن ومحافظات جازان ومطارات جدة والمدينة المنورة. أسعار شفافة وثابتة بدون أي رسوم خفية.'
            )}
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-amber-500/30 shadow-2xl space-y-6">
            
            {/* Trip Type Tabs */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                {t('1. Select Trip Category', '1. اختر نوع الخدمة أو الرحلة')}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setTripType('one_way')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                    tripType === 'one_way'
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {t('One Way', 'ذهاب فقط')}
                </button>

                <button
                  type="button"
                  onClick={() => setTripType('round_trip')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                    tripType === 'round_trip'
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {t('Round Trip', 'ذهاب وإياد')}
                </button>

                <button
                  type="button"
                  onClick={() => setTripType('airport')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                    tripType === 'airport'
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {t('Airport Transfer', 'نقل مطار')}
                </button>

                <button
                  type="button"
                  onClick={() => setTripType('monthly_school')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                    tripType === 'monthly_school'
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {t('Monthly School', 'اشتراك شهري')}
                </button>
              </div>
            </div>

            {/* From & To City Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-11 gap-3 items-center">
              
              {/* Pickup City */}
              <div className="sm:col-span-5 space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {t('From (Pickup)', 'نقطة الانطلاق')}
                </label>
                <div className="relative">
                  <select
                    value={fromCityId}
                    onChange={(e) => setFromCityId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-3 text-sm text-white font-semibold focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    {CITIES.map((c) => (
                      <option key={`from_${c.id}`} value={c.id}>
                        {t(c.nameEn, c.nameAr)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Swap Button */}
              <div className="sm:col-span-1 flex justify-center pt-3 sm:pt-5">
                <button
                  type="button"
                  onClick={handleSwapCities}
                  className="p-2.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all shadow-md"
                  title="Swap Departure and Destination"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Destination City */}
              <div className="sm:col-span-5 space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {t('To (Destination)', 'جهة الوصول')}
                </label>
                <div className="relative">
                  <select
                    value={toCityId}
                    onChange={(e) => setToCityId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-3 text-sm text-white font-semibold focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    {CITIES.map((c) => (
                      <option key={`to_${c.id}`} value={c.id}>
                        {t(c.nameEn, c.nameAr)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

            {/* Passenger Count Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                {t('Passengers Count (1 – 11 Seats)', 'عدد الركاب (من 1 حتى 11 راكب)')}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={1}
                  max={11}
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <span className="w-12 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-extrabold flex items-center justify-center text-sm">
                  {passengers}
                </span>
              </div>
            </div>

          </div>

          {/* Pricing Summary Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/40 p-6 sm:p-8 rounded-2xl border border-amber-500/40 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-lg text-white">
                  {t('Trip Fare Quote', 'تفاصيل التكلفة التقديرية')}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-extrabold text-xs">
                -15% OFF
              </span>
            </div>

            {/* Price Calculations Breakdown */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center text-slate-300">
                <span>{t('Standard Base Fare:', 'السعر الأساسي:')}</span>
                <span className="line-through text-slate-500 font-semibold">{fareResult.basePriceSAR} SAR</span>
              </div>

              <div className="flex justify-between items-center text-emerald-400 font-semibold">
                <span className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  {t('15% Website Discount:', 'خصم الموقع (15%):')}
                </span>
                <span>-{fareResult.discountAmountSAR} SAR</span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between items-end">
                <div>
                  <span className="text-xs text-slate-400 block">{t('Final Discounted Price', 'السعر النهائي المباشر')}</span>
                  <span className="text-3xl font-black text-amber-400">
                    {fareResult.discountedPriceSAR} <span className="text-base font-bold text-white">SAR</span>
                  </span>
                </div>
                <div className="text-end text-xs text-slate-400">
                  <span>~{fareResult.distanceKm} km · ~{fareResult.estMinutes} mins</span>
                </div>
              </div>
            </div>

            {/* Quick Benefits Included */}
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('Hyundai i800 VIP Van (11 seats, dual strong A/C)', 'مركبة فان هيونداي مكيفة بالكامل 11 راكب')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('6 Suitcases luggage trunk space included', 'مساحة واسعة تتسع لـ 6 حقائب سفر كبيرة')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('Punctual, licensed driver & door-to-door pickup', 'سائق محترف وملتزم مع التوصيل للباب')}</span>
              </div>
            </div>

            {/* Direct WhatsApp CTA Button */}
            <a
              href={whatsappBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-950/50 transition-all hover:scale-[1.02]"
            >
              <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
              <span>{t('Book Calculated Trip on WhatsApp', 'تأكيد الحجز بهذا السعر عبر الواتساب')}</span>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};
