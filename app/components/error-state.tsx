'use client';

import { ArrowLeft, Home, RefreshCw, Search, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { EntityWordmark } from '@/app/components/entity-wordmark';
import { WhatsAppIcon } from '@/app/components/whatsapp-icon';
import { waLink } from '@/app/data/site-config';

type ErrorStateProps = {
  code: '404' | '500';
  title: string;
  description: string;
  onRetry?: () => void;
};

export function ErrorState({ code, title, description, onRetry }: ErrorStateProps) {
  return (
    <main className="error-page" dir="rtl">
      <div className="error-page__grid" aria-hidden="true" />
      <span className="error-page__orb error-page__orb--one" aria-hidden="true" />
      <span className="error-page__orb error-page__orb--two" aria-hidden="true" />

      <section className="error-card" aria-labelledby="error-title">
        <Link className="error-card__brand" href="/" aria-label="العودة إلى الصفحة الرئيسية">
          <span className="error-card__logo-wrap">
            <img src="/brand/entity-icon.webp" alt="" width={40} height={40} />
          </span>
          <span>
            <EntityWordmark />
            <small>MEDICAL</small>
          </span>
        </Link>

        <div className="error-card__code" aria-label={`خطأ ${code}`}>
          <span>{code}</span>
          <i aria-hidden="true" />
        </div>

        <div className="error-card__copy">
          <span className="error-card__eyebrow">
            <ShieldCheck size={17} />
            إحنا هنا لمساعدتك
          </span>
          <h1 id="error-title">{title}</h1>
          <p>{description}</p>
        </div>

        <div className="error-card__actions">
          {onRetry ? (
            <button className="error-action error-action--primary" type="button" onClick={onRetry}>
              <RefreshCw size={18} />
              حاول مرة تانية
            </button>
          ) : (
            <Link className="error-action error-action--primary" href="/">
              <Home size={18} />
              الصفحة الرئيسية
            </Link>
          )}

          <Link className="error-action error-action--secondary" href="/products">
            <Search size={18} />
            تصفح الأجهزة
          </Link>
        </div>

        <div className="error-card__support">
          <span>محتاج مساعدة سريعة؟</span>
          <a
            href={waLink(`مرحباً فريق ENTITY Medical، ظهرت لي صفحة خطأ ${code} وأحتاج إلى المساعدة.`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={17} />
            تواصل مع الدعم
            <ArrowLeft size={15} />
          </a>
        </div>
      </section>
    </main>
  );
}
