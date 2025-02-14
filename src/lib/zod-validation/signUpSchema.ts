import { z } from "zod";

export const SignUpFormSchema = z
  .object({
    firstname: z
      .string()
      .nonempty("Необхідно вказати ім’я")
      .min(1, "Ім’я закоротке"),
    lastname: z
      .string()
      .nonempty("Необхідно вказати прізвище")
      .min(1, "Прізвище закоротке"),
    email: z
      .string()
      .min(1, "Необхідно вказати адресу електронної пошти")
      .email("Недійсна електронна адреса"),
    password: z
      .string()
      .min(8, "Пароль повинен містити щонайменше 8 символів")
      .regex(
        /^[A-Za-z0-9!@#$%^&*]+$/,
        "Пароль може містити лише латинські літери, цифри та спеціальні символи (!@#$%^&*)",
      )
      .regex(/[A-Z]/, "Пароль повинен містити принаймні одну велику літеру")
      .regex(/[0-9]/, "Пароль повинен містити принаймні одну цифру")
      .regex(
        /[!@#$%^&*]/,
        "Пароль повинен містити принаймні один спеціальний символ (!@#$%^&*)",
      ),
    confirmPassword: z.string().min(1, "Потрібне підтвердження пароля"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароль не збігається",
  });

// Type Inference for Form Values
export type SignUpFormValues = z.infer<typeof SignUpFormSchema>;
