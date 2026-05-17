import sql from "@/lib/dbs"

import { NextResponse } from "next/server";


export async function POST(req:Request) {
    const body=await req.json()
    try{
        const{name,specialist,education,experience,hospital}=body
        let {image}=body;
        if(!name || !specialist || !education || !experience || !hospital){
            return NextResponse.json({message:"all parameter are required"},{status:404})
        }
        if(!image) image=null

        let id=await sql`
        select id from hospitals
        where name=${hospital}
        limit 1
        `
        if(id.length==0){
            return NextResponse.json({message:"hospital withat that name not found"},{status:404})
        }
        else{
            id = id[0].id;
        }
        

        const doc = await sql`
      INSERT INTO doctors (
        name,specialist,education,experience,hospital_id
      )
      VALUES (
        ${name},${specialist},${education},${experience},${id}
        
      )
      RETURNING *
    `;
    console.log(doc)
    return NextResponse.json({message:doc},{status:201})


    }catch(error){

        console.log(error);
        return NextResponse.json({meessage:"inter server error"},{status:500})
    }
}