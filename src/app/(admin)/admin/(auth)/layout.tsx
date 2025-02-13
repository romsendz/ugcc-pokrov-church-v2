import { authOptions } from "@lib/next-auth/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Redirect authenticated users away from sign-in page
  if (session) {
    redirect("/admin");
  }
  return <div className="mx-[35%] my-[5%]">{children}</div>;
}
