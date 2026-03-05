"use client"
import { useState } from "react";
export default function HospitalSearch() {
  const[searchText,setSearchteaxt]=useState("");
  return (
    <div>
      <div className="flex justify-center items-center my-5 gap-4">
        <input
          placeholder="search for hospitals"
          onChange={(e)=>{
            setSearchteaxt(e.target.value);
          }}
          className=" rounded-xl border py-2 px-5  font-2xl"
        />
        <button
         onClick={()=>{
            findHospital(searchText);
         }}
         className="text-2xl bg-sky-600 rounded-xl px-2 py-1.25
          text-center cursor-pointer">search</button>
      </div>
    </div>
  );
}
