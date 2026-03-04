import CoreService from "@/components/coreServices/coreServices";
import Hero from "@/components/hero/hero";
import Process from "@/components/process/process";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <CoreService />
      <Process />
    </div>
  );
}
