export type BrandAsset = {
  key: string;
  name: string;
  logo: string;
  darkLogo?: boolean;
};

export const brandAssets: BrandAsset[] = [
  { key: 'stryker', name: 'Stryker', logo: '/brands/official/stryker.webp' },
  { key: 'storz', name: 'Karl Storz', logo: '/brands/official/karl-storz.svg', darkLogo: true },
  { key: 'olympus', name: 'Olympus', logo: '/brands/official/olympus.webp' },
  { key: 'youshi', name: 'Youshi', logo: '/brands/official/youshi.jpg' },
  { key: 'wolf', name: 'Richard Wolf', logo: '/brands/official/richard-wolf.svg', darkLogo: true },
  { key: 'mindray', name: 'Mindray', logo: '/brands/official/mindray.webp', darkLogo: true },
  { key: 'endoservice', name: 'Endoservice', logo: '/brands/official/endoservice.webp' },
];

export function findBrandAsset(value: string): BrandAsset | undefined {
  const normalized = value.toLowerCase();
  return brandAssets.find((brand) => normalized.includes(brand.key));
}
