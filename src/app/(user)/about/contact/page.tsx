import Link from "next/link";
import Image from "next/image";
import { priestsList } from "./assets/priestsList";

const Page = () => {
  return (
    <div className="text-center">
      <h2>Контакти</h2>
      <p>
        Тел: <Link href="tel:+380673547830">+38 (067) 354 78 30</Link>
        <br />
        Email:{" "}
        <Link href="mailto:oivansendzyuk@ukr.net">oivansendzyuk@ukr.net</Link>
      </p>
      <h2>Розташування</h2>
      <p>
        вулиця Гайворонського, 4
        <br />
        місто Заліщики
        <br />
        Тернопільська область
        <br />
        <span className="inline-flex items-center gap-2">
          <span>Україна</span>
          <span className="relative inline-block h-5 w-5">
            <Image
              src={"/svgs/flag_ukraine.svg"}
              alt="flag-ukraine"
              fill
              title="Слава Україні! Glory to Ukraine!"
            />
          </span>
        </span>
        <br />
        48601
      </p>
      <iframe
        className="mx-[auto] my-[0] aspect-square w-full rounded-2xl lg:w-1/3"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2636.453034900889!2d25.732980676800324!3d48.63944791608875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47315b415371f15f%3A0x4cd4063e528e6b36!2sParafiya%20Pokrovy%20Presvyatoyi%20Bohorodytsi!5e0!3m2!1sen!2sua!4v1695140659432!5m2!1sen!2sua"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <h2>Контакти священиків</h2>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {priestsList.map((priest) => {
          return (
            <div
              className="rounded-2xl border-[0.25rem] border-[solid] border-[white] p-2 text-center"
              key={priest.name}
            >
              <div className="relative mx-[auto] my-[0] h-48 w-48">
                <Image
                  className="mx-[auto] my-[0] rounded-2xl"
                  fill
                  sizes=" (min-width: 640px) 200px, 100px"
                  src={priest.photo}
                  alt={priest.name}
                />
              </div>

              <h3>
                {priest.name}
                <br />
                {priest.surname}
              </h3>
              <p>{priest.title}</p>
              <Link href={`tel:${priest.phone}`}>{priest.phone}</Link>
              <br />
              <Link href={`mailto:${priest.email}`}>{priest.email}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
