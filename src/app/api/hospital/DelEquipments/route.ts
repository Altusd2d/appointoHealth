import sql from "@/lib/dbs"

import { NextResponse } from "next/server";

export async function DELETE(req:Request) {
    const body=await req.json();
    try{
        const {id,hos_id}=body;
        if(!id || ! hos_id){
            return NextResponse.json({message:"all doctor name and hospital name is required"},{status:404})
        }

        const hos=await sql`
        select id from equipments where hospital_id=${hos_id}
        `


  if (hos.length === 0) {
    return NextResponse.json(
      { message: "Hospital not found" },
      { status: 404 }
    );
  }


        const del=await sql`
        delete  from equipments
        where id=${id}
        `
        return NextResponse.json({message:`sucessfully deleted ${hos[0].name} `},{status:200})

    }catch(error){
        console.log(error);
       return  NextResponse.json({message:"inter server error"},{status:500})
    }
    
}