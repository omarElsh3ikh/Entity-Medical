import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'عروض وباقات تجهيز غرف العمليات والمناظير الجراحية 2026',
  description:
    'أقوى العروض الحصرية والباقات المتكاملة لتجهيز غرف العمليات، كاميرات Stryker 1188 و 1588 و 1688، أجهزة نفخ Storz Endoflator، مصادر إضاءة زينون، ومناظير كلى ومسالك بأفضل سعر في مصر.',
  alternates: { canonical: '/offers' },
  keywords: [
    'عروض أجهزة طبية مصر',
    'باقات تجهيز غرف العمليات',
    'عرض كاميرا سترايكر 1188',
    'عرض كاميرا ستورز SPIES',
    'عرض جهاز نفخ Endoflator',
    'تجهيز مناظير كامل',
    'تخفيضات أجهزة جراحية',
  ],
  openGraph: {
    url: '/offers',
    title: 'عروض وباقات تجهيز المناظير الطبية | ENTITY Medical',
    description:
      'باقات جراحية متكاملة بأسعار تنافسية مع فحص تشغيلي وضمان شامل وتوريد سريع لكافة المحافظات.',
    type: 'website',
    locale: 'ar_EG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'عروض الأجهزة والمناظير الطبية | ENTITY Medical',
    description: 'استفد من أقوى العروض والباقات الجراحية المعتمدة لغرف العمليات في مصر.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
