import { useAppContext } from "@contexts/AppContext/useAppContext";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  const { isMenuOpen, setIsMenuOpen } = useAppContext();

  const handleMenu = () => {
    if (isMenuOpen) setIsMenuOpen(false);
  };
  return (
    <Link href="/" className="flex gap-1" onClick={handleMenu}>
      <Image src={"/svgs/logo.svg"} alt="logo" width={60} height={60} />
      <h5 className="whitespace-nowrap text-brand">
        Парафія Покрови Пресвятої <br /> Богородиці{" "}
        <span className="text-base text-white">м. Заліщики</span>
      </h5>
    </Link>
  );
};

export default Logo;
