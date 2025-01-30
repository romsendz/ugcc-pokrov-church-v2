export function getApiUrl(path: string) {
  const isDev = process.env.NODE_ENV === "development";
  const baseUrl = isDev
    ? "http://localhost:3000" // Localhost for development
    : process.env.NEXT_PUBLIC_API_URL; // Production URL from environment variables

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not set in the environment.");
  }

  return `${baseUrl}${path}`;
}
