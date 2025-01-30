"use client";

import ButtonLink, { ButtonLinkProps } from "@components/ButtonLink";
import styles from "./index.module.scss";
import clsx from "clsx";
import { useAppContext } from "@contexts/AppContext/useAppContext";
import Image from "next/image";

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
        <Image
          className="mx-[0] my-[auto] hidden lg:block"
          width={25}
          height={25}
          src={"/svgs/tv-light.svg"}
          alt="tv"
        />
        <Image
          className="mx-[0] my-[auto] lg:hidden"
          width={35}
          height={35}
          src={"/svgs/tv.svg"}
          alt="tv"
        />
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
      href={"/live-stream"}
      className={className}
      {...props}
    >
      {content}
    </ButtonLink>
  );
};

export default LiveStreamButton;
