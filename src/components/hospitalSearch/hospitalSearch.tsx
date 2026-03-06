"use client"
import { useState } from "react";
import { findHospital, type HospitalRecord } from "./hospitalData";
import localFont from "next/font/local"
const font1=localFont({
  src:"../../fonts/font1.woff2"
})
export default function HospitalSearch() {
  const[searchText,setSearchteaxt]=useState("");
  const[result,setResult]=useState<HospitalRecord[]>([])
  const[noResult,setNoResult]=useState(false)
   function handleClick(searchText:string){
     setResult(findHospital(searchText))
     setNoResult(true)
  }
  return (
    <div className={ `${font1.className} `}>
      <div className={` flex justify-center items-center my-5 gap-4  xl:px-35 lg:px-18
         md:px-10 px-6 `}>
        <input
          placeholder="search for hospitals"
          onChange={(e)=>{
            setSearchteaxt(e.target.value);
          }}
          className=" rounded-xl border py-2 w-full font-2xl px-7 border-[#cbcdcd]"
        />
        <button 
         onClick={()=>{
            handleClick(searchText);
         }}
         className="text-xl bg-[#0066cc] rounded-xl px-2 py-1.25
          text-center cursor-pointer tracking-tight text-white">search</button>
      </div>
      {
       noResult && result.length==0 &&(
        <p className="rounded-xl border border-amber-200 bg-amber-50 
        xl:mx-35 lg:mx-18 md:mx-10 mx-6 py-3 text-amber-700 px-6">
            No hospitals found for.
          </p>
       )
      }
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

                  <button
                    type="button"
                    className="rounded-xl border border-[#0066cc] px-5 py-2 text-lg font-medium text-sky-700 transition hover:bg-sky-50"
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

                <div className="mt-6 flex flex-col gap-40 sm:flex-row sm:items-center sm:justify-betwee">
                  <button
                    type="button"
                    className="rounded-lg bg-[#0066cc] px-5 py-3 text-base font-semibold text-white shadow-md transition hover:bg-sky-700"
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
    

  );
}
