'use client';

import i18nConfig from '@/i18nConfig';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectNoLanguage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/' + i18nConfig.defaultLocale);
  }, [router]);
  return null;
}
