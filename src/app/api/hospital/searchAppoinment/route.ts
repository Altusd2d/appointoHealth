import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import sql from "@/lib/dbs";
import { cookies } from "next/headers";

interface JwtPayload {
  id: string;
}

export async function POST(req: NextRequest) {
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

    console.log("DECODED:", decoded);

    // Request body
    const body = await req.json();

    const { search_id } = body;

    // Check already booked slot
    const appoinment = await sql`
SELECT
    to_jsonb(a) AS appointment,
    to_jsonb(d) - 'availability' AS doctor,
    h.name AS hospital_name,
    h.location
FROM appointments a
JOIN doctors d
    ON d.id = a.doctor_id
JOIN hospitals h
    ON h.id = a.hospital_id
WHERE a.app_id = ${search_id};
  
`;

    // Insert appointment

    return NextResponse.json(
      {
        message: "Appointment booked successfully",
        appointment: appoinment,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("ERROR:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
