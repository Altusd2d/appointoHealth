// import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import sql from "@/lib/dbs";
// const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const result = await sql`
      SELECT
          (SELECT COUNT(*) FROM users) AS total_users,
          (SELECT COUNT(*) FROM doctors) AS total_doctors,
          (SELECT COUNT(*) FROM hospitals) AS total_hospitals,
          (SELECT COUNT(*) FROM appointments) AS total_appointments;
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}