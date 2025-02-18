import { Button } from "@components/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useToast } from "./hooks/use-toast";

const SignOutButton = () => {
  const { toast } = useToast();
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
    <Button className="w-full" onClick={handleLogout} variant="destructive">
      Вийти <LogOutIcon />
    </Button>
  );
};

export default SignOutButton;
