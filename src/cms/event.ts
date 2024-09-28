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
  return {
    ...result.data.attributes,
    id: result.data.id,
    background_landscape: result.data.attributes?.background_landscape?.data?.attributes?.url,
    background_portrait: result.data.attributes?.background_portrait?.data?.attributes?.url,
  }
}

export async function getUpcomingEventData(locale: string) : Promise<object> {
  const upcomingEventId = await getUpcomingEventId(locale);
  if (upcomingEventId) {
    return await getEventData(upcomingEventId, locale);
  }
}