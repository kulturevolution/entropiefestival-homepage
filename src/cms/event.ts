export async function getUpcomingEventId(locale: string) : Promise<number>{
  const response = await fetch(`${process.env.NEXT_CMS_API}/homepage-settings?populate=upcoming_event&locale=${locale}`, {
    headers: {
      Authorization: `bearer ${process.env.NEXT_CMS_TOKEN}`,
    }
  });

  const result = await response.json();
  return result?.data?.attributes?.upcoming_event?.data?.id;
}

export async function getEventData(id: number, locale :string) : Promise<object> {
  const response = await fetch(`${process.env.NEXT_CMS_API}/events/${id}?populate=event_location,event_type,image,info,background_landscape,background_portrait&locale=${locale}`, {
    headers: {
      Authorization: `bearer ${process.env.NEXT_CMS_TOKEN}`,
    }
  });

  const result = await response.json();
  console.log(JSON.stringify(result, null, 2));
}

export async function getUpcomingEventData(locale: string) : Promise<object> {
  const upcomingEventId = await getUpcomingEventId(locale);
  if (upcomingEventId) {
    return await getEventData(upcomingEventId, locale);
  }
}