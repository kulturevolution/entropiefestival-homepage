'use client';

import React, { useEffect, useState } from 'react';
import LogoFull from '@/components/gfx/LogoFull';
import Link from 'next/link';
import MenuClose from '@/components/gfx/MenuClose';
import MenuOpen from '@/components/gfx/MenuOpen';
import LogoSmall from '@/components/gfx/LogoSmall';
import { useMainMenuStore } from '@/zustand/mainMenuStore';

const Header: React.FC<{ locale: string }> = ({ locale }) => {
  const { setMenu } = useMainMenuStore();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    setMenu(menuOpen);
    if (menuOpen) {
      document.body.classList.add('overflow-hidden', 'lg:overflow-auto');
    } else {
      document.body.classList.remove('overflow-hidden', 'lg:overflow-auto');
    }
  }, [menuOpen, setMenu]);

  return (
    <div className='relative z-30 mx-5 my-6 flex items-center gap-x-2 lg:fixed lg:mx-16 lg:my-16'>
      <Link href={`/${locale}`}>
        <LogoFull className='lg:hidden' />
        <LogoSmall className='hidden lg:block' />
      </Link>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className='ml-auto lg:hidden'
      >
        {menuOpen ? <MenuClose /> : <MenuOpen />}
      </button>
    </div>
  );
};

export default Header;
