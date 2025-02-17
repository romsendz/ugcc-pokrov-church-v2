import LiveStreamButton from "@components/LiveStreamButton";
import { useAppContext } from "@contexts/AppContext/useAppContext";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import styles from "./index.module.scss";
import {
  CalendarDaysIcon,
  ExternalLinkIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { ROUTES } from "@lib/routes";

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
        {isMenuOpen ? <XIcon size={32} /> : <MenuIcon size={32} />}
      </button>
      <div
        className={clsx("lg:hidden", styles.nav_mobile, {
          [styles.active]: isMenuOpen,
        })}
      >
        <div className="prose-xl px-6 py-4">
          <nav onClick={handleMenuClick}>
            <ul className="flex flex-col gap-5">
              <li>
                <Link className="hover:underline" href={ROUTES.index}>
                  Головна
                </Link>
              </li>
              <li className="flex gap-3">
                <Link className="hover:underline" href={ROUTES.liveStream}>
                  Пряма трансляція
                </Link>
                <LiveStreamButton />
              </li>
              <li className="flex gap-3">
                <Link className="hover:underline" href={ROUTES.schedule}>
                  Розклад Богослужінь
                </Link>
                <Link
                  className="flex items-center justify-center"
                  href={ROUTES.schedule}
                >
                  <CalendarDaysIcon />
                </Link>
              </li>
            </ul>
            <h3>Проєкти</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  className="inline-flex items-center gap-2 hover:underline"
                  href={ROUTES.EXTERNAL.facebookFriends}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Освітня програма{" "}
                  <span className="text-green-600">
                    <b>ДРУЗІ</b>
                  </span>
                  <ExternalLinkIcon size={16} />
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-2 hover:underline"
                  href={ROUTES.EXTERNAL.facebook5Breads}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Благодійна кухня{" "}
                  <span className="text-amber-700">
                    <b>5 ХЛІБІВ</b>
                  </span>
                  <ExternalLinkIcon size={16} />
                </a>
              </li>
            </ul>
            <h3>Спільноти</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  className="hover:underline"
                  href={ROUTES.communities.mothersArePraying}
                >
                  Матері в молитві
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline"
                  href={ROUTES.communities.apostleshipOfPrayer}
                >
                  Апостольство молитви
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline"
                  href={ROUTES.communities.homin}
                >
                  Хорова капела <b>ГОМІН</b>
                </Link>
              </li>
            </ul>
            <h3>Про Парафію</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link className="hover:underline" href={ROUTES.about.history}>
                  Історія
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={ROUTES.about.monastery}>
                  Монастир <b>ССНДМ</b>
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href={ROUTES.about.contact}>
                  Контакти
                </Link>
              </li>
            </ul>
            <h3>Соціальні мережі</h3>
            <div className="flex items-center gap-5">
              <a
                href={ROUTES.EXTERNAL.facebookChurch}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block h-10 w-10"
              >
                <Image src={"/svgs/facebook.svg"} alt={"facebook"} fill />
              </a>
              <a
                href={ROUTES.EXTERNAL.youtubeChurch}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block h-10 w-10"
              >
                <Image src={"/svgs/youtube.svg"} alt={"youtube"} fill />
              </a>
              <a
                href={ROUTES.EXTERNAL.wikipediaChurch}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block h-10 w-10"
              >
                <Image src={"/svgs/wikipedia.svg"} alt={"wikipedia"} fill />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
