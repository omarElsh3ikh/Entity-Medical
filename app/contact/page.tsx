'use client';

import { useState } from 'react';
import { SiteHeader } from '@/app/components/site-header';
import { SiteFooter } from '@/app/components/site-footer';
import { ScrollReveal } from '@/app/components/scroll-reveal';
import { MapPin, Phone, Mail, Sparkles, Clock, CheckCircle2, Building2, CalendarClock, Send, Loader2, AlertCircle } from 'lucide-react';
import { waLink, siteConfig } from '@/app/data/site-config';
import { WhatsAppIcon as MessageCircle } from '@/app/components/whatsapp-icon';

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'تواصل مع ENTITY Medical للأجهزة والمناظير الطبية',
  url: 'https://www.entitymedicalegypt.com/contact',
  description: 'صفحة التواصل المباشر وطلب عروض الأسعار الرسمية لتجهيز المستشفيات والعيادات بالأجهزة والمناظير الطبية.',
  mainEntity: {
    '@type': 'MedicalBusiness',
    name: 'ENTITY Medical Devices Egypt',
    telephone: '+201055834363',
    email: 'info@entitymedicalegypt.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'May Towers, Nasr City',
      addressLocality: 'Cairo',
      addressCountry: 'EG',
    },
  },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    subject: 'طلب عرض سعر لجهاز',
    institutionType: 'مستشفى / مركز طبي',
    governorate: '',
    quantity: '1',
    urgency: 'خلال أسبوع',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const form = new FormData();
      form.append('الاسم / المؤسسة', formData.name);
      form.append('رقم الهاتف', formData.phone);
      form.append('رقم الواتساب', formData.whatsapp || formData.phone);
      form.append('البريد الإلكتروني', formData.email);
      form.append('نوع الجهة', formData.institutionType);
      form.append('الموضوع', formData.subject);
      form.append('المحافظة', formData.governorate);
      form.append('الكمية', formData.quantity);
      form.append('موعد الاحتياج', formData.urgency);
      form.append('تفاصيل الطلب', formData.message);
      form.append('تاريخ ووقت الطلب', new Date().toLocaleString('ar-EG'));
      form.append('صفحة الطلب', window.location.href);
      form.append('_replyto', formData.email);
      form.append('_subject', `طلب جديد من صفحة تواصل معنا: ${formData.subject} - ${formData.name}`);
      form.append('_template', 'table');
      form.append('_captcha', 'false');
      form.append('_url', window.location.href);
      const honey = new FormData(e.currentTarget).get('_honey');
      form.append('_honey', typeof honey === 'string' ? honey : '');

      const response = await fetch(`https://formsubmit.co/ajax/${siteConfig.email}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: form,
      });

      const result = (await response.json().catch(() => null)) as {
        success?: boolean | string;
        message?: string;
      } | null;
      const accepted = result?.success === true || result?.success === 'true';

      if (response.ok && accepted) {
        setIsSuccess(true);
        setErrorMessage(null);
        setFormData({
          name: '',
          phone: '',
          whatsapp: '',
          email: '',
          subject: 'طلب عرض سعر لجهاز',
          institutionType: 'مستشفى / مركز طبي',
          governorate: '',
          quantity: '1',
          urgency: 'خلال أسبوع',
          message: '',
        });
      } else {
        setErrorMessage(
          result?.message ||
            'تم استلام بياناتك بنجاح! إذا كانت هذه أول رسالة عبر الموقع، يرجى تفعيل البريد من رسالة FormSubmit الواردة على إيميل الشركة مرة واحدة فقط.'
        );
      }
    } catch {
      setErrorMessage('حدث خطأ في الاتصال بالشبكة. يرجى المحاولة مرة أخرى أو التواصل مباشرة عبر الواتساب.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900" dir="rtl">
      <SiteHeader />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <main className="flex-1 pt-24 pb-16 bg-gradient-to-b from-[#edf5fa] via-[#f7fafc] to-[#eaf2f9]">
        {/* Page Hero - Deep Surgical Navy */}
        <div className="bg-gradient-to-b from-[#071322] via-[#0c1e36] to-[#071322] pt-16 pb-16 relative overflow-hidden border-b border-cyan-500/20 shadow-2xl">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="container relative z-10 mx-auto px-4 max-w-6xl">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/70 border border-cyan-400/30 text-cyan-300 text-xs sm:text-sm font-bold mb-4 shadow-lg shadow-cyan-950/50 backdrop-blur-md">
                  <Sparkles size={16} className="text-cyan-400 animate-pulse" /> تواصل مباشر واستجابة سريعة
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="text-amber-400 font-bold">دعم واستشارات 24/7</span>
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-white drop-shadow-md">
                  تواصل مع خبراء <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">ENTITY Medical</span>
                </h1>
                <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
                  فريقنا الهندسي والطبي جاهز لتقديم عروض الأسعار المعتمدة، استشارات التجهيز، والدعم الفني لكافة مستشفيات ومراكز مصر
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="py-16 relative">
          <div className="container mx-auto px-4 max-w-6xl mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
              {/* Left Info Card */}
              <div className="lg:col-span-5">
                <ScrollReveal>
                  <div className="bg-white p-8 sm:p-10 relative overflow-hidden h-full rounded-3xl border border-slate-200 shadow-sm medical-card">
                    <h2 className="text-3xl font-black mb-3 text-[#1B2848]">قنوات الاتصال المباشر</h2>
                    <p className="text-slate-600 text-sm mb-8 leading-relaxed">
                      يسعدنا استقبال استفساراتكم بشأن الأجهزة، أنظمة المناظير، خدمات الصيانة، أو طلبات التوريد المباشر للمستشفيات والعيادات.
                    </p>

                    <div className="space-y-6 mb-10">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-slate-50 text-[#1B9BD8] rounded-2xl flex items-center justify-center shrink-0 border border-slate-200">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#1B2848] text-base mb-1">الهاتف والواتساب</h3>
                          <a href={`tel:${siteConfig.phoneIntl}`} className="text-slate-600 text-sm hover:text-[#1B9BD8] transition-colors font-mono font-bold" dir="ltr">
                            {siteConfig.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-slate-50 text-[#1B9BD8] rounded-2xl flex items-center justify-center shrink-0 border border-slate-200">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#1B2848] text-base mb-1">البريد الإلكتروني</h3>
                          <a href={`mailto:${siteConfig.email}`} className="text-slate-600 text-sm hover:text-[#1B9BD8] transition-colors font-medium">
                            {siteConfig.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-slate-50 text-[#1B9BD8] rounded-2xl flex items-center justify-center shrink-0 border border-slate-200">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#1B2848] text-base mb-1">المقر الرئيسي والتغطية</h3>
                          <p className="text-slate-600 text-sm font-medium">{siteConfig.address} — شحن وتجهيز لجميع المحافظات</p>
                          <a
                            href={siteConfig.maps}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 mt-2 text-[#1B9BD8] hover:text-[#075da8] text-xs font-extrabold"
                          >
                            <MapPin size={14} /> فتح الموقع على خرائط Google
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-500 block mb-2 font-bold">تواصل فوري عبر المنصات:</span>
                        <div className="flex gap-3">
                          <a
                            href={siteConfig.social.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-slate-50 hover:bg-[#1B9BD8] hover:text-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 transition-colors"
                          >
                            فيسبوك
                          </a>
                          <a
                            href={siteConfig.social.telegram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-slate-50 hover:bg-[#0ea5e9] hover:text-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 transition-colors"
                          >
                            تيليجرام
                          </a>
                          <a
                            href={waLink('مرحباً ENTITY Medical، أريد الاستفسار عن الأجهزة الطبية')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20 hover:bg-[#22c55e] hover:text-white rounded-lg text-xs font-bold transition-colors"
                          >
                            واتساب
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right Form Card */}
              <div className="lg:col-span-7">
                <ScrollReveal delay={100}>
                  <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-200 medical-card">
                    <div className="mb-6">
                      <span className="text-[#1B9BD8] font-bold text-xs uppercase tracking-wider block mb-1">نموذج الطلب الرسمي المباشر</span>
                      <h2 className="text-3xl font-black text-[#1B2848]">طلب عرض سعر أو استشارة فنية</h2>
                      <p className="text-slate-600 text-sm mt-2">املأ البيانات وسيصل طلبك مباشرة إلى البريد الإلكتروني المعتمد للشركة.</p>
                      <div className="request-form-benefits">
                        <span><CheckCircle2 size={14} /> فحص وتوثيق 100%</span>
                        <span><Building2 size={14} /> مخصص للمستشفيات والعيادات</span>
                        <span><CalendarClock size={14} /> تسليم وتوريد سريع</span>
                      </div>
                    </div>

                    {errorMessage && (
                      <div className="mb-5 p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl flex items-start gap-3 text-sm leading-relaxed">
                        <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                        <div>{errorMessage}</div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0 pointer-events-none" />
                      <div>
                        <label htmlFor="name" className="block text-xs font-bold text-slate-700 mb-1.5">
                          الاسم بالكامل / اسم المؤسسة الطبية <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl focus:ring-2 focus:ring-[#1B9BD8]/40 focus:border-[#1B9BD8] outline-none transition-all text-sm font-medium placeholder-slate-400"
                          placeholder="مثال: د. حسام فتحي / مستشفى النور"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="institutionType" className="block text-xs font-bold text-slate-700 mb-1.5">نوع الجهة الطبية</label>
                          <select id="institutionType" name="institutionType" value={formData.institutionType} onChange={handleChange} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl focus:ring-2 focus:ring-[#1B9BD8]/40 focus:border-[#1B9BD8] outline-none transition-all text-sm font-medium">
                            <option>مستشفى / مركز طبي</option>
                            <option>عيادة خاصة</option>
                            <option>شركة تجهيزات</option>
                            <option>طبيب / جراح</option>
                            <option>أخرى</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="governorate" className="block text-xs font-bold text-slate-700 mb-1.5">المحافظة / مكان التوريد <span className="text-red-500">*</span></label>
                          <input type="text" id="governorate" name="governorate" value={formData.governorate} onChange={handleChange} required className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl focus:ring-2 focus:ring-[#1B9BD8]/40 focus:border-[#1B9BD8] outline-none transition-all text-sm font-medium" placeholder="مثال: القاهرة / مدينة نصر" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="quantity" className="block text-xs font-bold text-slate-700 mb-1.5">الكمية التقريبية</label>
                          <input type="number" min="1" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl focus:ring-2 focus:ring-[#1B9BD8]/40 focus:border-[#1B9BD8] outline-none transition-all text-sm font-medium" />
                        </div>
                        <div>
                          <label htmlFor="urgency" className="block text-xs font-bold text-slate-700 mb-1.5">موعد الاحتياج المتوقع</label>
                          <select id="urgency" name="urgency" value={formData.urgency} onChange={handleChange} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl focus:ring-2 focus:ring-[#1B9BD8]/40 focus:border-[#1B9BD8] outline-none transition-all text-sm font-medium">
                            <option>فوري / طارئ</option>
                            <option>خلال أسبوع</option>
                            <option>خلال شهر</option>
                            <option>للمقارنة والتخطيط</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="phone" className="block text-xs font-bold text-slate-700 mb-1.5">
                            رقم التواصل <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl focus:ring-2 focus:ring-[#1B9BD8]/40 focus:border-[#1B9BD8] outline-none transition-all text-sm font-medium text-right placeholder-slate-400"
                            placeholder="01XXXXXXXXX"
                            dir="ltr"
                          />
                        </div>

                        <div>
                          <label htmlFor="whatsapp" className="block text-xs font-bold text-slate-700 mb-1.5">
                            رقم الواتساب <span className="text-slate-400">(لو مختلف)</span>
                          </label>
                          <input
                            type="tel"
                            id="whatsapp"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl focus:ring-2 focus:ring-[#1B9BD8]/40 focus:border-[#1B9BD8] outline-none transition-all text-sm font-medium text-right placeholder-slate-400"
                            placeholder="نفس الرقم لو فاضي"
                            dir="ltr"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1.5">
                            البريد الإلكتروني <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl focus:ring-2 focus:ring-[#1B9BD8]/40 focus:border-[#1B9BD8] outline-none transition-all text-sm font-medium placeholder-slate-400"
                            placeholder="example@domain.com"
                            dir="ltr"
                          />
                        </div>

                        <div>
                          <label htmlFor="subject" className="block text-xs font-bold text-slate-700 mb-1.5">
                            موضوع الاستفسار
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl focus:ring-2 focus:ring-[#1B9BD8]/40 focus:border-[#1B9BD8] outline-none transition-all text-sm font-medium"
                          >
                            <option value="طلب عرض سعر لجهاز">طلب عرض سعر لجهاز</option>
                            <option value="تجهيز عيادة أو مركز جراحي">تجهيز عيادة أو مركز جراحي</option>
                            <option value="استفسار عن مناظير وكاميرات">استفسار عن مناظير وكاميرات</option>
                            <option value="استفسار عن آلات جراحية">استفسار عن آلات جراحية</option>
                            <option value="خدمة ما بعد البيع والصيانة">خدمة ما بعد البيع والصيانة</option>
                            <option value="أخرى">أخرى</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-xs font-bold text-slate-700 mb-1.5">
                          تفاصيل الاحتياج أو الأجهزة المطلوبة <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl focus:ring-2 focus:ring-[#1B9BD8]/40 focus:border-[#1B9BD8] outline-none transition-all resize-none text-sm font-medium placeholder-slate-400"
                          placeholder="اكتب أسماء الأجهزة، الموديلات، أو تفاصيل المنظومة المطلوبة..."
                        />
                      </div>

                      {isSuccess ? (
                        <div className="bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-2xl p-6 text-center">
                          <CheckCircle2 size={36} className="text-[#22c55e] mx-auto mb-3" />
                          <h3 className="font-bold text-[#1B2848] text-lg mb-1">تم استلام طلبك بنجاح! ✅</h3>
                          <p className="text-slate-600 text-sm">تم إرسال بياناتك لفريق ENTITY Medical وسيتم التواصل معك خلال 24 ساعة كحد أقصى.</p>
                          <button
                            type="button"
                            onClick={() => setIsSuccess(false)}
                            className="mt-4 px-5 py-2 bg-[#1B9BD8] text-white rounded-xl font-bold text-xs hover:bg-[#0ea5e9] transition-all cursor-pointer"
                          >
                            إرسال طلب آخر
                          </button>
                        </div>
                      ) : (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 rounded-2xl transition-all flex items-center justify-center gap-2 text-base shadow-md hover:shadow-lg bg-[#1B9BD8] hover:bg-[#0ea5e9] text-white font-bold disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                        >
                          {isSubmitting ? (
                            <><Loader2 size={20} className="animate-spin" /> جاري إرسال الطلب...</>
                          ) : (
                            <><Send size={18} /> إرسال الطلب الرسمي</>
                          )}
                        </button>
                      )}

                      <p className="text-center text-slate-400 text-[11px]">بياناتك آمنة وسرية تماماً ولن تُستخدم إلا للتواصل بخصوص طلبك</p>
                    </form>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Schedule / Hours */}
            <ScrollReveal>
              <div className="contact-hours-card">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 text-[#1B9BD8] rounded-2xl flex items-center justify-center shrink-0 border border-slate-200">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1B2848] mb-1">مواعيد العمل واستقبال الطلبات</h3>
                    <div className="contact-hours-details">
                      <span><b>السبت — الخميس</b><strong dir="ltr">9:00 AM — 6:00 PM</strong></span>
                      <span><b>الجمعة</b><strong>استقبال طوارئ وواتساب</strong></span>
                      <span className="is-live"><i /> استقبال رسائل واتساب 24/7</span>
                    </div>
                  </div>
                </div>

                <a
                  href={waLink('مرحباً ENTITY Medical، أريد الاستفسار عن الأجهزة الطبية')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-azure px-8 py-3 shrink-0"
                >
                  <MessageCircle size={18} /> محادثة فورية عبر واتساب
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
