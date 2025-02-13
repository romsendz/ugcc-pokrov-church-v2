import { getDayToday } from "@lib/fetch/getDayToday";
import { ExternalLinkIcon } from "lucide-react";

const DayToday = async () => {
  const dayData = await getDayToday();
  return (
    <div
      className="font-pt-sans-narrow mx-4 my-4 grid grid-rows-[min-content_1fr] rounded-lg px-1 shadow-lg sm:mx-[20%] sm:my-8 lg:absolute lg:bottom-0 lg:right-0 lg:z-[1] lg:m-2 lg:h-60 lg:w-2/5 lg:brightness-[0.9] lg:filter xl:bottom-14 xl:left-0 xl:h-80 xl:w-3/12 [&_i]:text-red-600"
      style={{ backgroundColor: dayData.bg_body }}
    >
      <div className="py-1 text-center text-base">
        <a
          className="inline-flex items-center gap-2"
          href="https://prayer-service.pp.ua/gregorian/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Календар УГКЦ
          <ExternalLinkIcon size={16} />
        </a>
      </div>
      <div className="mb-2 grid grid-cols-[1fr_5fr] gap-4 rounded-lg bg-slate-300 p-2">
        <div className="grid grid-rows-[min-content_min-content]">
          <div
            className="flex flex-col items-center font-bold uppercase"
            style={{ color: dayData.date_font_color }}
          >
            <span className="text-2xl lg:text-lg xl:text-2xl">
              {dayData.day}
            </span>
            <span className="my-4 text-6xl font-extrabold lg:my-0 lg:text-6xl xl:my-4 xl:text-7xl">
              {dayData.date.slice(6, 8)}
            </span>
            <span className="text-xl lg:text-base xl:text-2xl">
              {dayData.month}
            </span>
            <span className="text-xl lg:text-base xl:text-xl">
              {dayData.date.slice(0, 4)}
            </span>
          </div>
          <div
            className="h-24 w-24 self-center justify-self-center lg:h-10 lg:w-10 xl:h-14 xl:w-14"
            dangerouslySetInnerHTML={{ __html: dayData.fasting_icon }}
          />
        </div>
        <div className="overflow-y-auto lg:max-h-44 xl:max-h-64">
          <ul className="text-gray-800">
            {dayData.titles.map(
              (title: { icon: string | null; text: string }, index: number) => (
                <li
                  className="text-xl lg:text-2xl [&_span:not(.title-wrapper)]:text-red-600 [&_strong]:text-red-600"
                  key={`${index}-${title.text}`}
                >
                  {title.icon && (
                    <span
                      className="mr-1 inline-block h-8 w-8 align-middle"
                      dangerouslySetInnerHTML={{ __html: title.icon }}
                    />
                  )}
                  <span
                    className="title-wrapper"
                    dangerouslySetInnerHTML={{ __html: title.text }}
                  />
                </li>
              ),
            )}
          </ul>
          <hr className="!my-2 h-px border-0 bg-gray-200 dark:bg-gray-700" />
          <div
            className="text-base lg:text-lg"
            dangerouslySetInnerHTML={{ __html: dayData.notes }}
          />
        </div>
      </div>
    </div>
  );
};

export default DayToday;
