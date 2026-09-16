'use client';

import { useMemo, useState } from 'react';
import { Search, ShieldAlert, Wrench } from 'lucide-react';
import { SiteFooter } from '@/app/components/site-footer';
import { SiteHeader } from '@/app/components/site-header';
import { productSummaries as products } from '@/app/data/product-summaries';

const explodedImages: Record<string, string> = {
  'MD-camera-stryker-1188': '/product-images/view/MD-camera-stryker-1188.png',
  'MD-1288-stryker': '/product-images/view/MD-1288-stryker.png',
  'MD-1488-stryker': '/product-images/view/MD-1488-stryker.png',
  'MD-1588-stryker': '/product-images/view/MD-1588-stryker.png',
  'MD-camera-stryker-1688': '/product-images/view/MD-camera-stryker-1688.png',
  'MD-arthroscopy-system-crossfire-stryker': '/product-images/view/MD-arthroscopy-system-crossfire-stryker.png',
  'MD-conmed-ls8000': '/product-images/view/MD-conmed-ls8000.png',
  'MD-covidien-valleylab-ls10': '/product-images/view/MD-covidien-valleylab-ls10.png',
  'MD-covidien-forcetriad': '/product-images/view/MD-covidien-forcetriad.png',
  'MD-fujifilm-bl7000': '/product-images/view/MD-fujifilm-bl7000.png',
  'ICU-mindray-benevision-n12-n17': '/product-images/view/ICU-mindray-benevision-n12-n17.png',
  'MD-olympus-clv-s200-ir': '/product-images/view/MD-olympus-clv-s200-ir.png',
  'ICU-philips-intellivue-mx40': '/product-images/view/ICU-philips-intellivue-mx40.png',
  'ICU-philips-intellivue-mx100': '/product-images/view/ICU-philips-intellivue-mx100.png',
  'ICU-philips-intellivue-mx400': '/product-images/view/ICU-philips-intellivue-mx400.png',
  'ICU-philips-intellivue-mx500': '/product-images/view/ICU-philips-intellivue-mx500.png',
  'MD-storz-power-led-175': '/product-images/view/MD-storz-power-led-175.png',
  'ICU-draeger-vista-300': '/product-images/view/ICU-draeger-vista-300.png',
  'MD-console-core-2-stryker': '/product-images/view/MD-console-core-2-stryker.png',
  'MD-console-core-stryker': '/product-images/view/MD-console-core-stryker.png',
  'MD-d-light-c-storz': '/product-images/view/MD-d-light-c-storz.png',
  'MD-digivideo-storz': '/product-images/view/MD-digivideo-storz.png',
  'ICU-edan-im3': '/product-images/view/ICU-edan-im3.png',
  'ICU-edan-im3s': '/product-images/view/ICU-edan-im3s.png',
  'ICU-edan-im20': '/product-images/view/ICU-edan-im20.png',
  'MD-insufflator-20-storz': '/product-images/view/MD-insufflator-20-storz.png',
  'MD-halogin-150-storz': '/product-images/view/MD-halogin-150-storz.png',
  'MD-halogin-250-storz': '/product-images/view/MD-halogin-250-storz.png',
  'MD-storz-camera-image-1': '/product-images/view/MD-storz-camera-image-1.png',
  'MD-insufflator-40-stryker': '/product-images/view/MD-insufflator-40-stryker.png',
  'MD-insufflator-45-stryker': '/product-images/view/MD-insufflator-45-stryker.png',
  'MD-l9000-stryker': '/product-images/view/MD-l9000-stryker.png',
  'MD-light-precision-stryker': '/product-images/view/MD-light-precision-stryker.png',
  'MD-light-source-l11-stryker': '/product-images/view/MD-light-source-l11-stryker.png',
  'MD-olympus-clv-s400': '/product-images/view/MD-olympus-clv-s400.png',
  'MD-storz-power-led-300': '/product-images/view/MD-storz-power-led-300.png',
  'MD-light-source-xenon-300': '/product-images/view/MD-light-source-xenon-300.png',
  'SU-atraumatic-forceps-youshi': '/product-images/view/SU-atraumatic-forceps-youshi.png',
  'MD-x-8000-stryker': '/product-images/view/MD-x-8000-stryker.png',
  'SU-suction-irrigation-tube-youshi': '/product-images/view/SU-suction-irrigation-tube-youshi.png',
  'MD-tricam-scl-ll-storz': '/product-images/view/MD-tricam-scl-ll-storz.png',
  'SU-clip-applier-youshi': '/product-images/view/SU-clip-applier-youshi.png',
  'MD-xenon-175-storz': '/product-images/view/MD-xenon-175-storz.png',
  'SU-babcock-grasper-forceps-youshi': '/product-images/view/SU-babcock-grasper-forceps-youshi.png',
  'MD-system-260-olympus': '/product-images/view/MD-system-260-olympus.png',
  'SU-dissecting-forceps-youshi': '/product-images/view/SU-dissecting-forceps-youshi.png',
  'MD-system-290-olympus': '/product-images/view/MD-system-290-olympus.png',
  'SU-straight-scissor-youshi': '/product-images/view/SU-straight-scissor-youshi.png',
  'MD-camera-spies-th102': '/explodedview/MD-camera-spies-th102.png',
};

