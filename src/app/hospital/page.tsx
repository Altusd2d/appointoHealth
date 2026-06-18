"use client";
import { useState ,useEffect} from "react";
import { findHospital, type HospitalRecord } from "./hospitalSearch";
import Link from "next/link";
import Image from "next/image";
import TopHospital from "@/components/topHospital/topHospital";


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
  doctors:doctor[]
};

type doctor ={
  id: string;
  name: string;
  specialist: string | null;
  education: string | null;
  experience: string | null;
  image: string | null;
  hospital_id: string | null;
  availability: Record<string, number[]> | null;
}
type Availability = Record<string, number[]>;

const DOCTORS = [
  {
    id: "d-001",
    name: "Dr.Chandra Shakar Reddy",
    speciality: "cardio specialist",
    experience: "5 years of experience",
    credentials:
      "MBBS, MD - General Medicine, DM - Gastroenterology, Fortis Hospital, Jaipur",
    initials: "CR",
    image: "/hospital/doctor1.png",
  },
  {
    id: "d-002",
    name: "Dr.Padma Latha",
    speciality: "cardio specialist",
    experience: "15 years of experience",
    credentials:
      "MBBS, MD - General Medicine, DM - Gastroenterology, Fortis Hospital, Jaipur",
    initials: "PL",
    image: "/hospital/doctor2.png",
  },
];

const SLOT_DAYS = [
  {
    id: "30-3-2026",
    label: "30-3-2026",
    slots: [
      { id: "30-830", label: "8:30 AM", state: "available" },
      { id: "30-930", label: "9:30 AM", state: "selected" },
      { id: "30-1030", label: "10:30 AM", state: "available" },
      { id: "30-1100", label: "11:00 AM", state: "available" },
      { id: "30-1200", label: "12:00PM", state: "available" },
      { id: "30-1230", label: "12:30 PM", state: "available" },
      { id: "30-130", label: "1:30 PM", state: "available" },
      { id: "30-200", label: "2:00PM", state: "available" },
    ],
  },
  {
    id: "31-3-2026",
    label: "31-3-2026",
    slots: [
      { id: "31-930", label: "9:30 AM", state: "selected" },
      { id: "31-1030", label: "10:30 AM", state: "available" },
      { id: "31-1100", label: "11:00 AM", state: "available" },
      { id: "31-1130", label: "11:30AM", state: "unavailable" },
      { id: "31-1200", label: "12:00PM", state: "available" },
      { id: "31-1230", label: "12:30 PM", state: "available" },
      { id: "31-130", label: "1:30 PM", state: "available" },
      { id: "31-200", label: "2:00PM", state: "available" },
      { id: "31-230", label: "2:30PM", state: "available" },
      { id: "31-430", label: "4:30PM", state: "unavailable" },
      { id: "31-530", label: "5:30PM", state: "available" },
      { id: "31-600", label: "6:00 PM", state: "available" },
    ],
  },
  {
    id: "1-4-2026",
    label: "1-4-2026",
    slots: [
      { id: "1-900", label: "9:00 AM", state: "available" },
      { id: "1-1000", label: "10:00 AM", state: "available" },
      { id: "1-1100", label: "11:00 AM", state: "available" },
      { id: "1-1200", label: "12:00PM", state: "available" },
      { id: "1-100", label: "1:00 PM", state: "available" },
      { id: "1-200", label: "2:00PM", state: "available" },
      { id: "1-300", label: "3:00 PM", state: "available" },
      { id: "1-500", label: "5:00 PM", state: "available" },
    ],
  },
];


const DEFAULT_SLOT_DAY_ID = SLOT_DAYS[1].id;

function getSlotsForDay(dayId: string) {
  return SLOT_DAYS.find((day) => day.id === dayId)?.slots ?? SLOT_DAYS[1].slots;
}

function getDefaultSlotId(dayId: string) {
  return (
    getSlotsForDay(dayId).find(
      (slot) => slot.state === "selected" || slot.state === "available",
    )?.id ?? ""
  );
}

