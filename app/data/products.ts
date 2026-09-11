import productsJson from '../products.json';
import productDisplayMapJson from '../product-display-map.json';
import productDisplayFitMapJson from '../product-display-fit-map.json';

const productDisplayMap = productDisplayMapJson as Record<string, string>;
const productDisplayFitMap = productDisplayFitMapJson as Record<string, 'cover' | 'contain'>;

export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  sku: string;
  image: string | null;
  images?: string[];
  description?: string;
  specs?: string[][];
  badge?: string;
  featured?: boolean;
  homePriority?: number;
  priority?: number;
  accuracy?: string;
  accessories?: string;
  sterilization?: string;
  warning?: string;
  imageFit?: 'cover' | 'contain';
};

export const products = (productsJson as Product[]).map((product) => ({
  ...product,
  image: (() => {
    const source = product.images?.[0] ?? product.image ?? null;
    return source ? (productDisplayMap[source] ?? source) : null;
  })(),
  imageFit: (() => {
    const source = product.images?.[0] ?? product.image ?? null;
    return source ? (productDisplayFitMap[source] ?? 'contain') : 'contain';
  })(),
}));
export const featuredProducts = products
  .filter((p) => p.featured)
  .sort((a, b) => (a.homePriority ?? 99) - (b.homePriority ?? 99));

export const categories = ['الكل', 'أجهزة طبية', 'الآلات الجراحية', 'أجهزة الرعاية', 'كبسولات العمليات'] as const;
export type Category = (typeof categories)[number];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function filterProducts(query: string, category: Category): Product[] {
  return products.filter((p) => {
    const catMatch = category === 'الكل' || p.category === category;
    const q = query.trim().toLowerCase();
    if (!q) return catMatch;
    const haystack = `${p.name} ${p.sku} ${p.category} ${p.description ?? ''}`.toLowerCase();
    return catMatch && haystack.includes(q);
  });
}
