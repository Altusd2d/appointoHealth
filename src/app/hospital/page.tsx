"use client";
import { useState } from "react";
import { findHospital, type HospitalRecord } from "./hospitalSearch";
import localFont from "next/font/local";
import Link from "next/link";
import Image from "next/image";
import TopHospital from "@/components/topHospital/topHospital";
const font1 = localFont({
  src: "../../fonts/font1.woff2",
});

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

export default function HospitalSearch() {
  const [searchText, setSearchtext] = useState("");
  const [result, setResult] = useState<HospitalRecord[]>([]);
  const [noResult, setNoResult] = useState(false);
  const [expandedHospitalId, setExpandedHospitalId] = useState<string | null>(
    null,
  );

  function handleClick(query: string) {
    setResult(findHospital(query.trim()));
    setNoResult(true);
    setExpandedHospitalId(null);
  }

  return (
    <div id="hospitalSearch">
      <TopHospital />
      <div className="flex  relative justify-center gap-4 items-center max-sm:px-6 border border-amber-300">
         <Image
                    src="/google map.png"
                    alt=""
                    aria-hidden="true"
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px] absolute top-[65%] left-[29%] "
                  />
         
          <input
          value={searchText}
          placeholder="search location"
          onChange={(e) => {
            setSearchtext(e.target.value);
          }}
          className="sm:w-[37vw] w-[68vw] rounded-3xl border border-[#cbcdcd] px-7
           py-2.5 font-2xl mt-14 "
            
        />
        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-[#0066cc] px-5 py-1 h-10 text-center 
           tracking-tight text-base font-semibold text-white mt-14 "
        >
          search
        </button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleClick(searchText);
        }}
        className="flex items-center justify-center gap-4 px-6 py-5 md:px-10 lg:px-18 xl:px-35
      mb-6 "
      >
        <input
          value={searchText}
          placeholder="search hospital/problem"
          onChange={(e) => {
            setSearchtext(e.target.value);
          }}
          className="sm:w-[37vw] w-[68vw] rounded-3xl border border-[#cbcdcd] px-7
           py-2.5 font-2xl mt-14 "
        />
        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-[#0066cc] px-5 py-2 text-center 
           tracking-tight text-base font-semibold text-white mt-14 "
        >
          search
        </button>
      </form>
      {noResult && result.length == 0 && (
        <p className="mx-6 rounded-xl border border-amber-200 bg-amber-50 px-6 py-3 text-amber-700 md:mx-10 lg:mx-18 xl:mx-35">
          No hospitals found for.
        </p>
      )}
      <div className="space-y-5 xl:px-35 lg:px-18 md:px-10 px-6 mb-14">
        {result.map((hospital) => {
          const openText = hospital.services.some((service) =>
            service.toLowerCase().includes("emergency"),
          )
            ? "Open: 24/7 services"
            : "Open: Check hospital timings";

          return (
            <article
              key={hospital.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full border border-slate-300 text-xs font-semibold tracking-[0.25em] text-slate-700">
                    {hospital.name.slice(0, 2).toUpperCase()}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 sm:text-4xl">
                    {hospital.name}
                  </h3>
                </div>
                <Link
                  href="/hospital/premium"
                  type="button"
                  className="cursor-pointer rounded-xl border border-[#0066cc] px-5 py-2 text-lg font-medium text-sky-700 transition hover:bg-sky-50"
                >
                  Know more
                </Link>
              </div>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                {hospital.name} in {hospital.city} provides specialized care for{" "}
                {hospital.specilist.slice(0, 3).join(", ")}.
                <span className="ml-2 inline-flex cursor-pointer items-center gap-1 text-sky-600 hover:text-sky-700">
                  View in maps
                  <Image
                    src="/google map.png"
                    alt=""
                    aria-hidden="true"
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px]"
                  />
                </span>
              </p>

              <p className="mt-5 text-3xl font-medium text-slate-900">
                {openText}
              </p>

              <div className="mt-6 flex flex-col sm:gap-40 gap-5 sm:flex-row sm:items-center sm:justify-betwee">
                <Link
                  // type="button"
                  href="/booking-form"
                  className="rounded-lg bg-[#0066cc] px-5 py-3 text-base font-semibold text-white shadow-md transition hover:bg-sky-700"
                >
                  Book an appointment
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    setExpandedHospitalId((prev) =>
                      prev === hospital.id ? null : hospital.id,
                    )
                  }
                  className="text-left text-base font-medium text-sky-600 transition hover:text-sky-700"
                >
                  {expandedHospitalId === hospital.id
                    ? "View Less..."
                    : "View More..."}
                </button>
              </div>

              {expandedHospitalId === hospital.id && (
                <div className="mt-8 rounded-2xl bg-[#efefef] px-4 py-6 sm:px-8">
                  <p className="max-w-4xl text-lg leading-[1.45] text-[#4a4a4a] sm:text-2xl">
                    {hospital.city} branch is a major center with experienced
                    doctors and advanced treatment facilities.
                    <span className="ml-2 text-[#0a67d4]">view in maps</span>
                    <span className="ml-2">map pin</span>
                  </p>

                  <p className="mt-6 text-3xl font-medium text-[#111111] sm:text-5xl">
                    {openText}
                  </p>

                  <div className="mt-8 space-y-6">
                    {DOCTORS.map((doctor) => (
                      <article
                        key={doctor.id}
                        className="rounded-2xl border border-[#d8d8d8] bg-white px-6 py-5 shadow-[0_3px_10px_rgba(0,0,0,0.15)] sm:px-8"
                      >
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-10">
                          <div className="flex flex-col items-center">
                            <div className="grid h-[120px] w-[120px] place-items-center rounded-full bg-gradient-to-br from-[#d9dde4] to-[#b8c3d6] text-4xl font-semibold text-[#334155] sm:h-[150px] sm:w-[150px] sm:text-5xl">
                              {doctor.initials}
                            </div>
                            <span className="mt-2 rounded-md border border-[#7ba9e8] px-3 py-1 text-sm text-[#1c71d8]">
                              {hospital.name.toLowerCase()}
                            </span>
                          </div>

                          <div className="flex-1">
                            <h2 className="text-2xl font-medium text-[#0a67d4] sm:text-4xl">
                              {doctor.name}
                            </h2>
                            <p className="mt-2 text-lg text-[#1d1d1d] sm:text-xl">
                              {doctor.speciality}
                            </p>
                            <p className="mt-1 text-base text-[#8a8a8a] sm:text-lg">
                              {doctor.experience}
                            </p>
                            <p className="mt-4 max-w-3xl text-base leading-7 text-[#161616] sm:mt-6 sm:text-lg">
                              {doctor.credentials}
                            </p>
                            <button
                              className="px-3 py-1.5 rounded-lg text-black text-[14px] border border-[#cbcdcd]
                                bg-[#199fd9] "
                            >
                              Book an doctor
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Link
                      href="/booking-form"
                      className="w-fit rounded-lg bg-[#0066cc] px-8 py-3 text-lg font-semibold text-white shadow-[0_4px_8px_rgba(0,0,0,0.25)] sm:text-2xl"
                    >
                      Book a appointment
                    </Link>
                    <button
                      type="button"
                      onClick={() => setExpandedHospitalId(null)}
                      className="text-left text-2xl font-medium text-[#0a67d4] transition hover:text-[#084f9f] sm:text-3xl"
                    >
                      View less...
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
