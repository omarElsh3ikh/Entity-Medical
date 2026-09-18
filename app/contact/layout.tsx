import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تواصل معنا واطلب عرض سعر رسمي | ENTITY Medical',
  description:
    'تواصل مع فريق ENTITY Medical لطلب عروض الأسعار المعتمدة، استشارات تجهيز غرف العمليات ومراكز المناظير، وتنسيق التوريد والشحن لكافة محافظات مصر.',
  alternates: { canonical: '/contact' },
  keywords: [
    'تواصل entity medical',
    'طلب عرض سعر أجهزة طبية',
    'تجهيز مستشفيات مصر',
    'تجهيز مراكز مناظير',
    'رقم شركة أجهزة طبية',
    'عنوان شركة مناظير طبية القاهرة',
  ],
  openGraph: {
    url: '/contact',
    title: 'تواصل مع ENTITY Medical للأجهزة والمناظير الطبية',
    description:
      'اطلب عرض سعر أو استشارة فنية فورية لتجهيز منشأتك الطبية مع خيارات دفع مرنة وشحن لجميع المحافظات.',
    type: 'website',
    locale: 'ar_EG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'تواصل مع ENTITY Medical | توريد أجهزة ومناظير طبية',
    description: 'فريقنا جاهز للرد على استفساراتكم وتوفير عروض الأسعار الرسمية.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
