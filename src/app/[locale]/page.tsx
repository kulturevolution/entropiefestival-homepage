import initTranslations from '@/app/i18n';
import i18nConfig from '@/i18nConfig';
import TranslationsProvider from '@/components/TranslationProvider';
import { getUpcomingEventData } from '@/cms/event';

const i18nNamespaces = ['common'];
export default async function Home({
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
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <div className='text-center text-2xl'>{t('welcome')}</div>
        <div className='text-center'>
          entropiefestival Homepage
          <div>Locale: {locale}</div>
        </div>
      </main>
    </TranslationsProvider>
  );
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}
