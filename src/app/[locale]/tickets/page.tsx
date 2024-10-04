import initTranslations from '@/app/i18n';
import i18nConfig from '@/i18nConfig';
import TranslationsProvider from '@/components/TranslationProvider';
import { getUpcomingEventData } from '@/cms/event';
import type { Metadata } from 'next';
import PageContentBox from '@/components/layout/PageContentBox';
import PretixWidget from '@/components/layout/Ticketing/PretixWidget';

const i18nNamespaces = ['common'];

export const revalidate = 120;

export default async function Tickets({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const upcomingEventData = await getUpcomingEventData(locale);
  console.log(JSON.stringify(upcomingEventData, null, 2));

  return (
    <TranslationsProvider
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      <main>
        <h2 className='-mb-4 ml-8 text-[80px]/[80px] font-black text-white lg:-mb-16 lg:ml-16 lg:text-[280px]/[280px]'>
          TIX
        </h2>
        <PageContentBox>
          {upcomingEventData?.ticket_shop_url ? (
            <PretixWidget url={upcomingEventData?.ticket_shop_url} />
          ) : null}
        </PageContentBox>
      </main>
    </TranslationsProvider>
  );
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}
