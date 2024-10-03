'use client';

import React from 'react';
import Script from 'next/script';
import { getDomain } from '@/cms/utils';

const PretixWidget: React.FC<{ url: string }> = ({ url }) => {
  return (
    <div>
      <Script
        src={`${getDomain(url)}widget/v1.de-informal.js?d=${new Date().getTime()}`}
        strategy='afterInteractive'
      />
      <link rel='stylesheet' type='text/css' href={`${url}widget/v1.css`} />
      <pretix-widget event={url} skip-ssl-check></pretix-widget>
      <noscript>
        <div className='pretix-widget'>
          <div className='pretix-widget-info-message'>
            JavaScript ist in Ihrem Browser deaktiviert. Um unseren Ticket-Shop
            ohne JavaScript aufzurufen, klicken Sie bitte{' '}
            <a target='_blank' rel='noopener' href={url}>
              hier
            </a>
            .
          </div>
        </div>
      </noscript>
    </div>
  );
};

export default PretixWidget;
