import initTranslations from '@/app/i18n';
import i18nConfig from '@/i18nConfig';
import TranslationsProvider from '@/components/TranslationProvider';
import { getUpcomingEventData } from '@/cms/event';
import { formatDateRange, getImageSrc } from '@/cms/utils';
import { Fragment } from 'react';

const i18nNamespaces = ['common'];
export const revalidate = 120;

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const upcomingEventData = await getUpcomingEventData(locale);
  //console.log(JSON.stringify(upcomingEventData, null, 2));

  return (
    <TranslationsProvider
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      <main>
        <div className='-mt-32 ml-6 flex h-dvh flex-col items-center justify-center lg:ml-0'>
          <div className='w-full'>
            {upcomingEventData?.homepage_header_mobile ? (
              <div
                className='lg:hidden'
                dangerouslySetInnerHTML={{
                  __html: upcomingEventData?.homepage_header_mobile,
                }}
              />
            ) : null}
            {upcomingEventData?.homepage_header_desktop ? (
              <div
                className='hidden lg:block'
                dangerouslySetInnerHTML={{
                  __html: upcomingEventData?.homepage_header_desktop,
                }}
              />
            ) : null}
          </div>
        </div>
      </main>
    </TranslationsProvider>
  );
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}
