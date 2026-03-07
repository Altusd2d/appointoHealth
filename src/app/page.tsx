import CoreService from "@/components/coreServices/coreServices";
import Hero from "@/components/hero/hero";
import HospitalSearch from "./hospital/page";
import Process from "@/components/process/process";
import BlogPage from "./blog/page";
import { Roboto } from "next/font/google";
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});
export default function Home() {
  return (
    <div className={`overflow-x-hidden ${roboto.className}`}>
      <Hero />
      <CoreService />
      <Process />
      <HospitalSearch/>
      <BlogPage/>
    </div>
  );
}
