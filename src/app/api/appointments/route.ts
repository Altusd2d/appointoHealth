import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import sql from "@/lib/dbs";
import { cookies } from "next/headers";

interface JwtPayload {
  userId: string;
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
    const body = await req.json();

    const {
      doctor_id,
      hospital_id,
      name,
      age,
      phone_number,
      gender,
      description,
      slot_time,
      location,
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
        { status: 400 }
      );
    }

    // Check already booked slot
    const existingAppointment = await sql`
      SELECT *
      FROM appointments
      WHERE doctor_id = ${doctor_id}
      AND slot_time = ${slot_time}
      AND status = 'not_completed'
    `;

    const waiting = await sql`
      SELECT *
      FROM appointments
      WHERE doctor_id = ${doctor_id}
      AND slot_time = ${slot_time}
      AND status = 'waiting'
    `;

    if (
      existingAppointment.length > 0 ||
      waiting.length > 0
    ) {
      return NextResponse.json(
        { message: "Slot already booked" },
        { status: 409 }
      );
    }

    // Insert appointment
    const appointment = await sql`
      INSERT INTO appointments (
        doctor_id,
        user_id,
        name,
        age,
        phone_number,
        gender,
        description,
        slot_time,
        location,
        hospital_id
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
        ${location},
        ${hospital_id}
      )
      RETURNING *
    `;

    return NextResponse.json(
      {
        message: "Appointment booked successfully",
        appointment: appointment[0],
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