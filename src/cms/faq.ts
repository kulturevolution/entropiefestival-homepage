import { getUpcomingEventId } from '@/cms/event';

export async function getFaqData(locale: string): Promise<any> {
  const upcomingEventId = await getUpcomingEventId(locale);
  if (upcomingEventId) {
    const response = await fetch(
      //filters[events][id][$contains]=${upcomingEventId}&
      `${process.env.NEXT_CMS_API}/faqs?pagination[limit]=100&locale=${locale}`,
      {
        headers: {
          Authorization: `bearer ${process.env.NEXT_CMS_TOKEN}`,
        },
      }
    );

    const result = await response.json();
    //console.log(JSON.stringify(result, null, 2));
    return result?.data?.map((faq: any) => ({
      ...faq?.attributes,
      id: faq?.id,
    }));
  }
}
