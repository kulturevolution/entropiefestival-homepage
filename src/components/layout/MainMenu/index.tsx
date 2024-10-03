'use client';

import Link from 'next/link';
import LanguageChanger from '@/components/layout/MainMenu/LanguageChanger';
import Facebook from '@/components/gfx/Facebook';
import Instagram from '@/components/gfx/Instagram';
import { useTranslation } from 'react-i18next';
import { useMainMenuStore } from '@/zustand/mainMenuStore';
import classNames from 'classnames';
import React from 'react';
import Podcast from '@/components/gfx/Podcast';
import MenuItem from '@/components/layout/MainMenu/MenuItem';

const MainMenu: React.FC<{ locale: string; showProgram?: boolean }> = ({
  locale,
  showProgram,
}) => {
  const { menuOpen } = useMainMenuStore();
  const { t } = useTranslation(['common']);

  return (
    <div
      className={classNames(
        'fixed left-[120px] top-0 z-20 flex h-dvh flex-col pb-5 pt-32 transition-all lg:!left-[58px] lg:pb-10 lg:pt-48',
        menuOpen ? 'left-[120px]' : 'left-full'
      )}
    >
      <div className='mb-6 flex flex-col gap-y-6'>
        {(showProgram
          ? ['info', 'tickets', 'program' /*, 'faq', 'archive'*/]
          : ['info', 'tickets' /*, 'faq', 'archive'*/]
        ).map((slug, sI) => (
          <MenuItem
            href={`/${locale}/${slug}`}
            title={t(`mainMenu.${slug}`)}
            key={sI}
          />
        ))}
      </div>
      <div className='mt-auto'>
        <LanguageChanger />
      </div>
      <div className='mt-4 flex flex-col gap-y-4'>
        {['contact', 'imprint', 'terms', 'privacy'].map((slug, sI) => (
          <MenuItem
            href={`/${locale}/${slug}`}
            title={t(`mainMenu.${slug}`)}
            key={sI}
            level='secondary'
          />
        ))}
      </div>
      <div className='mt-8 lg:hidden'>
        <a
          href='https://soundcloud.com/entropiefestival/sets/entropiecast'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Podcast />
        </a>
      </div>
      <div className='mt-3 flex gap-x-6 lg:hidden'>
        <a
          href='https://facebook.com/entropiefestival'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Facebook />
        </a>
        <a
          href='https://www.instagram.com/entropiefestival/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Instagram />
        </a>
      </div>
    </div>
  );
};

export default MainMenu;
