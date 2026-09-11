'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { SiteHeader } from '@/app/components/site-header';
import { SiteFooter } from '@/app/components/site-footer';
import { ScrollReveal } from '@/app/components/scroll-reveal';
import { 
  Check, 
  Clock, 
  Gift, 
  Flame, 
  ShieldCheck, 
  Truck, 
  GraduationCap, 
  Wrench, 
  Sparkles, 
  PhoneCall, 
  SlidersHorizontal,
  BadgeCheck,
} from 'lucide-react';
import { offers, offersTimerConfig } from '@/app/data/offers';
import { WhatsAppIcon as MessageCircle } from '@/app/components/whatsapp-icon';
import { QuoteModal, useQuoteModal } from '@/app/components/quote-modal';

export default function OffersPage() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
  }>({ days: 0, hours: 0, minutes: 0 });
  const [isExpired, setIsExpired] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const quoteModal = useQuoteModal();

  useEffect(() => {
    if (!offersTimerConfig.enabled) return;

    const endDate = new Date(offersTimerConfig.endAt).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = endDate - now;

      if (distance < 0) {
        setIsExpired(true);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60_000);
    return () => clearInterval(interval);
  }, []);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(offers.map(o => o.category).filter(Boolean)));
    return ['الكل', ...cats];
  }, []);

  const filteredOffers = useMemo(() => {
    if (selectedCategory === 'الكل') return offers;
    return offers.filter(o => o.category === selectedCategory);
  }, [selectedCategory]);

  // Card ribbon accent gradients
  const ribbonGradients = [
    'from-[#1B9BD8] via-[#0ea5e9] to-[#38bdf8]',
    'from-indigo-600 via-blue-600 to-[#1B9BD8]',
    'from-emerald-600 via-teal-500 to-cyan-500',
    'from-sky-600 via-[#1B9BD8] to-blue-500',
    'from-cyan-600 via-teal-600 to-emerald-500',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/60 text-[#1B2848]" dir="rtl">
      <SiteHeader />

      <main className="flex-1 pt-24 pb-20 relative">
        {/* ============================================================
            HERO: Deep Surgical Navy Showcase with Digital Console Timer
            ============================================================ */}
        <div className="relative bg-gradient-to-b from-[#071322] via-[#0d203a] to-[#081528] text-white pt-12 pb-20 overflow-hidden border-b border-cyan-500/20 shadow-2xl">
          {/* Ambient Lighting Orbs */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1B9BD8]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />
          
          {/* Subtle Tech Grid Lines Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)',
              backgroundSize: '36px 36px',
            }}
          />

          <div className="container mx-auto px-4 max-w-5xl relative z-10">
            <ScrollReveal>
              <div className="text-center">
                {/* Glowing Pill Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-xs sm:text-sm font-bold mb-5 backdrop-blur-md shadow-[0_0_25px_rgba(6,182,212,0.25)]">
                  <Sparkles size={16} className="text-cyan-400 animate-pulse" />
                  <span>باقات وتجهيزات جراحية معتمدة لعام 2026</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 text-white tracking-tight leading-tight max-w-4xl mx-auto">
                  عروض وتجهيزات <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">ENTITY</span> الطبية
                </h1>

                {/* Subheading */}
                <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
                  باقات مصممة لتجهيز غرف العمليات ومراكز المناظير والرعاية بأعلى قيمة تنافسية مع ضمان شامل وتوريد فوري
                </p>

                {/* High-Tech Surgical Console Countdown Timer */}
                {offersTimerConfig.enabled && (
                  <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.14] to-white/[0.05] backdrop-blur-2xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
                    {/* Timer Header */}
                    <div className="flex items-center justify-between gap-3 mb-6 pb-3.5 border-b border-white/10 text-xs sm:text-sm">
                      <div className="flex items-center gap-2 text-cyan-300 font-bold">
                        <Clock className="w-4 h-4 text-cyan-400 animate-pulse" />
                        <span>{offersTimerConfig.label}</span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/25 text-amber-300 border border-amber-500/50 text-[11.5px] font-bold shadow-xs">
                        <Flame size={14} className="text-amber-400 animate-bounce" /> عرض محدود المدة
                      </span>
                    </div>

                    {isExpired ? (
                      <p className="text-amber-400 font-bold text-base py-3">{offersTimerConfig.expiredMessage}</p>
                    ) : (
                      <div className="flex justify-center items-center gap-2.5 sm:gap-4 md:gap-5" dir="ltr">
                        {/* Days */}
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-18 sm:w-20 sm:h-22 rounded-2xl bg-[#06111f]/95 border border-cyan-500/40 shadow-[inset_0_2px_10px_rgba(0,0,0,0.9),0_0_25px_rgba(6,182,212,0.2)] flex flex-col items-center justify-center">
                            <span className="text-2xl sm:text-4xl font-black font-mono text-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
                              {String(timeLeft.days).padStart(2, '0')}
                            </span>
                          </div>
                          <span className="text-[11px] sm:text-xs text-slate-300 font-bold mt-2">أيام</span>
                        </div>

                        <span className="text-xl sm:text-3xl font-bold text-cyan-400/60 -mt-6 animate-pulse">:</span>

                        {/* Hours */}
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-18 sm:w-20 sm:h-22 rounded-2xl bg-[#06111f]/95 border border-cyan-500/40 shadow-[inset_0_2px_10px_rgba(0,0,0,0.9),0_0_25px_rgba(6,182,212,0.2)] flex flex-col items-center justify-center">
                            <span className="text-2xl sm:text-4xl font-black font-mono text-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
                              {String(timeLeft.hours).padStart(2, '0')}
                            </span>
                          </div>
                          <span className="text-[11px] sm:text-xs text-slate-300 font-bold mt-2">ساعات</span>
                        </div>

                        <span className="text-xl sm:text-3xl font-bold text-cyan-400/60 -mt-6 animate-pulse">:</span>

                        {/* Minutes */}
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-18 sm:w-20 sm:h-22 rounded-2xl bg-[#06111f]/95 border border-cyan-500/40 shadow-[inset_0_2px_10px_rgba(0,0,0,0.9),0_0_25px_rgba(6,182,212,0.2)] flex flex-col items-center justify-center">
                            <span className="text-2xl sm:text-4xl font-black font-mono text-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
                              {String(timeLeft.minutes).padStart(2, '0')}
                            </span>
                          </div>
                          <span className="text-[11px] sm:text-xs text-slate-300 font-bold mt-2">دقائق</span>
                        </div>

                      </div>
                    )}

                    {/* Integrated Trust Badges inside Timer */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mt-6 pt-5 border-t border-white/10 text-xs sm:text-sm text-slate-200 font-semibold">
                      <div className="flex items-center justify-center gap-2 bg-white/5 py-2.5 px-3 rounded-xl border border-white/10">
                        <ShieldCheck size={16} className="text-cyan-400 shrink-0" />
                        <span>ضمان شامل معتمد</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 bg-white/5 py-2.5 px-3 rounded-xl border border-white/10">
                        <Truck size={16} className="text-cyan-400 shrink-0" />
                        <span>توريد وتشغيل فوري</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 bg-white/5 py-2.5 px-3 rounded-xl border border-white/10">
                        <GraduationCap size={16} className="text-cyan-400 shrink-0" />
                        <span>تدريب سريري للطاقم</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* ============================================================
            MAIN CONTENT AREA
            ============================================================ */}
        <div className="container mx-auto px-4 max-w-7xl pt-12 relative z-10">

          {/* Category Filter Pills & Count */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-slate-700 ml-2 flex items-center gap-1.5">
                <SlidersHorizontal size={16} className="text-[#1B9BD8]" /> تصنيف العروض:
              </span>
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#1B9BD8] to-[#0ea5e9] text-white shadow-md shadow-[#1B9BD8]/30 scale-[1.02]'
                        : 'bg-slate-50 text-slate-700 border border-slate-200/80 hover:border-[#1B9BD8]/60 hover:text-[#1B9BD8] hover:bg-white'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="text-xs sm:text-sm font-bold text-slate-600 bg-blue-50/80 px-4 py-2 rounded-xl border border-blue-100">
              عرض <span className="text-[#1B9BD8] font-black">{filteredOffers.length}</span> باقة وتجهيز معتمد
            </div>
          </div>

          {/* ============================================================
              OFFERS GRID: Rich, High-Contrast Medical Package Cards
              ============================================================ */}
          <div className="offers-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
            {filteredOffers.map((offer, index) => {
              const ribbon = ribbonGradients[index % ribbonGradients.length];
              return (
                <div key={offer.id}>
                  <div className="offer-card bg-white rounded-3xl overflow-hidden flex flex-col h-full group border border-slate-200/90 shadow-[0_8px_30px_rgba(15,74,118,0.06)] hover:shadow-[0_20px_45px_rgba(27,155,216,0.18)] hover:border-[#1B9BD8] transition-all duration-300 relative">
                    
                    {/* Top Vibrant Color Ribbon Bar */}
                    <div className={`h-2.5 w-full bg-gradient-to-r ${ribbon}`} />

                    {/* Image Area */}
                    <div className="offer-card-media text-watermark relative bg-gradient-to-b from-slate-100/90 via-slate-50 to-white flex items-center justify-center overflow-hidden border-b border-slate-100">
                      
                      {/* Badge Top Right */}
                      {offer.badge && (
                        <span className="absolute top-3.5 right-3.5 bg-gradient-to-r from-[#1B9BD8] to-[#0ea5e9] text-white text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full shadow-md z-10 flex items-center gap-1.5">
                          <Flame size={13} className="text-amber-300 animate-pulse" />
                          <span>{offer.badge}</span>
                        </span>
                      )}

                      {/* Photo Counter Badge Top Left */}
                      {offer.images && offer.images.length > 1 && (
                        <span className="absolute top-3.5 left-3.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10.5px] font-mono font-bold px-2.5 py-0.5 rounded-lg border border-white/20 shadow-xs z-10">
                          {offer.images.length} صور
                        </span>
                      )}

                      {/* Product Visual */}
                      {offer.image ? (
                        <img
                          src={offer.image}
                          alt={offer.title}
                          className={`offer-card-image w-full h-full ${offer.imageFit === 'cover' ? 'product-image-fill' : ''}`}
                          loading="lazy"
                          decoding="async"
                          width={800}
                          height={500}
                        />
                      ) : (
                        <Gift size={48} className="text-slate-300" />
                      )}

                      {/* Category Pill Tag Bottom Left */}
                      <div className="absolute bottom-3 left-3.5 text-[10.5px] text-[#1B9BD8] font-bold bg-white/95 backdrop-blur-xs border border-blue-200/80 px-2.5 py-1 rounded-lg shadow-2xs">
                        {offer.category}
                      </div>

                      {/* Stock availability indicator Bottom Right */}
                      <div className="absolute bottom-3 right-3.5 text-[10.5px] text-slate-600 font-medium bg-white/90 backdrop-blur-xs border border-slate-200/90 px-2.5 py-1 rounded-lg shadow-2xs flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{offer.stock || 'جاهز للتوريد'}</span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                      <div>
                        {/* Title */}
                        <h3 className="device-name text-lg sm:text-xl font-black text-[#1B2848] mb-2.5 group-hover:text-[#1B9BD8] transition-colors leading-snug">
                          {offer.title}
                        </h3>

                        {/* Description */}
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-2">
                          {offer.description}
                        </p>

                        {/* Features Checklist Container */}
                        <div className="bg-gradient-to-br from-blue-50/60 via-slate-50 to-cyan-50/40 p-4 rounded-2xl border border-blue-100/80 mb-6">
                          <span className="text-[11.5px] font-bold text-slate-800 block mb-3 flex items-center gap-1.5">
                            <BadgeCheck size={15} className="text-[#1B9BD8]" />
                            محتويات ومميزات الباقة المعتمدة:
                          </span>
                          <ul className="space-y-2.5">
                            {offer.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                                <div className="w-5 h-5 rounded-full bg-cyan-100 text-[#1B9BD8] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </div>
                                <span className="leading-snug">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Pricing & CTA Box */}
                      <div>
                        {/* Dedicated Price Container */}
                        <div className="bg-gradient-to-r from-slate-50 via-blue-50/40 to-cyan-50/30 p-3.5 rounded-2xl border border-blue-100/80 mb-4 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[10.5px] text-slate-400 font-bold">القيمة قبل العرض:</span>
                            <span className="text-xs text-red-500 font-bold line-through opacity-85">{offer.oldPrice}</span>
                          </div>
                          <div className="text-left flex flex-col items-end">
                            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80 mb-0.5">
                              سعر معتمد خاص
                            </span>
                            <span className="text-xl sm:text-2xl font-black text-[#1B2848] tracking-tight">{offer.newPrice}</span>
                          </div>
                        </div>

                        {/* CTA WhatsApp Button */}
                        <button
                          type="button"
                          onClick={() => quoteModal.openModal(offer.title)}
                          className="w-full h-12 rounded-xl bg-gradient-to-r from-[#22c55e] via-[#16a34a] to-[#15803d] hover:brightness-105 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-emerald-600/30 hover:shadow-lg hover:shadow-emerald-600/40 transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap"
                        >
                          <MessageCircle size={19} className="shrink-0" />
                          <span>{offer.buttonText || 'اغتنم العرض وتواصل الآن'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ============================================================
              TRUST PILLARS (4 Colorful Medical Guarantees)
              ============================================================ */}
          <ScrollReveal>
            <div className="mt-20 pt-12 border-t border-slate-200/80">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs sm:text-sm font-bold text-[#1B9BD8] bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200/80 shadow-2xs">
                  لماذا تختار عروض ENTITY؟
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#1B2848] mt-3">
                  ضمانات حقيقية ودعم متواصل لمنشأتك
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Pillar 1: Cyan/Azure */}
                <div className="bg-gradient-to-br from-cyan-50/70 via-white to-white p-6 rounded-2xl border border-cyan-200/70 shadow-sm hover:shadow-md hover:border-cyan-400 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-[#1B9BD8] text-white flex items-center justify-center mb-4 shadow-md shadow-cyan-500/25">
                    <ShieldCheck size={26} />
                  </div>
                  <h3 className="font-bold text-[#1B2848] text-base mb-1.5">ضمان شامل وصيانة دورية</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    ضمان معتمد على كافة الأجهزة مع توفير بديل فوري أثناء الصيانة لعدم توقف العمليات.
                  </p>
                </div>

                {/* Pillar 2: Royal Blue */}
                <div className="bg-gradient-to-br from-blue-50/70 via-white to-white p-6 rounded-2xl border border-blue-200/70 shadow-sm hover:shadow-md hover:border-blue-400 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center mb-4 shadow-md shadow-blue-500/25">
                    <Truck size={26} />
                  </div>
                  <h3 className="font-bold text-[#1B2848] text-base mb-1.5">شحن وتوريد فوري بالمستشفى</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    توصيل سريع لكافة المحافظات مع فريق متخصص للتركيب والاختبار الفني الدقيق.
                  </p>
                </div>

                {/* Pillar 3: Emerald */}
                <div className="bg-gradient-to-br from-emerald-50/70 via-white to-white p-6 rounded-2xl border border-emerald-200/70 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center mb-4 shadow-md shadow-emerald-500/25">
                    <GraduationCap size={26} />
                  </div>
                  <h3 className="font-bold text-[#1B2848] text-base mb-1.5">تدريب عملي سريري للطاقم</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    جلسات تدريبية متخصصة للأطباء والتمريض على التشغيل الأمثل وإجراءات التعقيم.
                  </p>
                </div>

                {/* Pillar 4: Amber/Orange */}
                <div className="bg-gradient-to-br from-amber-50/70 via-white to-white p-6 rounded-2xl border border-amber-200/70 shadow-sm hover:shadow-md hover:border-amber-400 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center mb-4 shadow-md shadow-amber-500/25">
                    <Wrench size={26} />
                  </div>
                  <h3 className="font-bold text-[#1B2848] text-base mb-1.5">توافر قطع الغيار الأصلية</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    مخزون مستمر من العدسات والكابلات ولمبات الإضاءة وكافة الملحقات الجراحية.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* ============================================================
              VIP CUSTOM PACKAGE REQUEST BANNER
              ============================================================ */}
          <ScrollReveal>
            <div className="mt-16 bg-gradient-to-r from-[#071322] via-[#0d203a] to-[#081528] rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl relative overflow-hidden border border-[#1B9BD8]/35">
              {/* Decorative background glows */}
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#1B9BD8]/25 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl mx-auto">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-cyan-300 border border-white/20 text-xs font-bold mb-4 backdrop-blur-xs">
                  <Sparkles size={14} className="text-cyan-400" /> باقات وتجهيزات حسب الطلب
                </span>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 tracking-tight leading-snug">
                  هل تحتاج إلى باقة مخصصة لمنشأتك الجراحية؟
                </h2>
                
                <p className="text-slate-300 text-sm sm:text-base md:text-lg mb-8 leading-relaxed font-normal">
                  يقوم فريقنا الهندسي والطبي بتخصيص باقات متكاملة تشمل كاميرات المناظير، مصادر الإضاءة، الشاشات الجراحية، ووحدات النفخ بما يتوافق تماماً مع تخصصك الجراحي وميزانيتك الاستثمارية.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => quoteModal.openModal('طلب باقة وتجهيز مخصص للمنشأة')}
                    className="bg-gradient-to-r from-[#22c55e] via-[#16a34a] to-[#15803d] hover:brightness-110 text-white font-black px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-500/30 hover:scale-105 transition-all inline-flex items-center gap-2.5 text-sm sm:text-base cursor-pointer"
                  >
                    <MessageCircle size={20} />
                    <span>طلب باقة مخصصة عبر واتساب</span>
                  </button>

                  <a
                    href="tel:+201017400030"
                    className="bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-xl border border-white/20 transition-all inline-flex items-center gap-2 text-sm sm:text-base"
                  >
                    <PhoneCall size={18} className="text-cyan-400" />
                    <span>استشارة هندسية هاتفية</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>

      <SiteFooter />
      <QuoteModal isOpen={quoteModal.isOpen} onClose={quoteModal.closeModal} productName={quoteModal.productName} />
    </div>
  );
}
