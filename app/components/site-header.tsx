'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpLeft, Headphones, Menu, Phone, ShieldCheck, X } from 'lucide-react';
import { siteConfig } from '@/app/data/site-config';
import { WhatsAppIcon } from '@/app/components/whatsapp-icon';
import { EntityWordmark } from '@/app/components/entity-wordmark';
import { QuoteModal, useQuoteModal } from '@/app/components/quote-modal';

const navLinks = [
  { name: 'الرئيسية', href: '/' },
  { name: 'منتجاتنا', href: '/products' },
  { name: 'العروض والباقات', href: '/offers' },
  { name: 'البروشور الطبي', href: '/brochure' },
  { name: 'عن الشركة', href: '/about' },
  { name: 'تواصل معنا', href: '/contact' },
  { name: 'الأسئلة الشائعة', href: '/faq' },
];

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);
  const quoteModal = useQuoteModal();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 18);
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (progressRef.current) {
          const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
          progressRef.current.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className={`premium-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="premium-header-glow" aria-hidden="true" />
        <div className="container relative z-10">
          <div className="premium-header-row">
            <Link href="/" className="premium-brand" aria-label="ENTITY Medical - الرئيسية">
              <span className="premium-brand-logo"><img src="/brand/entity-icon.webp" alt="" className="site-logo" width={42} height={42} /></span>
              <span className="premium-brand-copy"><strong><EntityWordmark /></strong><small>MEDICAL DEVICES · EGYPT</small></span>
            </Link>

            <nav className="premium-nav" aria-label="التنقل الرئيسي">
              {navLinks.map((link) => <Link key={link.href} href={link.href} className="premium-nav-link"><span>{link.name}</span></Link>)}
            </nav>

            <div className="premium-header-actions">
              <button type="button" className="premium-quote-button" onClick={() => quoteModal.openModal()}>
                <span className="premium-quote-icon"><WhatsAppIcon size={17} /></span><span>اطلب تسعير</span><ArrowUpLeft size={15} className="premium-quote-arrow" />
              </button>
            </div>

            <button type="button" className="premium-menu-toggle" onClick={() => setIsMobileMenuOpen(true)} aria-label="فتح القائمة الرئيسية" aria-expanded={isMobileMenuOpen} aria-controls="mobile-navigation"><Menu size={23} /><span>القائمة</span></button>
          </div>
        </div>
        <span ref={progressRef} className="header-scroll-progress" aria-hidden="true" />
      </header>

      <div id="mobile-navigation" className={`mobile-nav-overlay ${isMobileMenuOpen ? 'is-open' : ''}`} aria-hidden={!isMobileMenuOpen}>
        <div className="mobile-nav-orb mobile-nav-orb-one" aria-hidden="true" />
        <div className="mobile-nav-orb mobile-nav-orb-two" aria-hidden="true" />
        <div className="mobile-nav-head">
          <Link href="/" className="premium-brand" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="premium-brand-logo"><img src="/brand/entity-icon.webp" alt="" className="site-logo" width={42} height={42} /></span>
            <span className="premium-brand-copy"><strong><EntityWordmark /></strong><small>MEDICAL DEVICES · EGYPT</small></span>
          </Link>
          <button type="button" className="mobile-nav-close" onClick={() => setIsMobileMenuOpen(false)} aria-label="إغلاق القائمة"><X size={22} /></button>
        </div>
        <div className="mobile-nav-content">
          <div className="mobile-nav-eyebrow"><ShieldCheck size={15} /> شريكك الموثوق للتجهيزات الطبية</div>
          <nav className="mobile-nav-links" aria-label="التنقل على الهاتف">
            {navLinks.map((link, index) => (
              <Link key={link.href} href={link.href} className="mobile-nav-link" style={{ '--nav-index': index } as React.CSSProperties} onClick={() => setIsMobileMenuOpen(false)}>
                <span className="mobile-nav-number">{String(index + 1).padStart(2, '0')}</span><span>{link.name}</span><ArrowUpLeft size={17} />
              </Link>
            ))}
          </nav>
          <div className="mobile-nav-contact">
            <button type="button" className="mobile-nav-quote" onClick={() => { setIsMobileMenuOpen(false); quoteModal.openModal(); }}><WhatsAppIcon size={20} /><span>اطلب تسعير أو استفسار</span><ArrowUpLeft size={17} /></button>
            <div className="mobile-nav-meta"><span><Headphones size={16} /> دعم فني واستجابة سريعة</span><a href={`tel:${siteConfig.phoneIntl}`} dir="ltr"><Phone size={15} /> {siteConfig.phone}</a></div>
          </div>
        </div>
      </div>
      <QuoteModal isOpen={quoteModal.isOpen} onClose={quoteModal.closeModal} productName={quoteModal.productName} />
    </>
  );
}
