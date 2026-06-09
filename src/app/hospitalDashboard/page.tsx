"use client";
import logo from "../../../public/hospital/apollo_logo.jpg";
import Image from "next/image";
import React, { useMemo, useState ,useEffect} from "react";

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

const color:string[]=["from-emerald-500 to-teal-400","from-pink-500 to-rose-400","from-indigo-500 to-violet-400","from-sky-500 to-cyan-400","from-orange-400 to-amber-400"]

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
      <p className="mt-2 text-slate-600">
        {title} content is ready for integration.
      </p>
    </article>
  );
}

function SettingsPanel({ hospital }: { hospital: unknown }) {
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
                className="text-sm text-slate-600"
              >
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
                className="text-sm text-slate-600"
              >
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
                className="text-sm text-slate-600"
              >
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
            className="mt-5 rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
          >
            Save Settings
          </button>
        </div>
      </div>
    </article>
  );
}

function AppointmentsPanel({ hospital }: { hospital: unknown }) {
  

const [hos, sethos] = useState<unknown[]>([]);
const [searchId, setSearchId] = useState<string>("");
const [isload,setisload]=useState<boolean>(true);

const fetchAppointment=async(searchId:string)=>{
  try{
    // console.log()
     const loginQuery = await fetch(
  "/api/hospital/searchAppoinment",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      search_id:searchId
    }),
  });
  const data = await loginQuery.json();
  if (loginQuery.ok) {
  console.log("appoinemnt is", data.appointment);
  sethos(data.appointment);
  // sethos([data]);

} else {
  console.log("Login failed", data.message);
}

  }catch(error){
    console.log(error)
    return null
  }

}


const waitingApp=async(id:string,status:string)=>{
  try{
    console.log("id",id)
    const loginQuery = await fetch(
  "/api/hospital/changeStatus",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id:id,
      status:status
    }),
  });

const data = await loginQuery.json();

if (loginQuery.ok) {
  console.log("check this",data)
  console.log("Login got appoinments", data.message);
  // sethos(data.message);
  

} else {
  console.log("Login failed", data.message);
}
// setisload(false)


  }catch(error){
    console.log(error);
    return null;
  }
  
}

  
  const fetchAppoiinments=async()=>{
    
      const loginQuery = await fetch(
  "/api/hospital/Allappoinments",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      choice:"appointments"
    }),
  }
);

const data = await loginQuery.json();

if (loginQuery.ok) {
  console.log("Login got appoinments", data.message);
  sethos(data.message);
  

} else {
  console.log("Login failed", data.message);
}
setisload(false)

  }

  useEffect(() => {
// setisload(true)
fetchAppoiinments();
  
}, []);

