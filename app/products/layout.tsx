import type { Metadata } from 'next';
export const metadata: Metadata = { title:'منتجاتنا من الأجهزة والمناظير الطبية | ENTITY Medical', description:'تصفح منتجات ENTITY Medical من أنظمة المناظير والأجهزة الجراحية ومونيتورات المرضى والموجات فوق الصوتية داخل مصر.', alternates:{canonical:'/products'}, openGraph:{url:'/products',title:'منتجات ENTITY Medical في مصر',description:'كتالوج شامل للأجهزة والمناظير والآلات الطبية مع المواصفات وطلب التسعير.'} };
export default function Layout({children}:{children:React.ReactNode}){return children;}
