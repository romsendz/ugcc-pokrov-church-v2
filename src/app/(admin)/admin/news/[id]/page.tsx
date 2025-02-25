import NewsForm from "@components/form/NewsForm";
import { getNewsItem } from "@lib/prisma/queries";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const newsItem = await getNewsItem(Number(id));

  if (!newsItem) {
    return <p>Новину не знайдено</p>;
  }

  return <NewsForm item={newsItem} />;
};

export default Page;
