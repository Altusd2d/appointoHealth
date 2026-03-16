"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-[#e9e9e9] xl:px-14 lg:px-10 md:px-8 px-5 pt-4 ">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-center justify-between gap-4">
          <Image
            src="/hospital/apollo_logo.jpg"
            alt="Apollo logo"
            width={190*0.25}
            height={60*0.25}
            className="h-auto "
            priority
          />

          <h1 className="md:text-[29px] text-[20px] xl:text-[45px] lg:text-[37px] font-bold leading-none text-[#0f0f0f] text-center">
            Apollo Hospital
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
              Find the best Doctors and best equipment in hyderabad, We have
              the best doctors and spelist for every kind of problems
            </p>

            <p className="md:mt-12 mt-6 xl:text-[24px] md:text-[20px] sm:text-[18px] text-[16px] ">
              Dentist,ENT,cadio,skin,hair,BP,sugar,pragency , Knee
              Pain,emegency,vitamin deficency,Kidney Stones etc.., We have all
              the best doctors for all the kind of problems
            </p>

            <p className="md:mt-12 mt-6 xl:text-[24px] md:text-[20px] sm:text-[18px] text-[16px]">
              CT Scan, X-Ray,MR-Scan,Nano Tubes,Nano Robots etc.., We have all
              the equipments get your all problem at one place
            </p>
          </div>

          <div className="relative min-h-[470px]">
            <div className="absolute right-0 top-2 rounded-none  p-2 shadow-[6px_6px_0px_rgba(0,0,0,0.35)]
            lg:w-[30vw] md:w-[36vw] w-full xl:w-[35vw]">
              <Image
                src="/hospital/apollo.jpg"
                alt="Apollo hospital building"
                width={360*1.4}
                height={430*1.4}
                className=" object-cover lg:min-h-[270px] max-md:w-full h-[240px]"
              />
            </div>

            {/* <div className="absolute left-0 bottom-0 rounded-none bg-white p-2 shadow-[6px_6px_0px_rgba(0,0,0,0.35)]">
              <Image
                src="/hospital/apollo_logo.jpg"
                alt="Apollo"
                width={340*0.5}
                height={200*0.5}
                className="h-a object-cover"
              />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}



