"use client";
import logo from "../../../public/hospital/apollo_logo.jpg";
import Image from "next/image";
import React, { useMemo, useState ,useEffect} from "react";
import Link from "next/link";
import { notFound } from "next/navigation";


type HospitalSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type TabKey =
  | "Dashboard"
  | "Appointments"
  | "Doctors"
  | "Billing"
  | "Analytics"
  | "Settings";

const color:string[]=["from-emerald-500 to-teal-400","from-pink-500 to-rose-400","from-indigo-500 to-violet-400","from-sky-500 to-cyan-400","from-orange-400 to-amber-400"]



const sidebarItems: { label: TabKey; glyph: string }[] = [
  { label: "Dashboard", glyph: "DB" },
  { label: "Appointments", glyph: "AP" },
  { label: "Doctors", glyph: "DR" },
  { label: "Billing", glyph: "BL" },
  { label: "Analytics", glyph: "AN" },
  { label: "Settings", glyph: "ST" },
];



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

function SettingsPanel({ hospital }: { hospital: unknown }) {

  const [hos, sethos] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [num, setnum] = useState<string>("");
  const [img1, setimg1] = useState<string>("");
  const [loc, setloc] = useState<string>("");
  const [load, setload] = useState<boolean>(false);

  const sendDataToAdmin=async(hos:string,email:string,num:string,loc:string)=>{
    try {
    const res = await fetch(
      "/api/hospital/changeData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: hos,
          email,
          phone: num,
          location: loc,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert(data.message);
  } catch (err) {
    console.log(err);
    alert("Failed to send request");
  }

  }
  
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
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                value={hos}
                onChange={(e) => sethos(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-slate-600">Contact Email</label>
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-slate-600">Contact Number</label>
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                value={num}
                onChange={(e) => setnum(e.target.value)}
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
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                value={loc}
                onChange={(e) => setloc(e.target.value)}
              />
            </div>
            
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
    ))
  }
    </>
  );
}



function DashboardPanel({ hospital }: { hospital: unknown }) {
  const[loading,setloading]=useState<boolean>(true);
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
setloading(false);

  }

  useEffect(() => {
    setloading(true)

fetchAppoiinments();
  
}, []);
const waitingapp = hos.filter(
  (item) => item.status === "waiting"
).length;

