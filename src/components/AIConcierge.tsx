import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, Phone, MessageCircle, ExternalLink, RefreshCw, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ChatMessage } from '../types';
import { CONTACT_PHONE_1, WA_NUMBER_1 } from '../data/transportData';

interface AIConciergeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIConcierge: React.FC<AIConciergeProps> = ({ isOpen, onClose }) => {
  const { lang, t } = useLanguage();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: ChatMessage[] = [
    {
      id: 'welcome',
      sender: 'assistant',
      text: t(
        "Ahlan wa Sahlan! 👋 I am your MHH VIP Transport AI Concierge. I can answer questions about routes, fares, 11-seat Hyundai i800 VIP van features, luggage space, and student/school subscriptions across Jazan, Jeddah, and Al Madinah. How can I assist your trip today?",
        "أهلاً وسهلاً بك في MHH للنقل الفاخر! 🚖 أنا مساعدك الذكي لمساعدتك في معرفة أسعار السفر، مواصفات السيارة الهيونداي VIP الـ 11 راكب، نقل الطلاب والمدارس، ومطارات جازان وجدة والمدينة. كيف يمكنني خدمتك اليوم؟"
      ),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    {
      en: "Jazan to Jeddah ride price?",
      ar: "كم سعر الرحلة من جازان إلى جدة؟",
    },
    {
      en: "Monthly school transport for students",
      ar: "تفاصيل ونقل المدارس والجامعات شهرياً",
    },
    {
      en: "Jazan Airport transfer & luggage capacity",
      ar: "توصيل مطار جازان وسعة الحقائب",
    },
    {
      en: "How to claim 15% discount?",
      ar: "كيف أحصل على خصم 15% عبر الموقع؟",
    },
  ];

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInputText('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          lang: lang,
        }),
      });

      const data = await res.json();
      const replyText = data.reply || t('Please call or WhatsApp us at 0555295362 for instant assistance.', 'الرجاء التواصل معنا عبر الاتصال أو الواتساب على 0555295362');

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: t(
          "We are ready to move you safely! Call or WhatsApp us directly at 0555295362 or 0566830405 for instant 15% discounted booking.",
          "أهلاً بك! يمكنك التواصل المباشر مع السائق وحجز رحلتك فوراً عبر الاتصال أو الواتساب: 0555295362 أو 0566830405 مع خصم 15%."
        ),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      {/* Drawer Box */}
      <div className="w-full max-w-lg h-[92vh] bg-slate-950 border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 p-4 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <span>{t('MHH Smart AI Concierge', 'مساعد MHH الذكي للنقل')}</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                  {t('Online', 'متصل')}
                </span>
              </h3>
              <p className="text-[11px] text-slate-300">
                {t('Instant answers for Jazan rides & pricing', 'استفسارات فورية للرحلات والأسعار بجازان')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Prompts Bar */}
        <div className="bg-slate-900/60 p-2 border-b border-slate-800 flex gap-2 overflow-x-auto scrollbar-thin">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(t(p.en, p.ar))}
              disabled={loading}
              className="text-[11px] font-semibold whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-amber-500/50 text-slate-200 hover:text-amber-400 transition-all shrink-0"
            >
              ⚡ {t(p.en, p.ar)}
            </button>
          ))}
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/90">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-indigo-900 border border-indigo-500/40 text-amber-400'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[82%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-amber-500 text-slate-950 font-semibold rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-none shadow-md'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                <span className="text-[10px] opacity-60 block text-end font-normal">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-amber-400 bg-slate-900 p-3 rounded-xl border border-slate-800 max-w-[200px]">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
              <span>{t('Thinking & preparing details...', 'جاري التحليل والتجهيز...')}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick WhatsApp & Call Action Banner */}
        <div className="bg-slate-900 p-2.5 border-t border-slate-800 flex items-center justify-between text-xs px-4">
          <span className="text-slate-400">{t('Direct Driver Line:', 'للتواصل المباشر:')}</span>
          <div className="flex gap-2">
            <a
              href={`tel:${CONTACT_PHONE_1}`}
              className="flex items-center gap-1 text-amber-400 font-bold hover:underline"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{CONTACT_PHONE_1}</span>
            </a>
            <a
              href={`https://wa.me/${WA_NUMBER_1}?text=${encodeURIComponent(t('Hello, I am using your AI Assistant and want to book a ride.', 'مرحباً، أستخدم مساعد الموقع وأود حجز رحلة.'))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 font-bold hover:underline"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{t('WhatsApp', 'واتساب')}</span>
            </a>
          </div>
        </div>

        {/* Input Form */}
        <div className="p-3 bg-slate-950 border-t border-amber-500/20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t('Type your question (e.g., Jazan to Sabya fare)...', 'اكتب سؤالك (مثلاً: كم تكلفة المشوار لصبيا؟)...')}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={loading || !inputText.trim()}
              className="p-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold disabled:opacity-50 transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
