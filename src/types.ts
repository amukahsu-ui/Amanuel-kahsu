export type Language = 'en' | 'ar';

export interface City {
  id: string;
  nameEn: string;
  nameAr: string;
  regionEn: string;
  regionAr: string;
  isAirport?: boolean;
}

export interface RoutePricing {
  fromId: string;
  toId: string;
  distanceKm: number;
  estMinutes: number;
  basePriceSAR: number;
}

export interface ServiceItem {
  id: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  icon: string;
  tagEn?: string;
  tagAr?: string;
}

export interface VehicleSpec {
  seats: number;
  doors: string;
  suitcases: number;
  acTypeEn: string;
  acTypeAr: string;
  transmissionEn: string;
  transmissionAr: string;
  model: string;
  colorEn: string;
  colorAr: string;
}

export interface BookingData {
  customerName: string;
  phone: string;
  tripType: 'one_way' | 'round_trip' | 'airport' | 'hourly_multistop' | 'school_subscription';
  fromCity: string;
  toCity: string;
  date: string;
  time: string;
  passengers: number;
  notes: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  quickAction?: {
    labelEn: string;
    labelAr: string;
    whatsappText: string;
  };
}
