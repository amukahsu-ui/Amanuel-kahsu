import { City, RoutePricing, ServiceItem, VehicleSpec } from '../types';

export const CONTACT_PHONE_1 = "0555295362";
export const CONTACT_PHONE_2 = "0566830405";
export const WA_NUMBER_1 = "966555295362";
export const WA_NUMBER_2 = "966566830405";

export const CITIES: City[] = [
  { id: 'jazan', nameEn: 'Jazan City', nameAr: 'مدينة جازان', regionEn: 'Jazan', regionAr: 'جازان' },
  { id: 'jazan_airport', nameEn: 'Jazan Airport (KSA)', nameAr: 'مطار جازان (الملك عبد الله)', regionEn: 'Jazan', regionAr: 'جازان', isAirport: true },
  { id: 'sabya', nameEn: 'Sabya', nameAr: 'صبيا', regionEn: 'Jazan', regionAr: 'جازان' },
  { id: 'abu_arish', nameEn: 'Abu Arish', nameAr: 'أبو عريش', regionEn: 'Jazan', regionAr: 'جازان' },
  { id: 'samtah', nameEn: 'Samtah', nameAr: 'صامطة', regionEn: 'Jazan', regionAr: 'جازان' },
  { id: 'ahad_masarihah', nameEn: 'Ahad Al Masarihah', nameAr: 'أحد المسارحة', regionEn: 'Jazan', regionAr: 'جازان' },
  { id: 'ardah', nameEn: 'Al Ardah', nameAr: 'العارضة', regionEn: 'Jazan', regionAr: 'جازان' },
  { id: 'baish', nameEn: 'Baish', nameAr: 'بيش', regionEn: 'Jazan', regionAr: 'جازان' },
  { id: 'darb', nameEn: 'Al Darb', nameAr: 'الدرب', regionEn: 'Jazan', regionAr: 'جازان' },
  { id: 'farasan', nameEn: 'Farasan Port (Ferry Transfer)', nameAr: 'ميناء فرسان (نقل للعبّارة)', regionEn: 'Jazan', regionAr: 'جازان' },
  { id: 'jeddah', nameEn: 'Jeddah City', nameAr: 'مدينة جدة', regionEn: 'Makkah Region', regionAr: 'منطقة مكة المكرمة' },
  { id: 'jeddah_airport', nameEn: 'Jeddah Airport (KAIA)', nameAr: 'مطار الملك عبد العزيز - جدة', regionEn: 'Makkah Region', regionAr: 'منطقة مكة المكرمة', isAirport: true },
  { id: 'madinah', nameEn: 'Al Madinah Al Munawwarah', nameAr: 'المدينة المنورة', regionEn: 'Madinah Region', regionAr: 'منطقة المدينة المنورة' },
  { id: 'madinah_airport', nameEn: 'Al Madinah Airport', nameAr: 'مطار الأمير محمد بن عبد العزيز - المدينة', regionEn: 'Madinah Region', regionAr: 'منطقة المدينة المنورة', isAirport: true },
];

