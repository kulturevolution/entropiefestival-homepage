'use client';

import React, { useState } from 'react';
import LogoFull from '@/components/gfx/LogoFull';
import Link from 'next/link';
import MenuClose from '@/components/gfx/MenuClose';
import MenuOpen from '@/components/gfx/MenuOpen';
import LogoSmall from '@/components/gfx/LogoSmall';

const Header = ({ locale }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div className='relative mx-5 my-6 flex items-center gap-x-2 lg:mx-16 lg:my-16'>
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
