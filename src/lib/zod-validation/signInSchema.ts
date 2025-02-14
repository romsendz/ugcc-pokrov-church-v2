import { z } from "zod";

export const SignInFormSchema = z.object({
  email: z
    .string()
    .min(1, "Необхідно ввести адресу електронної пошти")
    .email("Недійсна електронна адреса"),
  password: z
    .string()
    .min(1, "Необхідно ввести пароль")
    .min(8, "Пароль повинен містити більше 8 символів"),
});

// Type Inference for Form Values
export type SignInFormValues = z.infer<typeof SignInFormSchema>;
