import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ENTITY Medical Devices Egypt | حلول الأجهزة والمناظير الطبية',
    short_name: 'ENTITY Medical',
    description: 'الشركة الرائدة في مصر لتوريد وتجهيز أنظمة المناظير والأجهزة والآلات الجراحية.',
    start_url: '/',
    display: 'standalone',
    background_color: '#071322',
    theme_color: '#075da8',
    lang: 'ar',
    dir: 'rtl',
    categories: ['medical', 'business', 'shopping'],
    icons: [
      {
        src: '/brand/entity-icon.webp',
        sizes: '192x192',
        type: 'image/webp',
        purpose: 'maskable',
      },
      {
        src: '/brand/entity-icon.webp',
        sizes: '512x512',
        type: 'image/webp',
        purpose: 'any',
      },
    ],
  };
}
