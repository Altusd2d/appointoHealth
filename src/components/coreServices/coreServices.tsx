import twentyfour from "../../../public/coreServices/24_by_7.jpg";
import boxicon from "../../../public/coreServices/boxicons_hospital.svg";
import doctor from "../../../public/coreServices/fontisto_doctor.png";
import plus from "../../../public/coreServices/Vector.png";
import search from "../../../public/coreServices/search.png";
import Image from "next/image";
import localFont from "next/font/local";

const font1 = localFont({
  src: "../../fonts/font1.woff2",
});

export default function CoreService() {
  return (
    <section id="services" className={`px-4 py-4 sm:px-6 md:px-12 xl:px-20 ${font1.className}`}>
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-6 sm:gap-8 lg:flex-row lg:items-start lg:gap-10">
        <Image
          src={twentyfour}
          alt="24 by 7 support"
          width={680}
          height={680}
          className="h-auto w-full max-w-[240px] object-contain sm:max-w-[320px] md:max-w-[360px] lg:max-w-[420px] xl:max-w-[460px]"
        />

        <div className="grid w-full grid-cols-1 justify-items-start gap-x-6 gap-y-5 px-4 text-left grid-cols-2 sm:h-[380px] md:gap-y-4 lg:gap-x-10 xl:gap-x-12">
          {coredata.map((items, ind) => {
            return (
              <div className="flex w-full items-center gap-3 sm:gap-4" key={`${items.title}-${ind}`}>
                <Image
                  src={items.image}
                  alt={items.des}
                  width={96}
                  height={96}
                  className=" shrink-0 object-contain sm:h-14 sm:w-14 lg:h-16 lg:w-16 h-9 w-9"
                />
                <div className="flex flex-col justify-center gap-1 tracking-tight sm:gap-2">
                  <span className="text-2xl  font-semibold text-[#7f7e7e] sm:text-4xl md:text-3xl lg:text-4xl xl:text-6xl">
                    {items.title}
                  </span>
                  <span className="text-sm leading-tight text-[#a0a0a0] sm:text-base lg:text-lg">{items.des}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const coredata = [
  {
    id: 1,
    image: plus,
    title: "24/7",
    des: "services",
  },
  {
    id: 2,
    image: boxicon,
    title: "250+",
    des: "hospitals",
  },
  {
    id: 3,
    image: boxicon,
    title: "Instant",
    des: "Confirmation",
  },
  {
    id: 4,
    image: boxicon,
    title: "Easy",
    des: "Reschedule",
  },
  {
    id: 5,
    image: search,
    title: "specific",
    des: "search",
  },
  {
    id: 6,
    image: doctor,
    title: "specialist",
    des: "doctors",
  },
];
