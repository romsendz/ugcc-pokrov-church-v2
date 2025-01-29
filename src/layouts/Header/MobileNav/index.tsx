import { useAppContext } from "@contexts/AppContext/useAppContext";
import Image from "next/image";
import styles from "./index.module.scss";

const MobileNav = () => {
  const { isMenuOpen, setIsMenuOpen } = useAppContext();

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
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
        </div>
      </div>
    </>
  );
};

export default MobileNav;
