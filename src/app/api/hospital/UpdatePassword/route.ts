import sql from "@/lib/dbs";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("body", body);

    const updated_password = await hash(body.password, 10);

    await sql`
  UPDATE hospitals
  SET password = ${updated_password}
  WHERE gmail = ${body.gmail}
`;

    return NextResponse.json(
      { message: "sucessfully password changed login once again" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    NextResponse.json({ message: "inter nal server error" }, { status: 500 });
  }
}
