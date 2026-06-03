import sql from "@/lib/dbs";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🔍 Check if user exists
    const { name, phone_number, gmail, gender } = body;
    if (!name || !phone_number || !gmail || !gender) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        {
          status: 400,
        },
      );
    }
    const existingUser = await sql`
      SELECT * FROM users WHERE phone_number = ${body.phone_number}
    `;

    if (existingUser.length > 0) {
      return Response.json({ message: "User already existed with number" }, { status: 400 });
    }

    // 🔐 Hash password
    // const hashedPassword = await bcrypt.hash(body.password, 10);

    // ➕ Insert user
    const user = await sql`
      INSERT INTO users (name, phone_number,gmail,gender)
      VALUES (${body.name}, ${body.phone_number},${body.gmail},${body.gender})
      RETURNING *
    `;
    console.log(user);
    return Response.json(
      {
        message: "successfull register",
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error(error);

    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
