"use client";

import Image from "next/image";
import { useState } from "react";

type Appointment = {
  id: string;
  dateTime: string;
  hospital: string;
  doctor: string;
  specialty: string;
  qualification: string;
  location: string;
  logo: string;
  doctorPhoto: string;
};

const presentAppointments: Appointment[] = [
  {
    id: "202324",
    dateTime: "8-April-2026 / 9:30 AM",
    hospital: "Apollo Hospital Hyderabad",
    doctor: "Dr. Chandra Shakar Reddy",
    specialty: "Cardio Specialist",
    qualification: "MBBS, MD - General Medicine, DM - Gastroenterology",
    location: "Hyderabad",
    logo: "/hospital/apollo_logo.jpg",
    doctorPhoto: "/hospital/doctor1.png",
  },
  {
    id: "202324",
    dateTime: "8-April-2026 / 9:30 AM",
    hospital: "Apollo Hospital, Hyderabad",
    doctor: "Dr. Chandra Shakar Reddy",
    specialty: "Cardio Specialist",
    qualification: "MBBS, MD - General Medicine, DM - Gastroenterology",
    location: "Hyderabad",
    logo: "/hospital/apollo_logo.jpg",
    doctorPhoto: "/hospital/doctor1.png",
  },
  {
    id: "202324",
    dateTime: "8-April-2026 / 9:30 AM",
    hospital: "Apollo Hospital, Hyderabad",
    doctor: "Dr. Chandra Shakar Reddy",
    specialty: "Cardio Specialist",
    qualification: "MBBS, MD - General Medicine, DM - Gastroenterology",
    location: "Hyderabad",
    logo: "/hospital/apollo_logo.jpg",
    doctorPhoto: "/hospital/doctor1.png",
  },
];

const pastAppointments: Appointment[] = [
  {
    id: "202324",
    dateTime: "8-April-2026 / 9:30 AM",
    hospital: "Apollo Hospital,Hyderabad",
    doctor: "Dr.Chandra Shakar Reddy",
    specialty: "cardio specialist",
    qualification: "MBBS, MD - General Medicine, DM - Gastroenterology",
    location: "Hyderabad",
    logo: "/hospital/apollo_logo.jpg",
    doctorPhoto: "/hospital/doctor1.png",
  },
  {
    id: "202324",
    dateTime: "8-April-2026 / 9:30 AM",
    hospital: "Apollo Hospital,Hyderabad",
    doctor: "Dr.Chandra Shakar Reddy",
    specialty: "cardio specialist",
    qualification: "MBBS, MD - General Medicine, DM - Gastroenterology",
    location: "Hyderabad",
    logo: "/hospital/apollo_logo.jpg",
    doctorPhoto: "/hospital/doctor1.png",
  },
  {
    id: "202324",
    dateTime: "8-April-2026 / 9:30 AM",
    hospital: "Apollo Hospital,Hyderabad",
    doctor: "Dr.Chandra Shakar Reddy",
    specialty: "cardio specialist",
    qualification: "MBBS, MD - General Medicine, DM - Gastroenterology",
    location: "Hyderabad",
    logo: "/hospital/apollo_logo.jpg",
    doctorPhoto: "/hospital/doctor1.png",
  },
];

