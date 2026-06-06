import { NextResponse } from "next/server";
import sql from "@/lib/dbs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { hospital, require } = body;

    if (!hospital || !require) {
      return NextResponse.json(
        { message: " hospital name is required" },
        { status: 400 },
      );
    }
    const hos = await sql`
       select id from hospitals
       where name=${hospital}
       `;
    console.log("hos", hos);
    if (hos.length==0) {
      return NextResponse.json(
        { message: "No hospital found or hospital got deleted" },
        { status: 404 },
      );
    }

    let data;
    const hos_id = hos[0].id;
    if (require == "appoinments") {
      data = await sql`
           select * from appointments
       where hospital_id=${hos_id}

           `;
    } else {
      data = await sql`
           select * from doctors
       where hospital_id=${hos_id}

           `;
    }
    // console.log(data)
    return NextResponse.json({ message: data }, { status: 200 });
  } 
  catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
