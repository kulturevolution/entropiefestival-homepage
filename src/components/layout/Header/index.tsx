'use client';

import React, { useEffect, useState } from 'react';
import LogoFull from '@/components/gfx/LogoFull';
import Link from 'next/link';
import MenuClose from '@/components/gfx/MenuClose';
import MenuOpen from '@/components/gfx/MenuOpen';
import LogoSmall from '@/components/gfx/LogoSmall';
import { useMainMenuStore } from '@/zustand/mainMenuStore';
import LogoSmallHover from '@/components/gfx/LogoSmallHover';

const Header: React.FC<{ locale: string }> = ({ locale }) => {
  const { menuOpen, setMenu } = useMainMenuStore();

  useEffect(() => {
    setMenu(menuOpen);
    if (menuOpen) {
      document.body.classList.add('overflow-hidden', 'lg:overflow-auto');
    } else {
      document.body.classList.remove('overflow-hidden', 'lg:overflow-auto');
    }
  }, [menuOpen, setMenu]);

  return (
    <div className='absolute left-0 right-0 z-30 mx-5 my-6 flex items-center gap-x-2 lg:fixed lg:mx-16 lg:my-16'>
      <Link href={`/${locale}`} className='group'>
        <LogoFull className='lg:hidden' />
        <LogoSmall className='hidden h-[70px] lg:block group-hover:lg:hidden' />
        <LogoSmallHover className='hidden h-[70px] group-hover:lg:block' />
      </Link>
      <button onClick={() => setMenu(!menuOpen)} className='ml-auto lg:hidden'>
        {menuOpen ? <MenuClose /> : <MenuOpen />}
      </button>
    </div>
  );
};

export default Header;
