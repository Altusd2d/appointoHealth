"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import apolloLogo from "../../../public/topHospital/apollo .jpg";
import yashodaLogo from "../../../public/topHospital/yashoda.png";
import starLogo from "../../../public/topHospital/star.jpg";
import kimsLogo from "../../../public/topHospital/kims.jpg";
import medicoverLogo from "../../../public/topHospital/medicore.png";

const hospitals = [
  { name: "Apollo", logo: apolloLogo, cardClass: "" },
  { name: "Yashoda Hospitals", logo: yashodaLogo, cardClass: "" },
  { name: "Star Hospitals", logo: starLogo, cardClass: "" },
  { name: "KIMS Hospitals", logo: kimsLogo, cardClass: "object-center size-20" },
  { name: "Medicover Fertility", logo: medicoverLogo, cardClass: "bg-[#0f4d97]" },
];

export default function TopHospital() {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const maxStartIndex = Math.max(0, hospitals.length - visibleCards);

  useEffect(() => {
    if (startIndex > maxStartIndex) {
      setStartIndex(maxStartIndex);
    }
  }, [maxStartIndex, startIndex]);

  const visibleHospitals = hospitals.slice(startIndex, startIndex + visibleCards);

  return (
    <section className="pt-14 md:pt-20">
      <div className="mx-auto w-full max-w-[1420px] px-4">
        <div className="relative mx-auto flex w-full max-w-[1080px] items-center justify-center gap-3 rounded-2xl  px-4 py-7 sm:gap-4 sm:px-7 md:px-12 md:py-10">
          <button
            type="button"
            onClick={() => setStartIndex((prev) => Math.max(0, prev - 1))}
            disabled={startIndex === 0}
            aria-label="Previous hospitals"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-blue-700 text-2xl text-white/75 transition  disabled:cursor-not-allowed disabled:opacity-35"
          >
            &#8249;
          </button>

          <div className="grid w-full grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleHospitals.map((hospital) => (
              <article
                key={hospital.name}
                className={`relative h-[210px] w-full max-w-[205px] overflow-hidden rounded-[18px] border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.35)] ${hospital.cardClass}`}
              >
                <Image
                  src={hospital.logo}
                  alt={hospital.name}
                  fill
                  className="object-contain p-6"
                  sizes="205px"
                />
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setStartIndex((prev) => Math.min(maxStartIndex, prev + 1))}
            disabled={startIndex >= maxStartIndex}
            aria-label="Next hospitals"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-blue-700 text-2xl text-white/75 transition  disabled:opacity-35"
          >
            &#8250;
          </button>
        </div>
      </div>
    </section>
  );
}
