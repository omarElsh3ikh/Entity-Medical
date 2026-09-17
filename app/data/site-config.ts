export const siteConfig = {
  name: 'ENTITY Medical',
  fullName: 'ENTITY Medical Devices Egypt',
  tagline: 'حلول الأجهزة والمناظير الطبية',
  description: 'توريد أنظمة المناظير والأجهزة والآلات الجراحية للمستشفيات والمراكز الطبية داخل مصر.',
  whatsapp: '201055834363',
  phone: '01055834363',
  phoneIntl: '+201055834363',
  email: 'support@entitymedicalegypt.com',
  address: 'May Towers, Nasr City, Cairo',
  maps: 'https://maps.app.goo.gl/PkCrbPiNF772Aa6f7',
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61592513580158',
    telegram: 'https://t.me/+201055834363',
  },
  website: 'https://www.entitymedicalegypt.com',
};

export const waLink = (message: string) =>
  `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
