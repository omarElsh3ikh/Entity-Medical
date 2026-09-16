'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, FileText, CheckCircle2, Building2, Mail, Loader2 } from 'lucide-react';
import { siteConfig, waLink } from '@/app/data/site-config';
import { WhatsAppIcon } from '@/app/components/whatsapp-icon';

type ModalStep = 'choose' | 'form' | 'success';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export function QuoteModal({ isOpen, onClose, productName }: QuoteModalProps) {
  const [step, setStep] = useState<ModalStep>('choose');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    governorate: '',
    institutionType: 'مستشفى / مركز طبي',
    preferredContact: 'واتساب',
    subject: 'طلب عرض سعر',
    devices: '',
    quantity: '1',
    urgency: 'خلال أسبوع',
    notes: '',
  });

  const resetAndClose = useCallback(() => {
    setStep('choose');
    setFormData({
      name: '', phone: '', whatsapp: '', email: '', governorate: '',
      institutionType: 'مستشفى / مركز طبي', preferredContact: 'واتساب',
      subject: 'طلب عرض سعر', devices: '', quantity: '1', urgency: 'خلال أسبوع', notes: '',
    });
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') resetAndClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, resetAndClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = () => {
    const msg = productName
      ? `مرحباً ENTITY Medical، أود طلب تسعير للجهاز: ${productName}`
      : 'مرحباً ENTITY Medical، أود الاستفسار وطلب عرض سعر رسمي للأجهزة الطبية';
    window.open(waLink(msg), '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = new FormData();
      form.append('الاسم / المؤسسة', formData.name);
      form.append('رقم الهاتف', formData.phone);
      form.append('رقم الواتساب', formData.whatsapp || formData.phone);
      form.append('البريد الإلكتروني', formData.email);
      form.append('المحافظة / مكان التوريد', formData.governorate);
      form.append('نوع الجهة', formData.institutionType);
      form.append('وسيلة التواصل المفضلة', formData.preferredContact);
      form.append('الموضوع', formData.subject);
      form.append('الأجهزة المطلوبة', formData.devices || productName || 'غير محدد');
      form.append('الكمية', formData.quantity);
      form.append('موعد الاحتياج', formData.urgency);
      form.append('ملاحظات إضافية', formData.notes);
      form.append('تاريخ ووقت الطلب', new Date().toLocaleString('ar-EG'));
      form.append('صفحة الطلب', window.location.href);
      form.append('_replyto', formData.email);
      form.append('_subject', `طلب جديد من الموقع: ${formData.subject}${formData.devices ? ` | ${formData.devices}` : ''}`);
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

      const result = await response.json().catch(() => null) as { success?: boolean | string; message?: string } | null;
      const accepted = result?.success === true || result?.success === 'true';

      if (response.ok && accepted) {
        setStep('success');
      } else {
        alert(result?.message || 'لم تقبل خدمة البريد الطلب. تأكد من تفعيل FormSubmit من رسالة التفعيل المرسلة إلى بريد الشركة.');
      }
    } catch {
      alert('حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || typeof document === 'undefined') return null;
  const inputClass = "w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-[#1B9BD8]/30 focus:border-[#1B9BD8] outline-none transition-all text-sm font-medium placeholder-slate-400";
  const labelClass = "block text-xs font-bold text-slate-700 mb-1.5";

  return createPortal(
    <div className="quote-modal-layer fixed inset-0 z-[999999] flex items-center justify-center p-4" dir="rtl">
      {/* Backdrop */}
      {/* Modal */}
      <dialog open className="quote-modal-panel relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-slate-200" style={{ scrollbarWidth: 'thin' }} aria-labelledby="quote-modal-title">
        <button
          onClick={resetAndClose}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors z-10"
          aria-label="إغلاق"
        >
          <X size={18} />
        </button>

        {/* Step 1: Choose */}
        {step === 'choose' && (
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto bg-[#1B9BD8]/10 rounded-2xl flex items-center justify-center mb-4">
                <Send size={28} className="text-[#1B9BD8]" />
              </div>
              <h2 id="quote-modal-title" className="text-2xl font-black text-[#1B2848] mb-2">اطلب تسعير أو استفسار</h2>
              <p className="text-slate-500 text-sm">اختر الطريقة المناسبة لك للتواصل معنا</p>
              {productName && (
                <span className="inline-block mt-3 px-3 py-1 bg-[#1B9BD8]/10 text-[#1B9BD8] text-xs font-bold rounded-full">
                  {productName}
                </span>
              )}
            </div>

            <div className="space-y-4">
              <button
                onClick={handleWhatsApp}
                className="quote-choice-button is-whatsapp w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-[#22c55e]/20 bg-[#22c55e]/5 hover:bg-[#22c55e]/10 hover:border-[#22c55e]/40 transition-all text-right group"
              >
                <div className="w-14 h-14 bg-[#22c55e] rounded-xl flex items-center justify-center shrink-0 text-white group-hover:scale-105 transition-transform">
                  <WhatsAppIcon size={26} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#1B2848] text-base mb-0.5">طلب عبر الواتساب</h3>
                  <p className="text-slate-500 text-xs">محادثة فورية مع فريقنا المتخصص</p>
                </div>
                <span className="text-[#22c55e] text-xs font-bold bg-[#22c55e]/10 px-3 py-1 rounded-full shrink-0">فوري</span>
              </button>

              <button
                onClick={() => setStep('form')}
                className="quote-choice-button is-form w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-[#1B9BD8]/20 bg-[#1B9BD8]/5 hover:bg-[#1B9BD8]/10 hover:border-[#1B9BD8]/40 transition-all text-right group"
              >
                <div className="w-14 h-14 bg-[#1B9BD8] rounded-xl flex items-center justify-center shrink-0 text-white group-hover:scale-105 transition-transform">
                  <FileText size={26} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#1B2848] text-base mb-0.5">تسجيل فوري بالبيانات</h3>
                  <p className="text-slate-500 text-xs">نموذج تفصيلي يُرسل مباشرة على الإيميل</p>
                </div>
                <span className="text-[#1B9BD8] text-xs font-bold bg-[#1B9BD8]/10 px-3 py-1 rounded-full shrink-0">نموذج</span>
              </button>
            </div>

            <p className="text-center text-slate-400 text-[11px] mt-6">
              مواعيد العمل: السبت — الخميس · 9:00 ص — 6:00 م · طوارئ واتساب 24/7
            </p>
          </div>
        )}

        {/* Step 2: Form */}
        {step === 'form' && (
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <button onClick={() => setStep('choose')} className="text-[#1B9BD8] text-xs font-bold hover:underline mb-3 inline-block">
                ← رجوع للخيارات
              </button>
              <h2 id="quote-modal-title" className="text-xl font-black text-[#1B2848] mb-1">نموذج طلب تسعير / استفسار</h2>
              <p className="text-slate-500 text-xs">بيانات الطلب تُرسل مباشرة على البريد الإلكتروني لفريقنا</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#1B9BD8] bg-[#1B9BD8]/10 px-2.5 py-1 rounded-full"><CheckCircle2 size={12} /> رد خلال 24 ساعة</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#1B9BD8] bg-[#1B9BD8]/10 px-2.5 py-1 rounded-full"><Building2 size={12} /> مناسب للمؤسسات</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#1B9BD8] bg-[#1B9BD8]/10 px-2.5 py-1 rounded-full"><Mail size={12} /> يصل للإيميل مباشرة</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0 pointer-events-none" />
              <div>
                <label htmlFor="qm-name" className={labelClass}>الاسم بالكامل / اسم المؤسسة <span className="text-red-500">*</span></label>
                <input type="text" id="qm-name" name="name" value={formData.name} onChange={handleChange} required className={inputClass} placeholder="مثال: د. حسام فتحي / مستشفى النور" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="qm-phone" className={labelClass}>رقم التواصل <span className="text-red-500">*</span></label>
                  <input type="tel" id="qm-phone" name="phone" value={formData.phone} onChange={handleChange} required className={inputClass} placeholder="01XXXXXXXXX" dir="ltr" style={{ textAlign: 'right' }} />
                </div>
                <div>
                  <label htmlFor="qm-whatsapp" className={labelClass}>رقم الواتساب <span className="text-slate-400">(لو مختلف)</span></label>
                  <input type="tel" id="qm-whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className={inputClass} placeholder="نفس الرقم لو فاضي" dir="ltr" style={{ textAlign: 'right' }} />
                </div>
              </div>

              <div>
                <label htmlFor="qm-email" className={labelClass}>البريد الإلكتروني <span className="text-red-500">*</span></label>
                <input type="email" id="qm-email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="example@domain.com" dir="ltr" style={{ textAlign: 'right' }} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="qm-governorate" className={labelClass}>المحافظة / مكان التوريد <span className="text-red-500">*</span></label>
                  <input type="text" id="qm-governorate" name="governorate" value={formData.governorate} onChange={handleChange} required className={inputClass} placeholder="مثال: القاهرة / مدينة نصر" />
                </div>
                <div>
                  <label htmlFor="qm-preferred-contact" className={labelClass}>وسيلة التواصل المفضلة</label>
                  <select id="qm-preferred-contact" name="preferredContact" value={formData.preferredContact} onChange={handleChange} className={inputClass}>
                    <option>واتساب</option>
                    <option>مكالمة هاتفية</option>
                    <option>بريد إلكتروني</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="qm-institution" className={labelClass}>نوع الجهة</label>
                  <select id="qm-institution" name="institutionType" value={formData.institutionType} onChange={handleChange} className={inputClass}>
                    <option>مستشفى / مركز طبي</option>
                    <option>عيادة خاصة</option>
                    <option>شركة تجهيزات</option>
                    <option>طبيب / جراح</option>
                    <option>أخرى</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="qm-subject" className={labelClass}>موضوع الطلب</label>
                  <select id="qm-subject" name="subject" value={formData.subject} onChange={handleChange} className={inputClass}>
                    <option>طلب عرض سعر</option>
                    <option>تجهيز عيادة أو مركز جراحي</option>
                    <option>استفسار عن مناظير وكاميرات</option>
                    <option>استفسار عن آلات جراحية</option>
                    <option>خدمة ما بعد البيع والصيانة</option>
                    <option>أخرى</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="qm-devices" className={labelClass}>الأجهزة أو المنتجات المطلوبة <span className="text-red-500">*</span></label>
                <input type="text" id="qm-devices" name="devices" value={formData.devices} onChange={handleChange} required className={inputClass} placeholder="مثال: كاميرا Stryker 1688 + مصدر ضوء L11" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="qm-quantity" className={labelClass}>الكمية التقريبية</label>
                  <input type="number" min="1" id="qm-quantity" name="quantity" value={formData.quantity} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="qm-urgency" className={labelClass}>موعد الاحتياج</label>
                  <select id="qm-urgency" name="urgency" value={formData.urgency} onChange={handleChange} className={inputClass}>
                    <option>فوري / طارئ</option>
                    <option>خلال أسبوع</option>
                    <option>خلال شهر</option>
                    <option>للمقارنة والتخطيط</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="qm-notes" className={labelClass}>ملاحظات إضافية</label>
                <textarea id="qm-notes" name="notes" value={formData.notes} onChange={handleChange} rows={3} className={`${inputClass} resize-none`} placeholder="أي تفاصيل إضافية أو ملاحظات..." />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#1B9BD8] hover:bg-[#0ea5e9] text-white font-bold text-base shadow-lg hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <><Loader2 size={20} className="animate-spin" /> جاري الإرسال...</>
                ) : (
                  <><Send size={18} /> إرسال الطلب</>
                )}
              </button>

              <p className="text-center text-slate-400 text-[11px]">
                بياناتك آمنة تماماً ولن تُستخدم إلا للتواصل بخصوص طلبك
              </p>
            </form>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 'success' && (
          <div className="p-8 text-center">
            <div className="w-20 h-20 mx-auto bg-[#22c55e]/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={40} className="text-[#22c55e]" />
            </div>
            <h2 id="quote-modal-title" className="text-2xl font-black text-[#1B2848] mb-3">تم إرسال طلبك بنجاح! ✅</h2>
            <p className="text-slate-600 text-sm mb-2 leading-relaxed">
              تم إرسال بيانات طلبك مباشرة على البريد الإلكتروني لفريق ENTITY Medical.
            </p>
            <p className="text-slate-500 text-xs mb-8">
              سيتم التواصل معك خلال 24 ساعة عمل كحد أقصى.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-sm transition-all"
              >
                <WhatsAppIcon size={18} /> تواصل فوري عبر واتساب
              </button>
              <button
                onClick={resetAndClose}
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all"
              >
                إغلاق
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>,
    document.body
  );
}

export function useQuoteModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [productName, setProductName] = useState<string | undefined>();

  const openModal = (product?: string) => {
    setProductName(product);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setProductName(undefined);
  };

  return { isOpen, productName, openModal, closeModal };
}
