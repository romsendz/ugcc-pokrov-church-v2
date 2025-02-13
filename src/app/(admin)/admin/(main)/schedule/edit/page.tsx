import EditScheduleForm from "@components/form/EditScheduleForm";
import { getSchedule } from "@lib/prisma/queries";

const Page = async () => {
  const schedule = await getSchedule();
  if (!schedule) {
    return <p>Розклад не знайдено</p>;
  }

  return <EditScheduleForm schedule={schedule} />;
};

export default Page;
