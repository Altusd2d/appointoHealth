import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/dbs";



export async function POST(req:NextRequest) {
  try {


  

   const body=await req.json();
   const {name}=body;
   let hos = await sql`
  SELECT *
  FROM hospitals
  WHERE name ILIKE ${`%${name}%`}
`;
if(hos.length==0){
     hos = await sql`
  SELECT DISTINCT h.*
  FROM hospitals h
  JOIN doctors d
    ON h.id = d.hospital_id
  WHERE d.specialist ILIKE ${`%${name}%`}
`;
}
  
   

    
      return NextResponse.json(
        { message: hos },
        { status: 200 }
      );
    

    
  } catch (error) {
    console.log("ERROR:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}