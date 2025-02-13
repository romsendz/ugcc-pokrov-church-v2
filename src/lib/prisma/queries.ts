// Shared Queries: Keep queries in here.

import { prisma } from "@lib/prisma/prisma";
import { Day, DayEntry } from "@prisma/client";

export type Schedule = Day & {
  entries: DayEntry[];
};

export async function getSchedule(): Promise<Schedule[]> {
  try {
    const days = await prisma.day.findMany({
      include: {
        entries: {
          orderBy: {
            start_time: "asc",
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    });
    return days;
  } catch (error) {
    console.error("Error fetching schedule:", error);
    return [];
  }
}
