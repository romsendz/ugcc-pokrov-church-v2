"use client";

import { Button } from "@components/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/components/ui/form";
import { Input } from "@components/components/ui/input";
import { Switch } from "@components/components/ui/switch";
import { useToast } from "@components/hooks/use-toast";
import QuillEditor from "@components/QuillEditor";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNewsItem, updateNewsItem } from "@lib/prisma/actions";
import { ROUTES } from "@lib/routes";
import { NewsSchema, NewsFormValues } from "@lib/zod-validation/newsSchema";
import { News } from "@prisma/client";
import { Loader2Icon, SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

const NewsForm = ({ item }: { item?: News }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  // Check if we are editing or creating a new item
  const isEditMode = !!item;

  const form = useForm<NewsFormValues>({
    resolver: zodResolver(NewsSchema),
    defaultValues: {
      title: item?.title || "",
      content: item?.content || "",
      author: item?.author || "",
      visibility: item?.isVisible ?? true,
    },
    mode: "onBlur", // Validate on blur
    reValidateMode: "onChange", // Revalidate on change
  });

  const { formState } = form;

  // Manually update content field
  const handleContentChange = (html: string) => {
    form.setValue("content", html, { shouldValidate: true }); // Set and validate field
  };
  const willBePubliclyVisible = form.watch("visibility");
  const onSubmit = async (data: NewsFormValues) => {
    startTransition(async () => {
      try {
        if (isEditMode) {
          await updateNewsItem(item!.id, data); //  Update existing news
        } else {
          await createNewsItem(data); // Create a new news item
        }
        toast({
          title: `Успіх!`,
          variant: "success",
          description: isEditMode
            ? `Новина була успішно оновлена${willBePubliclyVisible ? ` на сайті` : ""}.`
            : `Новина була успішно створена${willBePubliclyVisible ? ` та опублікована на сайті` : ""}.`,
        });
        router.push(ROUTES.admin.news.index);
      } catch (error) {
        console.error("Error updating news item:", error);
        toast({
          title: "Помилка",
          description: "Не вдалося створити або оновити новину",
          variant: "destructive",
        });
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <div className="space-y-4">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Заголовок</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="content">Текст</FormLabel>
                <FormControl>
                  <QuillEditor
                    defaultValue={field.value}
                    onChange={handleContentChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="author"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Автор</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="visibility"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel htmlFor={`news-visibility-${item?.id}`}>
                Видимість на сайті
              </FormLabel>
              <FormControl>
                <Switch
                  className="!m-0"
                  title={
                    field.value === true
                      ? "Приховати новину на сайті"
                      : "Показати новину на сайті"
                  }
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id={`news-visibility-${item?.id}`}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <hr className="!my-4 h-1 border-0 bg-gray-200 dark:bg-gray-700" />
        <div className="flex justify-end gap-4">
          <Button
            disabled={isPending || !formState.isValid}
            type="submit"
            variant="main-action"
          >
            {isPending && <Loader2Icon className="animate-spin" />}
            {isPending ? (
              "Завантаження"
            ) : (
              <>
                {isEditMode
                  ? `Зберегти`
                  : `Створити${willBePubliclyVisible ? " та опублікувати на сайті" : ""}`}
                <SaveIcon />
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewsForm;