const completedCount = hos.filter(
  (item) => item.status === "completed"
).length;
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
          <h2 className="text-4xl font-bold leading-none">{completedCount}</h2>
          <p className="mt-2 text-sm text-slate-600">Completed Today</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-xs font-semibold text-orange-700">
              WT
            </div>
            {/* <span className="rounded-md bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-700">-3%</span> */}
          </div>
          <h2 className="text-4xl font-bold leading-none">{waitingapp}</h2>
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
          {loading?<div className="">Loading...</div>:<>{
            hos.length==0?<div>No appoinemnts Today..</div>:
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
                          className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r ${patient.color} text-sm font-semibold text-white`}>
                          {patient.initials}
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
                        className={`rounded-lg px-3 py-1 text-xs font-semibold ${statusStyles[patient.status]}`}>
                        {patient.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          }</>
          }
        </article>

        
      </div>
    </>
  );
}

export default function HospitalDashboardPage() {


const [step, setStep] = useState<
  "login" |
  "forgot-password" |
  "verify-otp" |
  "change-password"|
  "reset-password"
>("login");

// const [gmail, setgmail] = useState("");
const [otp, setOtp] = useState("");
const [Loginpassword, setLoginpassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const [timeLeft, setTimeLeft] = useState(300); // 5 mins


  
  const [activeTab, setActiveTab] = useState<TabKey>("Dashboard");

  const [Islogin, setIslogin] = useState<boolean | null>(null);
  const [gmail, setgmail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [err, seterr] = useState<string>("");
   const [isload, setisload] = useState<boolean>(false);
  const [hospital,sethospital]=useState(null);
  const [mounted, setMounted] = useState(false);
  const [load, setload] = useState(true);

  const minutes = Math.floor(timeLeft / 60);
const seconds = timeLeft % 60;

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
  seterr(data.message)
}
setisload(false)
  }


const panel = useMemo(() => {
  if (activeTab === "Dashboard")
    return <DashboardPanel hospital={hospital} />;

  if (activeTab === "Appointments")
    return <AppointmentsPanel hospital={hospital} />;

  if (activeTab === "Settings")
    return <SettingsPanel hospital={hospital} />;

  return <SimplePanel title={activeTab} />;
}, [activeTab, hospital]);


const verifyOTP = async (
  otp: string,
  gmail: string
): Promise<boolean> => {
  try {
    const res = await fetch(
      "/api/hospital/verifyOtp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp,
         identifier: gmail,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);

      
      return false;
    }
    setStep("change-password");
    alert(data.message);
    return true;
  } catch (err) {
    console.log(err);
    alert("Failed to verify OTP");
    return false;
  }
};


const changePassword=async(gmail:string,password:string)=>{
  try {
    const res = await fetch(
      "/api/hospital/UpdatePassword",
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

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return ;
    }
    setStep("login");
    alert(data.message);
    return ;
  } catch (err) {
    console.log(err);
    alert("Failed to change password try again");
    return ;
  }


}

useEffect(() => {
  // Islogin==true
  const token = localStorage.getItem("token");
  // console.log("data.token =", data.token);
  console.log("token front front:",token)
  if(token && token !== undefined){
    setIslogin(true);
  }
  else{
    setIslogin(false);
  }
}, []);

useEffect(() => {
  if (step !== "verify-otp") return;

  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [step]);

const sendOtp = async (gmail: string) => {
  try {
    setload(false)
    console.log("send OTP clicked");

    const res = await fetch("/api/hospital/changePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gmail,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      setload(true)
      return;
    }
    setload(true)

    alert(data.message);

    setTimeLeft(300);
    setStep("verify-otp");
  } catch (err) {
    console.log(err);
    alert("Failed to send OTP");
  }
};

if (Islogin === null) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      Loading...
    </div>
  );
}


if(Islogin){
  return(
    <>
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
      </>
  )
}

  return (

 <div className="flex min-h-screen items-center justify-center bg-slate-100">
  <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">

    {/* LOGIN */}
    {step === "login" && (
      <>
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
              value={gmail}
              onChange={(e) => setgmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-md border border-slate-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-md border border-slate-300 px-3 py-2"
            />
          </div>

          {err && (
            <div className="text-red-600">
              {err}
            </div>
          )}

          <button
            type="button"
            className="text-sm text-blue-600 hover:underline"
            onClick={() => {
              setgmail("");
              setOtp("");
              setpassword("");
              setConfirmPassword("");
              setStep("forgot-password");
            }}
          >
            Forgot Password?
          </button>

          <button
            type="button"
            className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
            onClick={() => CheckLogin()}
          >
            {isload ? "Loading..." : "Login"}
          </button>
        </form>
      </>
    )}

    {/* FORGOT PASSWORD */}
    {step === "forgot-password" && (
      <>
        <h2 className="mb-6 text-center text-2xl font-semibold">
          Forgot Password
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            value={gmail}
            onChange={(e) => setgmail(e.target.value)}
            placeholder="Enter your registered email"
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          />

          <button
            type="button"
            className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
            onClick={async () => {
              await sendOtp(gmail);

              setTimeLeft(300);
              // setStep("verify-otp");
            }}
          >
            {load?"Send OTP":"Sending..."}
          </button>

          <button
            type="button"
            className="w-full rounded-md border py-2"
            onClick={() => setStep("login")}
          >
            Back to Login
          </button>
        </div>
      </>
    )}

    {/* VERIFY OTP */}
    {step === "verify-otp" && (
      <>
        <h2 className="mb-4 text-center text-2xl font-semibold">
          Verify OTP
        </h2>

        <p className="mb-4 text-center text-sm text-slate-500">
          OTP sent to {gmail}
        </p>

        <div className="mb-4 text-center font-medium text-red-500">
          OTP Expires In: {minutes}:
          {seconds.toString().padStart(2, "0")}
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          />

          <button
            type="button"
            className="w-full rounded-md bg-green-600 py-2 text-white hover:bg-green-700"
            onClick={async () => {
              // const verified = await verifyOtp(gmail, otp);
              verifyOTP(otp,gmail);

              
            }}
          >
            Verify OTP
          </button>

          <button
            type="button"
            disabled={timeLeft > 0}
            className="w-full rounded-md border py-2 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={async () => {
              await sendOtp(gmail);
              setTimeLeft(300);
            }}
          >
            Resend OTP
          </button>

          <button
            type="button"
            className="w-full rounded-md border py-2"
            onClick={() => setStep("forgot-password")}
          >
            Back
          </button>
        </div>
      </>
    )}

    {/* CHANGE PASSWORD */}
    {step === "change-password" && (
      <>
        <h2 className="mb-6 text-center text-2xl font-semibold">
          Change Password
        </h2>

        <div className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="New Password"
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          />

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full rounded-md border border-slate-300 px-3 py-2"
          />

          {password &&
            confirmPassword &&
            password !== confirmPassword && (
              <div className="text-red-600">
                Passwords do not match
              </div>
            )}

          <button
            type="button"
            disabled={
              !password ||
              !confirmPassword ||
              password !== confirmPassword
            }
            className="w-full rounded-md bg-blue-600 py-2 text-white disabled:opacity-50"
            onClick={async () => {
              
              changePassword(gmail,password)

              // setStep("login");
            }}
          >
            Change Password
          </button>

          <button
            type="button"
            className="w-full rounded-md border py-2"
            onClick={() => setStep("verify-otp")}
          >
            Back
          </button>
        </div>
      </>
    )}
  </div>
</div>
  );
}
