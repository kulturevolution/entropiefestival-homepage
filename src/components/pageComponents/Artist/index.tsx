'use client';

import React, { useState } from 'react';
import ArtistClose from '@/components/gfx/ArtistClose';
import ArtistOpen from '@/components/gfx/ArtistOpen';
import StrapiRichtext from '@/components/layout/StrapiRichtext';

const Artist: React.FC<{ artist: any }> = ({ artist }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='border-b-2 border-primary'>
      <div
        className='my-5 flex items-center'
        onClick={() => setIsOpen(!isOpen)}
        role='button'
      >
        <div className='flex items-center'>
          <h3 className='me-2 text-2xl font-black lg:text-4xl'>
            {artist.name}
          </h3>
          <div className='gap-2 self-start'>
            {artist.artist_categories?.map((cat: any, cI: number) => (
              <span
                key={cI}
                className='ml-2 rounded-xl border border-primary px-3 py-1 font-bold'
              >
                {cat.title}
              </span>
            ))}
          </div>
        </div>
        <div className='ms-auto'>
          <div className='ms-8 flex h-14 w-14 items-center justify-center'>
            {isOpen ? <ArtistClose /> : <ArtistOpen />}
          </div>
        </div>
      </div>
      {isOpen && (
        <div>
          <StrapiRichtext content={artist.info} />
        </div>
      )}
    </div>
  );
};

export default Artist;
