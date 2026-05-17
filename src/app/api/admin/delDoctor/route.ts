import sql from "@/lib/dbs"

import { NextResponse } from "next/server";

export async function DELETE(req:Request) {
    const body=await req.json();
    try{
        const {doctor,hospital}=body;
        if(!doctor || ! hospital){
            return NextResponse.json({message:"all doctor name and hospital name is required"},{status:404})
        }

        const hos=await sql`
        select id from hospitals where name=${hospital}
        `


  if (hos.length === 0) {
    return NextResponse.json(
      { message: "Hospital not found" },
      { status: 404 }
    );
  }

  const hospital_id = hos[0].id;

        const del=await sql`
        delete  from doctors
        where name=${doctor} and hospital_id=${hospital_id}
        `
        return NextResponse.json({message:`sucessfully deleted ${doctor} from ${hospital} hospital`},{status:200})

    }catch(error){
        console.log(error);
       return  NextResponse.json({message:"inter server error"},{status:500})
    }
    
}