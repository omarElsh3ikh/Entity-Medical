import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return { name:'ENTITY Medical Devices Egypt', short_name:'ENTITY Medical', description:'حلول الأجهزة والمناظير الطبية في مصر', start_url:'/', display:'standalone', background_color:'#f7fafc', theme_color:'#075da8', lang:'ar', dir:'rtl', icons:[{src:'/brand/entity-icon.webp',sizes:'512x512',type:'image/webp'}] };
}
