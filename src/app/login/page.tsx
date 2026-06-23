import Image from "next/image";
import Link from "next/link";
import sethascope from "../../../public/sign-up/sethascope.png"
import heartrate from "../../../public/sign-up/heart_rate.png"
export const metadata = {
  title: "Login | Appointo Health",
  description:
    "Securely login to Appointo Health to manage doctor appointments, consultations, medical records, and healthcare bookings online.",
};
export default function Login() {
  return (
    <main className=" bg-white px-4 py-10 md:px-6">
      <section className="mx-auto flex w-full max-w-5xl flex-col overflow-hidden 
       bg-[#efefef] md:flex-row md:shadow-2xl rounded-xl">
        <div className="relative hidden md:flex w-full flex-col items-center
         justify-between bg-white px-6 pb-8 pt-10 md:w-1/2 md:px-8">
          <h1 className="z-10 text-center text-4xl font-bold uppercase
           leading-tight text-[#042b52] lg:text-5xl text-[40px]">
            Appointo
            <br />
            Health
          </h1>

          <div className="flex items-center ">
          <Image
            src={heartrate}
            alt="Heartbeat line"
            // width={240}
            // height={90}
            className="mt-1 ml-14 w-[30vw] h-[200px] left-[0%]
            absolute top-40 object-contain"
          />
          <Image
            src={sethascope}
            alt="Stethoscope"
            // width={210}
            // height={280}
            className=" 
             md:w-[20vwpx] h-[290px] -ml-15 object-contain 
             absolute top-[16%] lg:left-[60%] z-20 left[50%] xl:left-[64%]"
            priority
          />
          </div>

//           <div className="flex items-center ">
//           <Image
//             src={heartrate}
//             alt="Heartbeat line"
//             // width={240}
//             // height={90}
//             className="mt-1 ml-14 w-[30vw] h-[200px] left-[0%]
//             absolute top-40 object-contain"
//           />
//           <Image
//             src={sethascope}
//             alt="Stethoscope"
//             // width={210}
//             // height={280}
//             className="
//              md:w-[20vwpx] h-[290px] -ml-15 object-contain
//              absolute top-[16%] lg:left-[60%] z-20 left[50%] xl:left-[64%]"
//             priority
//           />
//           </div>

//           <p className="mt-50 text-center text-3xl leading-tight text-[#00264c] [font-family:serif] md:text-5xl">
//             Your Life Ours
//             <br />
//             Responsibility
//           </p>
//         </div>

//         <div className="relative w-full overflow-hidden bg-[#e7e7e7] px-6 py-8 md:w-1/2 md:px-10 md:py-10">
//           <div className="pointer-events-none absolute inset-0 md:hidden">
//             <Image
//               src={heartrate}
//               alt=""
//               fill
//               className="object-cover opacity-25 blur-[1px]"
//             />
//             <div className="absolute inset-0 bg-white/35 backdrop-blur-[3px]" />
//             <p className="absolute left-1/2 top-5 -translate-x-1/2 text-center text-6xl font-bold uppercase leading-[0.9] text-[#0a2d54]/8">
//               Appointo
//               <br />
//               Health
//             </p>
//             <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-5xl leading-tight text-[#0a2d54]/10 [font-family:serif]">
//               Your Life Ours
//               <br />
//               Responsibility
//             </p>
//           </div>

//           <h2 className="relative z-10 mb-6 text-center text-4xl font-bold text-[#00264c] ">Login </h2>

//           <form className="relative z-10 space-y-4">
//             <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

//             </div>

//             <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
//               <label className="text-xs md:text-sm font-semibold text-[#1f1f1f]">
//                 Phone Number *
//                 <input
//                   type="tel"
//                   placeholder="1234567890"
//                   className="mt-3 h-9 w-full rounded bg-white px-2 text-xs text-[#1d1d1d] outline-none ring-1 ring-[#d7d7d7] placeholder:text-[#bcbcbc]"
//                 />
//               </label>

//             </div>

//             {/* <div>
//               <p className="text-xs font-semibold text-[#1f1f1f]">Enter OTP</p>
//               <div className="mt-2 flex gap-2">
//                 {[0, 1, 2, 3].map((slot) => (
//                   <input
//                     key={slot}
//                     maxLength={1}
//                     placeholder="*"
//                     className="h-8 w-8 rounded bg-white text-center text-sm outline-none ring-1 ring-[#d7d7d7]"
//                   />
//                 ))}
//               </div>
//             </div> */}

//             <Link href="/verify-otp">
//             <button
//               type="submit"
//               className="mt-4 h-11 w-full rounded-md bg-[#002b5a] text-lg font-bold text-white shadow-[0_10px_24px_rgba(0,43,90,0.35)] transition-shadow duration-200 hover:shadow-[0_14px_30px_rgba(0,43,90,0.45)]"
//             >
//               Login
//             </button>
//             </Link>

//             <p className="py-2.5 text-sm text-[#0d3055]">I Don't have a account?</p>

//             <Link
//               href="/sign-up"
//               className="flex h-11 w-full items-center justify-center rounded-md bg-[#002b5a] text-lg font-bold text-white shadow-[0_10px_24px_rgba(0,43,90,0.35)] transition-shadow duration-200 hover:shadow-[0_14px_30px_rgba(0,43,90,0.45)]"
//             >
//               Sign up
//             </Link>
//           </form>
//         </div>
//       </section>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Login() {
  const [phone_number, setPhoneNumber] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/user-login-temp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      if(res.ok){
      localStorage.setItem("token", data.token);
      alert("Login successful");
      console.log(data);
      router.push("/user-dashboard");
      }
    
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">Phone Number</label>
            <div className="flex">
              <div className="flex items-center rounded-l-lg border border-r-0 bg-gray-100 px-4 text-gray-700">
                +91
              </div>

              <input
                type="tel"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                required
                className="w-full rounded-r-lg border bg-gray-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
