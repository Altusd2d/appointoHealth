import Link from "next/link";
import { notFound } from "next/navigation";
import { findHospitalBySlug } from "../hospitalSearch";


type Hospital = {
  id: string;
  name: string;
  gmail: string;
  password: string;
  logo: string | null;
  location: string | null;
  description: string | null;
  hero_image1: string | null;
  hero_image2: string | null;
  is_premium: boolean;
  open_time: string | null;
};


type HospitalSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const DOCTORS = [
  {
    id: "d-001",
    name: "Dr.Chandra Shakar Reddy",
    speciality: "cardio specialist",
    experience: "5 years of experience",
    credentials:
      "MBBS, MD - General Medicine, DM - Gastroenterology, Fortis Hospital, Jaipur",
    initials: "CR",
  },
  {
    id: "d-002",
    name: "Dr.Padma Latha",
    speciality: "cardio specialist",
    experience: "15 years of experience",
    credentials:
      "MBBS, MD - General Medicine, DM - Gastroenterology, Fortis Hospital, Jaipur",
    initials: "PL",
  },
];

export default async function HospitalSlugPage({ params }: HospitalSlugPageProps) {
  const { slug } = await params;
  const hospital = findHospitalBySlug(slug);

  if (!hospital) {
    notFound();
  }

  const isTwentyFourSeven = hospital.services.some((service) =>
    service.toLowerCase().includes("emergency")
  );

  const openText = isTwentyFourSeven
    ? "Open: 24/7 services"
    : "Open: Check hospital timings";

  const logoText = hospital.name.split(" ")[0].toUpperCase();
  const badgeText = hospital.name.toLowerCase();

  return (
    <section className="min-h-screen bg-[#efefef] px-4 py-8 sm:px-8">
      <div className="mx-auto w-full max-w-5xl rounded-xl bg-[#efefef]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <div className="flex items-center gap-2 text-[#10294f]">
            <span className="grid h-7 w-7 place-items-center rounded-full border border-[#10294f] text-sm font-semibold">
              A
            </span>
            <span className="text-sm tracking-[0.35em]">{logoText}</span>
          </div>
          <h1 className="text-4xl font-bold text-[#111111] sm:text-6xl">
            {hospital.name}
          </h1>
        </div>

        <p className="mt-8 max-w-4xl text-2xl leading-[1.45] text-[#4a4a4a]">
          {hospital.city} branch is a major center with experienced doctors and
          advanced treatment facilities.
          <span className="ml-2 text-[#0a67d4]">view in maps</span>
          <span className="ml-2">map pin</span>
        </p>

        <p className="mt-8 text-5xl font-medium text-[#111111]">{openText}</p>

        <div className="mt-10 space-y-8">
          {DOCTORS.map((doctor) => (
            <article
              key={doctor.id}
              className="rounded-2xl border border-[#d8d8d8] bg-white px-6 py-5 shadow-[0_3px_10px_rgba(0,0,0,0.15)] sm:px-8"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-10">
                <div className="flex flex-col items-center">
                  <div className="grid h-[150px] w-[150px] place-items-center rounded-full bg-gradient-to-br from-[#d9dde4] to-[#b8c3d6] text-5xl font-semibold text-[#334155]">
                    {doctor.initials}
                  </div>
                  <span className="mt-2 rounded-md border border-[#7ba9e8] px-3 py-1 text-sm text-[#1c71d8]">
                    {badgeText}
                  </span>
                </div>

                <div className="flex-1">
                  <h2 className="text-4xl font-medium text-[#0a67d4]">
                    {doctor.name}
                  </h2>
                  <p className="mt-2 text-xl text-[#1d1d1d]">{doctor.speciality}</p>
                  <p className="mt-1 text-lg text-[#8a8a8a]">{doctor.experience}</p>
                  <p className="mt-6 max-w-3xl text-lg leading-7 text-[#161616]">
                    {doctor.credentials}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-5 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            className="rounded-lg bg-[#0066cc] px-8 py-4 text-2xl font-semibold text-white shadow-[0_4px_8px_rgba(0,0,0,0.25)]"
          >
            Book a appoinment
          </button>

          <Link
            href="/hospital"
            className="text-3xl font-medium text-[#0a67d4] transition hover:text-[#084f9f]"
          >
            View less...
          </Link>
        </div>
      </div>
    </section>
  );
}