const DISCLAIMER = 'تصور توضيحي غير دقيق - غير صالح للصيانة';

export default function ExplodedViewPage() {
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return products;
    return products.filter((product) =>
      `${product.name} ${product.sku} ${product.category}`
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  const completedCount = products.filter((product) => explodedImages[product.id]).length;
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" dir="rtl">
      <SiteHeader />
      <main className="pt-24 pb-20">
        <section className="border-b border-slate-800 bg-gradient-to-br from-[#071322] via-[#0b2945] to-[#075da8] px-4 py-16 text-white">
          <div className="mx-auto max-w-7xl text-center">
            <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-amber-300/30 bg-amber-400/10 px-4 py-2 text-sm font-bold text-amber-200">
              <ShieldAlert size={18} /> رسومات توضيحية وليست أدلة صيانة
            </div>
            <h1 className="text-4xl font-black sm:text-5xl">Exploded View للمنتجات</h1>
            <p className="mx-auto mt-4 max-w-3xl leading-8 text-slate-200">
              يتم تجهيز صورة مستقلة لكل منتج بمنظور أمامي فقط. لا تعتمد على هذه
              الرسومات في الفك أو الإصلاح أو طلب قطع الغيار؛ المرجع الوحيد هو دليل
              الشركة المصنّعة ورقم الموديل والتسلسل الخاص بالجهاز.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3 text-sm font-bold">
              <span className="rounded-xl bg-white/10 px-4 py-2">إجمالي المنتجات: {products.length}</span>
              <span className="rounded-xl bg-emerald-400/15 px-4 py-2 text-emerald-200">تم تجهيز: {completedCount}</span>
              <span className="rounded-xl bg-cyan-400/15 px-4 py-2 text-cyan-100">قيد التجهيز: {products.length - completedCount}</span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10">
          <div className="relative mx-auto mb-9 max-w-2xl">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-sky-600" size={20} />
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setVisibleCount(12);
              }}
              placeholder="ابحث باسم المنتج أو الموديل أو الكود..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-4 pr-12 pl-4 shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            />
          </div>

          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {visibleProducts.map((product) => {
              const explodedImage = explodedImages[product.id];
              return (
                <article key={product.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <div className="text-watermark relative aspect-[3/2] overflow-hidden bg-gradient-to-br from-white to-slate-100 p-3">
                    <img
                      src={explodedImage ?? product.image ?? '/brand/entity-icon.webp'}
                      alt={explodedImage ? `Exploded view توضيحي لمنتج ${product.name}` : product.name}
                      className={`h-full w-full rounded-2xl object-contain ${explodedImage ? '' : 'opacity-45 grayscale'}`}
                    />
                    {!explodedImage && (
                      <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                        <span className="rounded-2xl border border-slate-300 bg-white/90 px-4 py-3 text-sm font-black text-slate-700 shadow-sm">
                          الصورة التفكيكية قيد التجهيز
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <h2 className="font-black leading-7 text-[#1B2848]">{product.name}</h2>
                      <span className="shrink-0 rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">{product.sku}</span>
                    </div>
                    <p className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-black text-red-700">
                      <Wrench size={16} className="shrink-0" /> {DISCLAIMER}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          {visibleCount < filteredProducts.length && (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + 12)}
                className="rounded-2xl bg-[#075da8] px-8 py-3 font-black text-white shadow-lg transition hover:bg-[#064e8b]"
              >
                عرض منتجات إضافية
              </button>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
