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
   let {name,phone_number,email,age,gender,bio}=body;
   const hos=await sql`
        select *  from users
        where id=${decoded.id} 
        `
        if(!name){
            name=hos[0].name;
        }
        if(!phone_number){
            phone_number=hos[0].phone_number;
        }
        if(!email){
            email=hos[0].email;
        }
        if(!age){
            age=hos[0].age;
        }
        if(!gender){
            gender=hos[0].gender;
        }
        if(!bio){
            bio=hos[0].bio;
        }

        const updatedProfile = await sql`
  UPDATE users
  SET
    name = ${name},
    phone_number = ${phone_number},
    email = ${email},
    age = ${age},
    gender = ${gender},
    bio = ${bio}
  WHERE id = ${decoded.id}
  RETURNING *;
`;

   

    
      return NextResponse.json(
        { message: "sucessfully upated",updatedProfile },
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