'use client';

import { useState, useEffect, useMemo } from 'react';
import { SiteHeader } from '@/app/components/site-header';
import { SiteFooter } from '@/app/components/site-footer';
import { ScrollReveal } from '@/app/components/scroll-reveal';
import { BrandMark } from '@/app/components/brand-mark';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { productSummaries as products } from '@/app/data/product-summaries';
import type { Product } from '@/app/data/products';
import { Search, Microscope, X, ChevronLeft, ChevronDown, ChevronUp, Filter, ArrowLeftRight, CheckCircle2, Scale, Images, Award, Sparkles } from 'lucide-react';
import { WhatsAppIcon as MessageCircle } from '@/app/components/whatsapp-icon';
import { QuoteModal, useQuoteModal } from '@/app/components/quote-modal';

const CATEGORIES = [
  'الكل',
  'أجهزة طبية',
  'الآلات الجراحية',
  'أجهزة الرعاية',
  'كبسولات العمليات',
] as const;

function matchesCategory(product: Product, category: string) {
  if (category === 'الكل') return true;
  if (category === 'كبسولات العمليات' || category === 'الكبسولات المغلقة') {
    return product.category === 'كبسولات العمليات' || product.category === 'الكبسولات المغلقة';
  }
  return product.category === category;
}

const COMPARISON_FIELDS = [
  { label: 'الماركة', aliases: ['الماركة', 'الشركة', 'brand'] },
  { label: 'الموديل / المرجع', aliases: ['الموديل', 'المرجع', 'السلسلة', 'model', 'reference'] },
  { label: 'نوع الجهاز', aliases: ['النوع', 'الفئة', 'type'] },
  { label: 'الشاشة / المقاس', aliases: ['الشاشة', 'المقاس', 'screen', 'display'] },
  { label: 'الدقة', aliases: ['الدقة', 'resolution'] },
  { label: 'المعلمات / الوظائف', aliases: ['المعلمات', 'الوظائف', 'parameters', 'functions'] },
  { label: 'القدرة / مصدر الطاقة', aliases: ['القدرة', 'المصباح', 'الطاقة', 'power', 'lamp'] },
  { label: 'الأبعاد', aliases: ['الأبعاد', 'dimensions'] },
  { label: 'الوزن', aliases: ['الوزن', 'weight'] },
  { label: 'الطول', aliases: ['الطول', 'length'] },
  { label: 'القطر', aliases: ['القطر', 'diameter'] },
  { label: 'زاوية الرؤية', aliases: ['زاوية الرؤية', 'زاوية', 'angle'] },
  { label: 'التوافق / المنظومة', aliases: ['التوافق', 'المنظومة', 'compatible', 'system'] },
  { label: 'الاستخدامات', aliases: ['الاستخدام', 'التطبيقات', 'use', 'applications'] },
  { label: 'البطارية', aliases: ['البطارية', 'battery'] },
  { label: 'الاتصال', aliases: ['الاتصال', 'connectivity', 'network'] },
] as const;

function technicalValue(product: Product, aliases: readonly string[]) {
  const match = (product.specs || []).find(([label]) => {
    const normalized = label.trim().toLowerCase();
    return aliases.some((alias) => normalized.includes(alias));
  });
  return match?.[1]?.trim();
}

function comparisonGroup(product: Product) {
  const value = `${product.name} ${product.sku} ${product.category} ${product.description || ''}`.toLowerCase();
  if (/مونيتور|مراقبة المريض|patient monitor|benevision|carescape|intellivue|life scope|vista 300/.test(value)) return 'patient-monitor';
  if (/موجات فوق صوتية|سونار|ultrasound|color doppler/.test(value)) return 'ultrasound';
  if (/مصدر (?:ضوء|إضاءة)|light source|xenon|power led|endolight/.test(value)) return 'light-source';
  if (/كاميرا|camera|telecam|image ?1|spies/.test(value)) return 'camera-system';
  if (/جهاز نفخ|insufflator|endoflator|thermoflator/.test(value)) return 'insufflator';
  if (/تنفس صناعي|ventilator/.test(value)) return 'ventilator';
  if (/صدمات|defibrillator|beneheart/.test(value)) return 'defibrillator';
  if (/مضخة|infusion|benefusion/.test(value)) return 'infusion';
  if (/valleylab|ligasure|sonicision|electrosurgical|جراحية كهربائية/.test(value)) return 'surgical-energy';
  if (/منظار|عدسة|scope|lens|hopkins|nephroscope|cystoscope/.test(value)) return 'endoscope';
  return product.category;
}

