import { getUpcomingEventId } from '@/cms/event';

export async function getArtistsData(locale: string): Promise<any> {
  const upcomingEventId = await getUpcomingEventId(locale);
  if (upcomingEventId) {
    const response = await fetch(
      `${process.env.NEXT_CMS_API}/artists?filters[events][id][$eq]=${upcomingEventId}&pagination[limit]=100&locale=${locale}&populate=artist_categories`,
      {
        headers: {
          Authorization: `bearer ${process.env.NEXT_CMS_TOKEN}`,
        },
      }
    );

    const result = await response.json();
    //console.log(JSON.stringify(result, null, 2));
    return result?.data?.map((artist: any) => ({
      ...artist?.attributes,
      id: artist?.id,
      artist_categories: artist?.attributes?.artist_categories?.data?.map(
        (cat: any) => ({
          title: cat.attributes?.title,
          id: cat.id,
        })
      ),
    }));
  }
}
