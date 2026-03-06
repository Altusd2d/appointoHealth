import CoreService from "@/components/coreServices/coreServices";
import Hero from "@/components/hero/hero";
import HospitalSearch from "./hospital/page";
import Process from "@/components/process/process";
import BlogPage from "./blog/page";
export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <CoreService />
      <Process />
      <HospitalSearch/>
      <BlogPage/>
    </div>
  );
}
