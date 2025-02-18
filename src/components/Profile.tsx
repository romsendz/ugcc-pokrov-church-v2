"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";
import { Separator } from "./components/ui/separator";
import SignOutButton from "./SignOutButton";
import { useSession } from "next-auth/react";
import { ROUTES } from "@lib/routes";

const getInitials = (fullName: string) => {
  return fullName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

const Profile = () => {
  const { data: session, status } = useSession();

  // Don't render button if the user is not authenticated
  if (status === "loading" || !session) return null;
  const userName = session?.user?.name || "";
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className="flex cursor-pointer flex-col items-center justify-center rounded-md border-4 p-2 transition-colors hover:bg-slate-300"
          title={"До профілю"}
        >
          <Avatar>
            <AvatarImage src={"/svgs/user.svg"} alt={`Профіль: ${userName}`} />
            <AvatarFallback>{getInitials(userName || "")}</AvatarFallback>
          </Avatar>
          <span className="mt-2 text-sm">{session?.user.name}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <span className="text-xl font-bold">{userName}</span>
        <Separator className="!my-4" />
        <Link href={ROUTES.admin.myProfile} className="hover:underline">
          Мій профіль
        </Link>
        <Separator className="!my-4" />
        <SignOutButton />
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
