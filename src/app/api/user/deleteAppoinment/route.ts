import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import sql from "@/lib/dbs";
import { cookies } from "next/headers";

interface JwtPayload {
  id: string;
}

export async function DELETE(req:NextRequest) {
  try {
    // Get token from cookies
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    console.log("TOKEN:", token);

    // Check token
    if (!token) {
      return NextResponse.json(
        { message: "User not logged in" },
        { status: 401 }
      );
    }

    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    // console.log("dskjjfksdjfn:", decoded);

   const body=await req.json();
   const {id}=body;
   if(!id){
    return NextResponse.json({message:"appionemnet re quired"},{status:404})
   }


   //delecting appionment from user
   const deleteAppointment = await sql`
  DELETE FROM appointments
  WHERE id = ${id}
`;
    
   

    
      return NextResponse.json(
        { message: "sucessfully deleted" },
        { status: 409 }
      );
    

    
  } catch (error) {
    console.log("ERROR:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}