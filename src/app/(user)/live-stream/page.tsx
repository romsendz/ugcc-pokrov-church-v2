"use client";
import { useAppContext } from "@contexts/AppContext/useAppContext";
import { ROUTES } from "@lib/routes";
import { BadgeInfoIcon } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const { streamStatus } = useAppContext();
  const readyToStream = streamStatus.isOnline && streamStatus.videoId;
  return (
    <div className="flex flex-grow flex-col gap-6 px-12 py-8">
      <h2 className="text-center">Пряма трансляція</h2>
      {readyToStream && (
        <iframe
          loading="lazy"
          className="mx-[auto] my-[0] h-[300px] w-full flex-grow rounded-2xl lg:h-[500px] lg:w-1/2"
          src={`https://www.youtube.com/embed/${streamStatus.videoId}`}
        />
      )}
      <div className="mx-[auto] my-[0] mt-4 flex flex-grow flex-col items-center justify-center rounded-2xl p-4 [box-shadow:rgba(0,_0,_0,_0.56)_0px_22px_70px_4px] lg:w-1/2">
        <BadgeInfoIcon size={45} />
        <p className="text-center">
          <b>Пряма трансляція Богослужінь</b> доступна <b>кожної неділі</b> та{" "}
          <b>у свята</b>. <br /> Для детальнішої інформації ознайомтесь із{" "}
          <br />{" "}
          <Link className="!underline" href={ROUTES.schedule}>
            розкладом богослужінь
          </Link>{" "}
          <br /> на поточний тиждень.
        </p>
      </div>
    </div>
  );
};

export default Page;
