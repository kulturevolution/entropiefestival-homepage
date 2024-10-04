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
        <div className='-mt-32 flex h-dvh flex-col items-center justify-center pl-6 lg:pl-0'>
          <img
            src={getImageSrc(upcomingEventData?.image)}
            alt={upcomingEventData?.title}
            className='max-h-[250px] max-w-[60%] object-contain'
          />
          <div className='text-center font-light tracking-[0.05em] md:text-[24px]/[23px] lg:text-[42px]/[41px]'>
            {formatDateRange(
              new Date(upcomingEventData?.date_from),
              new Date(upcomingEventData?.date_to)
            )}
            {' @'}
            <Fragment>&nbsp;</Fragment>
            {upcomingEventData?.event_location}
          </div>
        </div>
      </main>
    </TranslationsProvider>
  );
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}
