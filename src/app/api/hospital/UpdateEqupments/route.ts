import Equipment from "@/components/hospitalPremium/equipment";
import sql from "@/lib/dbs"

import { NextResponse } from "next/server";

export async function POST(req:Request) {
    const body=await req.json();
    try{
        
        let {name,des,img,}=body;
        const{id,hos_id}=body
        if( !id ){
            return NextResponse.json({message:"all doctor name and hospital name is required"},{status:404})
        }


        const equip=await sql`
        select * from equipments where id=${id}


        `
    if (equip.length === 0) {
            return NextResponse.json(
      { message: "equipment not found" },
      { status: 404 }
    );
}

        if(equip[0]?.hospital_id!==hos_id){
            return NextResponse.json({message:"you can't do that"},{status:405})
        }

        if(!name){
            name=equip[0].name;
        }
        if(!des){
            des=equip[0].description;
        }
        if(!img){
            img=equip[0].image;
        }
        

        
       const updatedEquipments = await sql`
  UPDATE equipments
  SET
    name = ${name},
    description = ${des},
    image = ${img}
    
  WHERE id = ${id}
  RETURNING *;
`;



  
        return NextResponse.json({message:updatedEquipments},{status:200})

    }catch(error){
        console.log(error);
       return  NextResponse.json({message:"inter server error"},{status:500})
    }
    
}