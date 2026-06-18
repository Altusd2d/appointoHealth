"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type EquipmentCard = {
  id: string;
  name: string;
  description: string;
  image: string;
};

// const equipments: EquipmentCard[] = [
//   {
//     id: "test",
//     title: "Tests",
//     description:
//       "We have all types of test available like urine test,sugar test,BP test,all body check up etc.., with the best experience doctor in Hyderabad",
//     image: "/hospital/equipment/ct_scan.png",
//   },
//   {
//     id: "ct-scan",
//     title: "CT SCAN",
//     description:
//       "We Best CT scan that scan vital organ for better information for the doctor and also find exact problem link tumor, brain,stonack etc.,",
//     image: "/hospital/equipment/ct_scan.png",
//   },
//   {
//     id: "x-ray",
//     title: "X-RAY",
//     description:
//       "We have all types of test available like urine test,sugar test,BP test,all body check up etc., with the best experience doctor in Hyderabad",
//     image: "/hospital/equipment/ct_scan.png",
//   },
// ];

function EquipmentItem({ item }: { item: EquipmentCard }) {
  return (
    <article className="relative w-full  overflow-hidden rounded-[16px] shadow-[0_8px_18px_rgba(0,0,0,0.2)]">
      <Image
        src="/hospital/equipment/ct_scan.png"
        alt={item.name}
        width={1440}
        height={810*0.5}
        className="object-cover md:h-[400px] h-[340px]"
        // sizes="(max-width: 768px) 92vw, 760px"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.88)]" />

      <div className="absolute bottom-[55%] lg:left-[50%] left-[20%] min-w-[220px] text-white px-3 pb-3  ">
        <h3 className="md:text-[42px] text-[26px] leading-none font-bold">{item.name}</h3>
        <p className="mt-3 text-[16px] leading-6 font-medium">{item.description}</p>
      </div>
    </article>
  );
}

export default function Equipment({ id }: { id: string }) {
  const[eq,seteq]=useState<EquipmentCard[]>([]);

 const fetchEquipments=async()=>{
    const res = await fetch(`/api/home/getEquipmentsForHospital`,
          {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        id:id
        }),
      }
        );
        const data = await res.json();
        console.log("data",data)
        seteq(data.message);

  }



useEffect(() => {
      console.log("id",id)
     fetchEquipments() 
    }, []);

useEffect(() => {
      console.log("eq",eq)
    //  fetchEquipments() 
    }, [eq]);


  return (
    <section className="bg-[#ececec]  py-8 md:px-16 xl:px-32 lg:px-28 md:px-20 px-5">
      <div className="mx-auto w-full flex flex-col items-center">
        <h2 className=" lg:text-[52px] md:text-[45px] text-center text-[28px] leading-[1.1] md:w-[60vw] w-[80vw] font-bold text-[#151515]">
          We Have best Equipments that can detect any issue in the body
        </h2>

        <div className="mt-8 space-y-8">
          {eq.map((item) => (
            <EquipmentItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}



// H7VYN283WRFNW2958LMBPKJ6