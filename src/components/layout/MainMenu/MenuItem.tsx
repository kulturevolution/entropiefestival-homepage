import React, { MouseEventHandler } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

const MenuItem: React.FC<{
  href: string;
  title: string;
  level?: string;
  onClick?: MouseEventHandler;
}> = ({ href, title, level = 'primary', onClick }) => {
  return (
    <div className='group inline-flex'>
      <div className='relative'>
        <Link
          href={href}
          className={classNames({
            'text-[25px]/[36px] font-light tracking-[0.071em] text-white':
              level === 'primary',
            'text-[12px]/[18px] font-medium tracking-[0.008em] text-white':
              level === 'secondary',
          })}
          onClick={onClick ?? undefined}
        >
          {title}
        </Link>
        <div className='absolute -bottom-1 h-[2px] w-0 bg-white transition-all duration-[250ms] ease-out group-hover:w-full' />
      </div>
    </div>
  );
};

export default MenuItem;
