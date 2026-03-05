"use client";

import { useMemo, useState } from "react";
import { findHospital, type HospitalRecord } from "./hospitalData";

export default function HospitalSearch() {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<HospitalRecord[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const query = useMemo(() => searchText.trim(), [searchText]);

  const handleSearch = () => {
    setHasSearched(true);
    setResults(findHospital(query));
  };

  return (
    <section className="bg-slate-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl">
          Find Hospitals
        </h2>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="Search disease like cardiology, diabetes, cancer..."
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-sky-300 transition focus:ring-2"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="rounded-xl bg-sky-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-sky-700"
          >
            Search
          </button>
        </div>

        {hasSearched && results.length === 0 && (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-700">
            No hospitals found for "{query}".
          </p>
        )}

        <div className="space-y-5">
          {results.map((hospital) => {
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

                  <button
                    type="button"
                    className="rounded-xl border border-sky-300 px-5 py-2 text-lg font-medium text-sky-700 transition hover:bg-sky-50"
                  >
                    Know more
                  </button>
                </div>

                <p className="mt-6 text-lg leading-8 text-slate-600">
                  {hospital.name} in {hospital.city} provides specialized care
                  for {hospital.diseaseTags.slice(0, 3).join(", ")}.
                  <span className="ml-2 cursor-pointer text-sky-600 hover:text-sky-700">
                    View in maps
                  </span>
                </p>

                <p className="mt-5 text-3xl font-medium text-slate-900">
                  {openText}
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    className="rounded-lg bg-sky-600 px-5 py-3 text-base font-semibold text-white shadow-md transition hover:bg-sky-700"
                  >
                    Book an appointment
                  </button>
                  <button
                    type="button"
                    className="text-base font-medium text-sky-600 transition hover:text-sky-700"
                  >
                    View More...
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
