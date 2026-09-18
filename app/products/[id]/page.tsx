import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products } from '@/app/data/products';
import { siteConfig } from '@/app/data/site-config';
import { ProductDetailClient } from './product-detail-client';

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((item) => item.id === decodeURIComponent(id));
  if (!product)
    return {
      title: 'المنتج غير موجود | ENTITY Medical',
      robots: { index: false, follow: false },
    };

  const brand =
    product.specs?.find(([key]) => /الماركة|الشركة/.test(key))?.[1] || 'ENTITY Medical';
  const title = `${product.name} (${product.sku}) في مصر | ${brand}`;
  const description = (
    product.description ||
    `اطلب مواصفات وسعر ${product.name} (${product.sku}) من ${brand} مع الفحص التشغيلي المعتمد والضمان والتوريد لكافة مستشفيات ومراكز مصر.`
  ).slice(0, 160);

  const url = `/products/${encodeURIComponent(product.id)}`;
  const fullUrl = `${siteConfig.website}${url}`;
  const images = product.image
    ? [
        {
          url: new URL(product.image, siteConfig.website).href,
          width: 800,
          height: 600,
          alt: `${product.name} - ENTITY Medical Egypt`,
        },
      ]
    : [{ url: `${siteConfig.website}/brand/entity-banner-wide.png`, width: 1200, height: 630, alt: product.name }];

  return {
    title,
    description,
    keywords: [
      product.name,
      product.sku,
      brand,
      product.category,
      `سعر ${product.name} في مصر`,
      `شراء ${product.name}`,
      'أجهزة طبية ومناظير مصر',
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url: fullUrl,
      type: 'website',
      locale: 'ar_EG',
      images,
      siteName: 'ENTITY Medical Egypt',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: product.image ? [new URL(product.image, siteConfig.website).href] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = products.find((item) => item.id === decodeURIComponent(id));
  if (!product) notFound();

  const relatedProducts = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  const images = (product.images?.length ? product.images : product.image ? [product.image] : []).map(
    (value) => new URL(value, siteConfig.website).href
  );
  const brand =
    product.specs?.find(([key]) => /الماركة|الشركة/.test(key))?.[1] || siteConfig.name;

  const productUrl = `${siteConfig.website}/products/${encodeURIComponent(product.id)}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || `جهاز طبي ومستلزم جراحي معتمد من ${brand}`,
    image: images,
    sku: product.sku,
    mpn: product.sku,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'EGP',
      price: '0',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'EGP',
        valueAddedTaxIncluded: true,
      },
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.website,
      },
      areaServed: {
        '@type': 'Country',
        name: 'Egypt',
      },
    },
    additionalProperty: (product.specs || []).map(([name, value]) => ({
      '@type': 'PropertyValue',
      name,
      value,
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'الرئيسية',
        item: siteConfig.website,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'المنتجات',
        item: `${siteConfig.website}/products`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
