
import sql from "@/lib/dbs"

import { NextResponse } from "next/server";

export async function POST(req:Request) {
    const body=await req.json();
    try{
        
        const {id,status}=body;
        if( !id || !status ){
            return NextResponse.json({message:"Id required"},{status:404})
        }


        const app=await sql`
        select * from appointments where id=${id}
        `


  if (app.length === 0) {
    return NextResponse.json(
      { message: "Hospital not found" },
      { status: 404 }
    );
  }

  const change = await sql`
  UPDATE appointments
  SET status = ${status}
  WHERE id = ${id}
  
`;
        return NextResponse.json({message:change},{status:200})

    }catch(error){
        console.log(error);
       return  NextResponse.json({message:"inter server error"},{status:500})
    }
    
}