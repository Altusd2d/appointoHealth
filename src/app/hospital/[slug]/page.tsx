"use client";

import Hero from "@/components/hospitalPremium/hero";
import Doctors from "@/components/hospitalPremium/doctors";
import Equipment from "@/components/hospitalPremium/equipment";
import { useEffect ,useState} from "react";
import { useParams } from "next/navigation";
import Spinner from "@/components/ui/Spinner";
// import { data } from "framer-motion/client";
interface Hospital {
  id: string;
  name: string;
  logo: string | null;
  location: string | null;
  description: string | null;
  hero_image1: string | null;
  hero_image2: string | null;
  is_premium: boolean;
  open_time: string | null;
}


export default function Premium() {
  const { slug } = useParams();
const [hospital, setHospital] = useState<Hospital | null>(null);


  useEffect(() => {
    console.log(slug);

    async function fetchHospital() {
      const res = await fetch(`/api/home/hospital/${slug}`);
      const data = await res.json();
      setHospital(data.message[0]);
    }
    if (slug) {
      fetchHospital();
    }
  }, [slug]);



  if (!hospital) {
  return <Spinner />;
}

  return (
    
    <div>
      
      {/* <Hero data={hospital} /> */}
      {/* <Doctors id={hospital.id}/> */}
      <Equipment />
    </div>
  );
}