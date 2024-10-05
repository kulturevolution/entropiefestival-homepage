import initTranslations from '@/app/i18n';
import i18nConfig from '@/i18nConfig';
import TranslationsProvider from '@/components/TranslationProvider';
import PageContentBox from '@/components/layout/PageContentBox';
import { getPageData } from '@/cms/page';
import StrapiRichtext from '@/components/layout/StrapiRichtext';
import { getFaqData } from '@/cms/faq';
import { getUpcomingEventData } from '@/cms/event';

const i18nNamespaces = ['common'];

export const revalidate = 120;

export default async function Faq({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const faqsData = await getFaqData('de');
  const upcomingEventData = await getUpcomingEventData(locale);
  //console.log(JSON.stringify(faqsData, null, 2));

  return (
    <TranslationsProvider
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      <main>
        <div className='px-8 lg:px-14'>
          {upcomingEventData?.faq_header_mobile ? (
            <div
              className='lg:hidden'
              dangerouslySetInnerHTML={{
                __html: upcomingEventData?.faq_header_mobile,
              }}
            />
          ) : null}
          {upcomingEventData?.faq_header_desktop ? (
            <div
              className='hidden lg:block'
              dangerouslySetInnerHTML={{
                __html: upcomingEventData?.faq_header_desktop,
              }}
            />
          ) : null}
        </div>
        <PageContentBox>
          {faqsData
            ?.filter((f: any) => f.info)
            ?.sort((a: any, b: any) => a.title?.localeCompare(b.title))
            ?.map((faqEntry, fI) => (
              <div key={fI} className='mb-8 mt-4 lg:mb-16'>
                <h2 className='mb-6 text-2xl font-black lg:mb-8 lg:text-4xl'>
                  {faqEntry?.title}
                </h2>
                <StrapiRichtext content={faqEntry?.info} />
              </div>
            ))}
        </PageContentBox>
      </main>
    </TranslationsProvider>
  );
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}
