import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import sql from "@/lib/dbs";
import { cookies } from "next/headers";

interface JwtPayload {
  id: string;
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
        { status: 401 }
      );
    }

    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    console.log("DECODED:", decoded);

    // Request body
    // const body = await req.json();
    const date=new Date();
    const Date_day = new Date(new Date(date).getTime() + 330 * 60 * 1000);

    const formattedDate = new Date(Date_day)
  .toISOString()
  .split("T")[0];




   const Today_billing = await sql`
  SELECT
    a.app_id,
    d.name AS doctor_name,
    a.payment
  FROM appointments a
  JOIN doctors d
    ON a.doctor_id = d.id
  WHERE a.hospital_id = ${decoded.id}
    AND a.appointment_date = ${formattedDate}
`;

// AND a.date = CURRENT_DATE


const Month_billing = await sql`
  SELECT
    a.appointment_date,
    COUNT(*) AS total_appointments,
    COALESCE(SUM(a.payment), 0) AS total_amount
  FROM appointments a
  WHERE a.hospital_id = ${decoded.id}
    AND a.appointment_date::date >= DATE_TRUNC('month', CURRENT_DATE)
    AND a.appointment_date::date < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
  GROUP BY a.appointment_date
  ORDER BY a.appointment_date::date
`;

    

  

   
    


    // Insert appointment
    

    return NextResponse.json(
      {
        message: "Appointment booked successfully",
        Today: Today_billing,
        Month:Month_billing
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("ERROR:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}