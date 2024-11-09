import React from 'react';
import Facebook from '@/components/gfx/Facebook';
import Instagram from '@/components/gfx/Instagram';
import Soundcloud from '@/components/gfx/Soundcloud';
import Newsletter from '@/components/gfx/Newsletter';
import Link from 'next/link';

const FooterMenu: React.FC<{ locale: string }> = ({ locale }) => {
  return (
    <div className='fixed bottom-12 right-12 z-20 hidden origin-bottom-left translate-x-full -rotate-90 gap-x-6 lg:flex'>
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
      <a
        href='https://soundcloud.com/entropiefestival'
        target='_blank'
        rel='noopener noreferrer'
      >
        <Soundcloud />
      </a>
      <Link href={`/${locale}/newsletter`}>
        <Newsletter />
      </Link>
    </div>
  );
};

export default FooterMenu;
