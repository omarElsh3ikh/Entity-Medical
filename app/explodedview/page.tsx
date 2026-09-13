'use client';

import { useMemo, useState } from 'react';
import { Search, ShieldAlert, Wrench } from 'lucide-react';
import { SiteFooter } from '@/app/components/site-footer';
import { SiteHeader } from '@/app/components/site-header';
import { productSummaries as products } from '@/app/data/product-summaries';

const explodedImages: Record<string, string> = {
  'MD-camera-stryker-1688': '/explodedview/MD-camera-stryker-1688.png',
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
                  <div className="relative aspect-[3/2] bg-gradient-to-br from-white to-slate-100 p-3">
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
