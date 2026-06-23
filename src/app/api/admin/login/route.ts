import sql from "@/lib/dbs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { adminname, password } = body;
    console.log(adminname, password);
    if (!adminname || !password) {
      return NextResponse.json(
        { message: "All parameters are required" },
        { status: 401 },
      );
    }
    const user = process.env.admin;
    const pass = process.env.password;
    //  console.log(admin,",",password,":",user,",",pass)
    if (adminname !== user && pass !== password) {
      return NextResponse.json(
        { message: "wrong username or password" },
        { status: 404 },
      );
    }

    const token = jwt.sign(
      {
        role: "admin",
      },

      process.env.JWT_SECRET as string,

      {
        expiresIn: "7d",
      },
    );
    const response = NextResponse.json(
      {
        message: "login successful",

        token,
      },
      {
        status: 200,
      },
    );

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
