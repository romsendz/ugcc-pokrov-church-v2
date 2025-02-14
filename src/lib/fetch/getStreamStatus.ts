import { LiveStreamResponse } from "@api/live-stream/route";
import { fetcher } from "./utils/fetcher";

export async function getStreamStatus(): Promise<LiveStreamResponse> {
  return await fetcher("/api/live-stream", {
    cache: "no-store",
  });
}
