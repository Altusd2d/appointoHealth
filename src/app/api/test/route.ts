import { initDB } from "@/lib/init-db";
import { NextResponse } from "next/server";
import sql from "@/lib/dbs";

export async function GET() {
  // await initDB();
  const change=await sql`
ALTER TABLE appointments
ADD COLUMN hospital_id UUID NOT NULL
REFERENCES hospitals(id);
`;

  return NextResponse.json({
    message: change,
  });
}
