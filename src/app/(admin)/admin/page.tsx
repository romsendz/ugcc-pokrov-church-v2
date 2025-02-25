import { ROUTES } from "@lib/routes";
import { CalendarCheckIcon, NewspaperIcon } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="m-10 grid p-6">
      <ul className="grid grid-cols-5 gap-10">
        <li className="transform rounded-xl border border-gray-300 bg-white p-6 text-center shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
          <Link
            href={ROUTES.admin.schedule.index}
            className="flex h-full flex-col items-center justify-between gap-4 px-10 py-10 text-2xl"
          >
            Розклад Богослужінь
            <CalendarCheckIcon />
          </Link>
        </li>
        <li className="pointer-events-none transform rounded-xl border border-gray-300 bg-slate-500 p-6 text-center shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
          <Link
            href={ROUTES.admin.news.index}
            className="flex h-full flex-col items-center justify-between gap-4 px-10 py-10 text-2xl"
          >
            Новини (в розробці)
            <NewspaperIcon />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Page;
