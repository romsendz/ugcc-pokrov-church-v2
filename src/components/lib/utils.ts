import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// // //
// schedule, date helpers
//

export function getWeekDay(dateString: Date) {
  const date = new Date(dateString);
  const today = new Date(); // REMOVE!!!! TAKE TODAY BY DEFAULT

  // Reset today's time to midnight for accurate comparison
  today.setHours(0, 0, 0, 0);

  // Reset the input date's time to midnight
  date.setHours(0, 0, 0, 0);

  const weekday = date.toLocaleDateString("uk-UK", { weekday: "long" });
  const formattedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
  return {
    name: formattedWeekday,
    in_past: date < today, // Returns true if the date is in the past
  };
}

export function getPeriod(firstDate: Date, lastDate: Date): string {
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
    };
    const formatted = date.toLocaleDateString("uk-UK", options);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1); // Capitalize the first letter
  };

  // Convert input to Date objects inside the function
  const startDate = new Date(firstDate);
  const endDate = new Date(lastDate);

  // Convert input to Date objects inside the function
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  const year = endDate.getFullYear();

  return `${start} - ${end} ${year} р.Б.`;
}
