import MobileNav from "./MobileNav";
const Header = () => {
  return (
    <>
        <Link href="/" className="flex gap-1">
          <Image src={"/svgs/logo.svg"} alt="logo" width={60} height={60} />
          <h5 className="whitespace-nowrap text-brand">
            Парафія Покрови Пресвятої <br /> Богородиці{" "}
            <span className="text-base text-white">м. Заліщики</span>
          </h5>
        </Link>
        <MobileNav />
    </>
  );
};

export default Header;
