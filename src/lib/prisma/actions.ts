"use server";

import { prisma } from "@lib/prisma/prisma";
import { ROUTES } from "@lib/routes";
import { toSlug } from "@lib/utils/toSlug";
import { NewsFormValues } from "@lib/zod-validation/newsSchema";
import { ScheduleFormValues } from "@lib/zod-validation/scheduleFormSchema";
import { revalidatePath } from "next/cache";

// update schedule
export async function updateSchedule(data: ScheduleFormValues) {
  // check session to ensure security
  try {
    await prisma.$transaction(
      data.schedule.map((day) => {
        return prisma.day.update({
          where: { id: day.id },
          data: {
            subtitle: day.subtitle,
            is_holiday: day.is_holiday,
            date: day.date,
            updated_at: new Date(),
            entries: {
              deleteMany: { day_id: day.id },
              create: day.entries.map((entry) => ({
                title: entry.title,
                start_time: entry.start_time,
              })),
            },
          },
        });
      }),
    );

    // Revalidate the paths to ensure the updated schedule is fetched
    revalidatePath(ROUTES.admin.schedule.index);
    revalidatePath(ROUTES.schedule);

    return { success: true, message: "Schedule updated successfully!" };
  } catch (error) {
    console.error("Database update error:", error);
    return {
      success: false,
      message: "Something went wrong while updating the schedule.",
    };
  }
}

// update news item public visibility
export async function updateNewsVisibility(newsId: number, isVisible: boolean) {
  try {
    await prisma.news.update({
      where: { id: newsId },
      data: { isVisible },
    });

    // Revalidate the news page to reflect changes immediately
    revalidatePath(ROUTES.admin.news.index);
    // revalidatePath(ROUTES.news.index);

    return { success: true, message: "News visibility updated successfully!" };
  } catch (error) {
    console.error("Error updating news visibility:", error);
    return { success: false, message: "Failed to update news visibility." };
  }
}

// Hard delete news item (permanently removes from database)
export async function removeNewsItem(newsId: number) {
  try {
    await prisma.news.delete({
      where: { id: newsId },
    });

    // Revalidate news list to reflect changes
    revalidatePath(ROUTES.admin.news.index);
    // revalidatePath(ROUTES.news.index);
    return { success: true, message: "News item deleted successfully!" };
  } catch (error) {
    console.error("Error deleting news item:", error);
    return { success: false, message: "Failed to delete news item." };
  }
}

// Update an existing news item
export async function updateNewsItem(newsId: number, data: NewsFormValues) {
  try {
    const updatedNews = await prisma.news.update({
      where: { id: newsId },
      data: {
        title: data.title,
        content: data.content,
        author: data.author,
        slug: toSlug(`${newsId}-${data.title}`),
        isVisible: data.visibility,
      },
    });

    // Revalidate the admin news page so the update appears instantly
    revalidatePath(ROUTES.admin.news.index);
    // revalidatePath(ROUTES.news.index);

    return {
      success: true,
      message: "News updated successfully!",
      news: updatedNews,
    };
  } catch (error) {
    console.error("Error updating news item:", error);
    return { success: false, message: "Failed to update news item." };
  }
}

// create new news item
export async function createNewsItem(data: NewsFormValues) {
  try {
    const newNewsItem = await prisma.news.create({
      data: {
        title: data.title,
        content: data.content,
        author: data.author,
        slug: toSlug(data.title),
        isVisible: data.visibility,
      },
    });

    const updatedSlug = toSlug(`${newNewsItem.id}-${newNewsItem.slug}`);

    const itemWithNewSlug = await prisma.news.update({
      where: { id: newNewsItem.id },
      data: { slug: updatedSlug },
    });

    revalidatePath(ROUTES.admin.news.index);
    // revalidatePath(ROUTES.news.index);
    return {
      success: true,
      message: "News created successfully!",
      news: itemWithNewSlug,
    };
  } catch (error) {
    console.error("Error creating news item:", error);
    return { success: false, message: "Failed to create news item." };
  }
}
