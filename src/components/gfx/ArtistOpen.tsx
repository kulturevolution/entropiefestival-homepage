import React from 'react';

const ArtistOpen: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='57'
      height='58'
      viewBox='0 0 57 58'
      className={className}
    >
      <g
        id='Gruppe_33'
        data-name='Gruppe 33'
        transform='translate(-1587.5 -858.5)'
      >
        <line
          id='Linie_4'
          data-name='Linie 4'
          x1='57'
          transform='translate(1587.5 887.5)'
          fill='none'
          stroke='#AD12D1'
          stroke-width='2'
        />
        <line
          id='Linie_5'
          data-name='Linie 5'
          x2='58'
          transform='translate(1616 858.5) rotate(90)'
          fill='none'
          stroke='#AD12D1'
          stroke-width='2'
        />
      </g>
    </svg>
  );
};

export default ArtistOpen;
