import React from 'react';
import Facebook from '@/components/gfx/Facebook';
import Instagram from '@/components/gfx/Instagram';
import Podcast from '@/components/gfx/Podcast';

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
        href='https://soundcloud.com/entropiefestival/sets/entropiecast'
        target='_blank'
        rel='noopener noreferrer'
      >
        <Podcast />
      </a>
    </div>
  );
};

export default FooterMenu;
