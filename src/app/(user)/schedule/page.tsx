import SchedulePreview from "@components/SchedulePreview";
import { getSchedule } from "@lib/prisma/queries";

const Page = async () => {
  const schedule = await getSchedule();

  if (!schedule) {
    return <p>Розклад не знайдено</p>;
  }
  return (
    <div className="mx-10 my-10 rounded-xl bg-slate-50 px-12 py-12 [box-shadow:0_0_117px_-6px_grey] lg:mx-24 xl:mx-60">
      <SchedulePreview schedule={schedule} blurPastDays />
    </div>
  );
};

export default Page;
