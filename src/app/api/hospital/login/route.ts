import sql from "@/lib/dbs";
import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const { gmail, password } = body;

    // Validation
    if (!gmail || !password) {
      return NextResponse.json(
        {
          message: "gmail and password are required"
        },
        {
          status: 400
        }
      );
    }

    // Find hospital
    const hospital = await sql`
      SELECT *
      FROM hospitals
      WHERE gmail = ${gmail}
      LIMIT 1
    `;

    // Hospital not found
    if (hospital.length === 0) {
      return NextResponse.json(
        {
          message: "invalid gmail or password"
        },
        {
          status: 401
        }
      );
    }

    const hos = hospital[0];

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      hos.password
    );

    if (!isMatch) {
      return NextResponse.json(
        {
          message: "invalid gmail or password"
        },
        {
          status: 401
        }
      );
    }

    // Create token
    const token = jwt.sign(
      {
        id: hos.id,
        gmail: hos.gmail,
        name: hos.name
      },

      process.env.JWT_SECRET as string,

      {
        expiresIn: "7d"
      }
    );

    // Remove password before response
    delete hos.password;

    // Create response
    const response = NextResponse.json(
      {
        message: "login successful",
        hospital: hos,
        token
      },
      {
        status: 200
      }
    );

    // Optional cookie
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    });

    return response;

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        message: "internal server error"
      },
      {
        status: 500
      }
    );
  }
}