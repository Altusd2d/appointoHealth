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

export default function HospitalSearch() {
  const [searchText, setSearchtext] = useState("");
  const [result, setResult] = useState<HospitalRecord[]>([]);
  const [noResult, setNoResult] = useState(false);

  function handleClick(query: string) {
    setResult(findHospital(query.trim()));
    setNoResult(true);
  }

  return (
    <div  id="hospitalSearch">
      <TopHospital />
      <form 
      onSubmit={(e)=>{
        e.preventDefault();
        handleClick(searchText);
      }}
      className="flex items-center justify-center gap-4 px-6 py-5 md:px-10 lg:px-18 xl:px-35
      mb-6 ">
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
              service.toLowerCase().includes("emergency")
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
                  <Link href="/hospital/premium"
                    type="button"
                    
                    className="cursor-pointer rounded-xl border border-[#0066cc] px-5 py-2 text-lg font-medium text-sky-700 transition hover:bg-sky-50"
                  >
                    Know more
                  </Link>
                </div>

                <p className="mt-6 text-lg leading-8 text-slate-600">
                  {hospital.name} in {hospital.city} provides specialized care
                  for {hospital.diseaseTags.slice(0, 3).join(", ")}.
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
                  <Link
                    // type="button"
                    href={`/hospital/${hospital.slug}`}
                    className="text-base font-medium text-sky-600 transition hover:text-sky-700"
                  >
                    View More...
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
    </div>
    

  );
}
