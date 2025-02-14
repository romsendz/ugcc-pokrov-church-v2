import { z } from "zod";

// Entry Schema
export const entrySchema = z.object({
  id: z.string(),
  title: z.string().nonempty("Вкажіть служіння"),
  day_id: z.number(),
  start_time: z
    .string()
    .nonempty("Вкажіть час")
    .regex(
      /^(?:[01]\d|2[0-3])[:|.-](?:[0-5]\d)$/,
      "Час повинен бути у форматі: ГГ:ХВ (09:00 15.00 19-00)",
    ),
});

// Day Schema
export const daySchema = z.object({
  id: z.number(),
  date: z.date(),
  subtitle: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  is_holiday: z.boolean(),
  entries: z.array(entrySchema),
});

// Schedule Schema
export const scheduleFormSchema = z.object({
  selectedWeek: z.enum(["current", "next"], {
    errorMap: () => ({ message: "Оберіть тиждень, який потрібно оновити" }),
  }),
  schedule: z.array(daySchema),
});

// Type Inference for Form Values
export type ScheduleFormValues = z.infer<typeof scheduleFormSchema>;
