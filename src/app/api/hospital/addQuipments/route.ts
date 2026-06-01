import sql from "@/lib/dbs"

import { NextResponse } from "next/server";
export async function POST(req:Request) {
    const body=await req.json();
    try{
        console.log("calleded")
        const {name,des,image,id}=body;
        if(!name || ! des || !id ){
            return NextResponse.json({message:"all doctor name and hospital name is required"},{status:404})
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

  const hospital_id = hos[0].id;

        const doc = await sql`
      INSERT INTO equipments (
        name,image,description,hospital_id
      )
      VALUES (
        ${name},${image},${des},${id}
        
      )
      RETURNING *
    `;
        return NextResponse.json({message:`sucessfully added ${name} to ${hos[0]?.name} hospital`},{status:200})

    }catch(error){
        console.log(error);
       return  NextResponse.json({message:"inter server error"},{status:500})
    }
    
}