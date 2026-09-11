import type { Metadata } from 'next';
export const metadata: Metadata = { title:'عروض الأجهزة والمناظير الطبية | ENTITY Medical', description:'عروض وتجهيزات غرف العمليات والمناظير والأجهزة الطبية مع التوريد والدعم الفني داخل مصر.', alternates:{canonical:'/offers'}, openGraph:{url:'/offers',title:'عروض ENTITY Medical',description:'باقات وتجهيزات طبية للمستشفيات والمراكز داخل مصر.'} };
export default function Layout({children}:{children:React.ReactNode}){return children;}
