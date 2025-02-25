"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@components/components/ui/alert-dialog";
import { useToast } from "@components/hooks/use-toast";
import { removeNewsItem } from "@lib/prisma/actions";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { useTransition } from "react";

const RemoveNewsItemButton = ({ id }: { id: number }) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleRemove = () => {
    startTransition(async () => {
      try {
        await removeNewsItem(Number(id));

        toast({
          title: "Новина видалена",
        });
      } catch (error) {
        console.error("Error:", error);
        toast({
          title: "Помилка",
          description: "Не вдалося видалити новину.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger title="Видалити" disabled={isPending}>
          {isPending ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <Trash2Icon color="red" />
          )}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ви впевнені?</AlertDialogTitle>
            <AlertDialogDescription>
              Цю дію не можна скасувати. Це назавжди видалить новину
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Скасувати</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemove}>
              Продовжити
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RemoveNewsItemButton;
