"use client";
import localFont from "next/font/local";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";
const font1 = localFont({
  src: "../../fonts/font1.woff2",
});
import { useEffect, useState } from "react";
import { User } from "lucide-react";
export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth/check-auth");

      setIsLoggedIn(res.ok);
      // console.log(isLoggedIn)
    };

    checkAuth();
  }, []);

  return (
    <header
      className={`${font1.className} sticky top-0 z-50 bg-[#00264c] pt-3 pb-2 xl:px-20 md:px-12 px-6`}>
      <nav className="mx-auto flex  w-full items-center justify-between rounded-sm  bg-[#00264c]  ">
        {/* <span className="text-xl font-semibold tracking-tight text-white sm:text-3xl ">
          logo
        </span> */}
        <Link href="/">
          <Image
            alt=""
            src={logo}
            width={1536 * 0.068}
            height={1024 * 0.068}
            className="object-cover cursor-pointer"
          />
        </Link>

        {/* <div className="flex justify-"> */}
        <span
          className="text-center text-[14px] font-semibold  text-white 
            sm:text-lg md:text-3xl tracking-tight">
          Appointo Health
        </span>

        {!isLoggedIn ? (
          <Link
            href="#process"
            className="rounded-md bg-[#0a7be0] px-3 py-2 text-[10px] font-semibold text-white transition hover:bg-[#0669c1] sm:px-5 sm:pt-3 sm:text-xs md:text-sm tracking-wide">
            GET STARTED
          </Link>
        ) : (
          <Link
            href="/user-dashboard"
            className="flex items-center gap-2 rounded-md bg-[#0a7be0] px-3 py-2 text-[10px] font-semibold text-white transition  sm:px-5 sm:pt-3 sm:text-xs md:text-sm tracking-wide">
            <User size={18} />
          </Link>
        )}
        {/* </div> */}
      </nav>
    </header>
  );
}
