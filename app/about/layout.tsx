import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'عن شركة ENTITY Medical | الريادة في تجهيز المناظير والأجهزة الطبية',
  description:
    'تعرف على شركة ENTITY Medical Devices Egypt، رؤيتنا ورسالتنا في تجهيز غرف العمليات، توفير أحدث أنظمة المناظير الجراحية العالمية، ومعايير الفحص والضمان والدعم الفني المعتمد داخل مصر.',
  alternates: { canonical: '/about' },
  keywords: [
    'عن entity medical',
    'شركات أجهزة طبية مصر',
    'تاريخ entity medical',
    'موردي مناظير طبية القاهرة',
    'فحص وضمان أجهزة طبية',
    'شريك غرف العمليات',
  ],
  openGraph: {
    url: '/about',
    title: 'عن شركة ENTITY Medical للأجهزة والمناظير الطبية',
    description:
      'خبرة السوق المحلي بمعايير عالمية في توريد وتجهيز أنظمة المناظير والآلات الجراحية الدقيقة.',
    type: 'website',
    locale: 'ar_EG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'عن ENTITY Medical Egypt',
    description: 'شريكك الموثوق لتجهيز غرف العمليات وأنظمة المناظير الطبية في مصر.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
