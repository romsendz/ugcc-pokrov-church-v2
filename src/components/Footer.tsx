import { ROUTES } from "@lib/routes";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="relative flex flex-col items-center gap-2 bg-footer p-2 text-center text-brand lg:grid lg:grid-cols-[repeat(3,_1fr)]">
      <p className="!m-0">Запрошуємо всіх до співпраці та спільної молитви!</p>
      <p className="!m-0">
        Парафія Покрови Пресвятої Богородиці УГКЦ <br />
        <a
          className="inline-flex items-center gap-2 text-inherit"
          target="_blank"
          rel="noopener noreferrer"
          href={ROUTES.EXTERNAL.googleMapsLocation}
        >
          <span>м.Заліщики | Україна</span>
          <span className="relative inline-block h-5 w-5">
            <Image
              src={"/svgs/flag_ukraine.svg"}
              alt="flag-ukraine"
              fill
              title="Слава Україні! Glory to Ukraine!"
            />
          </span>
        </a>
      </p>
      <a
        className="absolute bottom-3 right-3 inline-flex h-5 w-5"
        target="_blank"
        rel="noopener noreferrer"
        href={ROUTES.EXTERNAL.githubReference}
      >
        <span className="relative inline-block h-full w-full">
          <Image src={"/svgs/github.svg"} alt={"github"} fill />
        </span>
      </a>
      <div className="flex items-center gap-5 lg:justify-self-center">
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
          <Image
            src={"/svgs/wikipedia.svg"}
            alt={"youtube"}
            fill
            className="invert filter"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
