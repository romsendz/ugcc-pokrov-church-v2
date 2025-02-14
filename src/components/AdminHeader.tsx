import SignOutButton from "@components/SignOutButton";
import Image from "next/image";
import Link from "next/link";

export default function AdminHeader() {
  return (
    <header>
      <nav className="flex w-full items-center justify-between bg-slate-50 px-6 py-3 shadow-md">
        <Link
          href={"/admin"}
          className="flex items-center space-x-3 rounded-md p-2 transition-colors hover:bg-slate-300"
        >
          <div className="relative h-12 w-12 rounded-full bg-slate-500">
            <Image src="/svgs/logo.svg" alt="logo" fill className="p-2" />
          </div>
          <span className="text-lg font-semibold">Моя парафія</span>
        </Link>
        <SignOutButton />
      </nav>
    </header>
  );
}
