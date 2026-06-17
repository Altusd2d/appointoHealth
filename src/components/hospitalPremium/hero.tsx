"use client";

import Image from "next/image";

interface Hospital {
  id: string;
  name: string;
  logo: string | null;
  location: string | null;
  description: string | null;
  hero_image1: string | null;
  hero_image2: string | null;
  is_premium: boolean;
  open_time: string | null;
}

export default function Hero({ data }: { data: Hospital }) {
  const getValidImage = (image: string | null) => {
    if (
      image &&
      (image.startsWith("/") ||
        image.startsWith("http://") ||
        image.startsWith("https://"))
    ) {
      return image;
    }

    return "/temp.jpeg";
  };

  return (
    <section className="bg-[#e9e9e9] xl:px-14 lg:px-10 md:px-8 px-5 pt-4">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-center justify-between gap-4">
          <Image
            src={getValidImage(data.logo)}
            alt={data.name}
            width={48}
            height={48}
            className="h-auto"
            priority
          />

          <h1 className="md:text-[29px] text-[20px] xl:text-[45px] lg:text-[37px] font-bold leading-none text-[#0f0f0f] text-center">
            {data.name}
          </h1>

          <button
            type="button"
            className="rounded-[12px] bg-[#08315f] px-6 md:py-3 py-2 md:text-[24px] text-[20px] font-semibold text-white"
          >
            Location
          </button>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-5 items-start">
          <div className="text-[#111111] font-semibold leading-[1.12] tracking-[-0.01em]">
            <p className="xl:text-[24px] md:text-[20px] sm:text-[18px] text-[16px]">
              {data.description}
            </p>

            <p className="md:mt-12 mt-6 xl:text-[24px] md:text-[20px] sm:text-[18px] text-[16px]">
              Open Time: {data.open_time}
            </p>

            <p className="md:mt-12 mt-6 xl:text-[24px] md:text-[20px] sm:text-[18px] text-[16px]">
              {data.is_premium ? "Premium Hospital" : "Standard Hospital"}
            </p>
          </div>

          <div className="relative min-h-[470px]">
            <div
              className="absolute right-0 top-2 rounded-none p-2
              shadow-[6px_6px_0px_rgba(0,0,0,0.35)]
              lg:w-[30vw] md:w-[36vw] w-full xl:w-[35vw]"
            >
              <Image
                src={getValidImage(data.hero_image1)}
                alt={data.name}
                width={504}
                height={602}
                className="object-cover lg:min-h-[270px] max-md:w-full h-[240px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}