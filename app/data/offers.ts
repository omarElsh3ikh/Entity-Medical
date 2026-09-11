import productDisplayMapJson from '../product-display-map.json';
import productDisplayFitMapJson from '../product-display-fit-map.json';

const productDisplayMap = productDisplayMapJson as Record<string, string>;
const productDisplayFitMap = productDisplayFitMapJson as Record<string, 'cover' | 'contain'>;

export interface Offer {
  id: string;
  category: string;
  badge: string;
  badgeClass: string;
  stock: string;
  image: string | null;
  images?: string[];
  title: string;
  description: string;
  features: string[];
  oldPrice: string;
  newPrice: string;
  whatsappText: string;
  buttonText: string;
  imageFit?: 'cover' | 'contain';
}

export const offersTimerConfig = {
  enabled: true,
  label: 'موعد تحديث العروض الحالية',
  endAt: '2026-10-01T23:59:59+03:00',
  expiredMessage: 'انتهت المدة الحالية — تواصل معنا لمعرفة أحدث العروض',
};

const rawOffers: Offer[] = [
  {
    id: 'national-package',
    category: 'مناظير وجراحة',
    badge: 'خصم وحصري',
    badgeClass: '',
    stock: 'التوفر يُؤكد عند الطلب',
    image: '/Medical Site Photo/1188 - stryker/1.jpg',
    images: [
      '/Medical Site Photo/1188 - stryker/1.jpg',
      '/Medical Site Photo/1188 - stryker/2.jpg',
      '/Medical Site Photo/1188 - stryker/3.jpg',
      '/Medical Site Photo/1188 - stryker/4.jpg',
      '/Medical Site Photo/1188 - stryker/5.jpg',
      '/Medical Site Photo/1188 - stryker/6.jpg',
      '/Medical Site Photo/1188 - stryker/7.jpg',
      '/Medical Site Photo/Light Source محلى/1.jpeg',
      '/Medical Site Photo/surgical instruments/Strykre 10 - 30/1.jpg',
      '/Medical Site Photo/surgical instruments/Strykre 10 - 30/2.jpg',
      '/Medical Site Photo/surgical instruments/Strykre 10 - 30/3.jpg',
      '/Medical Site Photo/surgical instruments/Strykre 10 - 30/4.jpg',
      '/Medical Site Photo/surgical instruments/Strykre 10 - 30/5.jpg',
      '/Medical Site Photo/surgical instruments/Strykre 10 - 30/6.jpg',
    ],
    title: 'أفضل قيمة مقابل سعر - باقة Stryker 1188',
    description: 'أكثر كاميرا اعتمادية في السوق بأفضل سعر مع مصدر إضاءة محلي وعدسة جراحية.',
    features: [
      'نظام كاميرا Stryker 1188 HD',
      'مصدر إضاءة Light Source محلي عالي الكفاءة',
      'عدسة جراحية Stryker 10-mm 30-Degree',
      'ضمان ودعم فني وصيانة مجانية',
    ],
    oldPrice: 'تواصل لمعرفة الخصم',
    newPrice: 'عرض خاص ج.م',
    whatsappText: 'استفسار عن باقة ناشيونال المتكاملة Stryker 1188',
    buttonText: 'اغتنم العرض الآن',
  },
  {
    id: 'intensive-care',
    category: 'مناظير وجراحة',
    badge: 'الأكثر مبيعاً',
    badgeClass: 'special',
    stock: 'التوفر يُؤكد عند الطلب',
    image: '/Medical Site Photo/SPIES  th102 - storz/1.jpg',
    images: [
      '/Medical Site Photo/SPIES  th102 - storz/1.jpg',
      '/Medical Site Photo/SPIES  th102 - storz/2.jpg',
      '/Medical Site Photo/SPIES  th102 - storz/3.jpg',
      '/Medical Site Photo/SPIES  th102 - storz/4.jpg',
      '/Medical Site Photo/SPIES  th102 - storz/5.jpg',
      '/Medical Site Photo/SPIES  th102 - storz/6.jpg',
      '/Medical Site Photo/SPIES  th102 - storz/7.jpeg',
      '/Medical Site Photo/SPIES  th102 - storz/8.jpg',
      '/Medical Site Photo/SPIES  th102 - storz/9.jpg',
      '/Medical Site Photo/SPIES  th102 - storz/10.jpg',
      '/Medical Site Photo/SPIES  th102 - storz/11.jpg',
    ],
    title: 'منظومة Camera SPIES + Head TH102',
    description: 'أحدث أنظمة الكاميرات الجراحية من شركة Storz بتقنية SPIES المتطورة.',
    features: [
      'مزايا متطورة ومعالجة صور حصرية',
      'أداء عالي وصورة فائقة الوضوح Full HD',
      'أعلى عمر افتراضي مع ضمان معتمد',
      'رأس كاميرا Storz TH102 عالي الحساسية',
    ],
    oldPrice: 'عرض خاص للمراكز',
    newPrice: 'سعر خاص عند الطلب',
    whatsappText: 'استفسار عن باقة كاميرا Storz SPIES TH102',
    buttonText: 'طلب عرض فني',
  },
  {
    id: 'endoflator-20',
    category: 'أجهزة نفخ وإضاءة',
    badge: 'عرض جديد',
    badgeClass: '',
    stock: 'التوفر يُؤكد عند الطلب',
    image: '/Medical Site Photo/Endoflator 20  - storz/1.png',
    images: [
      '/Medical Site Photo/Endoflator 20  - storz/1.png',
      '/Medical Site Photo/Endoflator 20  - storz/2.png',
      '/Medical Site Photo/Endoflator 20  - storz/3.png',
      '/Medical Site Photo/Endoflator 20  - storz/4.png',
      '/Medical Site Photo/Endoflator 20  - storz/5.png',
      '/Medical Site Photo/Endoflator 20  - storz/6.png',
    ],
    title: 'جهاز نفخ Endoflator Storz 20L',
    description: 'جهاز نفخ CO₂ يُستخدم في تنظير البطن والجراحة بالمنظار لتوفير مساحة عمل مثالية للجراح.',
    features: [
      'أفضل قيمة في الفئة السعرية الخاصة به',
      'معدل تدفق 20 لتر/دقيقة مع تحكم رقمي دقيق',
      'خصم خاص للعرض والتجهيز الكامل',
      'شحن وتوصيل لكافة المحافظات',
    ],
    oldPrice: 'السعر الأصلي',
    newPrice: 'خصم الباقة الحالية',
    whatsappText: 'استفسار عن جهاز نفخ Storz Endoflator 20L',
    buttonText: 'اطلب العرض الآن',
  },
  {
    id: 'stryker-1588-full-hd',
    category: 'باقات كاملة',
    badge: 'باقة كاملة',
    badgeClass: 'special',
    stock: 'التوفر يُؤكد عند الطلب',
    image: '/Medical Site Photo/1588 - stryker/1.jpg',
    title: 'باقة Stryker 1588 AIM Full HD متكاملة',
    description: 'تجهيز غرفة عمليات متكامل بنظام كاميرا Stryker 1588 عالية الدقة.',
    features: [
      'وحدة التحكم الكاميرا Stryker 1588 Full HD',
      'رأس كاميرا سريعة التكيف للعمليات المعقدة',
      'دعم أنماط AIM متعددة التخصصات الجراحية',
      'تركيب واختبار وتدريب للطاقم الجراحي',
    ],
    oldPrice: 'تجهيز كامل',
    newPrice: 'عرض التوريد بالجملة',
    whatsappText: 'استفسار عن باقة Stryker 1588 AIM المتكاملة',
    buttonText: 'احجز الباقة الآن',
  },
  {
    id: 'xenon-light-source',
    category: 'أجهزة نفخ وإضاءة',
    badge: 'عرض خاص',
    badgeClass: '',
    stock: 'التوفر يُؤكد عند الطلب',
    image: '/Medical Site Photo/Xenon 300 - storz/1.jpg',
    title: 'مصدر إضاءة زينون Storz Xenon 300 Watt',
    description: 'مصدر إضاءة 300 واط قوة سطوع فائقة لكافة جراحات التنظير.',
    features: [
      'لمبة زينون 300 واط بعمر شديد الطول',
      'درجة حرارة ألوان مطابقة للضوء الطبيعي',
      'توافق تام مع كافة مناظير Storz و Stryker',
      'ضمان استبدال وسيرفيس سريع',
    ],
    oldPrice: 'قبل الخصم',
    newPrice: 'خصم الاستبدال والتجهيز',
    whatsappText: 'استفسار عن مصدر إضاءة Storz Xenon 300W',
    buttonText: 'طلب عرض سعر',
  },
  {
    id: 'surgical-lenses-kit',
    category: 'مناظير وجراحة',
    badge: 'عرض الأسبوع',
    badgeClass: 'special',
    stock: 'التوفر يُؤكد عند الطلب',
    image: '/Medical Site Photo/surgical instruments/Strykre 10 - 30/1.jpg',
    title: 'طقم عدسات وأدوات مناظير Stryker 10mm 30°',
    description: 'طقم عدسات وأدوات جراحية معتمدة عالية الدقة لتنظير البطن.',
    features: [
      'عدسة Stryker 10-mm بملازمة 30 درجة',
      'أداة رؤية جانبية زاوية ممتازة',
      'مقاوم للتعقيم بالبخار (Autoclavable)',
      'ضمان جودة وأداء عالي',
    ],
    oldPrice: 'السعر الفردي',
    newPrice: 'خصم المجموعة الجراحية',
    whatsappText: 'استفسار عن طقم عدسات Stryker 10mm',
    buttonText: 'اطلب الطقم الآن',
  },
  {
    id: 'offer-nephroscope-storz',
    category: 'مناظير وجراحة',
    badge: 'عرض خاص',
    badgeClass: 'special',
    stock: 'التوفر يُؤكد عند الطلب',
    image: '/Medical Site Photo/surgical instruments/Storz Nephroscope/1.png',
    title: 'منظار كلى Karl Storz NephroScope',
    description: 'منظار كلى جراحي دقيق من Karl Storz لتفتيت واستخراج حصوات الكلى.',
    features: [
      'بصريات Karl Storz الألمانية الأصلية',
      'قناة غسيل وسحب مستمر',
      'مخصص لعمليات الكلى والتفتيت المتقدمة PCNL',
      'ضمان شامل وسيرفيس صيانة معتمد',
    ],
    oldPrice: 'السعر الأصلي',
    newPrice: 'خصم التجهيز التنافسي',
    whatsappText: 'استفسار عن منظار كلى Storz NephroScope',
    buttonText: 'طلب عرض سعر',
  },
  {
    id: 'stryker-1688-4k',
    category: 'باقات كاملة',
    badge: 'الأحدث',
    badgeClass: 'special',
    stock: 'التوفر يُؤكد عند الطلب',
    image: '/Medical Site Photo/1688 - stryker/1.jpg',
    title: 'نظام كاميرا Stryker 1688 4K المتقدم',
    description: 'أحدث نظام تصوير جراحي 4K من Stryker بدقة فائقة للعمليات الحرجة.',
    features: [
      'دقة 4K UHD (3840×2160)',
      'نظام 3-Chip CMOS متطور',
      'رأس كاميرا خفيف الوزن ومريح',
      'ضمان ودعم فني شامل',
    ],
    oldPrice: 'أحدث تقنية 4K',
    newPrice: 'عرض خاص للمستشفيات',
    whatsappText: 'استفسار عن نظام Stryker 1688 4K',
    buttonText: 'اطلب التفاصيل',
  },
  {
    id: 'thermoflator-30',
    category: 'أجهزة نفخ وإضاءة',
    badge: 'جديد',
    badgeClass: '',
    stock: 'التوفر يُؤكد عند الطلب',
    image: '/Medical Site Photo/Thermoflator 30  - storz/1.png',
    title: 'جهاز نفخ Thermoflator Storz 30L',
    description: 'جهاز نفخ CO₂ بتسخين الغاز سعة 30 لتر لراحة المريض أثناء الجراحة.',
    features: [
      'تسخين الغاز لتقليل الأثر الجراحي',
      'معدل تدفق 30 لتر/دقيقة',
      'تحكم رقمي دقيق بالضغط',
      'متوافق مع جميع أنظمة التنظير',
    ],
    oldPrice: 'سعر الجهاز',
    newPrice: 'خصم العرض الحالي',
    whatsappText: 'استفسار عن Thermoflator Storz 30L',
    buttonText: 'اطلب الآن',
  },
  {
    id: 'olympus-260',
    category: 'باقات كاملة',
    badge: 'نظام متكامل',
    badgeClass: '',
    stock: 'التوفر يُؤكد عند الطلب',
    image: '/Medical Site Photo/System 260 - olympus/1.jpg',
    title: 'نظام Olympus 260 المتكامل',
    description: 'نظام فيديو وإضاءة متكامل من Olympus للتنظير الجراحي بتقنية NBI.',
    features: [
      'معالج فيديو CV-260 عالي الدقة',
      'مصدر إضاءة CLV-260 زينون',
      'تقنية NBI للتصوير المتقدم',
      'ضمان ودعم فني',
    ],
    oldPrice: 'نظام كامل',
    newPrice: 'عرض خاص للتجهيز',
    whatsappText: 'استفسار عن نظام Olympus 260 المتكامل',
    buttonText: 'احصل على العرض',
  },
  {
    id: 'stryker-system-8',
    category: 'أجهزة جراحية',
    badge: 'عظام وجراحة',
    badgeClass: 'special',
    stock: 'التوفر يُؤكد عند الطلب',
    image: '/Medical Site Photo/Stryker System 8/1.png',
    title: 'نظام Stryker System 8 لجراحة العظام',
    description: 'نظام أدوات جراحية كهربائية متكامل لجراحات العظام والمفاصل.',
    features: [
      'دريل جراحي عالي السرعة',
      'مناشير ترددية ومتأرجحة',
      'بطاريات ليثيوم أيون قابلة للشحن',
      'ضمان وقطع غيار',
    ],
    oldPrice: 'نظام كامل',
    newPrice: 'عرض جراحة العظام',
    whatsappText: 'استفسار عن Stryker System 8 لجراحة العظام',
    buttonText: 'اطلب التفاصيل',
  },
  {
    id: 'insufflator-45-stryker',
    category: 'أجهزة نفخ وإضاءة',
    badge: 'تدفق عالي',
    badgeClass: '',
    stock: 'التوفر يُؤكد عند الطلب',
    image: '/Medical Site Photo/Insufflator 45 Stryker/1.png',
    title: 'جهاز نفخ Stryker 45L عالي التدفق',
    description: 'جهاز نفخ CO₂ بتدفق 45 لتر/دقيقة لجراحات المنظار المتقدمة.',
    features: [
      'أعلى معدل تدفق 45 لتر/دقيقة',
      'تحكم دقيق بالضغط والتدفق',
      'شاشة رقمية واضحة',
      'نظام أمان متعدد المستويات',
    ],
    oldPrice: 'السعر الأصلي',
    newPrice: 'خصم خاص عند الطلب',
    whatsappText: 'استفسار عن جهاز نفخ Stryker 45L',
    buttonText: 'طلب عرض سعر',
  },
];

const toWebImage = (image: string | null) =>
  image?.startsWith('/Medical Site Photo/')
    ? `${image.replace('/Medical Site Photo/', '/product-images/')}.webp`
    : image;

export const offers: Offer[] = rawOffers.map((offer) => ({
  ...offer,
  image: (() => {
    const source = toWebImage(offer.image);
    return source ? (productDisplayMap[source] ?? source) : null;
  })(),
  imageFit: (() => {
    const source = toWebImage(offer.image);
    return source ? (productDisplayFitMap[source] ?? 'contain') : 'contain';
  })(),
  images: offer.images?.map((image) => toWebImage(image) ?? image),
}));
