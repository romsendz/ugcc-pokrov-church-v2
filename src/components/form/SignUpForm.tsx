"use client";

import { Button } from "@components/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/components/ui/form";
import { Input } from "@components/components/ui/input";
import { useToast } from "@components/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignUpFormSchema,
  SignUpFormValues,
} from "@lib/zod-validation/signUpSchema";
import {
  ClipboardSignatureIcon,
  EyeIcon,
  EyeOffIcon,
  Loader2Icon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
const SignUpForm = () => {
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

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur", // Validate on blur
    reValidateMode: "onChange", // Revalidate on change
  });

  const { formState } = form;

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          name: `${values.firstname} ${values.lastname}`,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 403) {
          setVerificationAlert({
            isOpen: true,
            createdAt: data.createdAt ? new Date(data.createdAt) : null,
          });
        }
        throw new Error(data.message || "Сталася помилка. Спробуйте знову.");
      }

      toast({ variant: "success", description: "Реєстрація успішна" });
      router.push("/admin/sign-in");
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
          <h2 className="!mt-0 text-center">Запит на доступ</h2>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ім&apos;я</FormLabel>
                  <FormControl>
                    <Input autoComplete="on" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Прізвище</FormLabel>
                  <FormControl>
                    <Input autoComplete="on" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Повторіть пароль</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="on"
                      type={isPasswordVisible ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
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
                Подати запит на доступ до адміністрування
                <ClipboardSignatureIcon />
              </>
            )}
          </Button>
        </form>
        <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          АБО
        </div>
        <p className="mt-2 text-center text-sm text-gray-600">
          Якщо ви вже зареєстровані та верифіковані, будь ласка,{" "}
          <Link className="text-blue-500 hover:underline" href="/auth/sign-in">
            увійдіть
          </Link>
        </p>
      </Form>
    </>
  );
};

export default SignUpForm;
