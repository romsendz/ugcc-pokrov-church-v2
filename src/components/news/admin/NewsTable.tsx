import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/components/ui/table";
import { News } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@lib/routes";
import { Button } from "@components/components/ui/button";
import RemoveNewsItemButton from "./RemoveNewsItemButton";
import NewsVisibilityToggle from "@components/form/NewsVisibilityToggleForm";

const NewsTable = ({ news }: { news: News[] }) => {
  return (
    <>
      <div className="flex">
        <Button asChild className="ml-auto" variant="main-action">
          <Link href={ROUTES.admin.news.new}>
            Додати новину
            <PlusIcon />
          </Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-96 !pl-4 font-bold">Заголовок</TableHead>
            <TableHead>Текст</TableHead>
            <TableHead>Автор</TableHead>
            <TableHead>Створено</TableHead>
            <TableHead>Востаннє змінено</TableHead>
            <TableHead className="!pr-4">Видимість на сайті</TableHead>
            {/* Видалити */}
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {news.map((newsItem) => (
            <TableRow key={newsItem.id}>
              <TableCell className="!pl-4">
                <Link
                  className="font-bold hover:underline"
                  href={ROUTES.admin.news.detail(newsItem.id)}
                >
                  {newsItem.title}
                </Link>
              </TableCell>
              <TableCell>
                <div
                  className="max-h-20 overflow-y-hidden text-sm"
                  dangerouslySetInnerHTML={{ __html: newsItem.content }}
                />
              </TableCell>
              <TableCell className="text-sm">{newsItem.author}</TableCell>
              <TableCell className="text-sm">
                {newsItem.createdAt.toLocaleDateString("uk-UA", {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell className="text-sm">
                {newsItem.updatedAt.toLocaleDateString("uk-UA", {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>
                <NewsVisibilityToggle item={newsItem} />
              </TableCell>
              <TableCell className="!pr-4">
                <RemoveNewsItemButton id={newsItem.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default NewsTable;
