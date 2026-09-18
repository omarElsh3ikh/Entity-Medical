import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'المخططات التفكيكية والتوضيحية للمناظير والأجهزة الطبية | ENTITY Medical',
  description:
    'استعراض تفاعلي للمخططات والصور التفكيكية Exploded View لمختلف أنظمة المناظير الجراحية والكاميرات والمونيتورات لتوضيح التكوين المعماري للأجهزة.',
  alternates: { canonical: '/explodedview' },
  keywords: [
    'المخططات التفكيكية للمناظير',
    'exploded view medical devices',
    'تركيب كاميرات المناظير',
    'مكونات أجهزة الجراحة',
  ],
  openGraph: {
    url: '/explodedview',
    title: 'المخططات التفكيكية للأجهزة الطبية | ENTITY Medical',
    description: 'استعراض بصري توضيحي لمكونات وهيكل أنظمة المناظير الطبية.',
    type: 'website',
    locale: 'ar_EG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'المخططات التفكيكية | ENTITY Medical Egypt',
    description: 'استعراض توضيحي لمكونات أجهزة ومناظير الجراحة.',
  },
};

export default function ExplodedViewLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
