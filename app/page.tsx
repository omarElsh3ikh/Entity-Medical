import { ArrowLeft, BadgeCheck, BookOpen, Check, Headphones, Microscope, ShieldCheck, Truck, Wrench } from 'lucide-react';
import Link from 'next/link';
import { BrandMarquee } from '@/app/components/brand-marquee';
import { BrandMark } from '@/app/components/brand-mark';
import { SiteFooter } from '@/app/components/site-footer';
import { SiteHeader } from '@/app/components/site-header';
import { WhatsAppIcon } from '@/app/components/whatsapp-icon';
import { QuoteTrigger } from '@/app/components/quote-trigger';
import { featuredProducts, products } from '@/app/data/products';

const advantages = [
  { icon: ShieldCheck, title: 'فحص تشغيلي موثّق', text: 'كل جهاز يمر باختبار كامل قبل التسليم للتأكد من الصورة والإضاءة والتوصيلات.' },
  { icon: Wrench, title: 'دعم فني بعد البيع', text: 'فريق متخصص للتركيب والصيانة وتوفير قطع الغيار المناسبة.' },
  { icon: Truck, title: 'توريد داخل مصر', text: 'تجهيز وشحن آمن للمستشفيات والمراكز الطبية في جميع المحافظات.' },
];

export default function Home() {
  const heroProduct = featuredProducts[0];
  const homeProducts = featuredProducts.slice(0, 6);

  return (
    <main className="min-h-screen bg-white text-slate-900" dir="rtl">
      <SiteHeader />

      <section className="home-hero relative overflow-hidden border-b border-slate-800 pt-28 pb-14 lg:pt-36 lg:pb-20">
        <img src="/hero/operating-room-blue.webp" alt="غرفة عمليات مجهزة بأنظمة مناظير جراحية" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1200} fetchPriority="high" decoding="async" />
        <div className="home-hero-overlay absolute inset-0 bg-gradient-to-l from-[#061527]/84 via-[#071f38]/70 to-[#061527]/50" />
        <div className="container relative z-10 mx-auto grid items-center gap-10 px-4 lg:grid-cols-2 lg:px-6">
          <div className="home-hero-copy max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-slate-950/45 px-4 py-2 text-sm font-bold text-cyan-200"><BadgeCheck size={17} /> تجهيزات طبية بفحص وضمان</div>
            <h1 className="font-fnjan text-4xl font-black leading-[1.15] text-white sm:text-5xl lg:text-6xl">تجهيزات مناظير جراحية<br /><span className="text-cyan-300">جاهزة بثقة لغرفة العمليات</span></h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-200 sm:text-lg">نوفر أنظمة Stryker وKarl Storz وOlympus، مع فحص تشغيلي ودعم فني وتوريد سريع للمستشفيات والمراكز الطبية.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <QuoteTrigger productName="تجهيزات المناظير الجراحية" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-black text-white shadow-lg shadow-emerald-950/25 transition hover:bg-emerald-600"><WhatsAppIcon size={20} /> اطلب عرض سعر</QuoteTrigger>
              <Link href="/products" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3 font-bold text-white transition hover:bg-white/15">تصفح الأجهزة <ArrowLeft size={18} /></Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-200">
              <span className="inline-flex items-center gap-2"><Check size={16} className="text-emerald-400" /> فحص قبل التسليم</span>
              <span className="inline-flex items-center gap-2"><Check size={16} className="text-emerald-400" /> ضمان ودعم فني</span>
              <span className="inline-flex items-center gap-2"><Check size={16} className="text-emerald-400" /> شحن لجميع المحافظات</span>
            </div>
          </div>

          {heroProduct && (
            <Link href={`/products/${heroProduct.id}`} className="group mx-auto w-full max-w-lg overflow-hidden rounded-3xl border border-white/20 bg-white p-4 shadow-2xl sm:p-6">
              <div className="text-watermark relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                {heroProduct.image ? <img src={heroProduct.image} alt={heroProduct.name} className="hero-featured-image h-full w-full object-contain transition duration-500" width={640} height={480} decoding="async" /> : <Microscope className="absolute inset-0 m-auto text-slate-300" size={72} />}
              </div>
              <div className="flex items-end justify-between gap-4 px-1 pt-5">
                <div><BrandMark value={heroProduct.name} /><h2 className="device-name mt-2 text-xl font-black text-[#1B2848]">{heroProduct.name}</h2><p className="mt-1 text-sm text-slate-500">{heroProduct.badge || 'جهاز مختار'}</p></div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#1B9BD8] text-white"><ArrowLeft size={20} /></span>
              </div>
            </Link>
          )}
        </div>
      </section>

      <BrandMarquee />

      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><span className="text-sm font-black text-[#1B9BD8]">الأجهزة الأكثر طلبًا</span><h2 className="font-fnjan mt-2 text-3xl font-black text-[#1B2848] sm:text-4xl">مختارة لغرف العمليات</h2></div>
            <Link href="/products" className="inline-flex items-center gap-2 font-bold text-[#0878b4]">عرض كل منتجاتنا <ArrowLeft size={18} /></Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {homeProducts.map((product, index) => (
              <article key={product.id} className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <Link href={`/products/${product.id}`} className="home-product-visual text-watermark relative block overflow-hidden bg-slate-50">
                  {product.image ? <img src={product.image} alt={product.name} className={`home-product-image h-full w-full ${product.imageFit === 'cover' ? 'product-image-fill' : ''}`} width={480} height={300} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" /> : <Microscope className="absolute inset-0 m-auto text-slate-300" size={60} />}
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-3"><BrandMark value={product.name} /><span className="rounded-lg bg-sky-50 px-2.5 py-1 text-xs font-bold text-[#0878b4]">{product.category}</span></div>
                  <h3 className="device-name mt-3 text-lg font-black text-[#1B2848]">{product.name}</h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-slate-600">{product.description}</p>
                  <div className="mt-5 flex gap-3 border-t border-slate-100 pt-4">
                    <Link href={`/products/${product.id}`} className="flex-1 rounded-xl bg-slate-100 px-4 py-3 text-center text-sm font-bold text-slate-700 transition hover:bg-slate-200">التفاصيل</Link>
                    <QuoteTrigger productName={product.name} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"><WhatsAppIcon size={17} /> تسعير</QuoteTrigger>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center"><span className="text-sm font-black text-[#1B9BD8]">لماذا ENTITY Medical؟</span><h2 className="font-fnjan mt-2 text-3xl font-black text-[#1B2848] sm:text-4xl">من الاختيار حتى التشغيل</h2></div>
          <div className="grid gap-5 md:grid-cols-3">
            {advantages.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl border border-slate-200 p-6 shadow-sm"><span className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-sky-50 text-[#1B9BD8]"><Icon size={24} /></span><h3 className="text-lg font-black text-[#1B2848]">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="home-stats bg-[#07192c] py-14 text-white">
        <div className="home-stats-grid container mx-auto grid gap-4 px-4 sm:grid-cols-3 lg:px-6">
          <div className="home-stat-card"><strong className="font-museo block text-4xl font-black text-cyan-300">{products.length}+</strong><span className="mt-2 block text-sm text-slate-300">جهاز ومستلزم ضمن منتجاتنا</span></div>
          <div className="home-stat-card"><strong className="font-museo block text-4xl font-black text-cyan-300">100%</strong><span className="mt-2 block text-sm text-slate-300">فحص تشغيلي قبل التسليم</span></div>
          <div className="home-stat-card"><strong className="font-museo block text-4xl font-black text-cyan-300">24/7</strong><span className="mt-2 block text-sm text-slate-300">استقبال طلبات واستفسارات العملاء</span></div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid items-center gap-8 overflow-hidden rounded-3xl bg-gradient-to-l from-[#07192c] to-[#0d3152] p-7 text-white shadow-2xl md:grid-cols-[1fr_280px] sm:p-10">
            <div><div className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-cyan-300"><BookOpen size={18} /> البروشور الطبي 2026</div><h2 className="font-fnjan text-3xl font-black sm:text-4xl">كل حلول التجهيز في دليل واحد</h2><p className="mt-4 max-w-2xl leading-7 text-slate-300">تصفح الأنظمة والأجهزة والآلات الجراحية المتاحة، ثم تواصل معنا للحصول على عرض يناسب احتياج منشأتك.</p><div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link href="/brochure" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1B9BD8] px-6 py-3 font-bold text-white hover:bg-sky-600"><BookOpen size={19} /> تصفح البروشور</Link><Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-bold text-white hover:bg-white/15"><Headphones size={19} /> تواصل معنا</Link></div></div>
            <Link href="/brochure" className="mx-auto block w-full max-w-[280px] overflow-hidden rounded-2xl ring-1 ring-white/20"><img src="/brochure/cover.webp" alt="غلاف بروشور ENTITY Medical" className="h-auto w-full" width={448} height={317} loading="lazy" decoding="async" /></Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
