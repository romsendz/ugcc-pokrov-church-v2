import Link from "next/link";
import Establishment from "./assets/Establishment";
import fullHistoryHTML from "./assets/FullHistory";
import priestsHTML from "./assets/Priests";

const Page = () => {
  return (
    <>
      <h2>Історія</h2>
      <ul>
        <li className="underline">
          <Link href={"#establishment"}>Заснування</Link>
        </li>
        <li className="underline">
          <Link href={"#history"}>Детальна історія</Link>
        </li>
        <li className="underline">
          <Link href={"#priests"}>Священики</Link>
        </li>
      </ul>
      <section id="establishment">
        <Establishment />
      </section>
      <hr className="border-[black]" />
      <section
        id="history"
        dangerouslySetInnerHTML={{ __html: fullHistoryHTML }}
      />
      <hr className="border-[black]" />
      <section id="priests" dangerouslySetInnerHTML={{ __html: priestsHTML }} />
    </>
  );
};

export default Page;
