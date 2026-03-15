import Image from "next/image";
import Link from "next/link";
import sethascope from "../../../public/sign-up/sethascope.png"
import heartrate from "../../../public/sign-up/heart_rate.png"
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
             absolute top-20 lg:left-[60%] z-20 left[50%]"
            priority
          />
          </div>

          <p className="mt-8 text-center text-3xl leading-tight text-[#00264c] [font-family:serif] md:text-5xl">
            Your Life Ours
            <br />
            Responsibility
          </p>
        </div>

        <div className="relative w-full overflow-hidden bg-[#e7e7e7] px-6 py-8 md:w-1/2 md:px-10 md:py-10">
          <div className="pointer-events-none absolute inset-0 md:hidden">
            <Image
              src={heartrate}
              alt=""
              fill
              className="object-cover opacity-25 blur-[1px]"
            />
            <div className="absolute inset-0 bg-white/35 backdrop-blur-[3px]" />
            <p className="absolute left-1/2 top-5 -translate-x-1/2 text-center text-6xl font-bold uppercase leading-[0.9] text-[#0a2d54]/8">
              Appointo
              <br />
              Health
            </p>
            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-5xl leading-tight text-[#0a2d54]/10 [font-family:serif]">
              Your Life Ours
              <br />
              Responsibility
            </p>
          </div>

          <h2 className="relative z-10 mb-6 text-center text-4xl font-bold text-[#00264c] uppercase">Login </h2>

          <form className="relative z-10 space-y-4">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              
              
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
              <label className="text-xs md:text-sm font-semibold text-[#1f1f1f]">
                Phone Number *
                <input
                  type="tel"
                  placeholder="1234567890"
                  className="mt-3 h-9 w-full rounded bg-white px-2 text-xs text-[#1d1d1d] outline-none ring-1 ring-[#d7d7d7] placeholder:text-[#bcbcbc]"
                />
              </label>
            
            </div>

            <div>
              <p className="text-xs font-semibold text-[#1f1f1f]">Enter OTP</p>
              <div className="mt-2 flex gap-2">
                {[0, 1, 2, 3].map((slot) => (
                  <input
                    key={slot}
                    maxLength={1}
                    placeholder="*"
                    className="h-8 w-8 rounded bg-white text-center text-sm outline-none ring-1 ring-[#d7d7d7]"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 h-11 w-full rounded-md shadow-2xl bg-[#002b5a]
               text-lg font-bold text-white "
            >
              Login
            </button>

            <p className="py-2.5 text-sm text-[#0d3055]">I Don't have a account?</p>

            <Link
              href="/login"
              className="flex h-11 w-full items-center justify-center rounded-md bg-[#002b5a] 
              text-lg font-bold text-white shadow-2xl"
            >
              SIGNUP
            </Link>
          </form>
        </div>
      </section>
    </main>
  );
}
