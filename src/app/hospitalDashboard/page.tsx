"use client";

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
  { initials: "RK", name: "Dr. Rajesh Kumar", specialty: "Cardiologist", patients: 18, color: "from-indigo-500 to-violet-500" },
  { initials: "PS", name: "Dr. Priya Sharma", specialty: "Dermatologist", patients: 22, color: "from-pink-500 to-rose-400" },
  { initials: "AP", name: "Dr. Amit Patel", specialty: "Orthopedic", patients: 15, color: "from-cyan-500 to-sky-400" },
  { initials: "SR", name: "Dr. Sneha Reddy", specialty: "Pediatrician", patients: 20, color: "from-orange-400 to-amber-400" },
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
  return (
    <article className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-slate-600">{title} content is ready for integration.</p>
    </article>
  );
}

function SettingsPanel() {
  return (
    <article className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
      <h2 className="text-2xl font-semibold">Settings</h2>
      <p className="mt-1 text-slate-600">Manage hospital profile and dashboard preferences.</p>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 p-4">
          <h3 className="text-lg font-semibold">Hospital Profile</h3>
          <div className="mt-4 space-y-3">
            <div>
              <label className="text-sm text-slate-600">Hospital Name</label>
              <input defaultValue="Apollo Hospital" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
            </div>
            <div>
              <label className="text-sm text-slate-600">Contact Email</label>
              <input defaultValue="admin@apollohospital.com" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
            </div>
            <div>
              <label className="text-sm text-slate-600">Phone</label>
              <input defaultValue="+91 40 1234 5678" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <h3 className="text-lg font-semibold">Preferences</h3>
          <div className="mt-4 space-y-3 text-sm">
            {/* <label className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2"><span>SMS Notifications</span><input type="checkbox" defaultChecked /></label>
            <label className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2"><span>Email Reports</span><input type="checkbox" defaultChecked /></label>
            <label className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2"><span>Auto-confirm Follow-ups</span><input type="checkbox" /></label> */}
          </div>
          <button type="button" className="mt-5 rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700">Save Settings</button>
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
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-xs font-semibold text-sky-700">AP</div>
            {/* <span className="rounded-md bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">+12%</span> */}
          </div>
          <h2 className="text-4xl font-bold leading-none">142</h2>
          <p className="mt-2 text-sm text-slate-600">Today&apos;s Appointments</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-xs font-semibold text-emerald-700">OK</div>
            {/* <span className="rounded-md bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">+8%</span> */}
          </div>
          <h2 className="text-4xl font-bold leading-none">89</h2>
          <p className="mt-2 text-sm text-slate-600">Completed Today</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-xs font-semibold text-orange-700">WT</div>
            {/* <span className="rounded-md bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-700">-3%</span> */}
          </div>
          <h2 className="text-4xl font-bold leading-none">28</h2>
          <p className="mt-2 text-sm text-slate-600">Currently Waiting</p>
        </div>

        {/* <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-xs font-semibold text-violet-700">DR</div>
            <span className="rounded-md bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">0%</span>
          </div>
          <h2 className="text-4xl font-bold leading-none">45</h2>
          <p className="mt-2 text-sm text-slate-600">Active Doctors</p>
        </div> */}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.8fr,1fr]">
        <article className="min-w-0 rounded-2xl bg-white p-4 shadow-sm md:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-2xl font-semibold">Today&apos;s Appointments</h3>
            <button type="button" className="text-sm font-semibold text-blue-600 hover:text-blue-700">View All {"->"}</button>
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
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r ${patient.color} text-sm font-semibold text-white`}>{patient.initials}</div>
                        <div>
                          <div className="text-base font-semibold leading-tight">{patient.name}</div>
                          <div className="text-xs text-slate-500">{patient.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-sm font-medium">{patient.doctor}</td>
                    <td className="py-4"><span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">{patient.time}</span></td>
                    <td className="py-4"><span className={`rounded-lg px-3 py-1 text-xs font-semibold ${statusStyles[patient.status]}`}>{patient.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        {/* <aside className="min-w-0 rounded-2xl bg-white p-4 shadow-sm md:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-2xl font-semibold">Active Doctors Today</h3>
            <button type="button" className="text-sm font-semibold text-blue-600 hover:text-blue-700">View All {"->"}</button>
          </div>

          <div className="space-y-3">
            {doctors.map((doctor) => (
              <div key={doctor.name} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r ${doctor.color} text-xs font-semibold text-white`}>{doctor.initials}</div>
                  <div className="min-w-0">
                    <div className="truncate text-base font-semibold leading-tight">{doctor.name}</div>
                    <div className="truncate text-xs text-slate-500">{doctor.specialty}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{doctor.patients}</div>
                  <div className="text-xs text-slate-500">Patients</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button type="button" className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm hover:bg-slate-50">
              <div className="text-3xl font-semibold text-indigo-500">+</div>
              <div className="mt-1 text-sm font-semibold">Add Doctor</div>
            </button>
            <button type="button" className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm hover:bg-slate-50">
              <div className="text-2xl font-semibold text-violet-500">CAL</div>
              <div className="mt-2 text-sm font-semibold">Manage Slots</div>
            </button>
          </div>
        </aside> */}
      </div>
    </>
  );
}

export default function HospitalDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("Dashboard");

  const panel = useMemo(() => {
    if (activeTab === "Dashboard") return <DashboardPanel />;
    if (activeTab === "Settings") return <SettingsPanel />;
    return <SimplePanel title={activeTab} />;
  }, [activeTab]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#eef0f3] text-slate-900">
      <div className="flex min-h-screen flex-col md:flex-row">
        <aside className="w-full bg-[#141821] text-white md:w-64 md:flex-shrink-0">
          <div className="border-b border-white/10 px-6 py-6 text-3xl font-semibold tracking-tight">DoctorBook</div>

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
                }`}
              >
                <span className="w-6 text-center text-[10px] font-semibold tracking-wider">{item.glyph}</span>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <section className="min-w-0 flex-1 p-4 md:p-6 lg:p-8">
          <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold">{activeTab}</h1>
              <p className="mt-1 text-base text-slate-600">Welcome back, Apollo Hospital</p>
            </div>
            <div className="flex items-center gap-3">
              {/* <button type="button" className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-xs font-semibold shadow-sm">
                NTF
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">3</span>
              </button> */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white">AH</div>
            </div>
          </header>

          {panel}
        </section>
      </div>
    </main>
  );
}
