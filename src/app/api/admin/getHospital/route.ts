import sql from "@/lib/dbs"

import { NextResponse } from "next/server";

export async function POST(req:Request) {
    const body=await req.json();
    try{
        const {hospital}=body;
        if(! hospital){
            return NextResponse.json({message:" hospital name is required"},{status:400})
        }
        const hos=await sql`
        select *  from hospitals
        where name=${hospital} 
        `
        if(hos.length==0){
            return NextResponse.json({message:"hospital could't find "},{status:404})
        }
        return NextResponse.json({message:hos},{status:200})

    }catch(error){
        console.log(error);
       return  NextResponse.json({message:"Internal server error"},{status:500})
    }
    
}