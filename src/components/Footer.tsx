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
          href="https://maps.app.goo.gl/hJHePobeKQiiE4wS9"
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
        href="https://github.com/romsendz"
      >
        <span className="relative inline-block h-full w-full">
          <Image src={"/svgs/github.svg"} alt={"github"} fill />
        </span>
      </a>
      <div className="flex items-center gap-5 lg:justify-self-center">
        <a
          href="https://www.facebook.com/ugccpokrovzalishchyky/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-block h-10 w-10"
        >
          <Image src={"/svgs/facebook.svg"} alt={"youtube"} fill />
        </a>
        <a
          href="https://www.youtube.com/@%D0%A5%D1%80%D0%B0%D0%BC%D0%9F%D0%BE%D0%BA%D1%80%D0%BE%D0%B2%D0%B8%D0%9F%D1%80%D0%B5%D1%81%D0%B2%D1%8F%D1%82%D0%BE%D1%97%D0%91%D0%BE%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B8%D1%86%D1%96"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-block h-10 w-10"
        >
          <Image src={"/svgs/youtube.svg"} alt={"youtube"} fill />
        </a>
        <a
          href="https://uk.wikipedia.org/wiki/%D0%A6%D0%B5%D1%80%D0%BA%D0%B2%D0%B0_%D0%9F%D0%BE%D0%BA%D1%80%D0%BE%D0%B2%D0%B8_%D0%9F%D1%80%D0%B5%D1%81%D0%B2%D1%8F%D1%82%D0%BE%D1%97_%D0%91%D0%BE%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B8%D1%86%D1%96_(%D0%97%D0%B0%D0%BB%D1%96%D1%89%D0%B8%D0%BA%D0%B8)"
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
