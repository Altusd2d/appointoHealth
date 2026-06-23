


"use client";

import Image from "next/image";
import Link from "next/link";
import { premiumDoctors } from "./premiumDoctorsData";

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

const doctorSlugById = new Map(
  premiumDoctors.map((doctor) => [doctor.id, doctor.slug]),
);

function DoctorItem({ doctor }: { doctor: DoctorCard }) {
  const doctorSlug = doctorSlugById.get(doctor.id);

  return (
    <article className="relative overflow-hidden rounded-[16px] shadow-[0_8px_22px_rgba(0,0,0,0.28)]">
      {doctorSlug ? (
        <Link
          href={`/hospital/premium/${doctorSlug}`}
          aria-label={`Open ${doctor.name}`}
          className="absolute inset-0 z-20"
        />
      ) : null}
      <Image
        src="/hospital/doctor1.png"
        alt={doctor.name}
        width={440}
        height={510}
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
          {/* {doctor.role} */}
          doctorRole
        </p>
        <p className="mt-2 md:text-[16px] text-[12px] font-semibold ">
          {/* {doctor.achievement} */}
          achivement
        </p>
        <p className="mt-1 md:text-[16px] text-[12px] font-semibold">
          {doctor.experience}
        </p>
      </div>
    </article>
  );
}

export default function Doctors({ id }: { id: string }) {
  const [doctors, setdoctors] = useState<Doctor[]>([]);

  const fetchHospital = async () => {
    const res = await fetch(`/api/home/getDoctors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    const data = await res.json();
    console.log("data", data);
    setdoctors(data.message);
  };

  useEffect(() => {
    console.log("id", id);

    fetchHospital();
  }, []);

  useEffect(() => {
    console.log(doctors);
  }, [doctors]);

  return (
    <section className="mt-10 bg-[#e9e9e9] py-5 xl:px-27 lg:px-10 sm:px-10 px-5">
      <div className="mx-auto grid  grid-cols-1 justify-items-center gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <DoctorItem key={doctor.id} doctor={doctor} />
        ))}
        {doctors.length == 5 && (
          <div className="grid max-h-[352px] max-w-[255px] place-items-center">
            <button
              type="button"
              className="md:text-[40px] text-[34px] font-semibold text-[#111111]">
              View More...
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

//"/hospital/doctor1.png"
