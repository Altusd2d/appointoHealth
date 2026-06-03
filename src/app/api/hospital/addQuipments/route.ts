
import { NextResponse } from "next/server";
import sql from "@/lib/dbs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";


interface JwtPayload {
  id: string;
  role: string;
}

export async function POST(req:Request) {
    const body=await req.json();
    try{

       const cookieStore = await cookies();
       const token = cookieStore.get("token")?.value;

       if (!token) {
      return NextResponse.json(
        { message: "User not logged in" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    console.log(decoded)

    // optional role check
    if (decoded.role !== "hospital") {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 403 }
      );
    }


        // console.log("calleded")
        const {name,des,image}=body;
        if(!name || ! des  ){
            return NextResponse.json({message:"all doctor name and hospital name is required"},{status:404})
        }
  

        const equipment = await sql`
      INSERT INTO equipments (
        name,image,description,hospital_id
      )
      VALUES (
        ${name},${image},${des},${decoded.id}
        
      )
      RETURNING *
    `;
        return NextResponse.json({message:`sucessfully added ${name} to hospital`,equipment},{status:200})

    }catch(error){
        console.log(error);
       return  NextResponse.json({message:"inter server error"},{status:500})
    }
    
}