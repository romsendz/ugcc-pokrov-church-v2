import clsx from "clsx";
import Link from "next/link";
import styles from "./index.module.scss";
import { useAppContext } from "@contexts/AppContext/useAppContext";
import {
  CalendarDaysIcon,
  ChevronDownIcon,
  ChurchIcon,
  ExternalLinkIcon,
  TvIcon,
} from "lucide-react";
import { ROUTES } from "@lib/routes";

const DesktopNav = () => {
  const { streamStatus } = useAppContext();
  return (
    <nav
      role="navigation"
      className={clsx(
        styles.nav_desktop,
        "hidden items-center lg:flex lg:gap-5 lg:pr-3 xl:gap-6 xl:pr-5 2xl:gap-12 2xl:pr-10",
      )}
    >
      <Link
        href={ROUTES.index}
        className={clsx(styles.drop, styles.alone, "!p-2 lg:hidden xl:block")}
        title="Головна"
      >
        <ChurchIcon
          color="beige"
          className="mx-[0] my-[auto] hidden lg:block"
        />
      </Link>
      <div className="flex flex-row gap-5">
        <div className={styles.drop}>
          <span className="flex items-center justify-center gap-2 font-bold">
            Проєкти
            <ChevronDownIcon size={12} />
          </span>
          <ul className={clsx("!px-2", styles.list)}>
            <li>
              <a
                href={ROUTES.EXTERNAL.facebookFriends}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-brand"
              >
                Освітня програма{" "}
                <span className="group-hover:text-green-600">
                  <b>ДРУЗІ</b>
                </span>
                <ExternalLinkIcon size={15} />
              </a>
            </li>
            <li>
              <a
                href={ROUTES.EXTERNAL.facebook5Breads}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-brand"
              >
                Благодійна кухня{" "}
                <span className="group-hover:text-amber-950">
                  <b>5 ХЛІБІВ</b>
                </span>
                <ExternalLinkIcon size={15} />
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.drop}>
          <span className="flex items-center justify-center gap-2 font-bold">
            Спільноти
            <ChevronDownIcon size={12} />
          </span>
          <ul className={clsx("!px-2", styles.list)}>
            <li>
              <Link
                className="text-brand"
                href={ROUTES.communities.mothersArePraying}
              >
                Матері в молитві
              </Link>
            </li>
            <li>
              <Link
                className="text-brand"
                href={ROUTES.communities.apostleshipOfPrayer}
              >
                Апостольство молитви
              </Link>
            </li>
            <li>
              <Link className="text-brand" href={ROUTES.communities.homin}>
                Хорова капела <b>ГОМІН</b>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.drop}>
          <span className="flex items-baseline justify-center gap-2 font-bold">
            Про парафію
            <ChevronDownIcon size={12} />
          </span>
          <ul className={clsx("!px-2", styles.list)}>
            <li>
              <Link className="text-brand" href={ROUTES.about.history}>
                Історія
              </Link>
            </li>
            <li>
              <Link className="text-brand" href={ROUTES.about.monastery}>
                Монастир ССНДМ
              </Link>
            </li>
            <li>
              <Link className="text-brand" href={ROUTES.about.contact}>
                Контакти
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex shrink-0 flex-row gap-5">
        <Link
          href={ROUTES.liveStream}
          className={clsx(styles.drop, styles.alone, "!p-2", {
            "motion-safe:animate-pulse": streamStatus.isOnline,
          })}
          title={
            streamStatus.isOnline
              ? `Ми у прямому ефірі!\nНатисність для перегляду`
              : "Пряма трансляція"
          }
        >
          <TvIcon className="mx-[0] my-[auto] hidden lg:block" color="beige" />
        </Link>
        <Link
          href={ROUTES.schedule}
          className={clsx(styles.drop, styles.alone, "!p-2")}
          title="Розклад Богослужінь"
        >
          <CalendarDaysIcon
            className="mx-[0] my-[auto] hidden lg:block"
            color="beige"
          />
        </Link>
      </div>
    </nav>
  );
};

export default DesktopNav;