export default function HospitalSearch() {
  const [searchText, setSearchtext] = useState("");
  const [result, setResult] = useState<Hospital[]>([]);
  const [noResult, setNoResult] = useState(false);
  const [loading, setloading] = useState<boolean>(false);
  const [expandedHospitalId, setExpandedHospitalId] = useState<string | null>(
    null,
  );
  const [expandedDoctorSlots, setExpandedDoctorSlots] = useState<
    Record<string, boolean>
  >({});
  const [activeSlotDayByDoctor, setActiveSlotDayByDoctor] = useState<
    Record<string, string>
  >({});
  const [selectedSlotByDoctor, setSelectedSlotByDoctor] = useState<
    Record<string, string>
  >({});


    const formatDate = (date: Date) =>
    `${String(date.getDate()).padStart(2, "0")}-${String(
    date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;

  const ChangeDate=(today:Date)=>{
     const yesterday = new Date(today);
     yesterday.setDate(yesterday.getDate() - 1);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const defaultDates = [yesterday, today, tomorrow]
    setslotdates(defaultDates);

  }



const [slotsdate, setslotdates] = useState<Date []>([]);

console.log(slotsdate);
console.log(slotsdate[0]);
console.log(typeof slotsdate[0]);
console.log(slotsdate[0] instanceof Date);

 async function handleClick(hospital: string) {
  console.log(hospital);
  setloading(true);

  try {
    const res = await fetch("/api/home/getHospital", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name:hospital }),
    });

    const data = await res.json();
    console.log(data);
    setResult(data.message)
  } catch (err) {
    console.log(err);
  }finally{
    setloading(false);
  }
}


 async function GetSlots(hospital: string) {
  console.log(hospital);
  setloading(true);

  try {
    const res = await fetch("/api/home/getHospital", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name:hospital }),
    });

    const data = await res.json();
    console.log(data);
    setResult(data.message)
  } catch (err) {
    console.log(err);
  }finally{
    setloading(false);
  }
}


useEffect(() => {
  const today = new Date();
  ChangeDate(today)
  console.log(slotsdate)
}, []);




  return (
    <div id="hospitalSearch">
      {/* <TopHospital /> */}
      {/* <div className="flex justify-center gap-4 items-center max-sm:px-6 -mb-7 ">
        <div className="relative mt-14 sm:w-[37vw] w-[68vw]">
          <Image
            src="/google map.png"
            alt=""
            aria-hidden="true"
            width={18}
            height={18}
            className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2"
          />

          <input
            // value={searchText}
            placeholder="search location"
            // onChange={(e) => {
            //   setSearchtext(e.target.value);
            // }}
            className="w-full rounded-3xl border border-[#cbcdcd] py-2.5 pl-12 pr-7 font-2xl"
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-[#0066cc] px-5 py-1 h-10 text-center 
           tracking-tight text-base font-semibold text-white mt-14 ">
          search
        </button>
      </div> */}
      <form
        onSubmit={(e) => {
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
          className={`cursor-pointer rounded-lg bg-[#0066cc] px-5 py-2 text-center
                    tracking-tight text-base font-semibold text-white mt-14
                    ${loading || searchText.length==0 ? "opacity-50 pointer-events-none":""}`}>
           {loading?"searching":"search"}
        </button>
      </form>
      {noResult && (!result || result.length === 0)  && (
        <p className="mx-6 rounded-xl border border-amber-200 bg-amber-50 px-6 py-3 text-amber-700 md:mx-10 lg:mx-18 xl:mx-35">
          No hospitals found for.
        </p>
      )}
      <div className="space-y-5 xl:px-35 lg:px-18 md:px-10 px-6 mb-14">
        {result.map((hospital:Hospital) => {
          // const openText = hospital.services.some((service) =>
          //   service.toLowerCase().includes("emergency"),
          // )
          //   ? "Open: 24/7 services"
          //   : "Open: Check hospital timings";

          return (
            <article
              key={hospital.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
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
                  href={`/hospital/${hospital.id}`}
                  type="button"
                  className="cursor-pointer rounded-xl border border-[#0066cc] px-5 py-2 text-lg font-medium text-sky-700 transition hover:bg-sky-50">
                  Know more
                </Link>
              </div>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                {hospital.name} in {hospital.location} provides specialized care for{" "}
                {/* {hospital.specilist.slice(0, 3).join(", ")}. */}
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
                openText:24/7
              </p>

              <div className="mt-6 flex flex-col sm:gap-40 gap-5 sm:flex-row sm:items-center sm:justify-betwee">
                {/* <Link
                  // type="button"
                  href="/booking-form"
                  className="rounded-lg bg-[#0066cc] px-5 py-3 text-base font-semibold text-white shadow-md transition hover:bg-sky-700">
                  Book an appointment
                </Link> */}
                <button
                  type="button"
                  onClick={() =>
                    setExpandedHospitalId((prev) => {
                      const nextHospitalId =
                        prev === hospital.id ? null : hospital.id;

                      if (nextHospitalId !== hospital.id) {
                        setExpandedDoctorSlots({});
                      }

                      return nextHospitalId;
                    })
                  }
                  className="text-left text-base font-medium text-sky-600 transition hover:text-sky-700">
                  {expandedHospitalId === hospital.id
                    ? ""
                    : "View More..."}
                </button>
              </div>

              {expandedHospitalId === hospital.id && (
                <div className="mt-8 rounded-2xl bg-[#efefef] px-4 py-6 sm:px-8">
                  <p className="max-w-4xl text-lg leading-[1.45] text-[#4a4a4a] sm:text-2xl">
                    {hospital.location} branch is a major center with experienced
                    doctors and advanced treatment facilities.
                    <span className="ml-2 text-[#0a67d4]">view in maps</span>
                    <span className="ml-2">map pin</span>
                  </p>

                  <p className="mt-6 text-3xl font-medium text-[#111111] sm:text-5xl">
                    openTiming:24/7
                  </p>

                  <div className="mt-8 space-y-6">



                    {hospital?.doctors?.map((doctor) => {
                      const isSlotOpen =
                        expandedDoctorSlots[doctor.id] ?? false;
                      const activeSlotDayId =
                        activeSlotDayByDoctor[doctor.id] ?? DEFAULT_SLOT_DAY_ID;
                      const visibleSlots = getSlotsForDay(activeSlotDayId);
                      const selectedSlotId =
                        selectedSlotByDoctor[doctor.id] ??
                        getDefaultSlotId(activeSlotDayId);
                        // console.log(doctor)

                      return (
                        <article
                          key={doctor.id}
                          className="rounded-2xl border border-[#d8d8d8] bg-white px-5 py-5 shadow-[0_3px_10px_rgba(0,0,0,0.15)] sm:px-8">
                          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                            <div className="flex flex-1 flex-col gap-5 sm:flex-row sm:items-start sm:gap-8">
                              <div className="flex flex-col items-center">
                                <Image
                                  src="/hospital/doctor1.png"
                                  alt={doctor.name}
                                  width={150}
                                  height={150}
                                  className="h-[110px] w-[110px] rounded-full object-cover shadow-[0_10px_20px_rgba(15,23,42,0.12)] sm:h-[140px] sm:w-[140px]"
                                />
                                <span className="mt-2 rounded-md border border-[#7ba9e8] bg-white px-3 py-1 text-sm text-[#1c71d8]">
                                  {hospital.name.toLowerCase()}
                                </span>
                              </div>

                              <div className="flex-1">
                                <h2 className="text-2xl font-medium text-[#0a67d4] sm:text-4xl">
                                  {doctor.name}
                                </h2>
                                <p className="mt-2 text-lg text-[#1d1d1d] sm:text-xl">
                                  {/* {doctor.speciality} */}{doctor.education}
                                </p>
                                <p className="mt-1 text-base text-[#8a8a8a] sm:text-lg">
                                  {doctor.experience}
                                </p>
                                <p className="mt-4 max-w-3xl text-base leading-7 text-[#161616] sm:mt-5 sm:text-lg">
                                  {/* {doctor.credentials} */}credentials
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                setExpandedDoctorSlots((prev) => ({
                                  ...prev,
                                  [doctor.id]: !prev[doctor.id],
                                }));
                                setActiveSlotDayByDoctor((prev) => ({
                                  ...prev,
                                  [doctor.id]:
                                    prev[doctor.id] ?? DEFAULT_SLOT_DAY_ID,
                                }));
                                setSelectedSlotByDoctor((prev) => ({
                                  ...prev,
                                  [doctor.id]:
                                    prev[doctor.id] ??
                                    getDefaultSlotId(DEFAULT_SLOT_DAY_ID),
                                }));
                              }}
                              className="inline-flex min-w-[185px] items-center justify-center gap-3 self-start
                               rounded-xl bg-[#0a67d4] px-5 py-4 text-base font-semibold text-white 
                               shadow-xl transition hover:bg-[#085ebc] sm:text-xl">
                              {isSlotOpen ? "Hide slots" : "Show slots"}
                              <svg
                                viewBox="0 0 12 8"
                                fill="none"
                                aria-hidden="true"
                                className={`h-4 w-4 transition-transform ${
                                  isSlotOpen ? "" : "rotate-180"
                                }`}>
                                <path
                                  d="M1.5 6.5L6 2L10.5 6.5"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>

                          {isSlotOpen && (
                            <div className="mt-8 rounded-[26px] border border-[#e4ebf6] bg-[#fcfdff] md:px-4 px-2 
                            py-5 shadow-[0_12px_24px_rgba(15,23,42,0.06)] sm:px-7 sm:py-7">
                              <div className="grid grid-cols-1 gap-3 text-center sm:grid-cols-3">
                                {slotsdate.map((day,index:number) => {
                                  const isActiveDay =true
                                    

                                    console.log("day",slotsdate)

                                  return (
                                    <button
                                      key={index}
                                      type="button"
                                      onClick={() => {
                                        ChangeDate(day)
                                      }}
                                      className={`rounded-xl px-3 py-2 text-xl font-medium transition sm:text-2xl ${
                                        index==1
                                          ? "bg-[#eef6ff] text-[#0a67d4]"
                                          : "text-[#4d4d4d] hover:bg-[#f7f9fc]"
                                      }`}>
                                      {formatDate(day)}
                                    </button>
                                  );
                                })}
                              </div>




                              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {visibleSlots.map((slot) => {
                                  const isSelected =
                                    selectedSlotId === slot.id &&
                                    slot.state !== "unavailable";
                                  const isUnavailable =
                                    slot.state === "unavailable";

                                  return (
                                    <button
                                      key={slot.id}
                                      type="button"
                                      disabled={isUnavailable}
                                      onClick={() =>
                                        setSelectedSlotByDoctor((prev) => ({
                                          ...prev,
                                          [doctor.id]: slot.id,
                                        }))
                                      }
                                      className={`h-12 rounded-xl border text-lg font-medium transition sm:h-14 sm:text-[18px] ${
                                        isSelected
                                          ? "border-[#0a67d4] bg-[#0a67d4] text-white shadow-[0_8px_18px_rgba(10,103,212,0.22)]"
                                          : isUnavailable
                                            ? "cursor-not-allowed border-[#d8d8d8] text-[#c3c3c3]"
                                            : "border-[#9fcbf7] text-[#3f8dde] hover:bg-[#f3f8ff]"
                                      }`}>
                                      {slot.label}
                                    </button>
                                  );
                                })}
                              </div>



                              <Link
                                href="/booking-form"
                                className="mt-8 flex h-[52px] w-full items-center justify-center rounded-xl 
                                bg-primary px-6 text-lg font-semibold whitespace-nowrap
                                 text-white shadow-xl transition hover:bg-[#085ebc] sm:h-14 sm:text-2xl">
                                Book a appointment
                              </Link>
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </div>

                  <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* <Link
                      href="/booking-form"
                      className="w-fit rounded-lg bg-[#0066cc] px-8 py-3 text-lg font-semibold text-white shadow-[0_4px_8px_rgba(0,0,0,0.25)] sm:text-2xl">
                      Book a appointment
                    </Link> */}
                    <button
                      type="button"
                      onClick={() => {
                        setExpandedHospitalId(null);
                        setExpandedDoctorSlots({});
                      }}
                      className="text-left text-2xl font-medium text-[#0a67d4] transition hover:text-[#084f9f] sm:text-3xl">
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
