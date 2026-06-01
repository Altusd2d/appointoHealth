import { initDB } from "@/lib/init-db";
import { NextResponse } from "next/server";
import sql from "@/lib/dbs";

export async function GET() {
  // await initDB();
  const change=await sql`
ALTER TABLE hospitals
ADD COLUMN password text;
`;

  return NextResponse.json({
    message: "DB initialized",
  });
}