export default function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState<"present" | "past">("present");

  return (
    <main className="min-h-screen  px-4 py-8 md:px-10 ">
      <section className="mx-auto max-w-[860px] rounded-[8px]  p-5  md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between bg-[#d8d8d8] py-3 px-6 rounded-xl">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="h-[130px] w-[130px] overflow-hidden rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
              <Image
                src="/hospital/apollo.jpg"
                alt="Patient profile"
                width={150}
                height={150}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-4 text-[22px] leading-tight text-[#191919]">
              <p>
                <span className="font-semibold">name:</span> Prashanth Kumar
              </p>
              <p>
                <span className="font-semibold">Phone No:</span> 9381938193
              </p>
              <p>
                <span className="font-semibold">Gmail:</span>{" "}
                Prashanthpathigari@gmail.com
              </p>
              <p className="space-x-10">
                <span>
                  <span className="font-semibold">Age:</span> 20
                </span>
                <span>
                  <span className="font-semibold">Gender:</span> M
                </span>
              </p>
            </div>
          </div>
          <button className="h-7 w-10 rounded-sm bg-[#0f62c3] text-[9px] font-semibold text-white">
            Edit
          </button>
        </div>

        <div className="mt-10 rounded-[8px] bg-[#f7f7f7] p-4 md:p-6">
          <div className="flex rounded-full bg-[#e6e6e6] p-1">
            <button
              onClick={() => setActiveTab("present")}
              className={`h-11 w-1/2 rounded-full text-[20px] font-semibold ${
                activeTab === "present"
                  ? "bg-[#073766] text-white"
                  : "text-[#1b1b1b]"
              }`}
            >
              Present Appointment
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`h-11 w-1/2 rounded-full text-[20px] font-semibold ${
                activeTab === "past"
                  ? "bg-[#073766] text-white"
                  : "text-[#1b1b1b]"
              }`}
            >
              Past Appointment
            </button>
          </div>

          {activeTab === "present" ? (
            <div className="mt-8 space-y-6">
              {presentAppointments.map((appointment, index) => (
                <article
                  key={`${appointment.id}-${index}`}
                  className="rounded-[4px] bg-[#dfdfdf] pb-4 shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
                >
                  <div className="grid grid-cols-2 border-b border-[#cdcdcd] text-center text-[18px] font-semibold text-[#1d1d1d]">
                    <p className="border-r border-[#cdcdcd] py-2">
                      ID:
                      <span className="text-[#034b85]">{appointment.id}</span>
                    </p>
                    <p className="py-2">
                      ON:
                      <span className="font-normal">
                        {appointment.dateTime}
                      </span>
                    </p>
                  </div>

                  <div className="px-4 pt-3">
                    <div className="flex items-center justify-center gap-5">
                      <Image
                        src={appointment.logo}
                        alt="Hospital logo"
                        width={100}
                        height={32}
                        className="h-8 w-auto object-contain rounded-full"
                      />
                      <h3 className="px-2 text-center text-[30px] font-semibold leading-[0.95] text-[#111111] md:text-[23px]">
                        {appointment.hospital}
                      </h3>
                      {/* <button className="h-8 rounded border border-[#8a8a8a] bg-white px-3 text-[14px] font-semibold text-[#0b2a4d] shadow">
                        Location <span aria-hidden="true">Pin</span>
                      </button> */}
                    </div>

                    <div className="mx-auto mt-3 flex max-w-[560px] items-center gap-4 rounded-[8px] border border-[#c8c8c8] bg-white  p-3 shadow">
                      <Image
                        src={appointment.doctorPhoto}
                        alt={appointment.doctor}
                        width={86}
                        height={86}
                        className="h-[86px] w-[86px] rounded-full object-cover"
                      />
                      <div className="text-[11px] text-[#222]">
                        <p className="text-[16px] text-[#2c6fd1] font-medium">
                          {appointment.doctor}
                        </p>
                        <p className="font-semibold">{appointment.specialty}</p>
                        <p className="">5 years of experience</p>
                        <p className="mt-2 font-semibold">
                          {appointment.qualification}
                        </p>
                        <p className="font-semibold ">
                          Fortis Hospital, Jaipur
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-center gap-8">
                      <button className="h-9 rounded-md bg-[#ff1f1f] px-6 text-[14px] font-semibold text-white shadow">
                        Cancel Appointment
                      </button>
                      <button className="h-9 rounded-md bg-[#0d65c8] px-7 text-[14px] font-semibold text-white shadow">
                        Resedule
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 space-y-6">
              {pastAppointments.map((appointment, index) => (
                <article
                  key={`${appointment.id}-past-${index}`}
                  className="rounded-[4px] bg-[#dfdfdf] pb-4 shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
                >
                  <div className="grid grid-cols-2 border-b border-[#cdcdcd] text-center text-[18px] font-semibold text-[#1d1d1d]">
                    <p className="border-r border-[#cdcdcd] py-2">
                      ID:
                      <span className="text-[#034b85]">{appointment.id}</span>
                    </p>
                    <p className="py-2">
                      ON:
                      <span className="font-normal">
                        {appointment.dateTime}
                      </span>
                    </p>
                  </div>

                  <div className="px-4 pt-3">
                    <div className="flex items-center justify-between">
                      <Image
                        src={appointment.logo}
                        alt="Hospital logo"
                        width={100}
                        height={32}
                        className="h-8 w-auto object-contain"
                      />
                      <h3 className="px-2 text-center text-[30px] font-semibold leading-[0.95] text-[#111111] md:text-[23px]">
                        {appointment.hospital}
                      </h3>
                      {/* <button className="h-8 rounded border border-[#8a8a8a] bg-white px-3 text-[14px] font-semibold text-[#0b2a4d] shadow">
                        Location <span aria-hidden="true">Pin</span>
                      </button> */}
                    </div>

                    <div className="mx-auto mt-3 flex max-w-[560px] items-center gap-4 rounded-[8px] border border-[#c8c8c8] bg-[#f6f6f6] p-3 shadow">
                      <Image
                        src={appointment.doctorPhoto}
                        alt={appointment.doctor}
                        width={86}
                        height={86}
                        className="h-[86px] w-[86px] rounded-full object-cover"
                      />
                      <div className="text-[11px] text-[#222]">
                        <p className="text-[16px] text-[#2c6fd1]">
                          {appointment.doctor}
                        </p>
                        <p>{appointment.specialty}</p>
                        <p>5 years of experience</p>
                        <p className="mt-2">{appointment.qualification}</p>
                        <p>Fortis Hospital , Jaipur</p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-center gap-8">
                      <button className="h-9 rounded-md bg-[#ff1f1f] px-7 text-[14px] font-semibold text-white shadow">
                        Delete
                      </button>
                      <button className="h-9 rounded-md bg-[#0d65c8] px-7 text-[14px] font-semibold text-white shadow">
                        Book Once Again
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
