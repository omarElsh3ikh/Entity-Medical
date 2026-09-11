import { findBrandAsset } from '@/app/data/brand-assets';

type BrandMarkProps = {
  value: string;
  className?: string;
};

export function BrandMark({ value, className = '' }: BrandMarkProps) {
  const brand = findBrandAsset(value);
  if (!brand) return null;

  return (
    <span
      className={`brand-mark ${brand.darkLogo ? 'brand-mark-dark' : ''} ${className}`}
      title={brand.name}
      aria-label={`العلامة التجارية ${brand.name}`}
    >
      <img src={brand.logo} alt={brand.name} loading="lazy" />
    </span>
  );
}
