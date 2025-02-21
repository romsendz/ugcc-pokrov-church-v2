import { Arimo } from "next/font/google";
import "./globals.admin.scss";
import { Toaster } from "@components/components/ui/toaster";
import AdminHeader from "@components/AdminHeader";
import { AuthProvider } from "@contexts/AuthProvider";
import AdminFooter from "@components/AdminFooter";

const arimo = Arimo({
  variable: "--font-arimo",
  subsets: ["latin", "cyrillic"],
  weight: "400",
});

const prose = [
  // font sizes
  "prose",
  "max-w-none",
  "prose-sm",
  "sm:prose-base",
  "md:prose-lg",
  "lg:prose-xl",
  // default behaviour for some elements within prose
  "prose-a:no-underline",
  "prose-ul:m-0 prose-ul:list-none prose-ul:p-0",
  "prose-li:m-0 prose-li:p-0",
  "prose-ol:m-0 prose-ol:p-0",
  "prose-img:m-0",
  "prose-hr:m-0",
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className="scroll-smooth">
      <body className={`${arimo.variable} bg-slate-300 antialiased`}>
        <AuthProvider>
          <div className={`${prose.join(" ")} flex min-h-screen flex-col`}>
            <AdminHeader />
            <main className="flex-1">{children}</main>
            <AdminFooter />
            <Toaster />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
