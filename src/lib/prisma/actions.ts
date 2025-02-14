"use server";

import { prisma } from "@lib/prisma/prisma";
import { ScheduleFormValues } from "@lib/zod-validation/scheduleFormSchema";

export async function updateSchedule(data: ScheduleFormValues) {
  // implement validation with zod later
  // const { name, email, password } = scheduleSchema.parse(data);
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

    return { success: true, message: "Schedule updated successfully!" };
  } catch (error) {
    console.error("Database update error:", error);
    return {
      success: false,
      message: "Something went wrong while updating the schedule.",
    };
  }
}
