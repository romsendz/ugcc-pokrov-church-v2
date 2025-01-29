import { LiveStreamResponse } from "@api/live-stream/route";
import { createContext } from "react";

export interface AppContextProps {
  // live-stream status data (prefetching on page load + refetch on pathname change)
  streamStatus: LiveStreamResponse;
  setStreamStatus: (data: LiveStreamResponse) => void;
}

// Default values for the context
export const AppContext = createContext<AppContextProps>({
  // Default values for streamStatus
  streamStatus: { isOnline: false, videoId: null, aboveLimit: false }, // Default values,
  setStreamStatus: () => {},
});
