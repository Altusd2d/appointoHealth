import { NextResponse } from "next/server";
import sql from "@/lib/dbs";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  console.log(id)

  const hos = await sql`
    SELECT *
    FROM hospitals
    WHERE id = ${id}
  `;
console.log(hos)
  return NextResponse.json({message:hos},{status:200});
}