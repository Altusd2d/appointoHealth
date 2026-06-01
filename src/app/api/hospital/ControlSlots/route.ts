import sql from "@/lib/dbs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      changes,
      doctor_id,
      hospital_id
    } = body;

    if (!changes || changes.length === 0) {
      return NextResponse.json(
        { message: "no changes made" },
        { status: 200 }
      );
    }

    // Verify doctor belongs to hospital
    const doctor = await sql`
      SELECT hospital_id, availability
      FROM doctors
      WHERE id = ${doctor_id}
      LIMIT 1
    `;

    if (doctor.length === 0) {
      return NextResponse.json(
        { message: "doctor not found" },
        { status: 404 }
      );
    }

    if (doctor[0].hospital_id !== hospital_id) {
      return NextResponse.json(
        { message: "can't do that" },
        { status: 403 }
      );
    }

    // Current availability JSON
    const availability = doctor[0].availability;

    // Apply all changes
    for (const change of changes) {

      const {
        day,
        index,
        value
      } = change;

      // Ensure valid day exists
      if (!availability[day]) continue;

      // Update slot
      availability[day][index] = value;
    }

    // Save updated JSON
    await sql`
      UPDATE doctors
      SET availability = ${JSON.stringify(availability)}
      WHERE id = ${doctor_id}
    `;

    return NextResponse.json(
      { message: "successfully updated slots" },
      { status: 200 }
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}