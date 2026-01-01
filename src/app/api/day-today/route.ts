import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import { parseCalendarData } from "./parseCalendar";

export type DayTodayResponse = {
  date: string; // e.g., "20250318"
  day: string; // e.g., "пн", "вт"
  month: string; // e.g., "Березень"
  titles: { icon: string | null; text: string }[]; // Array of title objects
  fasting_icon: string | ""; // Fasting SVG or ''
  date_font_color: string; // Font color for the date
  notes: string; // HTML content for notes
  bg_body: string; // Background color
};

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      "calendar26n_raw.txt",
    );
    const rawData = await fs.readFile(filePath, "utf-8");

    const selectedDayData = parseCalendarData(rawData);

    if (selectedDayData) {
      return NextResponse.json(selectedDayData);
    } else {
      return NextResponse.json(
        { error: "No data found for today." },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("Error reading calendar data:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
