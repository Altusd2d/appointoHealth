import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import sql from "@/lib/dbs";
import { cookies } from "next/headers";

interface JwtPayload {
  userId: string;
}

const rand = () => {
  const chars =
    "0123456789";

  return Array.from({ length: 4 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length)),
  ).join("");
};

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

    const {
      doctor_id,
      appointment_date,
      hospital_id,
      name,
      age,
      phone_number,
      gender,
      description,
      slot_time,
      location,
      status
    } = body;

    // Validation
    if (
      !doctor_id ||
      !hospital_id ||
      !name ||
      !age ||
      !phone_number ||
      !gender ||
      !slot_time
    ) {
      return NextResponse.json(
        { message: "All required fields must be filled" },
        { status: 400 },
      );
    }

    // Check already booked slot
    const existingAppointment = await sql`
  SELECT *
  FROM appointments
  WHERE doctor_id = ${doctor_id}
  AND appointment_time = ${slot_time}
  AND appointment_date = ${appointment_date}
  AND status = 'booked'
`;

    const loc = await sql`
      SELECT location
      FROM hospitals
      WHERE id = ${hospital_id}
      
    `;

    // console.log(loc[0]);

    if (existingAppointment.length > 0) {
      return NextResponse.json(
        { message: "Slot already booked" },
        { status: 409 },
      );
    }

    const count = await sql`
    select count(id) from appointments
    where hospital_id=${hospital_id}
    `;
    // console.log(count[0].count);
    const search_id =
      hospital_id.toString() + "-" + count[0].count + "-" + rand();

    // Insert appointment
const appointment = await sql`
  INSERT INTO appointments (
    doctor_id,
    patient_id,
    name,
    age,
    phone_number,
    gender,
    description,
    appointment_time,
    location,
    hospital_id,
    appointment_date,
    app_id,
    status
  )
  VALUES (
    ${doctor_id},
    ${decoded.userId},
    ${name},
    ${age},
    ${phone_number},
    ${gender},
    ${description},
    ${slot_time},
    ${loc[0].location},
    ${hospital_id},
    ${appointment_date},
    ${search_id},
    ${"booked"}
  )
  RETURNING *
`;

    return NextResponse.json(
      {
        message: "Appointment booked successfully",
        appointment: appointment[0],
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
