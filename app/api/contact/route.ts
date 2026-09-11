import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '@/app/data/site-config';

const MAX_BODY_BYTES = 16_384;
const attempts = new Map<string, number[]>();
const allowedFields = ['الاسم / المؤسسة','رقم الهاتف','رقم الواتساب','البريد الإلكتروني','المحافظة / مكان التوريد','المحافظة','نوع الجهة','وسيلة التواصل المفضلة','الموضوع','الأجهزة المطلوبة','الكمية','موعد الاحتياج','ملاحظات إضافية','تفاصيل الطلب'] as const;

function json(message: string, status: number) {
  return NextResponse.json({ ok: status >= 200 && status < 300, message }, { status, headers: { 'Cache-Control': 'no-store, max-age=0' } });
}

function clean(value: FormDataEntryValue | null, maxLength: number, multiline = false) {
  if (typeof value !== 'string') return '';
  return Array.from(value, (character) => {
    const code = character.charCodeAt(0);
    if (code === 0x7f) return '';
    if (code >= 0x20) return character;
    return multiline && (code === 9 || code === 10 || code === 13) ? character : multiline ? '' : ' ';
  }).join('').trim().slice(0, maxLength);
}

function isRateLimited(request: NextRequest) {
  const ip = request.headers.get('cf-connecting-ip') ?? request.headers.get('x-real-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const key = `${ip}:${request.headers.get('user-agent')?.slice(0, 80) ?? 'unknown'}`;
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((timestamp) => now - timestamp < 15 * 60 * 1000);
  if (recent.length >= 5) return true;
  attempts.set(key, [...recent, now]);
  return false;
}

function wasAccepted(payload: unknown) {
  if (!payload || typeof payload !== 'object') return false;
  const success = (payload as Record<string, unknown>).success;
  return success === true || success === 'true';
}

export async function POST(request: NextRequest) {
  if (Number(request.headers.get('content-length') ?? '0') > MAX_BODY_BYTES) return json('الطلب أكبر من الحد المسموح.', 413);
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return json('تعذر التحقق من مصدر الطلب.', 403);
  if (isRateLimited(request)) return json('تم إرسال عدة طلبات. يرجى الانتظار قليلًا ثم المحاولة مرة أخرى.', 429);

  let incoming: FormData;
  try { incoming = await request.formData(); }
  catch { return json('صيغة الطلب غير صالحة.', 400); }

  if (clean(incoming.get('_honey'), 100)) return json('تم استلام طلبك.', 200);
  const name = clean(incoming.get('الاسم / المؤسسة'), 120);
  const phone = clean(incoming.get('رقم الهاتف'), 24);
  const email = clean(incoming.get('البريد الإلكتروني'), 254);
  const details = clean(incoming.get('تفاصيل الطلب'), 2_000, true) || clean(incoming.get('الأجهزة المطلوبة'), 500, true);

  if (name.length < 2 || details.length < 3) return json('يرجى استكمال البيانات المطلوبة.', 400);
  if (!/^[+0-9()\s-]{7,24}$/.test(phone)) return json('يرجى إدخال رقم هاتف صحيح.', 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json('يرجى إدخال بريد إلكتروني صحيح.', 400);

  const outgoing = new FormData();
  for (const field of allowedFields) {
    const multiline = ['تفاصيل الطلب', 'ملاحظات إضافية', 'الأجهزة المطلوبة'].includes(field);
    const value = clean(incoming.get(field), field === 'الأجهزة المطلوبة' ? 500 : multiline ? 2_000 : 254, multiline);
    if (value) outgoing.append(field, value);
  }
  outgoing.set('_replyto', email);
  outgoing.set('_subject', `طلب جديد من الموقع — ${incoming.has('تفاصيل الطلب') ? 'تواصل معنا' : 'طلب عرض سعر'}`);
  outgoing.set('_template', 'table');
  outgoing.set('_captcha', 'false');
  outgoing.set('تاريخ الاستلام', new Date().toISOString());
  outgoing.set('صفحة الطلب', clean(request.headers.get('referer'), 500));

  const clientOrigin = origin || (request.headers.get('host') ? `http://${request.headers.get('host')}` : siteConfig.website);
  const clientReferer = clean(request.headers.get('referer'), 500) || `${clientOrigin}/contact`;

  try {
    const upstream = await fetch(`https://formsubmit.co/ajax/${siteConfig.email}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Origin: clientOrigin,
        Referer: clientReferer,
      },
      body: outgoing,
      signal: AbortSignal.timeout(15_000)
    });
    const payload: unknown = await upstream.json().catch(() => null);
    if (!upstream.ok || !wasAccepted(payload)) {
      console.error('FormSubmit response error:', upstream.status, payload);
      const msg = (payload as Record<string, unknown>)?.message;
      return json(typeof msg === 'string' && msg ? `لم تقبل خدمة البريد الطلب: ${msg}` : 'لم تقبل خدمة البريد الطلب. تأكد من تفعيل FormSubmit من رسالة التفعيل المرسلة إلى بريد الشركة.', 502);
    }
    return json('تم إرسال طلبك بنجاح.', 200);
  } catch (err) {
    console.error('FormSubmit fetch error:', err);
    return json('تعذر الاتصال بخدمة الإرسال. يرجى استخدام واتساب.', 502);
  }
}
