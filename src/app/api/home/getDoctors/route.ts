import { NextResponse } from "next/server";
import sql from "@/lib/dbs";

export async function POST(req:Request) {
//   const { id } = await params;
 const body=await req.json();

  const {id}=body;

  const hos = await sql`
    SELECT *
    FROM doctors
    WHERE hospital_id = ${id}
    limit 5
  `;
console.log(hos)
  return NextResponse.json({message:hos},{status:200});
}