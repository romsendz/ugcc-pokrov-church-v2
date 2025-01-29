"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAppContext } from "@contexts/AppContext/useAppContext";
import { getStreamStatus } from "@lib/api/getStreamStatus";

export default function DataFetcher() {
  const pathname = usePathname(); // Detects route changes
  const { setStreamStatus } = useAppContext();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getStreamStatus();
        setStreamStatus(data);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]); // Trigger fetch on every route change

  return null; // Invisible component
}