if(isload){
  return(
    <div>Loading...</div>
  )
}
  
  return (
    <>
    <form
  onSubmit={(e) => {
    e.preventDefault();
    // fetchAppointment();
  }}
  className="flex items-center gap-2"
>
  <input
    type="text"
    placeholder="Enter Appointment ID"
    value={searchId}
    onChange={(e) => setSearchId(e.target.value)}
    className="rounded-md border border-slate-300 px-3 py-2"
  />

  <button
    type="submit"
    className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
    onClick={() => fetchAppointment(searchId)}
  >
    OK
  </button>
</form>
    
    {
    hos.map((patient,index) => (
    <article className="overflow-hidden rounded-sm border border-slate-300 bg-[#d9d9d9] shadow-sm" key={index}>
      <div className="grid grid-cols-1 border-b border-white/50 bg-[#c4c4c4] text-center text-[#0d2f52] sm:grid-cols-2">
        <div className="border-r border-white/50 px-4 py-3 text-2xl font-bold max-sm:border-r-0 sm:px-6 sm:py-4 sm:text-3xl">
          ID:{patient.appointment.app_id}
        </div>
        <div className="px-4 py-3 text-base font-medium text-slate-900 sm:px-6 sm:py-4 sm:text-2xl">
          ON:{patient.appointment.appointment_date}/<span className="font-semibold">{patient.appointment.appointment_time}</span>
        </div>
      </div>

      <div className="p-4 md:p-7">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4 sm:items-center">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Image
              src={logo}
              alt="Hospital logo"
              width={100}
              height={32}
              className="h-8 w-auto object-contain rounded-full"
            />
            {/* <div className="text-lg font-bold tracking-[0.24em] text-[#173453] sm:text-2xl">APOLLO</div> */}
            <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl ">
              Appollo Hospital,Hyderabad
            </h2>
          </div>
        </div>

        <div className="rounded-xl border border-slate-300 bg-[#efefef] p-4 shadow-[0_5px_12px_rgba(0,0,0,0.18)] md:p-5">
          <div className="flex flex-wrap items-start gap-4 sm:items-center sm:gap-6 md:gap-8">
            <div className="h-24 w-24 overflow-hidden rounded-full border border-slate-300 bg-white shadow-sm sm:h-28 sm:w-28 md:h-36 md:w-36">
              <Image
                src="/hospital/doctor1.png"
                alt="Doctor"
                width={144}
                height={144}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-slate-900">
              <h3 className="text-xl font-medium text-[#1363a2] sm:text-2xl lg:text-4xl">
                Dr.{patient.doctor.name}
              </h3>
              <p className="mt-1 text-sm sm:text-base lg:text-xl">
                {patient.doctor.specialization}
              </p>
              <p className="text-sm text-slate-600 sm:text-base lg:text-lg">
                {patient.doctor.experience}
              </p>
            
            </div>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 overflow-hidden border border-white/70 bg-[#cfcfcf] text-center text-[#0d2f52] sm:grid-cols-3">
          <div className="border-b border-white/70 px-4 py-3 text-xl font-bold sm:border-b-0 sm:border-r lg:text-4xl">
            {patient.appointment.name}
          </div>
          <div className="border-b border-white/70 px-4 py-3 text-xl font-bold sm:border-b-0 sm:border-r lg:text-4xl">
            Age:{patient.appointment.age}
          </div>
          <div className="px-4 py-3 text-xl font-bold lg:text-4xl">Male</div>
        </div>

        <div className="mt-1 border border-white/70 bg-[#cfcfcf] px-4 py-6 text-center text-lg text-slate-900 sm:px-5 sm:py-8 sm:text-2xl lg:text-4xl">
          {patient.appointment.description}
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-5 md:mt-9 md:gap-12">
          <button
            type="button"
            className="w-full rounded-xl bg-[#f4d632] px-4 py-2 text-base font-bold text-white shadow-[0_6px_12px_rgba(0,0,0,0.22)] sm:w-auto sm:px-5 sm:py-3 sm:text-xl lg:text-3xl"
            onClick={()=>{waitingApp(patient.appointment.id,"waiting")}}
          >
            Waiting
          </button>
          <button
            type="button"
            className="w-full rounded-xl bg-[#f50000] px-4 py-2 text-base font-bold text-white shadow-[0_6px_12px_rgba(0,0,0,0.22)] sm:w-auto sm:px-6 sm:py-3 sm:text-xl lg:text-3xl"
            // onClick={()=>{Resedule()}}
          >
            Resedule
          </button>
          <button
            type="button"
            className="w-full rounded-xl bg-[#0069d1] px-4 py-2 text-base font-bold text-white shadow-[0_6px_12px_rgba(0,0,0,0.22)] sm:w-auto sm:px-5 sm:py-3 sm:text-xl lg:text-3xl"
          onClick={()=>{waitingApp(patient.appointment.id,"completed")}}
          >
            Mark Completed
          </button>
        </div>
      </div>
    </article>
    ))
  }
    </>
  );
}






function DashboardPanel({ hospital }: { hospital: unknown }) {
  console.log("hospital dashboard:",hospital)
  const [hos, sethos] = useState<unknown[]>([]);
  
  const fetchAppoiinments=async()=>{
    
      const loginQuery = await fetch(
  "/api/hospital/Allappoinments",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      choice:"today appoinments"
    }),
  }
);

const data = await loginQuery.json();

