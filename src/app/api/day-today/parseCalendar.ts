import { DEFAULT_BG_BODY, DEFAULT_DATE_FONT_COLOR } from "./constants";
import { fastingIconMappings, svgTitleMappings } from "./mappings";
import { DayTodayResponse } from "./route";

export function parseCalendarData(rawData: string): DayTodayResponse | null {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const today = `${year}${month}${day}`;

  const lines = rawData.split("\n");
  let selectedDayData = null;

  lines.forEach((line) => {
    if (line.startsWith(today)) {
      const words = line.split("|");

      // Titles transformation
      const titles = words[7].split("<br>").map((title) => {
        const matchedSymbol = title.match(/[#*+@&]/)?.[0];
        const icon = matchedSymbol
          ? svgTitleMappings[matchedSymbol] || null
          : null;
        const text = title.replace(/[#*+@&]/g, "").trim();
        return { icon, text };
      });

      // Default values
      let dateFontColor = DEFAULT_DATE_FONT_COLOR;
      let bgBody = DEFAULT_BG_BODY;

      // Reassign values based on conditions
      if (words[3] === "1") {
        dateFontColor = "red";
        bgBody = "#f0978f";
      } else if (words[3] === "3") {
        dateFontColor = "red";
        bgBody = "#80bfff";
      }

      const fastingIcon = fastingIconMappings[words[5]] || "";

      selectedDayData = {
        date: today,
        day: ["пн", "вт", "ср", "чт", "пт", "сб", "нд"][
          parseInt(words[2], 10) - 1
        ],
        month: [
          "Січень",
          "Лютий",
          "Березень",
          "Квітень",
          "Травень",
          "Червень",
          "Липень",
          "Серпень",
          "Вересень",
          "Жовтень",
          "Листопад",
          "Грудень",
        ][currentDate.getMonth()],
        titles,
        fasting_icon: fastingIcon,
        date_font_color: dateFontColor,
        notes: words[8]?.replace("*", "") || "",
        bg_body: bgBody,
      };
    }
  });

  return selectedDayData;
}
