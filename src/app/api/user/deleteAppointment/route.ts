import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import sql from "@/lib/dbs";
import { cookies } from "next/headers";

interface JwtPayload {
  id: string;
}

export async function DELETE(req: NextRequest) {
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

    // console.log("dskjjfksdjfn:", decoded);

    const body = await req.json();
    const { appointment_id } = body;
    // console.log(appointment_id);
    if (!appointment_id) {
      return NextResponse.json(
        { message: "appointment was does not selected try again" },
        { status: 400 },
      );
    }
    
    //delecting appionment from user
    const deleteAppointment = await sql`
  UPDATE appointments
  SET status = 'deleted'
  WHERE id = ${appointment_id}
  RETURNING *
`;


    // const doc_id = deleteAppointment[0].doctor_id;
    // const slot = deleteAppointment[0].doctor_appointment_time;
    // const payment = deleteAppointment[0].payment;
    // console.log("deleted appoinent", deleteAppointment[0]);

    //change doctor status
    //send notify to hospital
    //refund the money
    // console.log(deleteAppointment);
    return NextResponse.json(
      { message: "sucessfully deleted" },
      { status: 200 },
    );
  } catch (error) {
    console.log("ERROR:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
