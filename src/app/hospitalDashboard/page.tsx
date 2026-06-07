"use client";
import logo from "../../../public/hospital/apollo_logo.jpg";
import Image from "next/image";
import React, { useMemo, useState } from "react";

type Appointment = {
  initials: string;
  name: string;
  id: string;
  doctor: string;
  time: string;
  status: "Completed" | "Waiting" | "Confirmed";
  color: string;
};

type ActiveDoctor = {
  initials: string;
  name: string;
  specialty: string;
  patients: number;
  color: string;
};

type TabKey =
  | "Dashboard"
  | "Appointments"
  | "Doctors"
  | "Billing"
  | "Analytics"
  | "Settings";

const appointments: Appointment[] = [
  {
    initials: "RK",
    name: "Ramesh Kumar",
    id: "#P240515001",
    doctor: "Dr. Rajesh Kumar",
    time: "9:00 AM",
    status: "Completed",
    color: "from-emerald-500 to-teal-400",
  },
  {
    initials: "PS",
    name: "Priya Sharma",
    id: "#P240515002",
    doctor: "Dr. Amit Patel",
    time: "10:30 AM",
    status: "Waiting",
    color: "from-pink-500 to-rose-400",
  },
  {
    initials: "AS",
    name: "Anita Singh",
    id: "#P240515003",
    doctor: "Dr. Priya Sharma",
    time: "11:00 AM",
    status: "Confirmed",
    color: "from-indigo-500 to-violet-400",
  },
  {
    initials: "MV",
    name: "Manoj Verma",
    id: "#P240515004",
    doctor: "Dr. Rajesh Kumar",
    time: "2:00 PM",
    status: "Confirmed",
    color: "from-sky-500 to-cyan-400",
  },
  {
    initials: "SK",
    name: "Sunita Kapoor",
    id: "#P240515005",
    doctor: "Dr. Amit Patel",
    time: "4:00 PM",
    status: "Confirmed",
    color: "from-orange-400 to-amber-400",
  },
];

const doctors: ActiveDoctor[] = [
  {
    initials: "RK",
    name: "Dr. Rajesh Kumar",
    specialty: "Cardiologist",
    patients: 18,
    color: "from-indigo-500 to-violet-500",
  },
  {
    initials: "PS",
    name: "Dr. Priya Sharma",
    specialty: "Dermatologist",
    patients: 22,
    color: "from-pink-500 to-rose-400",
  },
  {
    initials: "AP",
    name: "Dr. Amit Patel",
    specialty: "Orthopedic",
    patients: 15,
    color: "from-cyan-500 to-sky-400",
  },
  {
    initials: "SR",
    name: "Dr. Sneha Reddy",
    specialty: "Pediatrician",
    patients: 20,
    color: "from-orange-400 to-amber-400",
  },
];

const sidebarItems: { label: TabKey; glyph: string }[] = [
  { label: "Dashboard", glyph: "DB" },
  { label: "Appointments", glyph: "AP" },
  { label: "Doctors", glyph: "DR" },
  // { label: "Schedules", glyph: "SC" },
  // { label: "Patients", glyph: "PT" },
  { label: "Billing", glyph: "BL" },
  { label: "Analytics", glyph: "AN" },
  { label: "Settings", glyph: "ST" },
];

const statusStyles: Record<Appointment["status"], string> = {
  Completed: "bg-slate-100 text-slate-600",
  Waiting: "bg-amber-100 text-amber-600",
  Confirmed: "bg-emerald-100 text-emerald-600",
};

function SimplePanel({ title }: { title: string }) {
  const doctors = [
    {
      id: 1,
      name: "Dr. Chandra Shekar Reddy",
      specialization: "Cardiologist",
      experience: "8 Years",
    },
    {
      id: 2,
      name: "Dr. Priya Sharma",
      specialization: "Dermatologist",
      experience: "5 Years",
    },
  ];

  return (
    <article className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-semibold">{title}</h2>

      {title === "Doctors" && (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cold-3">
    {doctors.map((doctor) => (
      <div
        key={doctor.id}
        className="rounded-xl border border-slate-200 p-4 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
            {doctor.name.charAt(4)}
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">
              {doctor.name}
            </h3>

            <p className="text-sm text-slate-600">
              {doctor.specialization}
            </p>
          </div>
        </div>

        <p className="mt-3 text-sm text-slate-500">
          Experience: {doctor.experience}
        </p>

        <button className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-sm text-white hover:bg-blue-700">
          View Profile
        </button>
      </div>
    ))}
  </div>
)}

      {title === "Billing" && (
        <div className="rounded-xl border p-4">
          <p className="font-medium">Today's Revenue</p>
          <p className="mt-2 text-3xl font-bold text-green-600">
            ₹45,000
          </p>
        </div>
      )}

      {title === "Analytics" && (
        <div className="rounded-xl border p-4">
          <p>Total Appointments: 120</p>
          <p>Completed: 95</p>
          <p>Pending: 25</p>
        </div>
      )}
    </article>
  );
}

