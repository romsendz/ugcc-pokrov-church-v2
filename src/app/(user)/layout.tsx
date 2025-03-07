import type { Metadata } from "next";
import { Philosopher, PT_Sans_Narrow } from "next/font/google";
import "./globals.user.scss";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { AppProvider } from "@contexts/AppContext/AppProvider";
import StreamStatusFetcher from "@components/StreamStatusFetcher";
import { getStreamStatus } from "@lib/fetch/getStreamStatus";
import { LiveStreamResponse } from "@api/live-stream/route";
import clsx from "clsx";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

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
  const initialStreamStatus: LiveStreamResponse = await getStreamStatus(); // Fetch data server-side for SSR
  return (
    <html lang="uk" className="scroll-smooth">
      <body
        className={`${philosopher.variable} ${pTSansNarrow.variable} bg-slate-200 antialiased`}
      >
        <AppProvider initialStreamStatus={initialStreamStatus}>
          <StreamStatusFetcher />
          <div className={clsx("flex min-h-screen flex-col", prose.join(" "))}>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AppProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
