import sql from "@/lib/dbs";

export async function GET() {
  const tables = await sql`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
  `;

  return Response.json(tables);
}
// import sql from "@/lib/dbs";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const result = await sql`
//       SELECT NOW()
//     `;

//     return NextResponse.json({
//       success: true,
//       message: "Database connected successfully",
//       data: result,
//     });
//   } catch (error) {
//     console.log(error);

//     return NextResponse.json({
//       success: false,
//       message: "Database connection failed",
//     });
//   }
// }