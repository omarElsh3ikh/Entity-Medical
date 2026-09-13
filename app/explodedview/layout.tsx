import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'المناظير التفكيكية التوضيحية | ENTITY Medical',
  description:
    'صور تفكيكية توضيحية لمنتجات ENTITY Medical، وليست مراجع صيانة أو كتالوجات قطع غيار رسمية.',
  alternates: { canonical: '/explodedview' },
};

export default function ExplodedViewLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
