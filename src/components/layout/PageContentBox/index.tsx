import React from 'react';
import classNames from 'classnames';

const PageContentBox: React.FC<{ children: any; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={classNames(
        'rounded-tr-[28px] bg-white px-8 py-5 text-primary lg:rounded-t-[38px] lg:px-14 lg:py-14',
        className
      )}
    >
      <div>{children}</div>
    </div>
  );
};

export default PageContentBox;
