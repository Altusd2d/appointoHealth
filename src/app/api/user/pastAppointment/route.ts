import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import sql from "@/lib/dbs";
import { cookies } from "next/headers";

interface JwtPayload {
  userId: string;
}

export async function GET() {
  try {
    // Get token from cookies
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    console.log("TOKEN:", token);

    // Check token
    if (!token) {
      return NextResponse.json(
        { message: "User not logged in" },
        { status: 401 },
      );
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    console.log("dskjjfksdjfn:", decoded);

    // Check already booked slot
    // const existingAppointment = await sql`
    //   SELECT *
    //   FROM appointments
    //   WHERE patient_id = ${decoded.id}
    //   and status='completed '

    // `;
    const pastAppointments = await sql`
  SELECT *
FROM appointments
WHERE patient_id = ${decoded.userId}
  AND status != 'deleted'
  AND (
    status IN ('completed', 'cancelled')
    OR appointment_date::DATE < CURRENT_DATE
  )
`;

    // ORDER BY appointment_date DESC
    console.log(pastAppointments);
    console.log();
    return NextResponse.json({ pastAppointments }, { status: 200 });
  } catch (error) {
    console.log("ERROR:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
