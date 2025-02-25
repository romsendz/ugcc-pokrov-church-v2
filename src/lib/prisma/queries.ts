// Shared Queries: Keep queries in here.

import { prisma } from "@lib/prisma/prisma";
import { Day, DayEntry, News } from "@prisma/client";

// GET schedule
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

// GET news list
export async function getNews(): Promise<News[]> {
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return news;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

// GET news item
export async function getNewsItem(id: number): Promise<News | null> {
  try {
    const newsItem = await prisma.news.findUnique({
      where: { id: id },
    });

    if (!newsItem) {
      console.error(`News item with ID ${id} not found.`);
      return null;
    }

    return newsItem;
  } catch (error) {
    console.error("Error fetching news item:", error);
    return null;
  }
}
