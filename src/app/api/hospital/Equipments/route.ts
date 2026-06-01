import Equipment from "@/components/hospitalPremium/equipment";
import sql from "@/lib/dbs"

import { NextResponse } from "next/server";

export async function POST(req:Request) {
    const body=await req.json();
    try{
        
        const {id}=body;
        if( !id ){
            return NextResponse.json({message:"Id required"},{status:404})
        }


        const hos=await sql`
        select id from hospitals where id=${id}
        `
        
  if (hos.length === 0) {
    return NextResponse.json(
      { message: "Hospital not found" },
      { status: 404 }
    );
  }

  const equipment = hos[0].id;

        const equipments = await sql`
      Select * from equipments 
      where hospital_id=${id}
        
    `;
        return NextResponse.json({message:equipments},{status:200})

    }catch(error){
        console.log(error);
       return  NextResponse.json({message:"inter server error"},{status:500})
    }
    
}