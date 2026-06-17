import sql from "@/lib/dbs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(req: Request) {
  try {
    const { phone_number } = await req.json();
    if (!phone_number) {
      return NextResponse.json(
        {
          message: "Phone number is required",
        },
        { status: 400 },
      );
    }
    const user = await sql`SELECT * FROM users 
     WHERE phone_number=${phone_number}`;
    if (user.length === 0) {
      return NextResponse.json(
        {
          message: "With this number user not existed, once check your number",
        },
        { status: 404 },
      );
    }
    const token = jwt.sign(
      {
        userId: user[0].id,
        role: "user",
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      },
    );
    const response = NextResponse.json(
      {
        message: "Login successful",
      },
      {
        status: 200,
      },
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      {
        status: 500,
      },
    );
  }
}
