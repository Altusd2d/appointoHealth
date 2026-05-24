import sql from "@/lib/dbs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const record = await sql`
    SELECT * FROM otps
    WHERE identifier = ${body.identifier}
    ORDER BY expires_at DESC
    LIMIT 1
  `;

  if (record.length === 0) {
    return Response.json({ message: "OTP not found" }, { status: 404 });
  }

  const rec = record[0];

  if (rec.otp !== body.otp) {
    return Response.json({ message: "Invalid OTP" }, { status: 400 });
  }

  if (new Date() > new Date(rec.expires_at)) {
    return Response.json({ message: "OTP expired" }, { status: 400 });
  }

  const users = await sql`
    SELECT * FROM users WHERE email = ${body.email}
  `;

  let user;

  if (users.length === 0) {
    const newUser = await sql`
      INSERT INTO users (email)
      VALUES (${body.email})
      RETURNING *
    `;

    user = newUser[0];
  } else {
    user = users[0];
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  const response = NextResponse.json({
    message: "Login successful",
    user,
  });

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}