import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/manrope';
import './globals.css';

const siteUrl = new URL('https://www.entitymedicalegypt.com');

export const viewport: Viewport = {
  themeColor: '#075da8',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: 'ENTITY Medical Egypt | حلول وتجهيزات الأجهزة والمناظير الطبية',
    template: '%s | ENTITY Medical Egypt',
  },
  description:
    'الشركة الرائدة في مصر لتوريد وتجهيز أنظمة المناظير الجراحية (Stryker, Karl Storz, Olympus)، أجهزة غرف العمليات، أجهزة التخدير والمونيتورات، والآلات الجراحية الدقيقة للمستشفيات والمراكز التخصصية مع الفحص المعتمد والضمان الشامل والدعم الفني 24/7.',
  keywords: [
    'أجهزة طبية مصر',
    'مناظير جراحية مصر',
    'تجهيز غرف عمليات',
    'كاميرات مناظير سترايكر Stryker',
    'مناظير كارل ستورز Karl Storz',
    'مناظير أوليمبوس Olympus',
    'أجهزة تخدير ومونيتورات',
    'أجهزة موجات فوق صوتية سونار',
    'آلات جراحية دقيقة',
    'صيانة أجهزة طبية',
    'Entity Medical Egypt',
    'توريد مستلزمات مستشفيات',
    'مناظير باطنة وجراحة',
    'أجهزة نفخ غاز CO2',
    'مصادر إضاءة زينون وليد',
  ],
  authors: [{ name: 'ENTITY Medical Devices Egypt', url: 'https://www.entitymedicalegypt.com' }],
  creator: 'ENTITY Medical Egypt',
  publisher: 'ENTITY Medical Devices Egypt',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  icons: {
    icon: [
      { url: '/brand/entity-icon.webp', type: 'image/webp' },
      { url: '/brand/entity-icon.webp', sizes: '192x192', type: 'image/webp' },
      { url: '/brand/entity-icon.webp', sizes: '512x512', type: 'image/webp' },
    ],
    shortcut: '/brand/entity-icon.webp',
    apple: [
      { url: '/brand/entity-icon.webp', sizes: '180x180', type: 'image/webp' },
    ],
  },
  alternates: {
    canonical: 'https://www.entitymedicalegypt.com',
    languages: {
      'ar-EG': 'https://www.entitymedicalegypt.com',
    },
  },
  openGraph: {
    title: 'ENTITY Medical Egypt | حلول وتجهيزات الأجهزة والمناظير الطبية',
    description:
      'توريد وتجهيز أنظمة المناظير الجراحية المتطورة 4K & Full HD، أجهزة ومونيتورات الرعاية والمستلزمات الجراحية للمستشفيات داخل مصر مع الفحص والضمان والدعم الفني المباشر.',
    url: 'https://www.entitymedicalegypt.com',
    siteName: 'ENTITY Medical Devices Egypt',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: '/brand/entity-banner-wide.png',
        width: 1200,
        height: 630,
        alt: 'ENTITY Medical Egypt - تجهيزات الأجهزة والمناظير الطبية',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ENTITY Medical Egypt | حلول وتجهيزات الأجهزة والمناظير الطبية',
    description:
      'توريد وتجهيز أنظمة المناظير الجراحية والأجهزة الطبية للمستشفيات والمراكز التخصصية في مصر مع الضمان والدعم الفني.',
    images: ['/brand/entity-banner-wide.png'],
    creator: '@EntityMedicalEG',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Medical Equipment & Surgical Endoscopy',
};

const structuredSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['MedicalBusiness', 'MedicalOrganization', 'LocalBusiness'],
      '@id': 'https://www.entitymedicalegypt.com/#organization',
      name: 'ENTITY Medical Devices Egypt',
      alternateName: 'ENTITY Medical Egypt - شركة إنتيتي ميديكال للأجهزة والمناظير الطبية',
      legalName: 'ENTITY Medical Devices Egypt LLC',
      url: 'https://www.entitymedicalegypt.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.entitymedicalegypt.com/brand/entity-icon.webp',
        width: 512,
        height: 512,
        caption: 'ENTITY Medical Logo',
      },
      image: 'https://www.entitymedicalegypt.com/brand/entity-banner-wide.png',
      description:
        'الشركة الرائدة في جمهورية مصر العربية لتجهيز وتوريد أنظمة المناظير الجراحية الدقيقة، أجهزة غرف العمليات، أنظمة التصوير الطبي، ومونيتورات الرعاية المركزة مع شهادات الفحص والضمان المعتمد.',
      telephone: '+201055834363',
      email: 'info@entitymedicalegypt.com',
      priceRange: '$$$',
      currenciesAccepted: 'EGP, USD, EUR',
      paymentAccepted: 'Cash, Credit Card, Bank Wire Transfer, Installments',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'May Towers, Nasr City',
        addressLocality: 'Cairo',
        addressRegion: 'Cairo Governorate',
        postalCode: '11765',
        addressCountry: 'EG',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 30.0561,
        longitude: 31.3301,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+201055834363',
          contactType: 'sales',
          areaServed: 'EG',
          availableLanguage: ['Arabic', 'English'],
        },
        {
          '@type': 'ContactPoint',
          telephone: '+201055834363',
          contactType: 'customer support',
          areaServed: 'EG',
          availableLanguage: ['Arabic', 'English'],
        },
        {
          '@type': 'ContactPoint',
          telephone: '+201055834363',
          contactType: 'technical support',
          areaServed: 'EG',
          availableLanguage: ['Arabic', 'English'],
        },
      ],
      areaServed: [
        { '@type': 'Country', name: 'Egypt' },
        { '@type': 'AdministrativeArea', name: 'Cairo' },
        { '@type': 'AdministrativeArea', name: 'Giza' },
        { '@type': 'AdministrativeArea', name: 'Alexandria' },
        { '@type': 'AdministrativeArea', name: 'Delta Region' },
        { '@type': 'AdministrativeArea', name: 'Upper Egypt' },
      ],
      sameAs: [
        'https://www.facebook.com/profile.php?id=61592513580158',
        'https://t.me/+201055834363',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'كتالوج أنظمة المناظير والأجهزة الطبية',
        itemListElement: [
          {
            '@type': 'OfferCatalog',
            name: 'أنظمة مناظير الجراحة العامة والبطن',
          },
          {
            '@type': 'OfferCatalog',
            name: 'كاميرات ومصادر إضاءة جراحية',
          },
          {
            '@type': 'OfferCatalog',
            name: 'مونيتورات رعاية مركزة ومتابعة المرضى',
          },
          {
            '@type': 'OfferCatalog',
            name: 'أجهزة كي وطاقة جراحية Electrosurgical Units',
          },
          {
            '@type': 'OfferCatalog',
            name: 'آلات وأدوات جراحية دقيقة قابلة للتعقيم',
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.entitymedicalegypt.com/#website',
      url: 'https://www.entitymedicalegypt.com',
      name: 'ENTITY Medical Egypt',
      description: 'الموقع الرسمي لشركة ENTITY Medical للأجهزة والمناظير الطبية في مصر',
      publisher: {
        '@id': 'https://www.entitymedicalegypt.com/#organization',
      },
      inLanguage: 'ar-EG',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://www.entitymedicalegypt.com/products?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preload" href="/hero/operating-room-blue.webp" as="image" type="image/webp" />
        <link rel="preload" href="/fonts/thmanyah-sans-regular.woff2" as="font" type="font/woff2" crossOrigin="" />
        <meta name="geo.region" content="EG-C" />
        <meta name="geo.placename" content="Cairo" />
        <meta name="geo.position" content="30.0561;31.3301" />
        <meta name="ICBM" content="30.0561, 31.3301" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredSchema) }}
        />
      </head>
      <body id="top">{children}</body>
    </html>
  );
}
