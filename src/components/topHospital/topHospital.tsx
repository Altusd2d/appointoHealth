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
  return (
    <section className=" pt-14 md:pt-20">
      <div className="mx-auto flex w-full max-w-[1220px] flex-wrap items-center justify-center gap-7 px-4">
        {hospitals.map((hospital) => (
          <article
            key={hospital.name}
            className={`relative h-[210px] w-[205px] overflow-hidden rounded-[18px] border border-[#d4d4d4] shadow-[0_4px_10px_rgba(0,0,0,0.16)] ${hospital.cardClass}`}
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
    </section>
  );
}