export const ROUTE_PRICING: RoutePricing[] = [
  { fromId: 'jazan', toId: 'jazan_airport', distanceKm: 12, estMinutes: 20, basePriceSAR: 80 },
  { fromId: 'jazan', toId: 'sabya', distanceKm: 38, estMinutes: 35, basePriceSAR: 120 },
  { fromId: 'jazan', toId: 'abu_arish', distanceKm: 32, estMinutes: 30, basePriceSAR: 110 },
  { fromId: 'jazan', toId: 'samtah', distanceKm: 62, estMinutes: 50, basePriceSAR: 160 },
  { fromId: 'jazan', toId: 'ahad_masarihah', distanceKm: 48, estMinutes: 45, basePriceSAR: 140 },
  { fromId: 'jazan', toId: 'ardah', distanceKm: 70, estMinutes: 60, basePriceSAR: 180 },
  { fromId: 'jazan', toId: 'baish', distanceKm: 75, estMinutes: 55, basePriceSAR: 180 },
  { fromId: 'jazan', toId: 'darb', distanceKm: 125, estMinutes: 80, basePriceSAR: 250 },
  { fromId: 'jazan', toId: 'jeddah', distanceKm: 710, estMinutes: 450, basePriceSAR: 1300 },
  { fromId: 'jazan', toId: 'jeddah_airport', distanceKm: 725, estMinutes: 465, basePriceSAR: 1350 },
  { fromId: 'jazan', toId: 'madinah', distanceKm: 1040, estMinutes: 630, basePriceSAR: 1800 },
  { fromId: 'sabya', toId: 'abu_arish', distanceKm: 28, estMinutes: 25, basePriceSAR: 90 },
  { fromId: 'sabya', toId: 'baish', distanceKm: 40, estMinutes: 30, basePriceSAR: 110 },
  { fromId: 'sabya', toId: 'jazan_airport', distanceKm: 32, estMinutes: 30, basePriceSAR: 120 },
  { fromId: 'abu_arish', toId: 'jazan_airport', distanceKm: 26, estMinutes: 25, basePriceSAR: 110 },
  { fromId: 'baish', toId: 'jeddah', distanceKm: 630, estMinutes: 390, basePriceSAR: 1200 },
];

export const VEHICLE_SPEC: VehicleSpec = {
  model: "Hyundai i800 VIP Black Edition",
  seats: 11,
  doors: "5 Doors (2 front, 2 sliding side doors, 1 tailgate)",
  suitcases: 6,
  acTypeEn: "Dual Heavy-Duty High Capacity A/C (Front + Rear Vents)",
  acTypeAr: "تكييف أمامي وخلفي قوي جداً مخصص لأجواء جازان الحارة",
  transmissionEn: "Automatic",
  transmissionAr: "أوتوماتيك",
  colorEn: "Sleek Executive Black",
  colorAr: "أسود فاخر ملكي",
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'school',
    titleEn: 'School & University Transport',
    titleAr: 'نقل المدارس والجامعات',
    descEn: 'Punctual daily pick-up and drop-off for students and teachers with fixed schedules, safe driving, and discounted monthly subscription plans.',
    descAr: 'توصيل يومي منتظم للطلاب والطالبات والمعلمات بجدول ثابت وأمان تام مع اشتراكات شهرية مخفضة.',
    icon: 'GraduationCap',
    tagEn: 'Monthly Pass Discount',
    tagAr: 'خصم الاشتراك الشهري'
  },
  {
    id: 'shopping',
    titleEn: 'Shopping & Mall Excursions',
    titleAr: 'مشاوير التسوق والأسواق',
    descEn: 'Comfortable trips for ladies and families to malls, traditional souks, and dining spots with driver waiting time and easy luggage loading.',
    descAr: 'رحلات مريحة للعائلات والسيدات للمولات والأسواق والمطاعم مع الانتظار وتوفير كامل الخصوصية.',
    icon: 'ShoppingBag',
    tagEn: 'Waiting Included',
    tagAr: 'شامل وقت الانتظار'
  },
  {
    id: 'intercity',
    titleEn: 'Long Distance City-to-City',
    titleAr: 'سفريات بين المدن',
    descEn: 'VIP highway travel from Jazan to Jeddah, Al Madinah, Makkah, Abha, and all Saudi regions in smooth leather reclining seats.',
    descAr: 'رحلات فاخرة ومريحة بين المدن من جازان إلى جدة والمدينة المنورة وأبها ومكة بمركبة حديثة ومكيفة.',
    icon: 'MapPin',
    tagEn: '15% Web Offer',
    tagAr: 'خصم 15% عبر الموقع'
  },
  {
    id: 'airport',
    titleEn: 'Airport Transfers (24/7)',
    titleAr: 'توصيل واستقبال المطارات',
    descEn: 'Flight tracking, arrival meet & greet, help with up to 6 large suitcases, covering Jazan Airport, Jeddah KAIA, and Al Madinah Airport.',
    descAr: 'استقبال وتوصيل لمطارات جازان وجدة والمدينة مع متابعة حركة الطيران ومساعدة الحقائب.',
    icon: 'Plane',
    tagEn: 'Flight Tracking',
    tagAr: 'متابعة الرحلات'
  },
  {
    id: 'local',
    titleEn: 'Inside Jazan & Districts',
    titleAr: 'مشاوير داخل جازان والأحياء',
    descEn: 'Prompt rides across all Jazan neighbourhoods, corniche, hospitals, hotels, and government offices, available day and night.',
    descAr: 'توصيل لكافة أحياء جازان والكورنيش والمستشفيات والفنادق والمقرات الحكومية على مدار الساعة.',
    icon: 'Car',
    tagEn: '24/7 Availability',
    tagAr: 'متوفر 24 ساعة'
  },
  {
    id: 'group',
    titleEn: 'Family & Event Group Rides',
    titleAr: 'رحلات العائلات والمناسبات',
    descEn: 'Spacious 11-seater VIP van ideal for weddings, family gatherings, Farasan ferry connections, and group tours across Southern KSA.',
    descAr: 'فان VIP يتسع لـ 11 راكب مثالي للأعراس والاجتماعات العائلية ونقل عبّارة فرسان والرحلات الجماعية.',
    icon: 'Users',
    tagEn: 'Up to 11 Passengers',
    tagAr: 'يتسع حتى 11 راكب'
  }
];

