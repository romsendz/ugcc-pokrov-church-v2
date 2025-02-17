"use client";

import { Button } from "@components/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useToast } from "./hooks/use-toast";

const SignOutButton = () => {
  const { data: session, status } = useSession();
  const { toast } = useToast();

  // Don't render button if the user is not authenticated
  if (status === "loading" || !session) return null;

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error: unknown) {
      console.error(error);
      toast({
        title: "Помилка",
        variant: "destructive",
        description:
          error instanceof Error ? error.message : "Щось пішло не так.",
      });
    }
  };
  return (
    <Button onClick={handleLogout} variant="destructive">
      Вийти <LogOutIcon />
    </Button>
  );
};

export default SignOutButton;
