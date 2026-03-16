"use client";

import Image from "next/image";

type DoctorCard = {
  id: string;
  name: string;
  role: string;
  achievement: string;
  experience: string;
  image: string;
};

const doctors: DoctorCard[] = [
  {
    id: "doc-1",
    name: "Dr DAS",
    role: "Cario Expert",
    achievement: "Gold Medalist in AIIMS Bibinagar,",
    experience: "10 years Experiance , more than 1500 patients",
    image: "/hospital/doctor1.png",
  },
  {
    id: "doc-2",
    name: "Dr M Kishan Kumar",
    role: "Skin Spelist",
    achievement: "Gold Medalist in AIIMS Bibinagar,",
    experience: "15 years Experiance , more than 1500 patients",
    image: "/hospital/doctor1.png",
  },
  {
    id: "doc-3",
    name: "Dr Bupal Reddy",
    role: "ENT Expert",
    achievement: "Gold Medalist in AIIMS Bibinagar,",
    experience: "10 years Experiance , more than 1500 patients",
    image: "/hospital/doctor1.png",
  },
  {
    id: "doc-4",
    name: "Dr Latha",
    role: "Cario Expert",
    achievement: "Gold Medalist in AIIMS Bibinagar,",
    experience: "10 years Experiance , more than 1500 patients",
    image: "/hospital/doctor1.png",
  },
  {
    id: "doc-5",
    name: "Dr Sri Lakshmi",
    role: "Cario Expert",
    achievement: "Gold Medalist in AIIMS Bibinagar,",
    experience: "10 years Experiance , more than 1500 patients",
    image: "/hospital/doctor1.png",
  },
];

function DoctorItem({ doctor }: { doctor: DoctorCard }) {
  return (
    <article className="relative overflow-hidden rounded-[16px] shadow-[0_8px_22px_rgba(0,0,0,0.28)]">
      <Image
        src={doctor.image}
        alt={doctor.name}
        width={440}
        height={510}
        // sizes="255px"
        quality={100}
        unoptimized
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.82)] via-[rgba(0,0,0,0.28)] to-transparent" />

      <div className="absolute bottom-3 left-3 right-3 text-white px-2.5 pb-3">
        <h3 className="xl:text-[40px] lg:text[35px] md:text-[28px] text-[20px] leading-[0.98] font-bold tracking-[-0.02em]">
          {doctor.name}
        </h3>
        <p className="mt-2 md:text-[16px] text-[12px] font-medium leading-none">
          {doctor.role}
        </p>
        <p className="mt-2 md:text-[16px] text-[12px] font-semibold ">
          {doctor.achievement}
        </p>
        <p className="mt-1 md:text-[16px] text-[12px] font-semibold">
          {doctor.experience}
        </p>
      </div>
    </article>
  );
}

export default function Doctors() {
  return (
    <section className="mt-10 bg-[#e9e9e9] py-5 xl:px-27 lg:px-10 sm:px-10 px-5">
      <div className="mx-auto grid  grid-cols-1 justify-items-center gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <DoctorItem key={doctor.id} doctor={doctor} />
        ))}

        <div className="grid max-h-[352px] max-w-[255px] place-items-center">
          <button
            type="button"
            className="md:text-[40px] text-[34px] font-semibold text-[#111111]"
          >
            View More...
          </button>
        </div>
      </div>
    </section>
  );
}
