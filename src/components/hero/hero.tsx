"use client";
import phones from "../../../public/hero/webpages_in_phone-removebg-preview.png";
import Image from "next/image";
// import localFont from "next/font/local";
import Link from "next/link";
import { motion } from "framer-motion";
export default function Hero() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

// useEffect(() => {
//   const checkAuth = async () => {
//     const res = await fetch("/api/auth/check-auth");

//     setIsLoggedIn(res.ok);
//   };

//   checkAuth();
// }, []);

  const title = "Tired of waiting for booking appointments for a doctor";

  const handleBookAppointmentClick = () => {
    const target = document.getElementById("hospitalSearch");
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", "#hospitalSearch");
  };
  return (
    <div
      className={`bg-[#00264c] xl:px-20 md:px-12 px-6 tracking-tighter md:pb-6 
           Roboto `}
    >
      {/* <Navbar/> */}
      <div className="flex max-md:flex-col items-center">
        <div className="flex-col ">
          <motion.span
            className="text-white xl:text-[60px] lg:text-5xl md:text-4xl sm:text-3xl text-3xl font-medium
                mr-7 xl:leading-17 mt-8 text-center  tracking-tight"
          >
            {title.split(" ").map((word, i) => {
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, filter: "blur(6px)", y: 10 }}
                  whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ delay: i * 0.09, duration: 0.9 }}
                  viewport={{ once: true, amount: 0.99 }}
                  className="inline-block lg:mr-2 md:mr-1.5 sm:m-1 mr-1.25"
                >
                  {word}
                </motion.span>
              );
            })}
          </motion.span>
          <p className="opacity-65 md:mt-8 mt-4 text-lg text-white tracking-normal">
            No more waiting, book the doctor first, then visit and save time
          </p>
          <div className="flex sm:gap-14 gap-8 md:mt-8 mt-4 text-center font-medium text-[15px]">
            <button
              type="button"
              onClick={handleBookAppointmentClick}
              className="text-black bg-white rounded-lg py-1.5 px-3 
                text-center whitespace-nowrap font-semibold md:text-lg text-md cursor-pointer"
            >
              Book an appointment
            </button>
           {
            !isLoggedIn &&(
               <Link href="#process">
              <div className="bg-[#0066cc] rounded-lg py-2 px-3 text-center tracking-normal text-white">
                GET STARTED
              </div>
            </Link>
            )
           }
          </div>
        </div>
        <Image src={phones} alt="" width={577 * 1.5} height={433 * 1.5} />
      </div>
    </div>
  );
}
