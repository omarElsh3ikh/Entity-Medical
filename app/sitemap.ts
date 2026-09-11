import type { MetadataRoute } from 'next';
import { productSummaries } from '@/app/data/product-summaries';
import { siteConfig } from '@/app/data/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/products', '/offers', '/about', '/contact', '/faq', '/brochure'];
  return [
    ...pages.map((path, index) => ({ url: `${siteConfig.website}${path}`, lastModified: new Date(), changeFrequency: index < 2 ? 'weekly' as const : 'monthly' as const, priority: index === 0 ? 1 : index === 1 ? .9 : .7 })),
    ...productSummaries.map((product) => ({ url: `${siteConfig.website}/products/${encodeURIComponent(product.id)}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: .65 })),
  ];
}
