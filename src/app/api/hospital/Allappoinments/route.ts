import { NextResponse } from "next/server";
import sql from "@/lib/dbs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface JwtPayload {
  id: string;
  role: string;
}
export async function POST(req: Request) {
  const body = await req.json();
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "User not logged in" },
        { status: 401 },
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    console.log(decoded);

    // optional role check
    if (decoded.role !== "hospital") {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 403 },
      );
    }
    const { choice } = body;
    let data;

    if (choice == "appointments") {
      data = await sql`
     SELECT
    to_jsonb(a) AS appointment,
    jsonb_build_object(
        'name', d.name,
        'specialization', d.specialist,
        'experience', d.experience,
        'image', d.image
    ) AS doctor
FROM appointments a
JOIN doctors d
    ON a.doctor_id = d.id
WHERE a.hospital_id = ${decoded.id};
       
`;
    } else if (choice == "doctors") {
      data = await sql`
       select * from doctors 
       where hospital_id=${decoded.id}
       
`;
    } else if (choice == "today appoinments") {
      const date = new Date();

      const Date_day = new Date(new Date(date).getTime() + 330 * 60 * 1000);
      const today = Date_day.toISOString().split("T")[0];

      data = await sql`
            SELECT
    a.*,
    d.name as Doctor_name
  FROM appointments a
  JOIN doctors d
    ON a.doctor_id = d.id
  WHERE a.hospital_id = ${decoded.id}
  AND appointment_date = ${today}
       
       
`;
    } else {
      data = await sql`
       select * from equipments 
       where hospital_id=${decoded.id}
       
`;
    }
    if (data.length == 0) {
      return NextResponse.json({ message: [] }, { status: 200 });
    }

    return NextResponse.json({ message: data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "inter server error" },
      { status: 500 },
    );
  }
}
