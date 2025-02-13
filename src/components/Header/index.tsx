"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import Logo from "@components/Logo";

const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  return (
    <>
      <header
        className={clsx(
          "relative flex max-h-[var(--header-height)] justify-between gap-2 bg-header p-2 text-brand lg:max-h-[unset] lg:gap-5 lg:border-b-[1px_solid_#e29579] lg:py-4",
          {
            "lg:absolute lg:top-0 lg:z-[2] lg:w-full lg:bg-opacity-40 lg:bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0.7),_rgba(0,_0,_0,_0))] lg:backdrop-blur-sm":
              isHomePage,
            "lg:bg-header": !isHomePage,
          },
        )}
      >
        <Logo />
        <DesktopNav />
        <MobileNav />
      </header>
    </>
  );
};

export default Header;
