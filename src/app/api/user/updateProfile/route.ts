import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import sql from "@/lib/dbs";
import { cookies } from "next/headers";
import { getUserFromToken } from "@/lib/getUserFromToken";

// interface JwtPayload {
//   userId: string;
// }

export async function DELETE(req: NextRequest) {
  try {
    
    const decoded = await getUserFromToken()

    // console.log("dskjjfksdjfn:", decoded);

    const body = await req.json();
    let { name, phone_number, email, age, gender, bio } = body;
    const hos = await sql`
        select *  from users
        where id=${decoded.userId} 
        `;
    if (!name) {
      name = hos[0].name;
    }
    if (!phone_number) {
      phone_number = hos[0].phone_number;
    }
    if (!email) {
      email = hos[0].email;
    }
    if (!age) {
      age = hos[0].age;
    }
    if (!gender) {
      gender = hos[0].gender;
    }
    if (!bio) {
      bio = hos[0].bio;
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
  WHERE id = ${decoded.userId}
  RETURNING *;
`;

    return NextResponse.json(
      { message: "sucessfully upated", updatedProfile },
      { status: 409 },
    );
  } catch (error) {
    console.log("ERROR:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
