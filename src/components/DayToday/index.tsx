import { getDayToday } from "@lib/api/getDayToday";
import Image from "next/image";

const DayToday = async () => {
  const dayData = await getDayToday();
  return (
    <div
      className="font-pt-sans-narrow mx-10 my-4 grid grid-rows-[min-content_1fr] rounded-lg px-1 shadow-lg lg:absolute lg:bottom-0 lg:right-0 lg:z-[1] lg:m-2 lg:max-w-sm xl:bottom-14 xl:left-0 [&_i]:text-red-600"
      style={{ backgroundColor: dayData.bg_body }}
    >
      <div className="py-1 text-center">
        <a
          className="inline-flex gap-2 align-baseline"
          href="https://prayer-service.pp.ua/gregorian/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Календар УГКЦ
          <Image
            src={"/svgs/external-link.svg"}
            alt="Зовнішнє посилання"
            width={10}
            height={10}
          />
        </a>
      </div>
      <div className="mb-2 grid grid-cols-[1fr_3fr] gap-5 rounded-lg bg-slate-300 p-2">
        <div className="grid grid-rows-[3fr_1fr]">
          <div
            className="flex flex-col items-center text-2xl font-bold uppercase"
            style={{ color: dayData.date_font_color }}
          >
            <span>{dayData.day}</span>
            <span className="my-4 text-7xl font-extrabold">
              {dayData.date.slice(6, 8)}
            </span>
            <span>{dayData.month}</span>
            <span>{dayData.date.slice(0, 4)}</span>
          </div>
          <div
            className="h-[80px] w-[92px]"
            dangerouslySetInnerHTML={{ __html: dayData.fasting_icon }}
          />
        </div>
        <div>
          <ul className="text-gray-800">
            {dayData.titles.map(
              (title: { icon: string | null; text: string }, index: number) => (
                <li
                  className="text-xl [&_span:not(.title-wrapper)]:text-red-600 [&_strong]:text-red-600"
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
          <hr className="my-2 h-px border-0 bg-gray-200 dark:bg-gray-700" />
          <div
            className="max-h-48 overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: dayData.notes }}
          />
        </div>
      </div>
    </div>
  );
};

export default DayToday;
