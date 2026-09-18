'use client';

import Link from 'next/link';
import { SiteHeader } from '@/app/components/site-header';
import { SiteFooter } from '@/app/components/site-footer';
import { ScrollReveal } from '@/app/components/scroll-reveal';
import { AnimatedCounter } from '@/app/components/animated-counter';
import { Eye, Target, CircleCheck, Award, Handshake, Truck, Sparkles, ShieldCheck } from 'lucide-react';
import { QuoteModal, useQuoteModal } from '@/app/components/quote-modal';

export default function AboutPage() {
  const quoteModal = useQuoteModal();
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'عن شركة ENTITY Medical للأجهزة والمناظير الطبية',
    url: 'https://www.entitymedicalegypt.com/about',
    description: 'معلومات عن شركة ENTITY Medical، رؤيتها ورسالتها في تطوير وتجهيز غرف العمليات والأنظمة الجراحية في مصر.',
    mainEntity: {
      '@type': 'MedicalOrganization',
      name: 'ENTITY Medical Devices Egypt',
      foundingLocation: {
        '@type': 'Place',
        name: 'Cairo, Egypt',
      },
      knowsAbout: [
        'أنظمة المناظير الجراحية 4K & Full HD',
        'تجهيز غرف العمليات والمستشفيات',
        'صيانة ودعم فني للأجهزة الطبية',
        'كاميرات ومصادر إضاءة المناظير',
      ],
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#edf5fa] text-[#1B2848]" dir="rtl">
      <SiteHeader />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <main className="flex-1 pt-24 pb-20 bg-gradient-to-b from-[#edf5fa] via-[#f7fafc] to-[#eaf2f9]">
        {/* Page Hero - Deep Surgical Navy */}
        <div className="bg-gradient-to-b from-[#071322] via-[#0c1e36] to-[#071322] pt-16 pb-16 relative overflow-hidden border-b border-cyan-500/20 shadow-2xl">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="container relative z-10 mx-auto px-4 max-w-6xl">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/70 border border-cyan-400/30 text-cyan-300 text-xs sm:text-sm font-bold mb-4 shadow-lg shadow-cyan-950/50 backdrop-blur-md">
                  <ShieldCheck size={16} className="text-cyan-400 animate-pulse" /> عن الشركة ورؤيتنا المستقبلية
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="text-amber-400 font-bold">معايير جودة معتمدة</span>
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 tracking-tight text-white drop-shadow-md">
                  ENTITY <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">Medical Devices Egypt</span>
                </h1>
                <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                  خبرة السوق المحلي بمعايير عالمية في توريد وتجهيز أنظمة المناظير والآلات الجراحية الدقيقة
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-6xl mt-10">
          {/* Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <ScrollReveal>
              <div className="bg-white rounded-3xl p-8 h-full shadow-sm border border-slate-200 medical-card">
                <div className="w-14 h-14 bg-slate-50 text-[#1B9BD8] rounded-2xl flex items-center justify-center mb-6 border border-slate-100">
                  <Eye className="w-7 h-7" />
                </div>
                <h2 className="text-3xl font-black text-[#1B2848] mb-4">رؤيتنا</h2>
                <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                  أن نكون الشريك التكنولوجي الأول والأكثر موثوقية للمستشفيات والمراكز الجراحية في مصر، من خلال تقديم أحدث ما توصل إليه العلم في أنظمة المناظير والتجهيزات الطبية مع ضمان الأداء المتميز.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="bg-white rounded-3xl p-8 h-full shadow-sm border border-slate-200 medical-card">
                <div className="w-14 h-14 bg-slate-50 text-[#1B9BD8] rounded-2xl flex items-center justify-center mb-6 border border-slate-100">
                  <Target className="w-7 h-7" />
                </div>
                <h2 className="text-3xl font-black text-[#1B2848] mb-4">رسالتنا</h2>
                <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                  تسهيل وصول الجراحين ومقدمي الرعاية الصحية إلى أدوات ومعدات طبية عالية الدقة والاعتمادية، بأسعار مدروسة وشفافية كاملة ودعم فني متخصص يواكب أعلى معايير الجودة.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Banner & Story - Light Section */}
        <div className="bg-white py-20 relative border-y border-slate-200">
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 shadow-sm mb-10">
                <div className="lg:w-1/2 relative bg-white flex items-center justify-center p-6 border-b lg:border-b-0 lg:border-l border-slate-200">
                  <img
                    src="/brand/entity-banner-wide.png"
                    alt="ENTITY Medical Egypt"
                    className="w-full h-full object-cover min-h-[340px] rounded-2xl"
                  />
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 bg-white text-[#1B9BD8] rounded-full text-xs font-bold mb-4 w-max border border-slate-200 shadow-sm">منظومة توريد معتمدة</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#1B2848] mb-4">شريكك الموثوق في غرفة العمليات والرعاية</h2>
                  <p className="text-slate-600 mb-6 leading-relaxed text-sm sm:text-base">
                    في ENTITY Medical، ندرك أن جودة القرار الطبي تبدأ من دقة الأداة المستخدمة. لذا نحرص على اختيار واختبار كل جهاز ومستلزم جراحي بعناية فائقة من كبرى العلامات العالمية مثل Stryker و Karl Storz و Olympus و Mindray وغيرها.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'أنظمة مناظير 4K و Full HD متطورة',
                      'آلات جراحية دقيقة لجميع التخصصات',
                      'دعم فني واستشارات متخصصة قبل الشراء',
                      'تجهيز وتوريد شامل للمستشفيات والعيادات',
                    ].map((value, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CircleCheck className="w-5 h-5 text-[#1B9BD8] shrink-0" />
                        <span className="text-[#1B2848] font-bold text-sm">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-6xl mt-20">
          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: Award,
                title: 'الجودة والاعتمادية',
                desc: 'اختبار دقيق لكل قطعة والتأكد من مطابقتها لأعلى المعايير والمواصفات الطبية العالمية.',
              },
              {
                icon: Handshake,
                title: 'الشفافية والالتزام',
                desc: 'وضوح تام في تفاصيل الحالة والمواصفات وبلد المنشأ وفترات الضمان المعلنة.',
              },
              {
                icon: Truck,
                title: 'التوريد والدعم السريع',
                desc: 'خدمة شحن وتوصيل لكافة المحافظات مع فريق دعم فني جاهز للاستجابة على مدار الساعة.',
              },
            ].map((value, idx) => (
              <ScrollReveal key={idx} delay={idx * 75}>
                <div className="bg-white rounded-3xl p-8 text-center h-full flex flex-col justify-between shadow-sm border border-slate-200 medical-card">
                  <div>
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
                      <value.icon className="w-8 h-8 text-[#1B9BD8]" />
                    </div>
                    <h3 className="text-2xl font-black text-[#1B2848] mb-3">{value.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">{value.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 bg-[#1B2848] rounded-3xl p-8 md:p-12 shadow-md medical-card-navy">
            <ScrollReveal>
              <div className="text-center">
                <AnimatedCounter target={5} label="سنوات من التميز" suffix="+" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="text-center">
                <AnimatedCounter target={500} label="مستشفى ومركز" suffix="+" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="text-center">
                <AnimatedCounter target={300} label="جهاز طبي مورد" suffix="+" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="text-center">
                <AnimatedCounter target={100} label="رضا العملاء" suffix="%" />
              </div>
            </ScrollReveal>
          </div>

          {/* CTA Box */}
          <ScrollReveal>
            <div className="bg-white rounded-3xl p-8 md:p-12 text-center text-[#1B2848] border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-black mb-4">هل تحتاج إلى استشارة أو تجهيز لمنشأتك؟</h2>
                <p className="mb-8 max-w-2xl mx-auto text-slate-600 text-lg leading-relaxed">
                  مهندسونا المتخصصون جاهزون لمناقشة احتياجاتك وترشيح الحلول والمعدات الأنسب لميزانيتك وتخصصك.
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                  <button
                    type="button"
                    onClick={() => quoteModal.openModal('استشارة وتجهيز منشأة طبية')}
                    className="btn-azure inline-flex items-center gap-2"
                  >
                    <Sparkles size={20} />
                    تحدث مع خبير التجهيزات
                  </button>
                  <Link
                    href="/contact"
                    className="btn-ghost-azure inline-flex items-center gap-2"
                  >
                    صفحة التواصل
                  </Link>
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
