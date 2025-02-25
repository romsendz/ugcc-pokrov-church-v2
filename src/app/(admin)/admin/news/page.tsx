import NewsTable from "@components/news/admin/NewsTable";
import { getNews } from "@lib/prisma/queries";

const Page = async () => {
  const news = await getNews();
  if (!news) {
    return <p>Новин не знайдено</p>;
  }

  return <NewsTable news={news} />;
};

export default Page;
