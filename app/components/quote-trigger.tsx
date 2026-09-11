'use client';

import type { ReactNode } from 'react';
import { QuoteModal, useQuoteModal } from '@/app/components/quote-modal';

interface QuoteTriggerProps {
  children: ReactNode;
  className?: string;
  productName?: string;
  ariaLabel?: string;
}

export function QuoteTrigger({ children, className, productName, ariaLabel }: QuoteTriggerProps) {
  const quoteModal = useQuoteModal();

  return (
    <>
      <button
        type="button"
        className={className}
        aria-label={ariaLabel}
        onClick={() => quoteModal.openModal(productName)}
      >
        {children}
      </button>
      <QuoteModal
        isOpen={quoteModal.isOpen}
        onClose={quoteModal.closeModal}
        productName={quoteModal.productName}
      />
    </>
  );
}
