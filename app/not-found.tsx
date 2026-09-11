import type { Metadata } from 'next';
import { ErrorState } from '@/app/components/error-state';

export const metadata: Metadata = {
  title: 'الصفحة غير موجودة | ENTITY Medical',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <ErrorState
      code="404"
      title="واضح إن الصفحة دي مش موجودة"
      description="ممكن يكون الرابط اتغير أو اتكتب بشكل غير صحيح. ارجع للرئيسية أو تصفح منتجاتنا من الأجهزة الطبية."
    />
  );
}
