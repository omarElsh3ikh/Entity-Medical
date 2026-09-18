import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تحميل وتصفح بروشور الأجهزة الطبية والمناظير 2026 | ENTITY Medical',
  description:
    'تصفح وحمل الكتالوج الطبي الرسمي 2026 لشركة ENTITY Medical بصيغة PDF. يشمل تفاصيل الأنظمة، الكاميرات، مصادر الإضاءة، الأجهزة الجراحية ومستلزمات التعقيم.',
  alternates: { canonical: '/brochure' },
  keywords: [
    'بروشور أجهزة طبية 2026',
    'كتالوج مناظير طبية pdf',
    'تحميل بروشور entity medical',
    'دليل تجهيز المستشفيات',
    'مواصفات كاميرات المناظير',
  ],
  openGraph: {
    url: '/brochure',
    title: 'بروشور الأجهزة والمناظير الطبية 2026 | ENTITY Medical',
    description:
      'دليل متكامل يضم كافة حلول التجهيز وأنظمة المناظير الجراحية بصيغة PDF جاهز للتصفح والتحميل المباشر.',
    type: 'website',
    locale: 'ar_EG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'بروشور ENTITY Medical الطبي 2026',
    description: 'تصفح الدليل الشامل لأنظمة المناظير والأجهزة الطبية في مصر.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
