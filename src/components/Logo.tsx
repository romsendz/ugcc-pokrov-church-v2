import { useAppContext } from "@contexts/AppContext/useAppContext";
import { ROUTES } from "@lib/routes";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  const { isMenuOpen, setIsMenuOpen } = useAppContext();

  const handleMenu = () => {
    if (isMenuOpen) setIsMenuOpen(false);
  };
  return (
    <Link
      href={ROUTES.index}
      className="flex items-center gap-1"
      onClick={handleMenu}
    >
      <div className="relative h-16 w-16 xl:h-24 xl:w-24">
        <Image src="/svgs/logo.svg" alt="logo" fill />
      </div>
      <h4 className="!m-0 whitespace-nowrap text-lg text-brand lg:text-xl xl:text-3xl">
        Парафія Покрови Пресвятої <br /> Богородиці{" "}
        <span className="text-base text-white lg:text-2xl">м. Заліщики</span>
      </h4>
    </Link>
  );
};

export default Logo;
