import { NextResponse } from "next/server";
import sql from "@/lib/dbs";

export async function POST(req:Request) {
//   const { id } = await params;
 const body=await req.json();

  const {id}=body;
  if(!id){
    return NextResponse.json({message:"doctor id required "},{status:404})
  }

  const hos = await sql`
    SELECT *
    FROM equipments
    WHERE hospital_id = ${id}
    
  `;
console.log(hos)
  return NextResponse.json({message:hos},{status:200});
}


// src\app\api\home\getEquipmentsForHospital\route.ts