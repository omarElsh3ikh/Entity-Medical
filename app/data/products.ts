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
