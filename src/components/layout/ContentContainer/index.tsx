'use client';

import React from 'react';
import { useMainMenuStore } from '@/zustand/mainMenuStore';
import classNames from 'classnames';

const ContentContainer: React.FC<{ children: any }> = ({ children }) => {
  const { menuOpen, setMenu } = useMainMenuStore();

  const handleClick = () => {
    if (menuOpen) {
      setMenu(false);
    }
  };

  return (
    <div
      className={classNames(
        'relative mr-6 pt-24 transition-all lg:mx-60 lg:pt-32 xl:mx-80',
        menuOpen
          ? '-left-[calc(100%-85px)] opacity-40 blur-sm lg:left-0 lg:opacity-100 lg:blur-none'
          : 'left-0'
      )}
      onClick={handleClick}
    >
      <div>{children}</div>
    </div>
  );
};

export default ContentContainer;
