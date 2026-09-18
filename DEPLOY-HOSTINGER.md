# دليل رفع وتشغيل موقع ENTITY Medical على استضافة Hostinger

تم تجهيز الموقع بأحدث معايير الأداء والـ SEO، مع ربط كامل لجميع النماذج بـ **FormSubmit** للإرسال المباشر على بريد الشركة المعتمد:
📧 `info@entitymedicalegypt.com`

---

## 1. إعدادات تطبيق Node.js على Hostinger (Node.js Web App)

عند إنشاء أو رفع التطبيق من لوحة تحكم **Hostinger hPanel** -> **Web Applications** أو **Node.js**:

| الإعداد | القيمة المطلوبة |
| :--- | :--- |
| **Node.js Version** | `20.x` أو `22.x` |
| **Application Root** | `./` (أو المجلد الرئيسي للمشروع) |
| **Application Startup File (Entry)** | `server.js` |
| **Package Manager** | `npm` |
| **Install Command** | `npm ci` (أو `npm install`) |
| **Build Command** | `npm run build` |
| **Start Command** | `npm start` |

> 💡 **ملاحظة للمنفذ (Port)**: السيرفر في `server.js` يقرأ المنفذ تلقائياً من `process.env.PORT` المخصص من الاستضافة.

---

## 2. تفعيل استقبال الإيميلات عبر FormSubmit (خطوة واحدة لأول مرة فقط)

النماذج في الموقع (صفحة **تواصل معنا** + نافذة **طلب عرض السعر**) ترسل مباشرة عبر FormSubmit AJAX إلى البريد:
`info@entitymedicalegypt.com`

### خطوات التفعيل السريعة:
1. بعد رفع الموقع، افتح صفحة `https://www.entitymedicalegypt.com/contact`
2. املأ النموذج ببيانات تجريبية واضغط **إرسال الطلب الرسمي**.
3. ستصل رسالة لمرة واحدة فقط من **FormSubmit** إلى صندوق البريد `info@entitymedicalegypt.com` بعنوان:
   `Action Required: Confirm your email address`
4. اضغط على زر **Activate Form** داخل الرسالة.
5. **تم التفعيل بنجاح!** من تلك اللحظة، ستصل جميع طلبات التسعير واستفسارات العملاء مباشرة إلى بريد الشركة فورياً في جدول منظم وواضح يحتوي على كل تفاصيل الطلب مع حماية ضد الرسائل المزعجة (Spam Honeypot).

---

## 3. ربط النطاق (Domain) وشهادة الأمان (SSL)

1. من لوحة Hostinger، اربط الدومين الأساسي `entitymedicalegypt.com` و `www.entitymedicalegypt.com`.
2. فعّل شهادة الأمان المجانية **Let's Encrypt SSL (HTTPS)**.
3. تم ضبط الـ Metadata وخريطة الموقع `sitemap.xml` وملف `robots.txt` لتكون متوافقة 100% مع الدومين.

---

## 4. فحص محركات البحث (Google Search Console)

1. بعد الرفع، ادخل على [Google Search Console](https://search.google.com/search-console).
2. أضف الموقع: `https://www.entitymedicalegypt.com`.
3. قدّم ملف خريطة الموقع: `https://www.entitymedicalegypt.com/sitemap.xml`.
4. الموقع مجهز بـ:
   - ✅ **MedicalBusiness & LocalBusiness Schema** لظهور نشاطك التجاري على خرائط وبحث جوجل.
   - ✅ **WebSite & Sitelinks SearchBox Schema** للبحث المباشر عن المنتجات.
   - ✅ **FAQPage Schema** للظهور في الإجابات المميزة للأسئلة الشائعة.
   - ✅ **Product & BreadcrumbList Schema** لكل جهاز ومستلزم جراحي.
   - ✅ **OfferCatalog & DigitalDocument Schema** لصفحات العروض والبروشور.
