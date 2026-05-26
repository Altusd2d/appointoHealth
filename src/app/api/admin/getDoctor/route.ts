import { NextResponse } from "next/server";
import sql from "@/lib/dbs";


export async function POST(req:Request) {
    try{
       const body=await req.json();
       const {doctor_id}=body;
       
       if(!doctor_id){
        return  NextResponse.json({message:"Doctor id is required"},{status:400})
       }
       const doctor=await sql`
       select * from doctors
       where id=${doctor_id}
       `
       if(!doctor){
        return NextResponse.json({message:"no doctor found/doctor got deleted"},{status:404})
       }
       return NextResponse.json({message:doctor},{status:200})
    }catch(error){
        console.log(error)
        return NextResponse.json({message:"internal server error"},{status:500})

    }
    
}