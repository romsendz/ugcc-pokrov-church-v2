import { useAppContext } from "@contexts/AppContext/useAppContext";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import styles from "./index.module.scss";

const MobileNav = () => {
  const { isMenuOpen, setIsMenuOpen } = useAppContext();

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // close menu when link is clicked in navigation
  const handleMenuClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const link = target.closest("a"); // Check if the clicked element is inside an <a>
    if (link) {
      setIsMenuOpen(false);
    }
  };

  // disable scroll on body when menu is opened
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu-active");
    } else {
      document.body.classList.remove("menu-active");
    }
    return () => {
      document.body.classList.remove("menu-active");
    };
  }, [isMenuOpen]);

  return (
    <>
      <button onClick={handleMenu} className="ml-auto shrink-0 lg:hidden">
        <Image
          src={isMenuOpen ? "/svgs/close.svg" : "/svgs/menu-burger.svg"}
          alt={isMenuOpen ? "menu close" : "menu"}
          width={30}
          height={30}
        />
      </button>
      <div
        className={clsx("lg:hidden", styles.nav_mobile, {
          [styles.active]: isMenuOpen,
        })}
      >
        <div className="px-6 py-4">
          <nav onClick={handleMenuClick}>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
