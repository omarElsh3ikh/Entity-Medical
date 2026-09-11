'use client';

import { useEffect } from 'react';
import { ErrorState } from '@/app/components/error-state';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      code="500"
      title="حصل عطل بسيط ومؤقت"
      description="ما تقلقش، بياناتك آمنة. جرّب تحميل الجزء ده مرة تانية، ولو استمرت المشكلة تواصل مع فريق الدعم."
      onRetry={reset}
    />
  );
}
