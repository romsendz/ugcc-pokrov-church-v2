"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
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
import { signIn } from "next-auth/react";
import { useToast } from "@components/hooks/use-toast";
import { EyeIcon, EyeOffIcon, Loader2Icon, LogInIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/components/ui/dialog";
import {
  SignInFormSchema,
  SignInFormValues,
} from "@lib/zod-validation/signInSchema";

const SignInForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [verificationAlert, setVerificationAlert] = useState({
    isOpen: false,
    createdAt: null as Date | null,
  });

  // State to control password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur", // Validate on blur
    reValidateMode: "onChange", // Revalidate on change,
  });

  const { formState } = form;

  const onSubmit = async (values: SignInFormValues) => {
    try {
      const callbackUrl =
        new URLSearchParams(window.location.search).get("callbackUrl") ||
        "/admin";
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (response?.error?.match("NOT_VERIFIED")) {
        const parsedError = JSON.parse(response.error);
        const errorCode = parsedError.code;
        if (errorCode === "NOT_VERIFIED") {
          setVerificationAlert({
            isOpen: true,
            createdAt: parsedError.userCreatedAt
              ? new Date(parsedError.userCreatedAt)
              : null,
          });
          throw new Error(`Ваш запит ще не підтверджено.`);
        }
      }

      if (!response?.ok) {
        throw new Error(response?.error || "Сталася помилка. Спробуйте знову.");
      }

      toast({
        variant: "success",
        description: `Ви успішно увійшли.`,
      });
      router.push(callbackUrl);
    } catch (error: unknown) {
      toast({
        title: "Помилка",
        variant: "destructive",
        description:
          error instanceof Error ? error.message : "Щось пішло не так.",
      });
    }
  };

  return (
    <>
      <Dialog
        open={verificationAlert.isOpen}
        onOpenChange={(isOpen) =>
          setVerificationAlert((prev) => ({ ...prev, isOpen }))
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Увага</DialogTitle>
            <DialogDescription>
              Інформація про статус вашого запиту
            </DialogDescription>
          </DialogHeader>
          <br />
          <span className="text-center">Ви успішно подали запит</span>
          <span className="text-center text-2xl">
            {verificationAlert.createdAt &&
              verificationAlert.createdAt.toLocaleDateString("uk-UA", {
                day: "2-digit",
                month: "long",
                hour: "2-digit",
                minute: "2-digit",
              })}
          </span>
          <span className="text-center">
            Доступ буде надано після успішної верифікації.
          </span>
          <br />
          <span>
            <b>З міркувань безпеки цей процес може зайняти деякий час.</b>
          </span>
          <span>
            Ви отримаєте відповідний лист на ваш email, який ви вказали при
            реєстрації.
          </span>
          <br />
          <Button
            onClick={() =>
              setVerificationAlert((prevState) => ({
                ...prevState,
                isOpen: false,
              }))
            }
          >
            Зрозуміло
          </Button>
        </DialogContent>
      </Dialog>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-2xl bg-slate-50 p-10"
        >
          <h2 className="!mt-0 text-center">Вхід</h2>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input autoComplete="on" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        autoComplete="on"
                        type={isPasswordVisible ? "text" : "password"}
                        {...field}
                      />
                    </FormControl>
                    {!!field.value && (
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={togglePasswordVisibility}
                      >
                        {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={formState.isSubmitting || !formState.isValid}
            className="mt-6 w-full"
            type="submit"
          >
            {formState.isSubmitting && <Loader2Icon className="animate-spin" />}
            {formState.isSubmitting ? (
              "Завантаження"
            ) : (
              <>
                Увійти <LogInIcon />
              </>
            )}
          </Button>
        </form>
        <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          АБО
        </div>
        <p className="mt-2 text-center text-sm text-gray-600">
          Якщо у вас немає облікового запису,{" "}
          <Link className="text-blue-500 hover:underline" href="/admin/sign-up">
            подайте запит на його створення.
          </Link>
        </p>
      </Form>
    </>
  );
};

export default SignInForm;
