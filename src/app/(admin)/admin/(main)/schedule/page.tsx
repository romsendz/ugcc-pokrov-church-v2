import clsx from "clsx";
import { getSchedule } from "@lib/prisma/queries";
import { buttonVariants } from "@components/components/ui/button";
import Link from "next/link";
import { EditIcon } from "lucide-react";
import SchedulePrint from "@components/SchedulePrint";
import SchedulePreview from "@components/SchedulePreview";

const Page = async () => {
  const schedule = await getSchedule();

  if (!schedule) {
    return <p>Розклад не знайдено</p>;
  }

  return (
    <div className="space-y-12">
      <SchedulePreview schedule={schedule} blurPastDays />
      <hr className="!my-4 h-1 border-0 bg-gray-200 dark:bg-gray-700" />
      <div className="flex justify-end gap-4">
        <SchedulePrint schedule={schedule} />
        <Link
          href="/admin/schedule/edit"
          className={clsx(buttonVariants({ variant: "main-action" }))}
        >
          Оновити розклад
          <EditIcon />
        </Link>
      </div>
    </div>
  );
};

export default Page;
