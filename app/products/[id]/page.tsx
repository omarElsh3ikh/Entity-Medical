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
  if (!product) return { title: 'المنتج غير موجود | ENTITY Medical', robots: { index: false, follow: false } };
  const title = `${product.name} في مصر | ENTITY Medical`;
  const description = (product.description || `اطلب مواصفات وسعر ${product.name} مع التوريد والدعم الفني داخل مصر.`).slice(0, 155);
  const url = `/products/${encodeURIComponent(product.id)}`;
  const images = product.image ? [{ url: product.image, alt: product.name }] : undefined;
  return { title, description, alternates:{canonical:url}, openGraph:{title,description,url,type:'website',locale:'ar_EG',images}, twitter:{card:'summary_large_image',title,description,images:product.image?[product.image]:undefined} };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = products.find((item) => item.id === decodeURIComponent(id));
  if (!product) notFound();
  const relatedProducts = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);
  const image = (product.images?.length ? product.images : product.image ? [product.image] : []).map((value) => new URL(value, siteConfig.website).href);
  const brand = product.specs?.find(([key]) => /الماركة|الشركة/.test(key))?.[1] || siteConfig.name;
  const schema = { '@context':'https://schema.org', '@type':'Product', name:product.name, description:product.description, image, sku:product.sku, category:product.category, brand:{'@type':'Brand',name:brand}, offers:{'@type':'Offer',url:`${siteConfig.website}/products/${encodeURIComponent(product.id)}`,priceCurrency:'EGP',availability:'https://schema.org/InStock',seller:{'@type':'Organization',name:siteConfig.name}} };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><ProductDetailClient product={product} relatedProducts={relatedProducts}/></>;
}
