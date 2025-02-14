import { CalendarCheckIcon } from "lucide-react";
import Link from "next/link";

const Page = async () => {
  return (
    <div className="m-10 grid p-6">
      <ul className="grid grid-cols-5 gap-4">
        <li className="transform rounded-xl border border-gray-300 bg-white p-6 text-center shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
          <Link
            href="/admin/schedule"
            className="flex flex-col items-center gap-4 px-10 py-10 text-2xl"
          >
            Розклад Богослужінь
            <CalendarCheckIcon />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Page;
