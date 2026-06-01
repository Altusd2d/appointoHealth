import { initDB } from "@/lib/init-db";
import { NextResponse } from "next/server";
import sql from "@/lib/dbs";

export async function GET() {
  // await initDB();
  const change=await sql`
ALTER TABLE hospitals
ADD COLUMN password text;
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
