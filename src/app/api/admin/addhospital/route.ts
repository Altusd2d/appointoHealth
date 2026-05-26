import sql from "@/lib/dbs"
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req:Request) {

    const body=await req.json();
    try {
        const {name,location,description,is_premium,gmail,password}=body;
        let {open_time,hero_image1,hero_image2,logo}=body
        if(!name ||!location ||!gmail || !password ){
            console.log(name,location,is_premium)
            return NextResponse.json({message:"All parameters are required"},{status:400})
        }
        const checkHos=await sql`
        SELECT *
      FROM hospitals
      WHERE name = ${name}
      limit 1
        `
        if(checkHos.length>=1){
            return NextResponse.json({message:"hospital with this name exist give another name",checkHos},{status:409})
        }
        if(!open_time){
            open_time="24 hrs"
        }
        if(!hero_image1){
            hero_image1=null
        }
        if(!hero_image2){
            hero_image2=null
        }
         if(!logo){
            logo=null
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const hospital = await sql`
      INSERT INTO hospitals (
        name,
        logo,
        location,
        hero_image1,
        hero_image2,
        description,
        is_premium,
        open_time,
        gmail,
        password
      )
      VALUES (
        ${name},
        ${logo},
        ${location},
        ${hero_image1},
        ${hero_image2},
        ${description},
        ${is_premium},
        ${24/7},
        ${gmail},
        ${hashedPassword}
      )
      RETURNING *
    `;
    return NextResponse.json(
      {
        message: "Hospital sucessfully added",
        appointment: hospital[0],
      },
      { status: 201 }
    );

        
    } catch (error) {
        console.log("error:",error)
        return NextResponse.json(
            {message:"internal server error"},
            {status:500}
        )
    }


}