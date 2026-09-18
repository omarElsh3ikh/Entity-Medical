'use client';

import { useState } from 'react';
import { SiteHeader } from '@/app/components/site-header';
import { SiteFooter } from '@/app/components/site-footer';
import { ScrollReveal } from '@/app/components/scroll-reveal';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { waLink } from '@/app/data/site-config';
import { WhatsAppIcon as MessageCircle } from '@/app/components/whatsapp-icon';
import { QuoteModal, useQuoteModal } from '@/app/components/quote-modal';

const faqs = [
  {
    question: 'إزاي أطلب منتج من عندكم؟',
    answer: 'تقدر تتصفح المنتجات وتبعتلنا اسم المنتج والكمية على واتساب أو من صفحة تواصل معنا، وهنرد عليك بعرض سعر رسمي ومواصفات فنية متكاملة فوراً.',
  },
  {
    question: 'هل الشحن متاح لكل المحافظات؟',
    answer: 'نعم، بنشحن لجميع محافظات جمهورية مصر العربية. التوصيل داخل القاهرة والجيزة في نفس اليوم أو اليوم التالي، وباقي المحافظات خلال 1 إلى 3 أيام مع تغليف طبي محكم وآمن.',
  },
  {
    question: 'هل فيه ضمان وفحص على الأجهزة؟',
    answer: 'نعم، جميع الأجهزة تمر باختبار وفحص تشغيلي دقيق قبل التسليم، ومعظم الأجهزة تشمل فترة ضمان معتمدة وخدمة دعم فني وصيانة.',
  },
  {
    question: 'هل الأسعار ثابتة؟',
    answer: 'الأسعار تتحدد حسب توفر المخزون والمواصفات المطلوبة وسعر الصرف اليومي. تواصل معنا للحصول على أحدث عرض سعر وتخفيضات الباقات المتاحة.',
  },
  {
    question: 'إيه العلامات التجارية العالمية المتوفرة؟',
    answer: 'نوفر أجهزة ومناظير من كبرى الشركات العالمية مثل Stryker, Karl Storz, Olympus, Richard Wolf, Mindray, Youshi, Covidien Valleylab, ConMed, Draeger, وغيرها.',
  },
  {
    question: 'هل بتوفروا قطع غيار وملحقات ومستهلكات جراحية؟',
    answer: 'نعم، نوفر قطع الغيار الأصلية وكابلات الإضاءة، وعدسات المناظير بجميع المقاسات والزوايا، ومستهلكات جراحة المنظار حسب التوفر.',
  },
  {
    question: 'هل بتوفروا دعم فني وخدمة صيانة متخصصة؟',
    answer: 'نعم، لدينا فريق من المهندسين والفنيين المتخصصين لتقديم الدعم الفني، التركيب، التدريب، والصيانة الدورية للمستشفيات والعيادات.',
  },
  {
    question: 'ما هي طرق الدفع والتعاقد المتاحة؟',
    answer: 'نوفر مرونة كاملة في خيارات السداد والتعاقد الرسمي للمؤسسات الطبية والمستشفيات والأطباء. تواصل معنا لتنسيق الخيار الأنسب لمنشأتك.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number>(-1);
  const quoteModal = useQuoteModal();

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900" dir="rtl">
      <SiteHeader />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="flex-1 pt-24 pb-16 relative">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16 pt-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm font-bold mb-4 shadow-sm">
                <HelpCircle size={16} className="text-[#1B9BD8]" /> مساعدة واستفسارات
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1B2848] mb-6">الأسئلة الشائعة</h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                إجابات سريعة وموثوقة على أكثر الأسئلة حول توريد، ضمان، وصيانة الأجهزة الطبية في مصر
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="faq-section space-y-4 mb-20">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 medical-card shadow-sm ${isOpen ? 'border border-[#1B9BD8] shadow-md' : 'border border-slate-200 hover:border-slate-300'}`}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-5 md:p-6 text-right focus:outline-none cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className={`font-bold text-lg ${isOpen ? 'text-[#1B9BD8]' : 'text-slate-900'}`}>
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 shrink-0 ${isOpen ? 'transform rotate-180 text-[#1B9BD8]' : 'text-slate-400'}`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="p-5 md:p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100 mx-5 md:mx-6 mt-1 text-base">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="faq-support-card bg-white rounded-3xl p-8 md:p-12 text-center border border-slate-200 shadow-sm relative overflow-hidden medical-card">
              <a
                href={waLink('مرحباً، لدي استفسار غير موجود في الأسئلة الشائعة.')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تواصل معنا عبر واتساب"
                className="w-16 h-16 bg-slate-50 text-[#22c55e] rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-200 transition-all hover:-translate-y-1 hover:border-[#22c55e]/40 hover:shadow-lg"
              >
                <MessageCircle className="w-8 h-8" />
              </a>
              <h2 className="text-3xl font-black text-[#1B2848] mb-4">هل لديك استفسار آخر؟</h2>
              <p className="text-slate-600 mb-8 max-w-lg mx-auto text-lg leading-relaxed">
                تواصل معنا مباشرة وسيقوم مهندسونا بالرد الفوري وتقديم التوجيه الفني المناسب.
              </p>
              <div className="faq-quick-links">
                <a href={waLink('مرحباً، أريد معرفة سعر وتفاصيل جهاز طبي.')} target="_blank" rel="noopener noreferrer">سعر جهاز</a>
                <a href={waLink('مرحباً، أريد التأكد من توفر جهاز وموعد التوريد.')} target="_blank" rel="noopener noreferrer">التوفر والتوريد</a>
                <a href={waLink('مرحباً، أحتاج إلى خدمة صيانة أو دعم فني.')} target="_blank" rel="noopener noreferrer">صيانة ودعم</a>
              </div>
              <button
                type="button"
                onClick={() => quoteModal.openModal('استفسار عام')}
                className="btn-whatsapp px-10 py-4 inline-flex text-lg shadow-md cursor-pointer"
              >
                <MessageCircle size={20} /> اطلب تسعير أو استفسار
              </button>
            </div>
          </ScrollReveal>
        </div>
      </main>

      <SiteFooter />
      <QuoteModal isOpen={quoteModal.isOpen} onClose={quoteModal.closeModal} productName={quoteModal.productName} />
    </div>
  );
}
