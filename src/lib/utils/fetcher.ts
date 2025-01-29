import { getApiUrl } from "@lib/utils/getApiUrl";

export async function fetcher(url: string, options?: RequestInit) {
  const apiUrl = getApiUrl(url);
  const res = await fetch(apiUrl, options);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
