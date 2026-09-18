'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SiteHeader } from '@/app/components/site-header';
import { SiteFooter } from '@/app/components/site-footer';
import { ScrollReveal } from '@/app/components/scroll-reveal';
import { BrandMark } from '@/app/components/brand-mark';
import type { Product } from '@/app/data/products';
import {
  Microscope,
  ArrowRight,
  ShieldAlert,
  CheckCircle,
  Package,
  Sparkles,
  Info,
  Wrench,
  ChevronLeft,
  Award,
} from 'lucide-react';
import { WhatsAppIcon as MessageCircle } from '@/app/components/whatsapp-icon';
import { QuoteModal, useQuoteModal } from '@/app/components/quote-modal';

export function ProductDetailClient({ product, relatedProducts }: { product: Product; relatedProducts: Product[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const galleryImages = product.images?.length
    ? product.images.map((image, index) => (index === 0 ? (product.image ?? image) : image))
    : product.image
      ? [product.image]
      : [];
  const currentImage = selectedImage ?? galleryImages[0] ?? null;
  const quoteModal = useQuoteModal();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#edf5fa] via-[#f7fafc] to-[#eaf2f9] text-[#1B2848]" dir="rtl">
      <SiteHeader />

      {/* Breadcrumbs - Deep Surgical Navy Bar */}
      <div className="bg-gradient-to-r from-[#071322] via-[#0c1e36] to-[#071322] border-b border-cyan-500/20 pt-28 pb-4 text-slate-300 shadow-md">
        <div className="product-breadcrumbs container flex items-center gap-2 text-xs font-semibold overflow-x-auto">
          <Link href="/" className="hover:text-cyan-400 text-slate-300 transition-colors">الرئيسية</Link>
          <ArrowRight size={12} className="rotate-180 shrink-0 text-cyan-500" />
          <Link href="/products" className="hover:text-cyan-400 text-slate-300 transition-colors">منتجاتنا</Link>
          <ArrowRight size={12} className="rotate-180 shrink-0 text-cyan-500" />
          <Link href={`/products?cat=${encodeURIComponent(product.category)}`} className="hover:text-cyan-400 text-slate-300 transition-colors">
            {product.category}
          </Link>
          <ArrowRight size={12} className="rotate-180 shrink-0 text-cyan-500" />
          <span className="text-cyan-400 font-bold truncate">{product.name}</span>
        </div>
      </div>

      {/* Main Details Section */}
      <section className="product-detail-section py-12 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Image Column */}
            <div className="lg:col-span-5">
              <ScrollReveal>
                <div className="product-detail-gallery bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg sticky top-28">
                  <div className="product-visual product-visual-detail text-watermark relative aspect-square bg-gradient-to-b from-slate-50 to-slate-100/70 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-100 group">
                    {product.badge && (
                      <span className={`absolute top-4 right-4 text-xs font-black px-3.5 py-1 rounded-full shadow-md z-10 ${
                        product.badge.includes('رائد') || product.badge.includes('الأكثر') || product.badge.includes('ذهبي')
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-amber-500/25'
                          : 'bg-gradient-to-r from-[#1B9BD8] to-[#0ea5e9] text-white shadow-cyan-500/25'
                      }`}>
                        {product.badge}
                      </span>
                    )}

                    {currentImage ? (
                      <img
                        key={currentImage}
                        src={currentImage}
                        alt={product.name}
                        className="product-detail-main-image w-full h-full"
                        onError={(e) => {
                          // Fallback to placeholder if broken
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <Microscope size={96} className="text-slate-300" />
                    )}

                    {galleryImages.length > 1 && (
                      <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg border border-white/20 shadow-sm">
                        {galleryImages.indexOf(currentImage || '') + 1} / {galleryImages.length} صور
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Selector Strip */}
                  {galleryImages.length > 1 && (
                     <div className="mt-4 pt-4 border-t border-slate-100">
                      <div className="text-xs font-bold text-slate-500 mb-2 flex items-center justify-between">
                        <span>معرض صور الجهاز ({galleryImages.length} زوايا):</span>
                        <span className="text-[10px] text-[#1B9BD8] font-bold">اضغط للمعاينة</span>
                      </div>
                      <div className="flex gap-2 overflow-x-auto pb-2 pt-1 scrollbar-thin">
                        {galleryImages.map((img, index) => {
                          const isSelected = currentImage === img;
                          return (
                            <button
                              key={index}
                              type="button"
                              onClick={() => setSelectedImage(img)}
                              className={`product-thumb-visual text-watermark relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all p-1 bg-white cursor-pointer ${
                                isSelected
                                  ? 'border-[#1B9BD8] ring-2 ring-cyan-200 scale-105 shadow-sm'
                                  : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                              }`}
                              title={`معاينة الصورة ${index + 1}`}
                            >
                              <img
                                src={img}
                                alt={`${product.name} - ${index + 1}`}
                                className="w-full h-full object-contain"
                                loading="lazy"
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-100">
                    <span>كود الصنف الطبي: <b className="text-[#1B2848] font-mono">{product.sku}</b></span>
                    <span className="text-cyan-700 font-bold bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-200/80">{product.category}</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-7 space-y-8">
              <ScrollReveal delay={100}>
                <div>
                  <BrandMark value={product.name} className="mb-4" />
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-700 bg-cyan-50 border border-cyan-200 px-3.5 py-1 rounded-full mb-3 shadow-2xs">
                    <Sparkles size={14} className="text-cyan-500" />
                    <span>مواصفات وتجهيز معتمد</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="text-amber-600 font-black">جودة مضمونة 100%</span>
                  </div>
                  <h1 className="device-name text-2xl sm:text-3xl lg:text-4xl font-black text-[#1B2848] mb-4 leading-tight">
                    {product.name}
                  </h1>
                  <p className="text-base text-slate-600 leading-relaxed">
                    {product.description || 'جهاز طبي جراحي متطور مصمم وفق أعلى معايير الجودة للاستخدام في المستشفيات والمراكز المتخصصة.'}
                  </p>
                </div>

                {/* WhatsApp & Hotline Action Box - Deep Navy Luxury */}
                <div className="product-price-panel bg-gradient-to-r from-[#071322] via-[#0d203a] to-[#081528] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-cyan-500/30 relative overflow-hidden">
                  <div className="absolute top-0 right-1/4 w-60 h-60 bg-[#1B9BD8]/15 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="status-dot-green bg-emerald-400 shadow-[0_0_8px_rgba(34,197,94,0.6)] w-2.5 h-2.5 rounded-full inline-block animate-pulse" />
                        <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">متوفر للتوريد المباشر</span>
                      </div>
                      <h4 className="text-2xl sm:text-3xl font-black text-cyan-300 drop-shadow-sm">السعر: {product.price || 'عند الطلب'}</h4>
                      <p className="text-slate-300 text-xs mt-1">شامل الضمان السنوي وخدمات الصيانة والتشغيل المعتمد</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => quoteModal.openModal(product.name)}
                        className="px-7 py-3.5 text-center text-xs sm:text-sm shadow-lg shadow-emerald-600/30 inline-flex items-center justify-center gap-2 rounded-xl text-white font-black bg-gradient-to-r from-[#22c55e] via-[#16a34a] to-[#15803d] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
                      >
                        <MessageCircle size={19} />
                        <span>اطلب تسعير أو تواصل عبر واتساب</span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-300 font-medium">
                    <div className="flex items-center justify-center gap-1"><Award size={13} className="text-amber-400" /> فحص وضمان 100% معتمد</div>
                    <div className="flex items-center justify-center gap-1"><span className="text-cyan-400">🚚</span> شحن لكافة المحافظات</div>
                    <div className="flex items-center justify-center gap-1"><span className="text-emerald-400">🛠️</span> دعم فني وصيانة دورية</div>
                  </div>
                </div>

                {/* Technical Accuracy / Specs */}
                {product.accuracy && (
                  <div className="medical-card p-6 sm:p-7 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <h3 className="text-lg font-black text-[#1B2848] mb-3 flex items-center gap-2">
                      <CheckCircle size={20} className="text-[#1B9BD8]" />
                      <span>الدقة والأداء الفني المعتمد</span>
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      {product.accuracy}
                    </p>
                  </div>
                )}

                {/* Specs Table */}
                {product.specs && product.specs.length > 0 && (
                  <div className="medical-card p-6 sm:p-7 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <h3 className="text-lg font-black text-[#1B2848] mb-4 flex items-center gap-2">
                      <Info size={20} className="text-[#1B9BD8]" />
                      <span>جدول المواصفات والبيانات الأساسية</span>
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-right">
                        <tbody>
                          {product.specs.map(([key, val], i) => (
                            <tr
                              key={i}
                              className={`border-b border-slate-100 ${
                                i % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                              }`}
                            >
                              <td className="py-3.5 px-4 font-bold text-[#1B9BD8] w-1/3">{key}</td>
                              <td className="py-3.5 px-4 text-slate-700 font-medium">{val}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Accessories */}
                {product.accessories && (
                  <div className="medical-card p-6 sm:p-7 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <h3 className="text-lg font-black text-[#1B2848] mb-3 flex items-center gap-2">
                      <Package size={20} className="text-[#1B9BD8]" />
                      <span>الملحقات والتوافق</span>
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {product.accessories}
                    </p>
                  </div>
                )}

                {/* Sterilization Protocol */}
                {product.sterilization && (
                  <div className="medical-card p-6 sm:p-7 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <h3 className="text-lg font-black text-[#1B2848] mb-3 flex items-center gap-2">
                      <Wrench size={20} className="text-[#1B9BD8]" />
                      <span>إرشادات وبروتوكول التعقيم الجراحي</span>
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed bg-blue-50 p-4 rounded-2xl border border-blue-100 font-medium">
                      {product.sterilization}
                    </p>
                  </div>
                )}

                {/* Medical Warning */}
                {product.warning && (
                  <div className="bg-amber-50 border border-amber-200 p-6 sm:p-7 rounded-3xl flex items-start gap-4 shadow-sm">
                    <ShieldAlert size={26} className="text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-black text-amber-900 text-sm mb-1">تنبيه واستخدام طبي معتمد</h4>
                      <p className="text-xs text-amber-800 leading-relaxed font-medium">
                        {product.warning}
                      </p>
                    </div>
                  </div>
                )}
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="container">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1B2848] mb-8 tracking-tight">
              أجهزة وأنظمة ذات صلة في قسم ({product.category})
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  className="medical-card p-5 flex flex-col justify-between h-full group bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="related-product-visual product-visual text-watermark aspect-square bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100 transition-colors relative overflow-hidden">
                      {rel.image ? (
                        <img
                          src={rel.image}
                          alt={rel.name}
                          className={`related-product-image w-full h-full ${rel.imageFit === 'cover' ? 'product-image-fill' : ''}`}
                        />
                      ) : (
                        <Microscope size={48} className="text-slate-300" />
                      )}

                      {rel.images && rel.images.length > 1 && (
                        <span className="absolute bottom-2 left-2 bg-white/90 border border-slate-200 text-slate-600 text-[9px] font-mono px-1.5 py-0.5 rounded shadow-sm">
                          {rel.images.length} صور
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#1B9BD8] font-bold bg-blue-50 border border-blue-100 px-2 py-0.5 rounded block w-max mb-1.5">{rel.category}</span>
                    <h4 className="device-name font-black text-[#1B2848] text-sm mb-2 line-clamp-1 group-hover:text-[#1B9BD8] transition-colors">{rel.name}</h4>
                  </div>

                  <Link
                    href={`/products/${rel.id}`}
                    className="mt-4 h-10 px-3 border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold text-center transition-all inline-flex items-center justify-center gap-1 shadow-2xs whitespace-nowrap"
                  >
                    <span>عرض التفاصيل</span>
                    <ChevronLeft size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
      <QuoteModal isOpen={quoteModal.isOpen} onClose={quoteModal.closeModal} productName={quoteModal.productName} />
    </main>
  );
}
