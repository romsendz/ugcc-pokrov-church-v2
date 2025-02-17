"use client";
import { Input } from "@components/components/ui/input";
import { Schedule } from "@lib/prisma/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/components/ui/form";
import { Checkbox } from "@components/components/ui/checkbox";
import { Button } from "@components/components/ui/button";
import { Loader2Icon, Plus, SaveIcon, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/components/ui/select";
import { useRouter } from "next/navigation";
import { useToast } from "@components/hooks/use-toast";
import { getWeekDay } from "@components/lib/utils";
import { updateSchedule } from "@lib/prisma/actions";
import {
  scheduleFormSchema,
  ScheduleFormValues,
} from "@lib/zod-validation/scheduleFormSchema";
import { ROUTES } from "@lib/routes";

// Function to calculate dates for "current" and "next" week
const getWeekDates = (weekType: "current" | "next") => {
  const now = new Date();
  const dayOfWeek = now.getDay();

  // Adjust to find Monday of the current week
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - ((dayOfWeek + 6) % 7)); // Moves to Monday

  if (weekType === "next") {
    startOfWeek.setDate(startOfWeek.getDate() + 7);
  }

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });
};

// Get week ranges dynamically
const currentWeek = getWeekDates("current");
const nextWeek = getWeekDates("next");

// Format the date range (DD.MM - DD.MM)
const formatRange = (dates: Date[]) =>
  `${dates[0].toLocaleDateString("uk-UA", { day: "2-digit", month: "2-digit" })} - 
   ${dates[6].toLocaleDateString("uk-UA", { day: "2-digit", month: "2-digit" })}`;

const getReadableDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
  };
  const formatted = date.toLocaleDateString("uk-UK", options);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

interface EditScheduleFormProps {
  schedule: Schedule[];
}

const EditScheduleForm = ({ schedule }: EditScheduleFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: { schedule, selectedWeek: undefined },
    mode: "onBlur", // Validate on blur
    reValidateMode: "onChange", // Revalidate on change
  });

  const { formState } = form;

  // Function to add a new entry
  const addDayEntry = (dayIndex: number) => {
    const currentEntries = form.getValues(`schedule.${dayIndex}.entries`);
    // Find the highest `id` in the current entries
    const newEntry = {
      id: crypto.randomUUID(),
      day_id: form.getValues(`schedule.${dayIndex}.id`),
      start_time: "",
      title: "",
    };
    form.setValue(`schedule.${dayIndex}.entries`, [
      ...currentEntries,
      newEntry,
    ]);
  };

  // Function to remove an entry
  const removeDayEntry = (dayIndex: number, entryIndex: number) => {
    const currentEntries = form.getValues(`schedule.${dayIndex}.entries`);

    if (currentEntries.length > 1) {
      const updatedEntries = currentEntries.filter((_, i) => i !== entryIndex);
      form.setValue(`schedule.${dayIndex}.entries`, updatedEntries);
    } else {
      // Ensure there's always at least one empty entry
      form.setValue(`schedule.${dayIndex}.entries`, []);
    }
  };

  const onSubmit = async (data: ScheduleFormValues) => {
    await updateSchedule(data);
    toast({
      variant: "success",
      description: "Розклад успішно оновлено",
    });
    router.push(ROUTES.admin.schedule.index);
  };

  const selectedWeek = form.watch("selectedWeek");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <FormField
          control={form.control}
          name="selectedWeek"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value); // Update selectedWeek value

                    const newDates = getWeekDates(value as "current" | "next");

                    form.setValue(
                      "schedule",
                      form.getValues("schedule").map((day, index) => ({
                        ...day,
                        date: newDates[index],
                      })),
                    );
                  }}
                  defaultValue={field.value}
                  {...field}
                >
                  <SelectTrigger className="w-full rounded-lg border-[3px] border-gray-300 px-4 py-2 text-gray-700">
                    <SelectValue placeholder="Виберіть тиждень, який потрібно оновити та відобразити на сайті" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="current" className="py-2">
                        Поточний ({formatRange(currentWeek)})
                      </SelectItem>
                      <SelectItem value="next" className="py-2">
                        Наступний ({formatRange(nextWeek)})
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div
          className={clsx("space-y-4 filter", {
            "pointer-events-none select-none blur-[5px]": !selectedWeek,
          })}
        >
          {form.watch("schedule").map((day, dayIndex) => {
            const weekday = getWeekDay(day.date);
            const date = new Date(day.date);
            return (
              <section
                key={day.id}
                className="rounded-lg border-[3px] border-gray-200 p-6"
              >
                <span
                  className={clsx("text-sm italic", {
                    "text-red-500": day.is_holiday,
                  })}
                >
                  {getReadableDate(date)}
                </span>
                <div className="flex gap-2">
                  <span
                    className={clsx("mb-2 text-2xl font-semibold", {
                      "text-red-500": day.is_holiday,
                    })}
                  >
                    {`${weekday.name}${day.is_holiday && !!day.subtitle ? "." : ""}`}
                  </span>
                  {day.is_holiday && (
                    <FormField
                      control={form.control}
                      name={`schedule.${dayIndex}.subtitle`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input {...field} className="text-red-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                {/* Holiday Checkbox */}
                <FormField
                  control={form.control}
                  name={`schedule.${dayIndex}.is_holiday`}
                  render={({ field }) => {
                    return (
                      <FormItem className="mt-3 flex items-center">
                        <FormLabel
                          htmlFor={`is_holiday-${day.id}`}
                          className="cursor-pointer select-none"
                        >
                          Важливий день
                        </FormLabel>
                        <FormControl>
                          <Checkbox
                            id={`is_holiday-${day.id}`}
                            checked={field.value}
                            disabled={day.id === 7}
                            onCheckedChange={(checked) => {
                              field.onChange(checked); // Update the checkbox value
                              if (!checked) {
                                // Reset subtitle to an empty string when unchecked
                                form.setValue(
                                  `schedule.${dayIndex}.subtitle`,
                                  "",
                                );
                              }
                            }}
                            className="!mt-0 ml-2 align-middle"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                {/* Entries */}
                <div className="mt-3 space-y-3">
                  {day.entries.map((entry, entryIndex) => {
                    return (
                      <div key={entry.id} className="flex items-center gap-4">
                        <FormField
                          control={form.control}
                          name={`schedule.${dayIndex}.entries.${entryIndex}.start_time`}
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="ГГ:ХВ"
                                    className="w-24"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                        <FormField
                          control={form.control}
                          name={`schedule.${dayIndex}.entries.${entryIndex}.title`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Назва служіння"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          onClick={() => removeDayEntry(dayIndex, entryIndex)}
                          variant="destructive"
                          size={"icon"}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    );
                  })}
                  <Button
                    type="button"
                    onClick={() => addDayEntry(dayIndex)}
                    size="sm"
                  >
                    <Plus className="h-5 w-5" /> Додати подію
                  </Button>
                </div>
              </section>
            );
          })}
        </div>
        <hr className="!my-4 h-1 border-0 bg-gray-200 dark:bg-gray-700" />
        <div className="flex justify-end gap-4">
          <Button
            disabled={formState.isSubmitting || !formState.isValid}
            type="submit"
            variant="main-action"
          >
            {formState.isSubmitting && <Loader2Icon className="animate-spin" />}
            {formState.isSubmitting ? (
              "Збереження"
            ) : (
              <>
                Зберегти
                <SaveIcon />
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditScheduleForm;
