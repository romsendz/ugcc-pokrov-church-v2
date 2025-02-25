"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@components/components/ui/form";
import { Switch } from "@components/components/ui/switch";
import { useToast } from "@components/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateNewsVisibility } from "@lib/prisma/actions";
import {
  VisibilityToggleFormSchema,
  VisibilityToggleFormValues,
} from "@lib/zod-validation/newsVisibilityToggleSchema";
import { News } from "@prisma/client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

const NewsVisibilityToggle = ({ item }: { item: News }) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const form = useForm<VisibilityToggleFormValues>({
    resolver: zodResolver(VisibilityToggleFormSchema),
    defaultValues: { visibility: item.isVisible },
  });

  const onSubmit = async (data: VisibilityToggleFormValues) => {
    startTransition(async () => {
      try {
        await updateNewsVisibility(item.id, data.visibility);

        toast({
          title: "Видимість оновлено",
          description: (
            <p>
              Новина тепер <b>{data.visibility ? "видима" : "прихована"}</b> для
              відвідувачів сайту парафії
            </p>
          ),
        });
      } catch (error) {
        console.error("Error updating news visibility:", error);
        toast({
          title: "Помилка",
          description: "Не вдалося оновити видимість новини",
          variant: "destructive",
        });
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="visibility"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Switch
                  title={
                    field.value === true
                      ? "Приховати новину на сайті"
                      : "Показати новину на сайті"
                  }
                  type="submit"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isPending}
                  id={`news-visibility-${item.id}`}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default NewsVisibilityToggle;
