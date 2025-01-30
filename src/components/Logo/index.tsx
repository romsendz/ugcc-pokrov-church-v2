import { useAppContext } from "@contexts/AppContext/useAppContext";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  const { isMenuOpen, setIsMenuOpen } = useAppContext();

  const handleMenu = () => {
    if (isMenuOpen) setIsMenuOpen(false);
  };
  return (
    <Link href="/" className="flex items-center gap-1" onClick={handleMenu}>
      <div className="w-16 lg:w-20 xl:w-24">
        <Image
          src="/svgs/logo.svg"
          alt="logo"
          layout="responsive"
          width={60}
          height={60}
        />
      </div>
      <h4 className="!m-0 whitespace-nowrap text-xl text-brand lg:text-2xl xl:text-4xl">
        Парафія Покрови Пресвятої <br /> Богородиці{" "}
        <span className="text-base text-white lg:text-2xl">м. Заліщики</span>
      </h4>
    </Link>
  );
};

export default Logo;
