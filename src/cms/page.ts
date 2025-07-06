export async function getPageData(
  identifier: string,
  locale: string
): Promise<any> {
  const response = await fetch(
    `${process.env.NEXT_CMS_API}/pages?filters[identifier][$eq]=${identifier}&locale=${locale}`,
    {
      headers: {
        Authorization: `bearer ${process.env.NEXT_CMS_TOKEN}`,
      },
    }
  );

  const result = await response.json();
  //console.log(JSON.stringify(result, null, 2));
  return {
    ...result?.data?.[0]?.attributes,
    id: result?.data?.[0]?.id,
  };
}

export async function getPageDataByTitle(
    title: string,
    locale: string
): Promise<any> {
  const response = await fetch(
      `${process.env.NEXT_CMS_API}/pages?filters[title][$eq]=${title}&locale=${locale}`,
      {
        headers: {
          Authorization: `bearer ${process.env.NEXT_CMS_TOKEN}`,
        },
      }
  );

  const result = await response.json();
  //console.log(JSON.stringify(result, null, 2));
  return {
    ...result?.data?.[0]?.attributes,
    id: result?.data?.[0]?.id,
  };
}

