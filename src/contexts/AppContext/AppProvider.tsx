"use client";
import React, { useState, ReactNode } from "react";
import { AppContext } from "./AppContext";
import { LiveStreamResponse } from "@api/live-stream/route";

interface AppProviderProps {
  children: ReactNode;
  initialStreamStatus: LiveStreamResponse;
}

export const AppProvider: React.FC<AppProviderProps> = ({
  children,
  initialStreamStatus,
}) => {
  // State for YT API data
  const [streamStatus, setStreamStatus] =
    useState<LiveStreamResponse>(initialStreamStatus); // Initialize with server-side data on init

  return (
    <AppContext.Provider
      value={{
        streamStatus,
        setStreamStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
