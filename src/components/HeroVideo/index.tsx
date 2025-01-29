"use client";

import { useAppContext } from "@contexts/AppContext/useAppContext";
import styles from "./index.module.scss";
import clsx from "clsx";
import Image from "next/image";

const HeroVideo = () => {
  const { isMenuOpen } = useAppContext();

  return (
    <section
      className={clsx(styles.wrapper, "relative pb-[56.25%]", {
        [styles.lovely_gradient]: isMenuOpen,
      })}
    >
      <iframe
        frameBorder="0"
        referrerPolicy="strict-origin-when-cross-origin"
        loading="lazy"
        className="absolute left-[0] top-[0] h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        src={`https://www.youtube.com/embed/2CI2UvXvkvA?&playlist=2CI2UvXvkvA&loop=1&autoplay=1&rel=0&showinfo=0&iv_load_policy=3&controls=0&mute=1&disablekb=1&widget_referrer=https://www.ugcc-pokrov.te.ua`}
      />
      <Image
        className="animate-heroVideoCoverFadeOutMobile lg:animate-heroVideoCoverFadeOutDesktop"
        fill
        alt="Фото парафії"
        src="/img/bg-video-fallback.webp"
      />
    </section>
  );
};

export default HeroVideo;
