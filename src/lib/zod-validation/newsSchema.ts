import { z } from "zod";
import { VisibilityToggleFormSchema } from "./newsVisibilityToggleSchema";

export const NewsSchema = z
  .object({
    title: z
      .string()
      .min(10, "Заголовок повинен містити щонайменше 10 символів"),
    content: z
      .string()
      .min(100, "Текст повинен містити щонайменше 100 символів")
      .refine((html) => {
        const text = html.replace(/<[^>]*>/g, "").trim(); // Remove HTML tags
        return text.length >= 100; // Ensure actual text content is valid
      }, "Текст повинен містити щонайменше 100 символів"),
    author: z
      .string()
      .min(5, "Ім'я автора повинне містити щонайменше 5 символів"),
  })
  .merge(VisibilityToggleFormSchema);

export type NewsFormValues = z.infer<typeof NewsSchema>;
