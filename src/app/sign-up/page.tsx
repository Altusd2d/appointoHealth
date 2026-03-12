import Image from "next/image";
import Link from "next/link";
import sethascope from "../../../public/sign-up/sethascope.png"
import heartrate from "../../../public/sign-up/heart_rate.png"
export default function Signup() {
  return (
    <main className=" bg-white px-4 py-10 md:px-6">
      <section className="mx-auto flex w-full max-w-5xl flex-col overflow-hidden 
       bg-[#efefef] md:flex-row shadow-2xl rounded-xl">
        <div className="relative hidden md:flex w-full flex-col items-center
         justify-between bg-white px-6 pb-8 pt-10 md:w-1/2 md:px-8">
          <h1 className="z-10 text-center text-4xl font-bold uppercase
           leading-tight text-[#042b52] md:text-5xl">
            Appointo 
            <br />
            Health
          </h1>

          <div className="flex -mb-30 -mt-10 ">
          <Image
            src={heartrate}
            alt="Heartbeat line"
            // width={240}
            // height={90}
            className="mt-1 ml-14 md:max-w-[290px] h-[200px] object-contain"
          />
          <Image
            src={sethascope}
            alt="Stethoscope"
            // width={210}
            // height={280}
            className=" 
             w-[120px] md:w-[330px] h-[290px] -ml-15 object-contain"
            priority
          />
          </div>

          <p className="mt-8 text-center text-4xl leading-tight text-[#00264c] [font-family:serif] md:text-5xl">
            Your Life Ours
            <br />
            Responsibility
          </p>
        </div>

        <div className="w-full bg-[#e7e7e7] px-6 py-8 md:w-1/2 md:px-10 md:py-10">
          <h2 className="mb-6 text-center text-4xl font-bold text-[#00264c]">Sign Up</h2>

          <form className="space-y-4">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <label className="text-xs font-semibold text-[#1f1f1f]">
                Name *
                <input
                  type="text"
                  placeholder="Please enter name"
                  className="mt-3 h-8 w-full rounded bg-white px-2 text-xs text-[#1d1d1d] outline-none ring-1 ring-[#d7d7d7] placeholder:text-[#bcbcbc]"
                />
              </label>
              <label className="text-xs font-semibold text-[#1f1f1f]">
                Gmail *
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="mt-3 h-8 w-full rounded bg-white px-2 text-xs text-[#1d1d1d] outline-none ring-1 ring-[#d7d7d7] placeholder:text-[#bcbcbc]"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
              <label className="text-xs font-semibold text-[#1f1f1f]">
                Phone Number *
                <input
                  type="tel"
                  placeholder="1234567890"
                  className="mt-3 h-8 w-full rounded bg-white px-2 text-xs text-[#1d1d1d] outline-none ring-1 ring-[#d7d7d7] placeholder:text-[#bcbcbc]"
                />
              </label>
              <fieldset className="text-xs font-semibold text-[#1f1f1f]">
                <legend className="mb-1 mt-4">Gender *</legend>
                <div className="mt-2 flex items-center gap-3 text-[10px] font-medium text-[#303030]">
                  <label className="flex items-center gap-1">
                    <input type="radio" name="gender" className="h-3 w-3" /> MALE
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="radio" name="gender" className="h-3 w-3" /> Female
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="radio" name="gender" className="h-3 w-3" /> Others
                  </label>
                </div>
              </fieldset>
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
              SIGNUP
            </button>

            <p className="py-2.5 text-sm text-[#0d3055]">I already have a account?</p>

            <Link
              href="/login"
              className="flex h-11 w-full items-center justify-center rounded-md bg-[#002b5a] 
              text-lg font-bold text-white shadow-2xl"
            >
              Login
            </Link>
          </form>
        </div>
      </section>
    </main>
  );
}
