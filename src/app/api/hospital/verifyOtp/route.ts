import sql from "@/lib/dbs";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("body",body)

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



  return NextResponse.json({message:"OTP is verify  change the password"},{status:200});
}