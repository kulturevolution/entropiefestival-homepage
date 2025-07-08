import initTranslations from '@/app/i18n';
import { getUpcomingEventData } from '@/cms/event';
import i18nConfig from '@/i18nConfig';
import PageContentBox from '@/components/layout/PageContentBox';
import TranslationsProvider from '@/components/TranslationProvider';
import { getArtistsData } from '@/cms/artists';
import Artist from '@/components/pageComponents/Artist';

const i18nNamespaces = ['common'];

export const revalidate = 120;

export default async function Program({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const artistsData = await getArtistsData(locale);
  const upcomingEventData = await getUpcomingEventData(locale);

  return (
    <TranslationsProvider
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      <main className='flex flex-1 flex-col'>
        <div className='px-8 lg:px-14'>
          {upcomingEventData?.program_header_mobile ? (
            <div
              className='lg:hidden'
              dangerouslySetInnerHTML={{
                __html: upcomingEventData?.program_header_mobile,
              }}
            />
          ) : null}
          {upcomingEventData?.program_header_desktop ? (
            <div
              className='hidden lg:block'
              dangerouslySetInnerHTML={{
                __html: upcomingEventData?.program_header_desktop,
              }}
            />
          ) : null}
        </div>
        <PageContentBox>
          {artistsData
            ?.sort((a: any, b: any) =>
              a.name?.toLowerCase()?.localeCompare(b.name?.toLowerCase())
            )
            ?.map((artist: any, aI: number) => (
              <Artist artist={artist} key={aI} />
            ))}
        </PageContentBox>
      </main>
    </TranslationsProvider>
  );
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}
