"use client";

import { Button } from "@components/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session?.user) {
    return null;
  }

  const handleLogout = () => {
    signOut();
    router.push("/admin/sign-in");
  };
  return (
    <Button onClick={handleLogout} variant="destructive">
      Вийти
      <LogOutIcon />
    </Button>
  );
};

export default SignOutButton;
