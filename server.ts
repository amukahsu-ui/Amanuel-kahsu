import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '2mb' }));

  // Initialize Gemini AI Client lazily/safely
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }
    return new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // API Route for MHH VIP Concierge AI Assistant
  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const { prompt, lang = 'ar', context = {} } = req.body;

      if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({ error: 'Prompt is required' });
        return;
      }

      const systemInstruction = `
You are the official MHH VIP Transport Smart AI Assistant (مساعد MHH الذكي للنقل الفاخر) based in Jazan, Saudi Arabia.
Your goal is to assist customers politely, accurately, and swiftly in either Arabic or English (match user's language, default to polite Gulf Arabic if Arabic).

COMPANY INFORMATION & FACTS:
- Company Name: MHH VIP TRANSPORT (MHH للنقل الفاخر)
- Location: Jazan, Saudi Arabia (جازان - المملكة العربية السعودية)
- Contact Phones / WhatsApp: 0555295362 and 0566830405 (International: +966555295362, +966566830405)
- Vehicle: Premium Black Hyundai i800 VIP Van (11 Seats, Dual high-performance cold A/C, 6 large suitcases capacity, automatic transmission, sliding doors, clean VIP leather seats).
- Special Offer: 15% discount on all bookings made through this website or WhatsApp via website link!
- Services Offered:
  1. School & University Transport (Daily pick-up/drop-off, teachers, monthly subscriptions).
  2. Airport Transfers (24/7 flight tracking, meet & greet at Jazan Airport, Jeddah King Abdulaziz Airport KAIA, Al Madinah Prince Mohammed Airport).
  3. City-to-City Long Trips (Jazan, Jeddah, Al Madinah, Sabya, Abu Arish, Samtah, Baish, Al Darb, Makkah, Abha).
  4. Shopping & Mall Excursions for families and ladies with included driver waiting time.
  5. Short rides across all Jazan districts and corniche.
  6. Family & Group Rides (up to 11 seats).

REPRESENTATIVE ESTIMATED FARES (After 15% discount):
- Jazan City <-> Jazan Airport: ~68 SAR (Base 80 SAR)
- Jazan <-> Sabya: ~102 SAR (Base 120 SAR)
- Jazan <-> Abu Arish: ~94 SAR (Base 110 SAR)
- Jazan <-> Samtah: ~136 SAR (Base 160 SAR)
- Jazan <-> Baish: ~153 SAR (Base 180 SAR)
- Jazan <-> Jeddah: ~1105 SAR (Base 1300 SAR)
- Jazan <-> Al Madinah: ~1530 SAR (Base 1800 SAR)

GUIDELINES FOR YOUR RESPONSE:
- Be polite, welcoming (use Saudi Arabic greetings like "أهلاً وسهلاً بك في MHH للنقل الفاخر" or "Ahlan wa Sahlan").
- Directly answer the question regarding routes, luggage, prices, A/C, child safety, or school monthly passes.
- Mention the 15% website discount whenever appropriate.
- Always include a call to action inviting the user to tap the WhatsApp button or call 0555295362 or 0566830405.
- Keep your answers concise, clear, and well-structured.
`;

      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const responseText = response.text || 'Ahlan wa Sahlan! Please call or WhatsApp us at 0555295362 for instant booking.';
      res.json({ reply: responseText });
    } catch (err: any) {
      console.error('Gemini API Chat Error:', err);
      // Friendly fallback if API key is missing or errored
      const isArabic = req.body.lang === 'ar';
      const fallbackReply = isArabic
        ? "أهلاً بك! نسعد بخدمتك في MHH للنقل الفاخر بجازان وجدة والمدينة. يتوفر لدينا فان هيونداي i800 VIP بسعة 11 راكب ومكيف قادم وقوي مع خصم 15% للموقع! للتواصل المباشر والحجز السريع: واتساب/اتصال 0555295362 أو 0566830405."
        : "Welcome to MHH VIP Transport! We offer Hyundai i800 11-seat VIP rides in Jazan, Jeddah & Madinah with 15% discount on web bookings. Call or WhatsApp us directly at 0555295362 or 0566830405 for instant ride confirmation.";
      res.json({ reply: fallbackReply, fallback: true });
    }
  });

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'MHH VIP Transport Backend' });
  });

  // Vite development vs production serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MHH VIP Transport Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
