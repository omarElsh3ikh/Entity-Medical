import type { MetadataRoute } from 'next';
import { productSummaries } from '@/app/data/product-summaries';
import { siteConfig } from '@/app/data/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/products', priority: 0.95, changeFrequency: 'daily' as const },
    { path: '/offers', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/brochure', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/faq', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/explodedview', priority: 0.7, changeFrequency: 'monthly' as const },
  ];

  const now = new Date();

  return [
    ...staticPages.map((page) => ({
      url: `${siteConfig.website}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...productSummaries.map((product) => ({
      url: `${siteConfig.website}/products/${encodeURIComponent(product.id)}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: product.featured ? 0.8 : 0.7,
    })),
  ];
}
