import { ROUTES } from "@lib/routes";
import Link from "next/link";

export default function AdminFooter() {
  return (
    <footer className="flex w-full items-center justify-between bg-slate-50 px-6 py-3 shadow-md">
      <Link
        prefetch={false}
        className="ml-auto text-xs hover:underline"
        href={ROUTES.admin.privacyPolicy}
      >
        Політика конфіденційності
      </Link>
    </footer>
  );
}
