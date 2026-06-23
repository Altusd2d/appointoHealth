"use client";

import Spinner from "@/components/ui/Spinner";
import  { useMemo, useState ,useEffect} from "react";
import { jwtDecode } from "jwt-decode";
import AllAppoinments from "./components/AllAppoinments/AllAppoinments";
import TodayAppoinments from "./components/TodayAppionments/TodayAppoinments";
import Doctors from "./components/Doctors/Doctors";
import Billings from "./components/Billing/Billings";
import Setting from "./components/Setting/Setting";
import { decode } from "punycode";

type DecodedToken = {
  id: string;
  gmail: string;
  name: string;
  role: "hospital" | "patient" | "admin";
  iat: number;
  exp: number;
};




type TabKey ="Dashboard"| "Appointments" | "Doctors" | "Billing" | "Analytics" | "Settings";



export default function HospitalDashboardPage() {

  
  const sidebarItems: { label: TabKey; glyph: string }[] = [
  { label: "Dashboard", glyph: "DB" },
  { label: "Appointments", glyph: "AP" },
  { label: "Doctors", glyph: "DR" },
  { label: "Billing", glyph: "BL" },
  { label: "Analytics", glyph: "AN" },
  { label: "Settings", glyph: "ST" },
  ];

  const [step, setStep] = useState< "login" | "forgot-password" |"verify-otp" | "change-password"|"reset-password">("login");
  const [otp, setOtp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 mins
  const [activeTab, setActiveTab] = useState<TabKey>("Dashboard");
  const [Islogin, setIslogin] = useState<boolean | null>(null);
  const [gmail, setgmail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [err, seterr] = useState<string>("");
  const [isload, setisload] = useState<boolean>(false);
  const [hospital,sethospital]=useState(null);
  const [load, setload] = useState(false);
  const[name,setname]=useState<string>("")
  const[id,setid]=useState<string>("")
  const[mail,setmail]=useState<string>("")
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const CheckLogin=async()=>
  {
    setisload(true)
      console.log(gmail,password);
      if(gmail.length==0 || password.length==0){
        console.log("gmail or password is required")
      }
      const loginQuery = await fetch(
  "/api/services/login",
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
  // const token = localStorage.getItem("token");
  const decoded = jwtDecode<DecodedToken>(data.token);

setname(decoded.name)
      setid(decoded.id);
      setmail(decoded.gmail)

  console.log("Login successful", data);
  setIslogin(true)
  sethospital(data)
  
} 
else {
  console.log("Login failed", data.message);
  seterr(data.message)
}
setisload(false)
}


const panel = useMemo(() => {
  if (activeTab === "Dashboard")
    return <TodayAppoinments />


  if (activeTab === "Appointments")
  return <AllAppoinments />

  if (activeTab === "Doctors")
   return <Doctors />

  if (activeTab === "Settings")
    // return <SettingsPanel hospital={hospital} />;
  return <Setting mail={mail} id={id}/>

  if (activeTab === "Billing")
    // return <BillingPanel />;
  return <Billings />

  // return <SimplePanel title={activeTab} />;
  return <></>
}, [activeTab, hospital]);


const verifyOTP = async (
  otp: string,
  gmail: string
): Promise<boolean> => {
  setload(true)
  try {
    const res = await fetch(
      "/api/services/verifyOtp",
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
      setload(false);
      alert(data.message);

      
      return false;
    }
    setload(false)
    setStep("change-password");
    alert(data.message);
    return true;
  } catch (err) {
    console.log(err);
    setload(false)
    alert("Failed to verify OTP");
    return false;
  }
  finally{
    setload(false);
  }
};


const changePassword=async(gmail:string,password:string)=>{
  try {
    setload(true)
    const res = await fetch(
      "/api/services/UpdatePassword",
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
    setload(false)

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
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      console.log("Token",decoded.gmail)
      setname(decoded.name)
      setid(decoded.id);
      setmail(decoded.gmail)

      if (decoded.role === "hospital") {
        setIslogin(true);
      }
    } catch {
      localStorage.removeItem("token");
      setIslogin(false);
    }
  } else {
    setIslogin(false);
    setStep("login");
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
    setload(true)

    const res = await fetch("/api/services/changePassword", {
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
      setload(false)
      alert(data.message);
      return;
    }
    setload(false)

    alert(data.message);

    setTimeLeft(300);
    setStep("verify-otp");
  } catch (err) {
    console.log(err);
    alert("Failed to send OTP");
  }
  finally{
    setload(false)
  }
};

if (Islogin === null) {
  return (
    <>
    <Spinner />
    </>
  );
}

console.log("hospital",hospital)

if(Islogin){
  return(
    <>
    <div className="flex min-h-screen flex-col md:flex-row">
        <aside className="w-full bg-[#141821] text-white md:w-64 md:flex-shrink-0">
          <div className="border-b border-white/10 px-6 py-6 text-3xl font-semibold tracking-tight">
             Apponto Health
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
            <div className="p-3 border-t border-slate-700">
    <button
      onClick={() => {
        localStorage.removeItem("token");
        window.location.reload();
      }}
      className="flex w-full items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
    >
      Logout
    </button>
  </div>
        </aside>

        <section className="min-w-0 flex-1 p-4 md:p-6 lg:p-8">
          <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold">{activeTab}</h1>
              <p className="mt-1 text-base text-slate-600">
                Welcome back, <span className="text-xl font-bold uppercase">{name}</span>
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
  disabled={isload}
  className={`w-full rounded-md py-2 text-white ${
    isload
      ? "cursor-not-allowed bg-blue-400"
      : "bg-blue-600 hover:bg-blue-700"
  }`}
  onClick={() => CheckLogin()}
>
  {isload ? "Logging..." : "Login"}
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
            className={`w-full rounded-md py-2 text-white ${
    load
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
  }`}
            onClick={async () => {
              await sendOtp(gmail);

              setTimeLeft(300);
              // setStep("verify-otp");
            }}
          >
            {load?"Sending...":"Send OTP"}
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
            className={`w-full rounded-md border border-slate-300 px-3 py-2
           
      
      `}
          />

          <button
  type="button"
  disabled={load}
  className={`w-full rounded-md py-2 text-white ${
    load
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-green-600 hover:bg-green-700"
  }`}
  onClick={async () => {
    await verifyOTP(otp, gmail);
  }}
>
  {load ? "Verifying..." : "Verify OTP"}
</button>

          <button
  type="button"
  disabled={timeLeft > 0 || load}
  className="w-full rounded-md border py-2 disabled:cursor-not-allowed disabled:opacity-50"
  onClick={async () => {
    await sendOtp(gmail);
    setTimeLeft(300);
  }}
>
  {load ? "Sending..." : "Resend OTP"}
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
    load ||
    !password ||
    !confirmPassword ||
    password !== confirmPassword
  }
  className="w-full rounded-md bg-blue-600 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
  onClick={async () => {
    await changePassword(gmail, password);
  }}
>
  {load ? "Changing Password..." : "Change Password"}
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