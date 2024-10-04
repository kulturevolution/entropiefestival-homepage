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
      }}
    />
  );
};

export default StrapiRichtext;
