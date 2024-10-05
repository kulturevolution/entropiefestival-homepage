'use client';

import { BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer';
import React from 'react';

const StrapiRichtext: React.FC<{ content: BlocksContent }> = ({ content }) => {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        paragraph: ({ children }) => (
          <p className='mb-2 whitespace-pre-wrap lg:mb-4'>{children}</p>
        ),
        link: ({ children, url }) => (
          <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className='font-[600] underline'
          >
            {children}
          </a>
        ),
        heading: ({ children, level }) => {
          switch (level) {
            case 1:
              return (
                <h1 className='md-4 text-[50px] font-black lg:mb-6 lg:text-[64px]'>
                  {children}
                </h1>
              );
            case 2:
              return (
                <h2 className='mb-4 text-[44px] font-black'>{children}</h2>
              );
            case 3:
              return (
                <h3 className='mb-2 text-[28px] font-black'>{children}</h3>
              );
            default:
              return (
                <h4 className='mb-1.5 text-[22px] font-black'>{children}</h4>
              );
          }
        },
        list: ({ children, format }) => {
          if (format === 'unordered') {
            return <ul className='mb-5 ml-5 list-disc'>{children}</ul>;
          } else {
            return <ol className='mb-5 ml-5 list-decimal'>{children}</ol>;
          }
        },
      }}
    />
  );
};

export default StrapiRichtext;
