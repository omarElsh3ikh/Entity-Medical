import Link from 'next/link';
import { ArrowUpLeft, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { siteConfig, waLink } from '@/app/data/site-config';
import { EntityWordmark } from '@/app/components/entity-wordmark';
import { WhatsAppIcon } from '@/app/components/whatsapp-icon';
import { QuoteTrigger } from '@/app/components/quote-trigger';

const quickLinks = [
  ['الرئيسية', '/'],
  ['منتجاتنا', '/products'],
  ['العروض والباقات', '/offers'],
  ['تواصل معنا', '/contact'],
];

function FacebookIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.026 4.388 11.02 10.125 11.927v-8.469H7.078v-3.458h3.047V9.43c0-3.007 1.792-4.67 4.533-4.67 1.313 0 2.686.235 2.686.235v2.954H15.83c-1.49 0-1.956.927-1.956 1.88v2.244h3.328l-.532 3.458h-2.796V24C19.612 23.093 24 18.099 24 12.073Z" /></svg>;
}

function TelegramIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M11.944 0A12 12 0 1 0 24 12 12.013 12.013 0 0 0 11.944 0Zm4.962 7.224-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394a.759.759 0 0 1-.6.295l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.87 4.326-2.96-.924c-.643-.204-.658-.643.136-.953l11.566-4.458c.537-.194 1.006.131.829.939Z" /></svg>;
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid-pattern" aria-hidden="true" />
      <div className="footer-orb footer-orb-one" aria-hidden="true" />
      <div className="footer-orb footer-orb-two" aria-hidden="true" />
      <div className="footer-top-line" aria-hidden="true" />

      <div className="container footer-container">
        <div className="footer-main-grid">
          <div className="footer-brand-column">
            <Link href="/" className="footer-brand" aria-label="ENTITY Medical - الرئيسية">
              <span className="footer-brand-logo"><img src="/brand/entity-icon.webp" alt="" width={46} height={46} loading="lazy" /></span>
              <span className="footer-brand-copy"><strong><EntityWordmark variant="light" /></strong><small>MEDICAL DEVICES · EGYPT</small></span>
            </Link>
            <p>حلول موثوقة لتوريد وتجهيز أنظمة المناظير والأجهزة الطبية للمستشفيات والمراكز التخصصية في مصر.</p>
            <div className="footer-socials">
              <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" data-network="facebook"><FacebookIcon /></a>
              <a href={siteConfig.social.telegram} target="_blank" rel="noreferrer" aria-label="Telegram" data-network="telegram"><TelegramIcon /></a>
              <a href={waLink('مرحبًا ENTITY Medical، أريد الاستفسار عن الأجهزة الطبية')} target="_blank" rel="noreferrer" aria-label="WhatsApp" data-network="whatsapp"><WhatsAppIcon size={18} /></a>
              <a href={`mailto:${siteConfig.email}`} aria-label="Email" data-network="email"><Mail size={18} /></a>
            </div>
          </div>

          <div className="footer-column">
            <h3>تواصل مباشر</h3>
            <div className="footer-contact-list">
              <a href={`tel:${siteConfig.phoneIntl}`}><span><Phone size={16} /></span><b dir="ltr">{siteConfig.phone}</b></a>
              <a href={`mailto:${siteConfig.email}`}><span><Mail size={16} /></span><b>{siteConfig.email}</b></a>
              <a href={siteConfig.maps} target="_blank" rel="noreferrer"><span><MapPin size={16} /></span><b>{siteConfig.address}</b></a>
            </div>
          </div>

          <div className="footer-column">
            <h3>روابط مهمة</h3>
            <nav className="footer-links" aria-label="روابط التذييل">
              {quickLinks.map(([label, href]) => <Link href={href} key={href}><span>{label}</span><ArrowUpLeft size={14} /></Link>)}
            </nav>
          </div>

          <div className="footer-column">
            <h3>خدمة العملاء</h3>
            <div className="footer-hours-card">
              <span className="footer-hours-label">مواعيد المقر الرئيسي</span><strong>السبت — الخميس</strong><b dir="ltr">9:00 AM — 6:00 PM</b>
              <span className="footer-hours-divider" /><span className="footer-live"><i /> استقبال طلبات واتساب 24/7</span>
            </div>
            <QuoteTrigger className="footer-whatsapp-button" ariaLabel="طلب عرض سعر"><WhatsAppIcon size={18} /> طلب عرض سعر <ArrowUpLeft size={15} /></QuoteTrigger>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2021–{new Date().getFullYear()} ENTITY Medical Devices Egypt. جميع الحقوق محفوظة.</p>
          <div className="footer-bottom-note"><ShieldCheck size={14} /> تجهيزات طبية موثوقة بمعايير احترافية</div>
          <a href="#top" aria-label="العودة إلى أعلى الصفحة">للأعلى</a>
        </div>
      </div>
    </footer>
  );
}