function SettingsPanel() {
  return (
    <article className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
      <h2 className="text-2xl font-semibold">Settings</h2>
      <p className="mt-1 text-slate-600">
        Manage hospital profile and dashboard preferences.
      </p>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 p-4">
          <h3 className="text-lg font-semibold">Hospital Profile</h3>
          <div className="mt-4 space-y-3">
            <div>
              <label className="text-sm text-slate-600">Hospital Name</label>
              <input
                defaultValue="Apollo Hospital"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm text-slate-600">Contact Email</label>
              <input
                defaultValue="admin@apollohospital.com"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm text-slate-600">Contact Number</label>
              <input
                defaultValue="+91 40 1234 5678"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          {/* <h3 className="text-lg font-semibold">Preferences</h3> */}
          <div className="mt-4 space-y-3 text-sm">
            <div>
              <label
                htmlFor="hospital-image-1"
                className="text-sm text-slate-600">
                Image 1
              </label>
              <input
                id="hospital-image-1"
                type="file"
                accept="image/*"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-sky-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-sky-700 hover:file:bg-sky-100"
              />
            </div>
            <div>
              <label
                htmlFor="hospital-image-2"
                className="text-sm text-slate-600">
                Image 2
              </label>
              <input
                id="hospital-image-2"
                type="file"
                accept="image/*"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-sky-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-sky-700 hover:file:bg-sky-100"
              />
            </div>
            <div>
              <label
                htmlFor="hospital-location"
                className="text-sm text-slate-600">
                Location
              </label>
              <input
                id="hospital-location"
                defaultValue="Hyderabad"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </div>
            {/* <label className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2"><span>SMS Notifications</span><input type="checkbox" defaultChecked /></label>
            <label className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2"><span>Email Reports</span><input type="checkbox" defaultChecked /></label>
            <label className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2"><span>Auto-confirm Follow-ups</span><input type="checkbox" /></label> */}
          </div>
          <button
            type="button"
            className="mt-5 rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700">
            Save Settings
          </button>
        </div>
      </div>
    </article>
  );
}