const BRANDS = [
  'الكل',
  'Stryker',
  'Storz',
  'Olympus',
  'Mindray',
  'Youshi',
  'Wolf',
] as const;

const comparisonCandidates = products.filter((product) => (product.specs || []).length > 0);
const productsById = new Map(products.map((product) => [product.id, product]));
const firstComparisonProduct = comparisonCandidates.find((product) => product.featured) || comparisonCandidates[0];
const secondComparisonProduct = firstComparisonProduct
  ? comparisonCandidates.find((product) => product.id !== firstComparisonProduct.id && comparisonGroup(product) === comparisonGroup(firstComparisonProduct))
  : undefined;
const defaultComparison = [firstComparisonProduct, secondComparisonProduct].filter((product): product is (typeof products)[number] => Boolean(product));

export default function ProductsPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('الكل');
  const [activeBrand, setActiveBrand] = useState<string>('الكل');
  const [visibleCount, setVisibleCount] = useState(12);
  const [comparisonIds, setComparisonIds] = useState<string[]>(defaultComparison.map((product) => product.id));
  const [selectedComparisonIds, setSelectedComparisonIds] = useState<string[]>([]);
  const [isComparisonExpanded, setIsComparisonExpanded] = useState(false);
  const quoteModal = useQuoteModal();

  // Parse category from URL if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const catParam = urlParams.get('cat');
      if (catParam) {
        const decoded = decodeURIComponent(catParam);
        if (CATEGORIES.includes(decoded as typeof CATEGORIES[number])) {
          queueMicrotask(() => setActiveCategory(decoded));
        }
      }
    }
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory = matchesCategory(product, activeCategory);

      const matchBrand =
        activeBrand === 'الكل' ||
        product.name.toLowerCase().includes(activeBrand.toLowerCase()) ||
        product.sku.toLowerCase().includes(activeBrand.toLowerCase()) ||
        (product.specs && product.specs.some(([, v]) => v.toLowerCase().includes(activeBrand.toLowerCase())));

      const q = query.trim().toLowerCase();
      if (!q) return matchCategory && matchBrand;

      const haystack = `${product.name} ${product.sku} ${product.category} ${product.description || ''} ${product.specs?.map(([k, v]) => `${k} ${v}`).join(' ') || ''}`.toLowerCase();
      return matchCategory && matchBrand && haystack.includes(q);
    });
  }, [query, activeCategory, activeBrand]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  const comparisonProducts = comparisonIds
    .map((id) => productsById.get(id))
    .filter((product): product is (typeof products)[number] => Boolean(product));
  const activeComparisonGroup = comparisonProducts[0] ? comparisonGroup(comparisonProducts[0]) : '';
  const compatibleComparisonCandidates = comparisonCandidates.filter((product) => comparisonGroup(product) === activeComparisonGroup);
  const canonicalComparisonRows = COMPARISON_FIELDS.map((field) => ({
    label: field.label,
    values: comparisonProducts.map((product) => technicalValue(product, field.aliases)),
  })).filter((row) => row.values.some(Boolean));
  const canonicalLabels = new Set(COMPARISON_FIELDS.flatMap((field) => [...field.aliases]));
  const extraLabels = Array.from(new Set(comparisonProducts.flatMap((product) => (product.specs || []).map(([label]) => label))))
    .filter((label) => !Array.from(canonicalLabels).some((alias) => label.trim().toLowerCase().includes(alias)));
  const extraComparisonRows = extraLabels.map((label) => ({
    label,
    values: comparisonProducts.map((product) => (product.specs || []).find(([specLabel]) => specLabel === label)?.[1]?.trim()),
  }));
  const comparisonRows = [...canonicalComparisonRows, ...extraComparisonRows];
  const visibleComparisonRows = isComparisonExpanded ? comparisonRows : comparisonRows.slice(0, 5);

  const updateComparison = (index: number, productId: string) => {
    setComparisonIds((current) => current.map((id, itemIndex) => itemIndex === index ? productId : id));
  };

  const toggleComparisonProduct = (productId: string) => {
    setSelectedComparisonIds((current) => {
      if (current.includes(productId)) return current.filter((id) => id !== productId);
      const product = productsById.get(productId);
      if (!product) return current;
      const compatible = current.filter((id) => {
        const selected = productsById.get(id);
        return selected && comparisonGroup(selected) === comparisonGroup(product);
      });
      const next = compatible.length === 0
        ? [productId]
        : compatible.length === 1
          ? [compatible[0], productId]
          : [compatible[1], productId];

      if (next.length === 2) setComparisonIds(next);
      return next;
    });
  };

  const openComparison = () => {
    if (selectedComparisonIds.length !== 2) return;
    setComparisonIds(selectedComparisonIds);
    document.getElementById('device-comparison')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#eaf2f9] text-[#1B2848]" dir="rtl">
      <SiteHeader />

      <main className="flex-1 pt-24 pb-20 bg-gradient-to-b from-[#edf5fa] via-[#f7fafc] to-[#eaf2f9]">
        {/* Page Hero - Deep Surgical Navy with Glowing Cyan & Gold */}
        <div className="bg-gradient-to-b from-[#071322] via-[#0c1e36] to-[#071322] pt-16 pb-16 relative overflow-hidden border-b border-cyan-500/20 shadow-2xl">
          {/* Decorative Glowing Orbs */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="container relative z-10 mx-auto px-4 max-w-7xl">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/70 text-cyan-300 text-xs sm:text-sm font-bold mb-4 border border-cyan-400/30 backdrop-blur-md shadow-lg shadow-cyan-950/50">
                  <Microscope size={16} className="text-cyan-400 animate-pulse" /> منتجاتنا من الأجهزة والآلات الطبية
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="text-amber-400 font-bold flex items-center gap-1"><Sparkles size={13} /> فحص وجودة 100%</span>
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 tracking-tight text-white drop-shadow-md">
                  منتجاتنا الطبية <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">الشاملة والموثقة</span>
                </h1>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
                  استعرض قاعدة بيانات متكاملة تضم <b className="text-cyan-300 font-bold font-mono bg-cyan-950/60 px-2.5 py-0.5 rounded-lg border border-cyan-500/30">{products.length}</b> جهازاً ومستلزماً جراحياً مع تفاصيل الدقة وبروتوكولات التعقيم المعتمدة
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-20 mt-8">
          {/* Controls Bar */}
          <div className="catalog-controls bg-white/95 backdrop-blur-md p-5 sm:p-7 rounded-3xl shadow-lg border border-slate-200/90 mb-10">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:max-w-xl">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500" size={19} />
                <input
                  type="text"
                  placeholder="ابحث باسم الجهاز، الموديل، الماركة أو الكود..."
                  value={query}
                  onChange={(event) => { setQuery(event.target.value); setVisibleCount(12); }}
                  className="w-full pr-12 pl-11 py-3.5 bg-slate-50/80 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#1B9BD8] focus:ring-2 focus:ring-[#1B9BD8]/20 text-slate-700 text-sm font-medium transition-all"
                />
                {query && <button type="button" onClick={() => setQuery('')} aria-label="مسح البحث" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-slate-200/70 p-1 rounded-full"><X size={14} /></button>}
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600">عرض <b className="text-[#1B9BD8] font-mono text-sm">{Math.min(visibleCount, filteredProducts.length)}</b> من {filteredProducts.length}</span>
                {(query || activeCategory !== 'الكل' || activeBrand !== 'الكل') && (
                  <button type="button" onClick={() => { setQuery(''); setActiveCategory('الكل'); setActiveBrand('الكل'); setVisibleCount(12); }} className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-[#1B9BD8] hover:border-[#1B9BD8]/30 transition-colors">إعادة الضبط</button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-slate-100">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                const count = products.filter((product) => matchesCategory(product, cat)).length;
                return (
                  <button 
                    type="button" 
                    key={cat} 
                    onClick={() => { setActiveCategory(cat); setVisibleCount(12); }} 
                    className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      isActive 
                        ? 'bg-gradient-to-r from-[#1B9BD8] to-[#0ea5e9] text-white shadow-md shadow-cyan-500/25 scale-[1.02]' 
                        : 'bg-slate-50 text-slate-600 border border-slate-200/90 hover:border-[#1B9BD8]/40 hover:text-[#1B9BD8]'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] ${isActive ? 'bg-white/25 text-white font-black' : 'bg-slate-200/70 text-slate-700'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-100">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 ml-2"><Filter size={14} className="text-[#1B9BD8]" /> الماركة:</span>
              {BRANDS.map((brand) => {
                const isSelected = activeBrand === brand;
                return (
                  <button 
                    type="button" 
                    key={brand} 
                    onClick={() => { setActiveBrand(brand); setVisibleCount(12); }} 
                    className={`brand-filter-button px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-[#1B9BD8] bg-cyan-50 text-[#1B9BD8] shadow-xs' 
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {brand === 'الكل' ? 'كل العلامات' : brand}
                  </button>
                );
              })}
            </div>
          </div>

          <ScrollReveal>
            <section id="device-comparison" className="device-comparison" aria-labelledby="comparison-title">
              <div className="comparison-heading">
                <span className="comparison-icon"><ArrowLeftRight size={21} /></span>
                <div><span>بيانات فعلية</span><h2 id="comparison-title">مقارنة عملية بين الأجهزة</h2><p>تظهر المواصفات المسجلة فقط، وتُقارن الأجهزة من نفس النوع.</p></div>
                <button type="button" className="comparison-expand-button" onClick={() => setIsComparisonExpanded((value) => !value)} aria-expanded={isComparisonExpanded}>
                  {isComparisonExpanded ? <><ChevronUp size={15} /> عرض مختصر</> : <><ChevronDown size={15} /> عرض المقارنة كاملة</>}
                </button>
              </div>
              <div className="comparison-table-wrap">
                <div className="comparison-table">
                  <div className="comparison-table-head comparison-row">
                    <strong>بند المقارنة</strong>
                    {comparisonProducts.map((product, index) => (
                      <div className="comparison-device" key={`${index}-${product.id}`}>
                        <Select value={product.id} onValueChange={(value) => value && updateComparison(index, value)}>
                          <SelectTrigger className="comparison-select" aria-label={`اختيار الجهاز ${index + 1}`}><SelectValue /></SelectTrigger>
                          <SelectContent className="comparison-select-menu" align="start">{compatibleComparisonCandidates.filter((candidate) => candidate.id !== comparisonProducts[1 - index]?.id).map((candidate) => <SelectItem value={candidate.id} key={candidate.id}>{candidate.name}</SelectItem>)}</SelectContent>
                        </Select>
                        <div className="comparison-device-summary">
                          <div className="comparison-image product-visual text-watermark">{product.image ? <img src={product.image} alt={product.name} className={product.imageFit === 'cover' ? 'product-image-fill' : ''} /> : <Microscope size={32} />}</div>
                          <div><BrandMark value={product.name} /><h3 className="device-name">{product.name}</h3><a href={`/products/${product.id}`}>كل التفاصيل <ChevronLeft size={13} /></a></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {visibleComparisonRows.map((row) => {
                    const availableValues = row.values.filter((value): value is string => Boolean(value));
                    const isDifferent = availableValues.length > 1 && new Set(availableValues.map((value) => value.toLowerCase())).size > 1;
                    return (
                      <div className={`comparison-row ${isDifferent ? 'has-difference' : ''}`} key={row.label}>
                        <span className="comparison-row-label"><CheckCircle2 size={13} /> {row.label}</span>
                        {row.values.map((value, index) => <strong className={!value ? 'comparison-unavailable' : ''} key={`${row.label}-${comparisonProducts[index]?.id || index}`}>{value || 'غير مذكور في بيانات المنتج'}</strong>)}
                      </div>
                    );
                  })}
                  {isComparisonExpanded && (
                    <div className="comparison-row comparison-notes-row">
                      <span className="comparison-row-label">ملاحظات عملية</span>
                      {comparisonProducts.map((product) => <p key={product.id}>{product.accuracy || 'راجع صفحة المنتج للتكوين والملحقات المتاحة.'}</p>)}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* Products Grid */}
          {visibleProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                {visibleProducts.map((product, idx) => {
                  const isCompared = selectedComparisonIds.includes(product.id);
                  return (
                    <ScrollReveal key={product.id} delay={(idx % 4) * 35}>
                      <div className="catalog-product-card p-4 sm:p-5 flex flex-col h-full group bg-white border border-slate-200/90 rounded-2xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-cyan-400">
                        {/* Top Accent Gradient Line on Hover */}
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-500 via-sky-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Image Stage */}
                        <div className="catalog-product-visual text-watermark relative bg-gradient-to-b from-slate-50 to-slate-100/70 rounded-xl flex items-center justify-center p-1 sm:p-2 mb-3.5 overflow-hidden border border-slate-100 group-hover:border-cyan-100 transition-colors">
                          {/* Top Badges */}
                          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
                            {product.badge ? (
                              <span className={`text-[10px] sm:text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-xs ${
                                product.badge.includes('رائد') || product.badge.includes('الأكثر') || product.badge.includes('الأعلى') || product.badge.includes('ذهبي')
                                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-amber-500/25'
                                  : 'bg-gradient-to-r from-[#1B9BD8] to-[#0ea5e9] text-white shadow-cyan-500/25'
                              }`}>
                                {product.badge}
                              </span>
                            ) : (
                              <span className="bg-white/95 backdrop-blur-xs text-cyan-800 border border-cyan-200 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                                متوفر للتوريد
                              </span>
                            )}
                          </div>

                          {(product.imageCount ?? product.images?.length ?? 0) > 1 && (
                            <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-slate-600 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs z-10 flex items-center gap-1">
                              <Images size={11} className="text-slate-400" />
                              {product.imageCount ?? product.images?.length} صور
                            </span>
                          )}

                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className={`catalog-product-image w-full h-full ${product.imageFit === 'cover' ? 'product-image-fill' : ''}`}
                              loading="lazy"
                            />
                          ) : (
                            <Microscope size={54} className="text-slate-300" />
                          )}
                        </div>

                        {/* Brand & Category Row */}
                        <div className="flex items-center justify-between gap-2 min-h-[32px] mb-2">
                          <BrandMark value={product.name} />
                          <span className="text-slate-600 text-[11px] font-bold bg-slate-100/90 px-2.5 py-0.5 rounded-lg border border-slate-200/60 whitespace-nowrap">
                            {product.category}
                          </span>
                        </div>

                        {/* Product Title */}
                        <h3
                          className="device-name text-[15px] font-black text-[#1B2848] mb-2 group-hover:text-[#1B9BD8] transition-colors line-clamp-1"
                          title={product.name}
                          dir="auto"
                        >
                          {product.name}
                        </h3>

                        {/* SKU Code & Verified Quality Pill */}
                        <div className="flex items-center justify-between gap-2 py-1 px-2.5 bg-slate-50 rounded-lg border border-slate-100 mb-2.5 text-[10.5px]">
                          <div className="flex items-center gap-1 min-w-0 flex-1">
                            <span className="text-slate-400 font-semibold text-[9.5px] shrink-0">REF:</span>
                            <span
                              className="font-mono font-bold text-slate-600 truncate text-[10px]"
                              dir="ltr"
                              title={product.sku}
                            >
                              {product.sku}
                            </span>
                          </div>
                          <span className="text-amber-800 bg-amber-50/90 border border-amber-200/80 text-[9.5px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shrink-0 whitespace-nowrap shadow-2xs">
                            <Award size={11} className="text-amber-500 shrink-0" />
                            فحص وجودة 100%
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-slate-500 text-xs leading-relaxed mb-3 line-clamp-2 min-h-[2.5rem] flex-1">
                          {product.description || 'تواصل معنا للحصول على المواصفات الفنية الكاملة وشهادات الاعتماد وتأكيد التوريد الفوري.'}
                        </p>

                        {/* Compare Toggle */}
                        <button
                          type="button"
                          onClick={() => toggleComparisonProduct(product.id)}
                          aria-pressed={isCompared}
                          className={`w-full h-8 px-3 rounded-lg text-[11px] font-bold transition-all duration-200 flex items-center justify-center gap-1.5 mb-3 border cursor-pointer ${
                            isCompared
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-2xs'
                              : 'bg-slate-50 hover:bg-slate-100/90 border-slate-200/80 text-slate-500 hover:text-slate-700'
                          }`}
                        >
                          <Scale size={13} className={isCompared ? 'text-emerald-600' : 'text-slate-400'} />
                          <span className="whitespace-nowrap">
                            {isCompared ? 'تمت الإضافة للمقارنة' : 'أضف للمقارنة'}
                          </span>
                          {isCompared && (
                            <CheckCircle2 size={12} className="text-emerald-600 mr-auto" />
                          )}
                        </button>

                        {/* Action Buttons */}
                        <div className="pt-3 border-t border-slate-100 mt-auto grid grid-cols-2 gap-2">
                          <a
                            href={`/products/${product.id}`}
                            className="h-10 px-2.5 rounded-xl border border-slate-200/90 bg-slate-50/80 hover:bg-slate-100 hover:border-slate-300 text-slate-700 font-bold text-xs transition-all duration-200 inline-flex items-center justify-center gap-1.5 shadow-2xs whitespace-nowrap group/btn"
                          >
                            <span>التفاصيل</span>
                            <ChevronLeft size={14} className="text-slate-400 group-hover/btn:-translate-x-0.5 transition-transform shrink-0" />
                          </a>

                          <button
                            type="button"
                            onClick={() => quoteModal.openModal(product.name)}
                            className="h-10 px-2.5 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] active:scale-[0.98] text-white font-bold text-xs transition-all duration-200 inline-flex items-center justify-center gap-1.5 shadow-sm shadow-[#22c55e]/25 whitespace-nowrap cursor-pointer"
                          >
                            <MessageCircle size={15} className="shrink-0" />
                            <span>طلب تسعير</span>
                          </button>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-14">
                  <button
                    onClick={handleLoadMore}
                    className="btn-outline px-10 py-4 font-black rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-all text-sm inline-flex items-center gap-2 shadow-sm"
                  >
                    <span>عرض المزيد من الأجهزة ({filteredProducts.length - visibleCount} متبقي)</span>
                    <ChevronLeft size={18} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <Microscope size={56} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-[#1B2848] mb-2">لم نجد أجهزة مطابقة لبحثك</h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
                جرّب البحث باسم الموديل أو إلغاء فلتر الماركة، أو تواصل معنا وسنوفر لك الجهاز فوراً.
              </p>
              <button
                onClick={() => {
                  setQuery('');
                  setActiveCategory('الكل');
                  setActiveBrand('الكل');
                }}
                className="btn-primary px-6 py-2.5 bg-[#1B9BD8] hover:bg-[#0ea5e9] text-white font-bold rounded-full text-sm transition-colors"
              >
                إعادة ضبط جميع الفلاتر
              </button>
            </div>
          )}
        </div>

        {selectedComparisonIds.length > 0 && (
          <aside className="comparison-dock" aria-label="الأجهزة المختارة للمقارنة">
            <div className="comparison-dock-products">
              {selectedComparisonIds.map((id) => {
              const product = productsById.get(id);
                if (!product) return null;
                return (
                  <div className="comparison-dock-product" key={id}>
                    {product.image && (
                      <div className="comparison-dock-thumb text-watermark relative shrink-0 overflow-hidden">
                        <img src={product.image} alt="" />
                      </div>
                    )}
                    <span>{product.name}</span>
                    <button type="button" onClick={() => toggleComparisonProduct(id)} aria-label={`إزالة ${product.name} من المقارنة`}><X size={13} /></button>
                  </div>
                );
              })}
              {selectedComparisonIds.length < 2 && <span className="comparison-dock-empty">اختر جهازًا آخر</span>}
            </div>
            <button type="button" className="comparison-dock-action" onClick={openComparison} disabled={selectedComparisonIds.length !== 2}>
              <Scale size={17} /> عرض المقارنة
            </button>
          </aside>
        )}
      </main>

      <SiteFooter />
      <QuoteModal isOpen={quoteModal.isOpen} onClose={quoteModal.closeModal} productName={quoteModal.productName} />
    </div>
  );
}
