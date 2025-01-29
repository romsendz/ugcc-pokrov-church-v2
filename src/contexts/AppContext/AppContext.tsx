import { LiveStreamResponse } from "@api/live-stream/route";
import { createContext } from "react";

export interface AppContextProps {
  // is mobile side menu is open
  isMenuOpen: boolean;
  setIsMenuOpen: (state: boolean) => void;

  // live-stream status data (prefetching on page load + refetch on pathname change)
  streamStatus: LiveStreamResponse;
  setStreamStatus: (data: LiveStreamResponse) => void;
}

// Default values for the context
export const AppContext = createContext<AppContextProps>({
  // Default values for mobile menu status
  isMenuOpen: false,
  setIsMenuOpen: () => {},
  // Default values for streamStatus
  streamStatus: { isOnline: false, videoId: null, aboveLimit: false }, // Default values,
  setStreamStatus: () => {},
});
