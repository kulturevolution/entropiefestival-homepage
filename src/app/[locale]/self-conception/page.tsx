import initTranslations from '@/app/i18n';
import i18nConfig from '@/i18nConfig';
import TranslationsProvider from '@/components/TranslationProvider';
import PageContentBox from '@/components/layout/PageContentBox';
import { getPageDataByTitle } from '@/cms/page';
import StrapiRichtext from '@/components/layout/StrapiRichtext';

const i18nNamespaces = ['common'];

export const revalidate = 120;

export default async function Selfconcept({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { resources } = await initTranslations(locale, i18nNamespaces);
  const pageData = await getPageDataByTitle('Selbstverständnis', locale);

  return (
    <TranslationsProvider
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      <main className='flex flex-1 flex-col'>
        {pageData?.page_header_mobile && pageData?.page_header_desktop ? (
          <div className='px-8 lg:px-14'>
            {pageData?.page_header_mobile ? (
              <div
                className='lg:hidden'
                dangerouslySetInnerHTML={{
                  __html: pageData?.page_header_mobile,
                }}
              />
            ) : null}
            {pageData?.page_header_desktop ? (
              <div
                className='hidden lg:block'
                dangerouslySetInnerHTML={{
                  __html: pageData?.page_header_desktop,
                }}
              />
            ) : null}
          </div>
        ) : null}
        <PageContentBox>
          {!pageData?.page_header_mobile && !pageData?.page_header_desktop ? (
            <h2 className='mb-6 text-2xl font-black lg:mb-8 lg:text-4xl'>
              {pageData?.title}
            </h2>
          ) : null}
          {pageData.content ? (
            <StrapiRichtext content={pageData?.content} />
          ) : null}
        </PageContentBox>
      </main>
    </TranslationsProvider>
  );
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}
