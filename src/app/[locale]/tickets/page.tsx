import initTranslations from '@/app/i18n';
import i18nConfig from '@/i18nConfig';
import TranslationsProvider from '@/components/TranslationProvider';
import { getUpcomingEventData } from '@/cms/event';
import PageContentBox from '@/components/layout/PageContentBox';
import PretixWidget from '@/components/layout/Ticketing/PretixWidget';
import StrapiRichtext from '@/components/layout/StrapiRichtext';

const i18nNamespaces = ['common'];

export const revalidate = 120;

export default async function Tickets({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const upcomingEventData = await getUpcomingEventData(locale);

  return (
    <TranslationsProvider
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      <main className='flex flex-1 flex-col'>
        <div className='px-8 lg:px-14'>
          {upcomingEventData?.ticket_header_mobile ? (
            <div
              className='lg:hidden'
              dangerouslySetInnerHTML={{
                __html: upcomingEventData?.ticket_header_mobile,
              }}
            />
          ) : null}
          {upcomingEventData?.ticket_header_desktop ? (
            <div
              className='hidden lg:block'
              dangerouslySetInnerHTML={{
                __html: upcomingEventData?.ticket_header_desktop,
              }}
            />
          ) : null}
        </div>
        <PageContentBox>
          {upcomingEventData?.ticket_text_before ? (
            <div className='mb-12'>
              <StrapiRichtext content={upcomingEventData?.ticket_text_before} />
            </div>
          ) : null}
          {upcomingEventData?.ticket_shop_url ? (
            <PretixWidget url={upcomingEventData?.ticket_shop_url} />
          ) : null}
          {upcomingEventData?.ticket_text_after ? (
            <div className='mt-12'>
              <StrapiRichtext content={upcomingEventData?.ticket_text_after} />
            </div>
          ) : null}
        </PageContentBox>
      </main>
    </TranslationsProvider>
  );
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}
