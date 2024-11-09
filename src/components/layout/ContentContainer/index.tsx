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
        'min-h-dvh relative mr-6 flex flex-col pt-32 transition-all lg:mx-60 xl:mx-80',
        menuOpen
          ? 'translate-x-[calc(-1*(var(--menu-width)+285px))] opacity-40 lg:translate-x-0 lg:opacity-100'
          : 'translate-x-0'
      )}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default ContentContainer;
