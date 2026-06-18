import sql from "@/lib/dbs";
import { NextResponse } from "next/server";
export async function PUT(Req: Request) {
  try {
    const { appointment_id } = await Req.json();
    const result = await sql`
      UPDATE appointments
      SET status = 'cancelled'
      WHERE id = ${appointment_id}
      RETURNING *
    `;
    if (result.length === 0) {
      return NextResponse.json(
        { message: "Appointment not found" },
        { status: 404 },
      );
    }
    console.log("Appointment Id "+appointment_id+" canceled")
    return NextResponse.json(
      { message: "Successfully cancelled appointment" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
