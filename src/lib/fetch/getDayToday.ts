import { DayTodayResponse } from "@api/day-today/route";
import { fetcher } from "./utils/fetcher";

export async function getDayToday(): Promise<DayTodayResponse> {
  return await fetcher("/api/day-today", {
    cache: "no-store",
  });
}
