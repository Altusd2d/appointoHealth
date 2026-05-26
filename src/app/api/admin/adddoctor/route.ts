import sql from "@/lib/dbs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const {
      name,
      specialist,
      education,
      experience,
      hospital,
    } = body;

    let { image } = body;

    if (
      !name ||
      !specialist ||
      !education ||
      !experience ||
      !hospital
    ) {
      return NextResponse.json(
        { message: "all parameters are required" },
        { status: 400 }
      );
    }

    if (!image) image = null;

    // Find hospital
    const hospitalData = await sql`
      SELECT id
      FROM hospitals
      WHERE name = ${hospital}
      LIMIT 1
    `;

    if (hospitalData.length === 0) {
      return NextResponse.json(
        { message: "hospital with that name not found" },
        { status: 404 }
      );
    }

    const hospitalId = hospitalData[0].id;

    // Create weekly availability object
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const availability: Record<string, number[]> = {};

    for (const day of days) {
      // 48 slots per day
      // 0 = unavailable
      availability[day] = Array(48).fill(0);
    }

    // Insert doctor
    const doc = await sql`
      INSERT INTO doctors (
        name,
        specialist,
        education,
        experience,
        image,
        hospital_id,
        availability
      )
      VALUES (
        ${name},
        ${specialist},
        ${education},
        ${experience},
        ${image},
        ${hospitalId},
        ${JSON.stringify(availability)}
      )
      RETURNING *
    `;

    if (doc.length === 0) {
      return NextResponse.json(
        { message: "unable to add doctor" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "doctor added successfully",
        doctor: doc[0],
      },
      { status: 201 }
    );

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}