function AppointmentsPanel() {
  return (
    <article className="overflow-hidden rounded-md border border-slate-300 bg-[#d9d9d9] shadow-sm max-w-3xl mx-auto">
      <div className="grid grid-cols-1 border-b border-white/50 bg-[#c4c4c4] text-center text-[#0d2f52] sm:grid-cols-2">
        <div className="border-r border-white/50 px-2 py-1.5 text-base font-bold">
          ID:202324
        </div>

        <div className="px-2 py-1.5 text-xs font-medium text-slate-900 sm:text-sm">
          ON:8-April-2026/<span className="font-semibold">9:30 AM</span>
        </div>
      </div>

      <div className="p-2.5">
        <div className="mb-2 flex items-center gap-2">
          <Image
            src={logo}
            alt="Hospital logo"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-contain"
          />

          <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
            Appollo Hospital, Hyderabad
          </h2>
        </div>

        <div className="rounded-md border border-slate-300 bg-[#efefef] p-2">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 overflow-hidden rounded-full border border-slate-300 bg-white">
              <Image
                src="/hospital/doctor1.png"
                alt="Doctor"
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#1363a2]">
                Dr.Chandra Shakar Reddy
              </h3>

              <p className="text-xs">Cardio Specialist</p>

              <p className="text-[10px] text-slate-600">
                5 Years Experience
              </p>

              <p className="mt-1 text-[10px] leading-relaxed">
                MBBS, MD, DM - Gastroenterology
                <br />
                Fortis Hospital, Jaipur
              </p>
            </div>
          </div>
        </div>

        <div className="mt-2 grid grid-cols-3 overflow-hidden border border-white/70 bg-[#cfcfcf] text-center text-[#0d2f52]">
          <div className="border-r border-white/70 px-2 py-1 text-xs font-bold">
            P.Prashanth
          </div>

          <div className="border-r border-white/70 px-2 py-1 text-xs font-bold">
            Age:20
          </div>

          <div className="px-2 py-1 text-xs font-bold">
            Male
          </div>
        </div>

        <div className="mt-1 border border-white/70 bg-[#cfcfcf] px-2 py-2 text-center text-xs text-slate-900">
          Have Problem with Teeth ache Need a regular checkup
        </div>

        <div className="mt-3 flex flex-wrap justify-center gap-13">
          <button
            type="button"
            className="rounded-md bg-[#f4d632] px-3 py-1 text-xs font-bold text-white"
          >
            Waiting
          </button>

          <button
            type="button"
            className="rounded-md bg-[#f50000] px-3 py-1 text-xs font-bold text-white"
          >
            Reschedule
          </button>

          <button
            type="button"
            className="rounded-md bg-[#0069d1] px-3 py-1 text-xs font-bold text-white"
          >
            Complete
          </button>
        </div>
      </div>
    </article>
  );
}
function DashboardPanel() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-xs font-semibold text-sky-700">
              AP
            </div>
            {/* <span className="rounded-md bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">+12%</span> */}
          </div>
          <h2 className="text-4xl font-bold leading-none">142</h2>
          <p className="mt-2 text-sm text-slate-600">
            Today&apos;s Appointments
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-xs font-semibold text-emerald-700">
              OK
            </div>
            {/* <span className="rounded-md bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">+8%</span> */}
          </div>
          <h2 className="text-4xl font-bold leading-none">89</h2>
          <p className="mt-2 text-sm text-slate-600">Completed Today</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-xs font-semibold text-orange-700">
              WT
            </div>
            {/* <span className="rounded-md bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-700">-3%</span> */}
          </div>
          <h2 className="text-4xl font-bold leading-none">28</h2>
          <p className="mt-2 text-sm text-slate-600">Currently Waiting</p>
        </div>

      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.8fr,1fr]">
        <article className="min-w-0 rounded-2xl bg-white p-4 shadow-sm md:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-2xl font-semibold">
              Today&apos;s Appointments
            </h3>
            <button
              type="button"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              View All {"->"}
            </button>
          </div>

          <div className="max-w-full overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse sm:min-w-[650px]">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs text-slate-500">
                  <th className="pb-3 font-semibold">PATIENT</th>
                  <th className="pb-3 font-semibold">DOCTOR</th>
                  <th className="pb-3 font-semibold">TIME</th>
                  <th className="pb-3 font-semibold">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((patient) => (
                  <tr key={patient.id} className="border-b border-slate-100">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r ${patient.color} text-sm font-semibold text-white`}>
                          {patient.initials}
                        </div>
                        <div>
                          <div className="text-base font-semibold leading-tight">
                            {patient.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {patient.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-sm font-medium">
                      {patient.doctor}
                    </td>
                    <td className="py-4">
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                        {patient.time}
                      </span>
                    </td>
                    <td className="py-4">
                      <span
                        className={`rounded-lg px-3 py-1 text-xs font-semibold ${statusStyles[patient.status]}`}>
                        {patient.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        
      </div>
    </>
  );
}

export default function HospitalDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("Dashboard");

  const panel = useMemo(() => {
    if (activeTab === "Dashboard") return <DashboardPanel />;
    if (activeTab === "Appointments") return <AppointmentsPanel />;
    if (activeTab === "Settings") return <SettingsPanel />;
    return <SimplePanel title={activeTab} />;
  }, [activeTab]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#eef0f3] text-slate-900">
      <div className="flex min-h-screen flex-col md:flex-row">
        <aside className="w-full bg-[#141821] text-white md:w-64 md:flex-shrink-0">
          <div className="border-b border-white/10 px-6 py-6 text-3xl font-semibold tracking-tight">
            DoctorBook
          </div>

          <nav className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-3 md:grid-cols-1 md:gap-1 md:p-0 md:py-4">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setActiveTab(item.label)}
                className={`mx-1 flex w-full items-center gap-2 rounded-md px-2 py-2 text-xs transition md:mx-0 md:gap-3 md:rounded-none md:px-6 md:py-3 md:text-sm ${
                  activeTab === item.label
                    ? "bg-[#0f253f] text-sky-400 md:border-l-2 md:border-sky-400"
                    : "text-slate-300 hover:bg-white/5"
                }`}>
                <span className="w-6 text-center text-[10px] font-semibold tracking-wider">
                  {item.glyph}
                </span>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <section className="min-w-0 flex-1 p-4 md:p-6 lg:p-8">
          <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold">{activeTab}</h1>
              <p className="mt-1 text-base text-slate-600">
                Welcome back, Apollo Hospital
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* <button type="button" className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-xs font-semibold shadow-sm">
                NTF
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">3</span>
              </button> */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white">
                AH
              </div>
            </div>
          </header>

          {panel}
        </section>
      </div>
    </main>
  );
}
