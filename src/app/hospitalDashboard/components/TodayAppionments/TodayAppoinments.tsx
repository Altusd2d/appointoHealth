"use client";
import Spinner from "@/components/ui/Spinner";
import  {useState ,useEffect} from "react";



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
  status: "waiting" | "booked" | "cancelled" | "completed";
  doctor_name:string
};



function TodayAppoinments() {

   const[loading,setloading]=useState<boolean>(true);
    // console.log("hospital dashboard:",hospital)
    const [hos, sethos] = useState<Appointment[]>([]);
    
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
    // console.log("Login got appoinments", data);
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
                
              </div>
              {loading?<Spinner />:<>{
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
                            className={`rounded-lg px-3 py-1 text-xs font-semibold `}>
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
  )
}

export default TodayAppoinments
