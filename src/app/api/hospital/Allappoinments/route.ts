
import sql from "@/lib/dbs"

import { NextResponse } from "next/server";

export async function POST(req:Request) {
    const body=await req.json();
    try{
        
        
        const{id}=body
        if( !id ){
            return NextResponse.json({message:"all doctor name and hospital name is required"},{status:404})
        }  
        
       const appointment = await sql`
       select * from appointments 
       where hospital_id=${id}
`;
    if (appointment.length==0){
        return NextResponse.json({message:"no appionments has booked"},{status:400})
    }
  
        return NextResponse.json({message:appointment},{status:200})

    }catch(error){
        console.log(error);
       return  NextResponse.json({message:"inter server error"},{status:500})
    }
    
}