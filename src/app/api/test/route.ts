import { initDB } from "@/lib/init-db";
import { NextResponse } from "next/server";
import sql from "@/lib/dbs";

export async function GET() {
  // await initDB();
  const change=await sql`
ALTER TABLE appointments
ALTER COLUMN app_id TYPE TEXT;

`;

  return NextResponse.json({
    message: change,
  });
}
