"use client";

import ButtonLink, { ButtonLinkProps } from "@components/ButtonLink";
import styles from "./index.module.scss";
import clsx from "clsx";
import { useAppContext } from "@contexts/AppContext/useAppContext";
import { TvIcon } from "lucide-react";
import { ROUTES } from "@lib/routes";

type LiveStreamButtonProps = Omit<ButtonLinkProps, "href" | "children"> & {
  noLink?: boolean;
};

const LiveStreamButton = ({ noLink, ...props }: LiveStreamButtonProps) => {
  const { streamStatus } = useAppContext();
  const notAvailable = streamStatus.aboveLimit;
  const streamIsLive = streamStatus.isOnline;
  const className = clsx(styles.button, {
    [styles.live]: streamIsLive,
  });

  if (notAvailable) {
    return (
      <>
        <TvIcon
          className="mx-[0] my-[auto] hidden lg:block"
          color="beige"
          size={25}
        />
        <TvIcon className="mx-[0] my-[auto] lg:hidden" size={35} />
      </>
    );
  }

  const title = streamIsLive
    ? "Ми у прямому ефірі! \n\nНатисність для перегляду"
    : "Пряма трансляція Богослужінь доступна кожної неділі та у свята.\n\nДля детальнішої інформації ознайомтесь із розкладом богослужінь на поточний тиждень";
  const content = (
    <span
      className={`${
        streamIsLive ? "font-extrabold text-red-500" : "text-white"
      }`}
    >
      {streamIsLive ? "Live" : "Offline"}
    </span>
  );
  if (noLink) {
    return (
      <span title={title} className={className}>
        {content}
      </span>
    );
  }
  return (
    <ButtonLink
      title={title}
      disabled={!streamIsLive}
      href={ROUTES.liveStream}
      className={className}
      {...props}
    >
      {content}
    </ButtonLink>
  );
};

export default LiveStreamButton;
