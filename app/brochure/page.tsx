import type { Metadata } from 'next';
import { BookOpen, Download, ExternalLink, Award } from 'lucide-react';
import { SiteHeader } from '@/app/components/site-header';
import { SiteFooter } from '@/app/components/site-footer';

export const metadata: Metadata = {
  title: 'بروشور ENTITY Medical Egypt | الكتالوج الرسمي المعتمد',
  description: 'تصفح وحمل البروشور الرسمي الشامل لحلول وأجهزة وتجهيزات ENTITY Medical Egypt الجراحية.',
};

const brochureUrl = '/brochure/entity-medical-brochure.pdf';

const documentSchema = {
  '@context': 'https://schema.org',
  '@type': 'DigitalDocument',
  name: 'بروشور ENTITY Medical للأجهزة والمناظير الطبية 2026',
  url: 'https://www.entitymedicalegypt.com/brochure',
  encodingFormat: 'application/pdf',
  fileFormat: 'application/pdf',
  inLanguage: 'ar-EG',
  author: {
    '@type': 'Organization',
    name: 'ENTITY Medical Devices Egypt',
  },
  description: 'الكتالوج الطبي الشامل لأنظمة المناظير الجراحية 4K، مصادر الإضاءة، الكاميرات، والمستلزمات الطبية لعام 2026.',
};

export default function BrochurePage() {
  return (
    <main className="min-h-screen bg-[#edf5fa] text-slate-900 flex flex-col" dir="rtl">
      <SiteHeader />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(documentSchema) }}
      />
      
      {/* Deep Surgical Navy Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-gradient-to-b from-[#071322] via-[#0c1e36] to-[#071322] border-b border-cyan-500/20 shadow-2xl">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/70 border border-cyan-400/30 text-cyan-300 text-xs sm:text-sm font-bold mb-5 shadow-lg shadow-cyan-950/50 backdrop-blur-md">
                <BookOpen size={18} className="text-cyan-400 animate-pulse" />
                <span>الوثيقة الفنية الرسمية · 2026 EDITION</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-amber-400 font-black flex items-center gap-1"><Award size={13} /> معتمد</span>
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-5 text-white drop-shadow-md">
                البروشور الطبي <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">الرسمي المعتمد</span>
              </h1>
              <p className="text-slate-300 text-lg sm:text-xl leading-relaxed">
                تصفح 9 صفحات من أنظمة المناظير والتصوير الجراحي بدقة 4K والأدوات والملحقات المعتمدة في مصر.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a 
                href={brochureUrl} 
                download="ENTITY-Medical-Brochure.pdf" 
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-110 active:scale-[0.98] text-slate-950 font-black shadow-lg shadow-amber-500/30 transition-all text-sm sm:text-base cursor-pointer"
              >
                <Download size={20} className="stroke-[2.5]" />
                <span>تحميل النسخة الكاملة PDF</span>
              </a>
              <a 
                href={brochureUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-bold transition-all shadow-sm inline-flex items-center gap-2 px-7 py-4 text-sm sm:text-base backdrop-blur-xs"
              >
                <ExternalLink size={18} className="text-cyan-400" />
                <span>عرض في نافذة مستقلة</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded PDF Viewer Section on Ice-Blue Canvas */}
      <section className="py-12 sm:py-20 flex-1 bg-gradient-to-b from-[#edf5fa] via-[#f7fafc] to-[#eaf2f9]">
        <div className="container">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden">
            {/* Viewer Header Bar */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-cyan-50/20 to-blue-50/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 text-[#1B9BD8] flex items-center justify-center font-black">
                  PDF
                </div>
                <div>
                  <b className="block text-base text-[#1B2848]">ENTITY Medical Egyptian Official Brochure</b>
                  <span className="text-xs text-slate-500">مواصفات فنية · 9 صفحات ملونة · 7.4 MB · إصدار 2026</span>
                </div>
              </div>

              <a 
                href={brochureUrl} 
                download="ENTITY-Medical-Brochure.pdf" 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-sm shadow-amber-500/20"
              >
                <Download size={16} />
                <span>تحميل مباشر</span>
              </a>
            </div>

            {/* Embed */}
            <object 
              data={`${brochureUrl}#toolbar=1&navpanes=0&view=FitH`} 
              type="application/pdf" 
              className="w-full h-[78vh] min-h-[620px] bg-slate-900/5" 
              aria-label="بروشور ENTITY Medical"
            >
              <div className="p-12 text-center bg-slate-50 h-full flex flex-col items-center justify-center">
                <img 
                  src="/brochure/cover.webp" 
                  alt="غلاف بروشور ENTITY Medical" 
                  className="max-w-2xl w-full rounded-2xl shadow-xl border border-slate-200 mb-8" 
                />
                <p className="text-slate-600 mb-6 text-lg font-medium">متصفحك لا يدعم عرض ملفات PDF المدمجة مباشرة في الصفحة.</p>
                <a 
                  href={brochureUrl} 
                  download="ENTITY-Medical-Brochure.pdf" 
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-black shadow-md shadow-amber-500/30 transition-all text-base"
                >
                  <Download size={20} />
                  <span>تحميل البروشور بصيغة PDF</span>
                </a>
              </div>
            </object>
          </div>
        </div>
      </section>
      
      <SiteFooter />
    </main>
  );
}
