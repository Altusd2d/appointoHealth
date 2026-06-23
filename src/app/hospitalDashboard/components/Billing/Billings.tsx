"use client";
import Spinner from "@/components/ui/Spinner";
import  {  useState ,useEffect} from "react";



export type TodayBilling = {
  length: number;
  app_id: string;
  doctor_name: string;
  payment: number;
};

export interface MonthlyBilling {
  appointment_date: string;
  total_appointments: number;
  total_amount: number;
}


function Billings() {

      const [loading, setloading] = useState<boolean>(false);
    const [TodayBilling, SetTodayBilling] = useState<TodayBilling []>([]);
    const [MonthlyBilling, SetMonthlyBilling] = useState<MonthlyBilling []>([]);

    const[load,setload]=useState<boolean>(false);
    
      const totalAmount = TodayBilling.reduce(
        (sum, appointment) => sum + Number(appointment.payment),0
      );
    
       const totalAppointments = MonthlyBilling.reduce(
        (sum, item) => sum + Number(item.total_appointments),
        0
      );
    
      const totalAmountMonth = MonthlyBilling.reduce(
        (sum, item) => sum + Number(item.total_amount),
        0
      );
    
    
    
    
      const FetchTodayBilling=async()=>{
        setload(true)
    
        try {
        console.log("entered")
        const res = await fetch(
          "/api/hospital/Billing",
          {
            method: "GET",
          }
        );
    
        const data = await res.json();
        console.log(data)
    
        if (!res.ok) {
          console.log(data.message);
          setload(false)
         
          return;
        }
        setload(false)
        // console.log(data.message)
        SetTodayBilling(data.Today);
        SetMonthlyBilling(data.Month)
      } catch (error) {
        console.log(error);
        setload(false)
      } finally {
        
        // setLoadingDoctors(false);
      }
    
    
      }
    
      
    
    
    
    useEffect(() => {
      FetchTodayBilling();
      
    }, []);
      
    
    useEffect(() => {
      // FetchTodayBilling();
      console.log("month",MonthlyBilling);
      console.log("Today",TodayBilling)
      
    }, [MonthlyBilling]);


    if(load){
        return <Spinner />
    }


  return (
    <>
     <div className="min-h-screen bg-slate-100 p-6 flex justify-center items-start">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <h1 className="text-3xl font-bold text-white">
            Appointment Summary
          </h1>
          <p className="text-blue-100 mt-1">
            Hospital Billing Report
          </p>
        </div>

        {/* Table */}
        <div className="p-8">
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase">
                    Appointment ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase">
                    Doctor Name
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700 uppercase">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                {TodayBilling.map((appointment, index) => (
                  <tr
                    key={appointment.app_id}
                    className={`hover:bg-slate-50 transition ${
                      index !== appointment.length - 1
                        ? "border-b border-slate-200"
                        : ""
                    }`}
                  >
                    <td className="px-6 py-5 font-medium text-slate-800">
                      {appointment.app_id}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {appointment.doctor_name}
                    </td>

                    <td className="px-6 py-5 text-right font-semibold text-slate-800">
                      ₹{appointment.payment.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr className="bg-blue-50 border-t-2 border-blue-200">
                  <td
                    colSpan={2}
                    className="px-6 py-5 text-right text-lg font-bold text-slate-800"
                  >
                    Total Amount
                  </td>

                  <td className="px-6 py-5 text-right text-2xl font-bold text-blue-700">
                    ₹{totalAmount.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Summary Card */}
          <div className="mt-6 flex justify-end">
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-6 py-4">
              <p className="text-sm text-slate-500">
                Total Appointments
              </p>
              <p className="text-2xl font-bold text-slate-800">
                {/* {appointments.length} */}
                {TodayBilling.length} 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>



 <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
        <h2 className="text-2xl font-bold text-white">
          Monthly Appointment Summary
        </h2>
        <p className="text-emerald-100">
          June 2026 Overview
        </p>
      </div>

      {/* Table */}
      <div className="p-8">
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase">
                  Date
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700 uppercase">
                  Appointments
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700 uppercase">
                  Total Amount
                </th>
              </tr>
            </thead>

            <tbody>
              {MonthlyBilling.map((item) => (
                <tr
                  key={item.appointment_date}
                  className="border-b border-slate-200 hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {new Date(item.appointment_date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center min-w-[40px] px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold">
                      {item.total_appointments}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right font-semibold text-slate-800">
                    ₹{item.total_amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr className="bg-emerald-50 border-t-2 border-emerald-200">
                <td className="px-6 py-5 font-bold text-slate-800">
                  Month Total
                </td>

                <td className="px-6 py-5 text-center font-bold text-emerald-700 text-lg">
                  {totalAppointments}
                </td>

                <td className="px-6 py-5 text-right font-bold text-2xl text-emerald-700">
                  ₹{totalAmount.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <p className="text-sm text-slate-500">
              Total Appointments This Month
            </p>
            <p className="text-3xl font-bold text-slate-800 mt-1">
              {totalAppointments}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <p className="text-sm text-slate-500">
              Total Revenue This Month
            </p>
            <p className="text-3xl font-bold text-emerald-600 mt-1">
              ₹{totalAmountMonth.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>


    </>
  )
}

export default Billings
