"use client";
import Spinner from "@/components/ui/Spinner";
// import logo from "public/apollo_logo.jpg";
import Image from "next/image";
import  { useMemo, useState ,useEffect} from "react";
import { jwtDecode } from "jwt-decode";

type Appointment = {
  age: string;
  app_id: string;
  appointment_date: string;
  appointment_time: string;
  created_at: string;
  description: string;
  doctor_id: string;
  gender: "male" | "female" | "other";
  hospital_id: string;
  id: string;
  location: string;
  name: string;
  patient_id: string;
  payment: number;
  phone_number: string;
  status: "booked" | "cancelled" | "completed" | "waiting";
};


type AppointmentWithDoctor = {
  appointment: Appointment;
  doctor: Doctor;
};

type Doctor = {
  description: string;
  id: string;
  name: string;
  specialist: string;
  education: string;
  experience: string;
  image: string;
  hospital_id: string;
  availability: Availability;
};


type Availability = {
  Monday: number[];
  Tuesday: number[];
  Wednesday: number[];
  Thursday: number[];
  Friday: number[];
  Saturday: number[];
  Sunday: number[];
};


function AllAppoinments() {

  const [hos, sethos] = useState<AppointmentWithDoctor []>([]);
  const [hospital, sethospital] = useState<AppointmentWithDoctor []>([]);
  const [searchId, setSearchId] = useState<string>("");
  const [isload,setisload]=useState<boolean>(true);
  const [loadbutton,setloadbutton]=useState<boolean>(false);
  const [loadSearch,setloadSearch]=useState<boolean>(false);


const fetchAppointment=async(searchId:string)=>{
   try{
    // console.log()
    setloadSearch(true);
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

  sethospital(data.appointment);
  // sethos([data]);

} else {
  console.log("Login failed", data.message);
}
setloadSearch(false);

  }catch(error){
    console.log(error)
    setloadSearch(false);
    return null
  }
}


const waitingApp=async(id:string,status:string)=>{
  try{
    setloadbutton(true);
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
  setloadbutton(false);
  // sethos(data.message);
  // hospital[0]?.appointment.status="completed"
  alert("status changed for this appoinment")
  

} else {
  setloadbutton(false);
  console.log("Login failed", data.message);
}
// setisload(false)


  }catch(error){
    console.log(error);
    setloadSearch(false);
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
  sethospital(data.message)
  

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
    <Spinner />
  )
}

  return (
     <div className="space-y-4">
    <div className="max-w-3xl mx-auto mb-5">
  <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-md border border-slate-200">
    
    <button
      onClick={() => {sethospital(hos)}}
      className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-700 text-white transition hover:bg-slate-800"
    >
      ←
    </button>

    <input
      type="text"
      placeholder="Search by Name, Phone, Appointment ID..."
      value={searchId}
      onChange={(e) => setSearchId(e.target.value)}
      className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
    />

    <button
      className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      onClick={()=>{fetchAppointment(searchId)}}
    >
      {loadSearch?"Fetching..":"Search"}
    </button>

  </div>
</div>
    {hospital.map((appointment) => (
      <article
        key={appointment.appointment.id}
        className="overflow-hidden rounded-md border border-slate-300 bg-[#d9d9d9] shadow-sm max-w-3xl mx-auto"
      >
        <div className="grid grid-cols-1 border-b border-white/50 bg-[#c4c4c4] text-center text-[#0d2f52] sm:grid-cols-2">
          <div className="border-r border-white/50 px-2 py-1.5 text-base font-bold">
            ID:{appointment.appointment.app_id}
          </div>

          <div className="px-2 py-1.5 text-xs font-medium text-slate-900 sm:text-sm">
           <span className="text-xl text-blue-800 font-bold">SLOT:</span> 
            {appointment.appointment.appointment_date}/
            <span className="font-semibold">
              {appointment.appointment.appointment_time}
            </span>
          </div>
        </div>

        <div className="p-2.5">
          <div className="mb-2 flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Hospital logo"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-contain"
            />





            <div className="flex flex-wrap items-center gap-3 mt-2">
  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
    📞 {appointment.appointment.phone_number}
  </span>

  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
    ₹ {appointment.appointment.payment}
  </span>

  <span
    className={`rounded-full px-3 py-1 text-sm font-semibold ${
      appointment.appointment.status === "booked"
        ? "bg-blue-100 text-blue-700"
        : appointment.appointment.status === "completed"
        ? "bg-green-100 text-green-700"
        : appointment.appointment.status === "waiting"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {appointment.appointment.status === "booked" && "📅 Booked"}
    {appointment.appointment.status === "completed" && "✅ Completed"}
    {appointment.appointment.status === "waiting" && "⏳ Waiting"}
    {/* {appointment.appointment.status === "deleted" && "❌ Deleted"} */}
    {appointment.appointment.status === "cancelled" && "🚫 Cancelled"}
  </span>
</div>



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
                  {appointment.doctor.name}
                </h3>

                <p className="text-xs">
                  {appointment.doctor.specialist}
                </p>

                <p className="text-[10px] text-slate-600">
                  {appointment.doctor.experience}
                </p>

                <p className="mt-1 text-[10px] leading-relaxed">
                  {appointment.doctor.education}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-3 overflow-hidden border border-white/70 bg-[#cfcfcf] text-center text-[#0d2f52]">
            <div className="border-r border-white/70 px-2 py-1 text-xs font-bold">
              {appointment.appointment.name}
            </div>

            <div className="border-r border-white/70 px-2 py-1 text-xs font-bold">
              Age:{appointment.appointment.age}
            </div>

            <div className="px-2 py-1 text-xs font-bold">
              {appointment.appointment.gender}
            </div>
          </div>

          <div className="mt-1 border border-white/70 bg-[#cfcfcf] px-2 py-2 text-center text-xs text-slate-900">
            {appointment.appointment.description}
          </div>

          <div className="mt-3 flex flex-wrap justify-center gap-13">
            <button
              onClick={() =>
                waitingApp(appointment.appointment.id, "waiting")
              }
              className="rounded-md bg-[#f4d632] px-3 py-1 text-xs font-bold text-white"
            >
              {loadbutton?"Updating..":"Waiting"}
            </button>

            {/* <button
              className="rounded-md bg-[#f50000] px-3 py-1 text-xs font-bold text-white"
            >
              {loadbutton?"Updating..":"Resedule"}
            </button> */}

            <button
              onClick={() =>{
                // appointment.appointment.status="completed"
                waitingApp(appointment.appointment.id, "completed")
              }
              }
              className="rounded-md bg-[#0069d1] px-3 py-1 text-xs font-bold text-white"
            >
              {loadbutton?"Updating..":"Complete"}
            </button>
          </div>
        </div>
      </article>
    ))}
  </div>
  )
}

export default AllAppoinments
function sethos(message: any) {
  throw new Error("Function not implemented.");
}

function setisload(arg0: boolean) {
  throw new Error("Function not implemented.");
}

