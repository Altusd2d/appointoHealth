import localFont from "next/font/local";
import Link from "next/link"
import Image from "next/image";
import logo from "../../../public/logo.png"
const font1 = localFont({
  src: "../../fonts/font1.woff2",
});

export default function Navbar() {
  return (
    <header className={`${font1.className} sticky top-0 z-50 bg-[#00264c] pt-4 pb-6 xl:px-20 md:px-12 px-6`}>
      <nav className="mx-auto flex  w-full items-center justify-between rounded-sm  bg-[#00264c]  ">
        <span className="text-xl font-semibold tracking-tight text-white sm:text-3xl ">
          logo
        </span>
        {/* <Image
        alt=""
         src={logo}
         width={1600*0.04}
         height={896*0.1}
         className="object-cover"
         /> */}

        {/* <div className="flex justify-"> */}
            <span className="text-center text-[14px] font-semibold  text-white 
            sm:text-lg md:text-3xl tracking-tight">
          BOOK MY DOCTOR
        </span>

        <Link href="#process"
          type="button"
          className="rounded-md bg-[#0a7be0] px-3 py-2 text-[10px] font-semibold text-white 
          transition hover:bg-[#0669c1] sm:px-5 sm:pt-3 sm:text-xs md:text-sm tracking-wide"
        >
          GET STARTED
        </Link>
        {/* </div> */}
      </nav>
    </header>
  );
}