if (loginQuery.ok) {
  console.log("Login got appoinments", data);
  sethos(data.message);
  

} else {
  console.log("Login failed", data.message);
}

  }

  useEffect(() => {

fetchAppoiinments();
  
}, []);


  return (
    
    <>
    {/* {console.log("hos",hos)} */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-xs font-semibold text-sky-700">
              AP
            </div>
            {/* <span className="rounded-md bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">+12%</span> */}
          </div>
          <h2 className="text-4xl font-bold leading-none">{hos?.length}</h2>
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
          <h2 className="text-4xl font-bold leading-none">{hos.length}</h2>
          <p className="mt-2 text-sm text-slate-600">Completed Today</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-xs font-semibold text-orange-700">
              WT
            </div>
            {/* <span className="rounded-md bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-700">-3%</span> */}
          </div>
          <h2 className="text-4xl font-bold leading-none">{hos.length}</h2>
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
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
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
                {hos.map((patient,index) => (
                  <tr key={patient.id} className="border-b border-slate-100">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r ${color[index % color.length]} text-sm font-semibold text-white`}
                        >
                          {patient.name[0]}
                        </div>
                        <div>
                          <div className="text-base font-semibold leading-tight">
                            {patient.name} 
                          </div>
                          <div className="text-xs text-slate-500">
                            {patient.app_id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-sm font-medium">
                      {patient.doctor_name}
                    </td>
                    <td className="py-4">
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                        {patient.appointment_time}</span>
                    </td>
                    <td className="py-4">
                      <span
                        className={`rounded-lg px-3 py-1 text-xs font-semibold `}
                      >
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
  const [Islogin, setIslogin] = useState<boolean | null>(null);
  const [gmail, setgmail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
   const [isload, setisload] = useState<boolean>(false);
  const [hospital,sethospital]=useState(null);
  const [mounted, setMounted] = useState(false);

  const CheckLogin=async()=>{
    setisload(true)
      console.log(gmail,password);
      if(gmail.length==0 || password.length==0){
        console.log("gmail or password is required")
      }
      const loginQuery = await fetch(
  "/api/hospital/login",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      gmail,
      password,
    }),
  }
);

const data = await loginQuery.json();

if (loginQuery.ok) {
  localStorage.setItem("token", data.token);
  console.log("Login successful", data);
  setIslogin(true)
  sethospital(data)

} else {
  console.log("Login failed", data.message);
}
setisload(false)
  }


// const fetchAppoiinments=async()=>{
//     // setisload(true)
//       // console.log(gmail,password);
//       // if(gmail.length==0 || password.length==0){
//       //   console.log("gmail or password is required")
//       // }
//       const loginQuery = await fetch(
//   "/api/hospital/login",
//   {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       gmail,
//       password,
//     }),
//   }
// );

// const data = await loginQuery.json();

// if (loginQuery.ok) {
//   console.log("Login successful", data);
//   setIslogin(true)

// } else {
//   console.log("Login failed", data.message);
// }
// setisload(false)
//   }


const panel = useMemo(() => {
  if (activeTab === "Dashboard")
    return <DashboardPanel hospital={hospital} />;

  if (activeTab === "Appointments")
    return <AppointmentsPanel hospital={hospital} />;

  if (activeTab === "Settings")
    return <SettingsPanel hospital={hospital} />;

  return <SimplePanel title={activeTab} />;
}, [activeTab, hospital]);

useEffect(() => {
  const token = localStorage.getItem("token");
  setIslogin(!!token);
}, []);



if (Islogin === null) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      Loading...
    </div>
  );
}


  return (

   


    <main className="min-h-screen overflow-x-hidden bg-[#eef0f3] text-slate-900">
      {Islogin?<>
           {/* {fetchAppoiinments()} */}
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
                }`}
              >
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
      
      
      
      </>:<> <div className="flex min-h-screen items-center justify-center bg-slate-100">
  <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
    <h2 className="mb-6 text-center text-2xl font-semibold">
      Login
    </h2>

    <form className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
          value={gmail}
          onChange={(e) => setgmail(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
      </div>

      <button
        type="button"
        className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
        onClick={(e)=>{e.preventDefault();
          CheckLogin()}}
      >
        {isload?"Loading":"Login"}
      </button>
    </form>
  </div>
</div></>}

   

      {/* <div>lsdlsd</div> */}
    </main>
  );
}
