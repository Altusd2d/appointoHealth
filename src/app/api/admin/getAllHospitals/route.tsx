import { console } from "inspector";
import { NextResponse } from "next/server";
import sql from "@/lib/dbs";
export async function GET() {
  try {
    const hospitals = await sql`SELECT * from hospitals`;
    if (hospitals.length === 0) {
      return NextResponse.json(
        {
          message: "No hospitals found",
        },
        { status: 404 },
      );
    }
    // console.log(hospitals);
    return NextResponse.json(
      {
        message: "Hospitals found",
        data: hospitals,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
