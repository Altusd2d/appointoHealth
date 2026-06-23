import sql from "@/lib/dbs"
import { sendEmail } from "@/lib/mail";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    const body=await req.json();
    try{
        let {name,logo,location,description,hero_image1,hero_image2,open_time}=body;
        const{id}=body
        
        const hos=await sql`
        select *  from hospitals
        where id=${id} 
        `
        if(hos.length==0){
            return NextResponse.json({message:"could't find hospital"},{status:404})
        }
        if(!name){
            name=hos[0].name;
        }
        if(!location){
            location=hos[0].location;
        }
        if(!description){
            description=hos[0].description;
        }
        if(!hero_image1){
            hero_image1=hos[0].hero_image1;
        }
        if(!hero_image2){
            hero_image2=hos[0].hero_image2;
        }
        if(!open_time){
            open_time=hos[0].open_time;
        }
        if(!logo){
            logo=hos[0].logo;
        }
      //mail code
      body.SearchName=hos[0].name;
      await sendEmail({
  to: "prashanthpathigari@gmail.com",
  subject:`request from ${body.name}`,
  data:body
});


        // return NextResponse.json({message:updatedHospital},{status:200})
        return NextResponse.json({message:"sucessfully send requesto to support it will be changed in 2 workings days"},{status:200})

    }catch(error){
        console.log(error);
       return  NextResponse.json({message:"inter server error"},{status:500})
    }
    
}