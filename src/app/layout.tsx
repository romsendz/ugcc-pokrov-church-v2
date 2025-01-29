import type { Metadata } from "next";
import { Philosopher, PT_Sans_Narrow } from "next/font/google";
import "@styles/globals.scss";
import clsx from "clsx";
import { SpeedInsights } from "@vercel/speed-insights/next";

const philosopher = Philosopher({
  variable: "--font-philosopher", // CSS variable for this font
  subsets: ["latin", "cyrillic"],
  weight: "400",
});

const pTSansNarrow = PT_Sans_Narrow({
  variable: "--font-pt-sans-narrow", // CSS variable for this font
  subsets: ["latin", "cyrillic"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Парафія Покрови Пресвятої Богородиці УГКЦ м. Заліщики",
  description: "Офіційна веб-сторінка",
};

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
  "prose-img:m-0",
  "prose-hr:m-0",
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className="scroll-smooth">
      <body
        className={`${philosopher.variable} ${pTSansNarrow.variable} bg-slate-200 antialiased`}
      >
          <div className={clsx("flex min-h-screen flex-col", prose.join(" "))}>
            <main className="flex-1">{children}</main>
          </div>
        <SpeedInsights />
      </body>
    </html>
  );
}
