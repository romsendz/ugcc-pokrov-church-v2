import HeroVideo from "@components/HeroVideo";
import Link from "next/link";
import LiveStreamButton from "@components/LiveStreamButton";
import Image from "next/image";
import DayToday from "@components/DayToday";

export default function Home() {
  return (
    <div className="flex flex-col lg:relative">
      <HeroVideo />
      <hr className="mt-10 h-2 w-full border-0 bg-[#a19d99] lg:hidden" />
      <section className="flex flex-col lg:absolute lg:top-[20%] lg:z-[1] lg:rounded-br-xl lg:rounded-tr-xl lg:bg-[#00000050] lg:backdrop-blur-md lg:backdrop-filter">
        <div className="m-0 mr-[unset] flex w-full pl-0 lg:grid lg:grid-rows-[1fr_min-content_1fr]">
          <Link
            href={"/live-stream"}
            className="flex flex-1 cursor-pointer flex-col items-center justify-between gap-4 bg-[#e6ded6] p-3 transition-colors hover:bg-[#e2c8ae] lg:flex-row lg:rounded-tr-xl lg:border-2 lg:border-l-[0] lg:border-transparent lg:border-b-transparent lg:bg-transparent lg:p-2 lg:hover:border-[#e29579] lg:hover:bg-transparent"
          >
            <span className="text-center text-2xl font-bold lg:text-xl lg:text-brand">
              Пряма <br className="sm:hidden" /> трансляція
            </span>
            <LiveStreamButton noLink={true} fallbackIconSize={25} />
          </Link>
          <div className="m-0 w-2 bg-[#a19d99] lg:hidden" />
          <hr className="border-1 hidden border-[#e29579] lg:block" />
          <Link
            href={"/schedule"}
            className="flex flex-1 cursor-pointer flex-col items-center justify-between gap-4 bg-[#e6ded6] p-3 transition-colors hover:bg-[#e2c8ae] lg:flex-row lg:rounded-br-xl lg:border-2 lg:border-l-[0] lg:border-transparent lg:border-t-transparent lg:bg-transparent lg:p-2 lg:hover:border-[#e29579] lg:hover:bg-transparent"
          >
            <span className="text-center text-2xl font-bold lg:text-xl lg:text-brand">
              Розклад <br className="sm:hidden" /> Богослужінь
            </span>
            <Image
              className="mx-[0] my-[auto] lg:hidden"
              width={35}
              height={35}
              src={"/svgs/schedule.svg"}
              alt="calendar"
            />
            <Image
              className="mx-[0] my-[auto] hidden lg:block"
              width={25}
              height={25}
              src={"/svgs/schedule-light.svg"}
              alt="calendar"
            />
          </Link>
        </div>
      </section>
      <hr className="h-2 w-full border-0 bg-[#a19d99] lg:hidden" />
      <DayToday />
    </div>
  );
}
