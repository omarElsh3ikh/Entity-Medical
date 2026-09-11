import { brandAssets } from '@/app/data/brand-assets';

export function BrandMarquee() {
  return (
    <section className="brand-showcase" aria-label="العلامات التجارية المتاحة">
      <div className="container brand-showcase-heading">
        <span>شركاء التكنولوجيا</span>
        <strong>علامات عالمية موثوقة، بهوية أصلية.</strong>
      </div>

      <div className="brand-showcase-window">
        <div className="brand-showcase-rail">
          {[...brandAssets, ...brandAssets].map((brand, index) => (
            <div className={`brand-showcase-card ${brand.darkLogo ? 'brand-showcase-card-dark' : ''}`} key={`${brand.key}-${index}`}>
              <img src={brand.logo} alt={brand.name} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
