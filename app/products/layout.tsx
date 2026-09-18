import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'كتالوج الأجهزة والمناظير والآلات الجراحية في مصر',
  description:
    'استعرض الكتالوج الطبي الشامل لأجهزة ومناظير الجراحة العامة، المسالك، العظام، والأنف والأذن والحنجرة (Stryker, Storz, Olympus, Mindray, Wolf) مع الفحص والمقارنة وطلب التسعير الفوري.',
  alternates: { canonical: '/products' },
  keywords: [
    'كتالوج أجهزة طبية مصر',
    'كاميرات مناظير جراحية',
    'سترايكر 1688',
    'سترايكر 1588',
    'كارل ستورز SPIES',
    'أوليمبوس 260 و 290',
    'مونيتورات رعاية مركزة',
    'أجهزة نفخ غاز المنظار',
    'مصادر إضاءة جراحية',
    'آلات جراحية يوشي Youshi',
    'مقارنة أجهزة طبية',
  ],
  openGraph: {
    url: '/products',
    title: 'كتالوج الأجهزة والمناظير والآلات الجراحية | ENTITY Medical Egypt',
    description:
      'قاعدة بيانات متكاملة لأجهزة ومستلزمات غرف العمليات والمناظير مع أداة مقارنة ذكية للمواصفات وطلب تسعير معتمد.',
    type: 'website',
    locale: 'ar_EG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'كتالوج الأجهزة والمناظير الطبية | ENTITY Medical',
    description: 'تصفح أحدث أنظمة المناظير والأجهزة الطبية في مصر مع الفحص والضمان.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