export const FAQ_LIST = [
  {
    qEn: "How do I claim the 15% website booking discount?",
    qAr: "كيف أحصل على خصم 15% الخاص بالموقع؟",
    aEn: "Simply submit your trip request through our website booking form or click any 'Book on WhatsApp with 15% Discount' button. The discount is applied automatically!",
    aAr: "فقط اطلب رحلتك من خلال نموذج الحجز بالموقع أو اضغط على زر 'احجز عبر الواتساب بخصم 15%'. يتم تطبيق الخصم تلقائياً."
  },
  {
    qEn: "How many passengers and luggage fit in the Hyundai i800?",
    qAr: "كم عدد الركاب والحقائب التي تتسع لها الفان؟",
    aEn: "The Hyundai i800 VIP Van comfortably seats up to 11 passengers with dedicated legroom and fits up to 6 large suitcases in the rear cargo trunk.",
    aAr: "تتسع الفان VIP لـ 11 راكب بكل أريحية وخصوصية، وتتسع لـ 6 حقائب سفر كبيرة في الحقيبة الخلفية."
  },
  {
    qEn: "Are drivers licensed, punctual, and familiar with all Jazan areas?",
    qAr: "هل السائقون محترفون وملمون بمناطق جازان؟",
    aEn: "Yes! All drivers are officially licensed, highly experienced, punctual, and fully knowledgeable about all Jazan districts, Sabya, Abu Arish, Samtah, Baish, and long-distance highways to Jeddah & Madinah.",
    aAr: "نعم! جميع السائقين مرخصين وذوي خبرة عالية، ملتزمين بمواعيدهم وملمون بكافة أحياء جازان والمحافظات والطرق السريعة."
  },
  {
    qEn: "Do you offer monthly subscriptions for student / school transport?",
    qAr: "هل توجد اشتراكات شهرية لنقل الطلاب والطالبات؟",
    aEn: "Yes, we offer fixed-schedule monthly transport packages for schools, colleges, and university students across Jazan region at competitive rates.",
    aAr: "نعم، نوفر عقود اشتراك شهرية بجدول منتظم لنقل طلاب المدارس والجامعات والمعلمات بأسعار تنافسية خاصة."
  }
];
