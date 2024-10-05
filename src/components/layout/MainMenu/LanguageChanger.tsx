'use client';

import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/i18nConfig';
import Link from 'next/link';
import React from 'react';
import { useMainMenuStore } from '@/zustand/mainMenuStore';

const LanguageChanger: React.FC<{ localeOverridePaths?: any }> = ({
  localeOverridePaths,
}) => {
  const { setMenu } = useMainMenuStore();
  const { t, i18n } = useTranslation(['common']);
  const currentLocale = i18n.language;
  const currentPathname = usePathname();

  const getCurrentPathForLocale = (newLocale: string) => {
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      if (localeOverridePaths && localeOverridePaths[newLocale]) {
        return '/' + newLocale + localeOverridePaths[newLocale];
      } else {
        return '/' + newLocale + currentPathname;
      }
    } else {
      if (localeOverridePaths && localeOverridePaths[newLocale]) {
        return '/' + newLocale + localeOverridePaths[newLocale];
      } else {
        return currentPathname.replace(`/${currentLocale}`, `/${newLocale}`);
      }
    }
  };

  return (
    <div className='flex gap-2'>
      {['en', 'de']
        ?.filter((l: string) => l !== currentLocale)
        ?.map((locale, lI) => (
          <Link
            href={getCurrentPathForLocale(locale)}
            key={lI}
            locale={locale}
            className='text-[21px]/[30px] font-medium tracking-[0.071em] text-white'
            onClick={() => setMenu(false)}
          >
            {t(`mainMenu.language.${locale}`)}
          </Link>
        ))}
    </div>
  );
};

export default LanguageChanger;
