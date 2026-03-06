import localFont from "next/font/local";

const font1 = localFont({
  src: "../../fonts/font1.woff2",
});

export default function Navbar() {
  return (
    <header className={`${font1.className} bg-[#00264c]  pt-4 pb-6`}>
      <nav className="mx-auto flex  w-full items-center justify-between rounded-sm  bg-[#00264c]  ">
        <span className="text-xl font-semibold tracking-tight text-white sm:text-3xl ">
          logo
        </span>

        {/* <div className="flex justify-"> */}
            <span className="text-center text-sm font-semibold tracking-wide text-white sm:text-lg md:text-xl">
          BOOK MY DOCTOR
        </span>

        <button
          type="button"
          className="rounded-md bg-[#0a7be0] px-3 py-2 text-[10px] font-semibold text-white 
          transition hover:bg-[#0669c1] sm:px-5 sm:pt-3 sm:text-xs md:text-sm"
        >
          GET STARTED
        </button>
        {/* </div> */}
      </nav>
    </header>
  );
}
