export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export default async function createRequest<RES, BODY = null>(
  route: string,
  body: BODY,
  auth_token?: string,
  api_url?: string,
  custom_headers?: Record<string, string>,
  queryParams?: Record<string, string | number | boolean>,
  resInText?: boolean
): Promise<RES> {
  let url = `${api_url}${route}`;
  let token;

  if (queryParams) {
    const queryString = Object.entries(queryParams)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
    url += `?${queryString}`;
  }

  const res = await fetch(url, {
    method: "POST",
    body: body && JSON.stringify(body),
    headers: {
      "content-type": "application/json",
      "API-KEY": auth_token!,
      ...custom_headers,
    },
    cache: "no-cache",
  });

  if (res.status === 204) {
    return {} as RES;
  }

  if (!res.ok) {
    if (resInText) {
      throw new Error(await res.text());
    }
    console.log(res.json());
    
    throw new Error(await res.json());
  }
  let data: RES;

  data = await res.json();

  return data;
}
