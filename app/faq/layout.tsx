import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'الأسئلة الشائعة حول شراء وضمان وصيانة الأجهزة الطبية',
  description:
    'إجابات شاملة ومفصلة حول أسعار الأجهزة الطبية، فترات الضمان، التوريد لكافة محافظات مصر، فحص واختبار الأجهزة، الصيانة والدعم الفني وخدمات ما بعد البيع من ENTITY Medical.',
  alternates: { canonical: '/faq' },
  keywords: [
    'أسئلة شائعة أجهزة طبية',
    'ضمان الأجهزة والمناظير',
    'توريد أجهزة طبية للمحافظات',
    'صيانة مناظير جراحية مصر',
    'سعر كاميرا سترايكر',
    'سعر منظار ستورز',
    'طرق دفع الأجهزة الطبية',
  ],
  openGraph: {
    url: '/faq',
    title: 'الأسئلة الشائعة عن الأجهزة والمناظير الطبية | ENTITY Medical',
    description:
      'تعرف على كافة التفاصيل المتعلقة بضمان الأجهزة، الشحن لكافة المحافظات، الفحص الفني، والصيانة وخدمات ما بعد البيع.',
    type: 'website',
    locale: 'ar_EG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'الأسئلة الشائعة | ENTITY Medical Egypt',
    description: 'إجابات على أكثر الاستفسارات شيوعاً حول شراء وتجهيز وضمان الأجهزة الطبية.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
