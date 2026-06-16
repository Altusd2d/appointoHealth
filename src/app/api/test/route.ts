import { initDB } from "@/lib/init-db";
import { NextResponse } from "next/server";
import sql from "@/lib/dbs";

export async function GET() {
  // await initDB();
  const change=await sql`
  UPDATE hospitals
  SET gmail = 'altusd2d@gmail.com'
  WHERE id = 'af91a12a-8b69-461b-a2a1-ff7b9576e0be'
`;

  return NextResponse.json({
    message: change,
  });
}

// af91a12a-8b69-461b-a2a1-ff7b9576e0be
