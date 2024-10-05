import '../globals.css';
import React from 'react';
import { getUpcomingEventData } from '@/cms/event';
import Image from 'next/image';
import { getImageSrc } from '@/cms/utils';
import Header from '@/components/layout/Header';
import MainMenu from '@/components/layout/MainMenu';
import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/TranslationProvider';
import FooterMenu from '@/components/layout/FooterMenu';
import ContentContainer from '@/components/layout/ContentContainer';
import type { Metadata } from 'next';

const i18nNamespaces = ['common'];

export const revalidate = 120;

export const metadata: Metadata = {
  title: 'entropiefestival 2025 - 22.-24.08.2025',
  description:
    'Die entropie ist dem Wunsch entsprungen, einen Raum für alternative Kunst, Feierei und kreatives Leben fernab von kapitalistischer Verwertungslogik zu schaffen.',
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const upcomingEventData = await getUpcomingEventData(locale);
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      <html lang='en'>
        <body>
          <Image
            src={getImageSrc(upcomingEventData?.background_portrait)}
            alt=''
            fill={true}
            className='!fixed object-cover lg:hidden'
          />
          <Image
            src={getImageSrc(upcomingEventData?.background_landscape)}
            alt=''
            fill={true}
            className='hidden object-cover lg:!fixed lg:block'
          />
          <Header locale={locale} />
          <MainMenu locale={locale} />
          <FooterMenu locale={locale} />
          <ContentContainer>{children}</ContentContainer>
        </body>
      </html>
    </TranslationsProvider>
  );
}
