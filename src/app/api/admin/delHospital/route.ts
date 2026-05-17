import sql from "@/lib/dbs"

import { NextResponse } from "next/server";

export async function DELETE(req:Request) {
    const body=await req.json();
    try{
        const {hospital}=body;
        if(! hospital){
            return NextResponse.json({message:"all doctor name and hospital name is required"},{status:404})
        }
        const checkHos=await sql`
        select *  from hospitals
        where name=${hospital} 
        limit 1

        `
        if(checkHos.length==0){
            return NextResponse.json({message:"hospita withat that name does ot exist "},{status:404})
        }



        const del=await sql`
        delete  from hospitals
        where name=${hospital} 
        `
        return NextResponse.json({message:`sucessfully deleted ${hospital} hospital`},{status:200})

    }catch(error){
        console.log(error);
       return  NextResponse.json({message:"inter server error"},{status:500})
    }
    
}