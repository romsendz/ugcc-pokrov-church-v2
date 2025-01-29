export function getApiUrl(path: string) {
  const baseUrl = process.env.PUBLIC_API_URL || "http://localhost:3000";
  return `${baseUrl}${path}`;
}
