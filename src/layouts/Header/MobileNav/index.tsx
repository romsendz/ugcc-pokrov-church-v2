import LiveStreamButton from "@components/LiveStreamButton";
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
            <ul className="flex flex-col gap-5">
              <li>
                <Link className="hover:underline" href={"/"}>
                  Головна
                </Link>
              </li>
              <li className="flex gap-3">
                <Link className="hover:underline" href={"/live-stream"}>
                  Пряма трансляція
                </Link>
                <LiveStreamButton />
              </li>
              <li className="flex gap-3">
                <Link className="hover:underline" href={"/schedule"}>
                  Розклад Богослужінь
                </Link>
                <Link
                  className="flex items-center justify-center"
                  href={"/schedule"}
                >
                  <Image
                    width={25}
                    height={25}
                    src={"/svgs/schedule.svg"}
                    alt="calendar"
                  />
                </Link>
              </li>
            </ul>
            <h3>Проєкти</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  className="inline-flex gap-2 align-baseline hover:underline"
                  href={
                    "https://www.facebook.com/profile.php?id=100064304162104"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Освітня програма{" "}
                  <span className="text-green-600">
                    <b>ДРУЗІ</b>
                  </span>
                  <Image
                    src={"/svgs/external-link.svg"}
                    alt="Зовнішнє посилання"
                    width={10}
                    height={10}
                  />
                </a>
              </li>
              <li>
                <a
                  className="inline-flex gap-2 align-baseline hover:underline"
                  href={"https://www.facebook.com/groups/262819928471960"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Благодійна кухня{" "}
                  <span className="text-amber-700">
                    <b>5 ХЛІБІВ</b>
                  </span>
                  <Image
                    src={"/svgs/external-link.svg"}
                    alt="Зовнішнє посилання"
                    width={10}
                    height={10}
                  />
                </a>
              </li>
            </ul>
            <h3>Спільноти</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  className="hover:underline"
                  href={"/communities/mothers-are-praying"}
                >
                  Матері в молитві
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline"
                  href={"/communities/apostleship-of-prayer"}
                >
                  Апостольство молитви
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={"/communities/homin"}>
                  Хорова капела <b>ГОМІН</b>
                </Link>
              </li>
            </ul>
            <h3>Про Парафію</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link className="hover:underline" href={"/about/history"}>
                  Історія
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={"/about/monastery"}>
                  Монастир <b>ССНДМ</b>
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={"/about/contact"}>
                  Контакти
                </Link>
              </li>
            </ul>
            <h3>Соціальні мережі</h3>
            <div className="flex items-center gap-5">
              <a
                href="https://www.facebook.com/ugccpokrovzalishchyky/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={"/svgs/facebook.svg"}
                  alt={"facebook"}
                  width={50}
                  height={50}
                />
              </a>
              <a
                href="https://www.youtube.com/@%D0%A5%D1%80%D0%B0%D0%BC%D0%9F%D0%BE%D0%BA%D1%80%D0%BE%D0%B2%D0%B8%D0%9F%D1%80%D0%B5%D1%81%D0%B2%D1%8F%D1%82%D0%BE%D1%97%D0%91%D0%BE%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B8%D1%86%D1%96"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={"/svgs/youtube.svg"}
                  alt={"youtube"}
                  width={50}
                  height={50}
                />
              </a>
              <a
                href="https://uk.wikipedia.org/wiki/%D0%A6%D0%B5%D1%80%D0%BA%D0%B2%D0%B0_%D0%9F%D0%BE%D0%BA%D1%80%D0%BE%D0%B2%D0%B8_%D0%9F%D1%80%D0%B5%D1%81%D0%B2%D1%8F%D1%82%D0%BE%D1%97_%D0%91%D0%BE%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B8%D1%86%D1%96_(%D0%97%D0%B0%D0%BB%D1%96%D1%89%D0%B8%D0%BA%D0%B8)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={"/svgs/wikipedia.svg"}
                  alt={"wikipedia"}
                  width={50}
                  height={50}
                />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
