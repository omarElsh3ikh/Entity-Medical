import type { Metadata } from 'next';
import '@fontsource-variable/manrope';
import './globals.css';

const siteUrl = new URL('https://www.entitymedicalegypt.com');

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: 'ENTITY Medical Egypt | حلول الأجهزة والمناظير الطبية',
  description: 'توريد أنظمة المناظير والأجهزة والآلات الجراحية للمستشفيات والمراكز الطبية داخل مصر، مع الفحص والضمان والدعم الفني.',
  keywords: 'أجهزة طبية, مناظير, آلات جراحية, توريد طبي, مصر, Entity Medical, Stryker, Karl Storz, Olympus',
  icons: {
    icon: '/brand/entity-icon.webp',
    shortcut: '/brand/entity-icon.webp',
    apple: '/brand/entity-icon.webp',
  },
  openGraph: {
    title: 'ENTITY Medical Egypt | حلول الأجهزة والمناظير الطبية',
    description: 'توريد أنظمة المناظير والأجهزة والآلات الجراحية للمستشفيات والمراكز الطبية داخل مصر.',
    type: 'website',
    locale: 'ar_EG',
    images: [{ url: '/brand/entity-banner-wide.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ENTITY Medical Egypt | حلول الأجهزة والمناظير الطبية',
    description: 'توريد الأجهزة والمناظير والآلات الجراحية للمستشفيات والمراكز الطبية داخل مصر.',
    images: ['/brand/entity-banner-wide.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preload" href="/hero/operating-room-blue.webp" as="image" type="image/webp" />
        <link rel="preload" href="/fonts/thmanyah-sans-regular.woff2" as="font" type="font/woff2" crossOrigin="" />
        <meta name="theme-color" content="#075da8" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context':'https://schema.org', '@type':'MedicalBusiness', name:'ENTITY Medical Devices Egypt', url:'https://www.entitymedicalegypt.com', logo:'https://www.entitymedicalegypt.com/brand/entity-icon.webp', image:'https://www.entitymedicalegypt.com/brand/entity-banner-wide.png', telephone:'+201055834363', email:'support@entitymedicalegypt.com', address:{'@type':'PostalAddress',streetAddress:'May Towers, Nasr City',addressLocality:'Cairo',addressCountry:'EG'}, areaServed:{'@type':'Country',name:'Egypt'}, sameAs:['https://www.facebook.com/profile.php?id=61556840584535','https://t.me/Medical_Services_Egypt'] }) }} />
      </head>
      <body id="top">{children}</body>
    </html>
  );
}
