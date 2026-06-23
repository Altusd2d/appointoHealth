import { NextResponse } from "next/server";
import sql from "@/lib/dbs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface JwtPayload {
  id: string;
  role: string;
}

export async function POST(req: Request) {

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
            
                   if (!token) {
                  return NextResponse.json(
                    { message: "User not logged in" },
                    { status: 401 }
                  );
                }
            
                const decoded = jwt.verify(
                  token,
                  process.env.JWT_SECRET!
                ) as JwtPayload;
            
                console.log(decoded)
            
                // optional role check
                if (decoded.role !== "hospital") {
                  return NextResponse.json(
                    { message: "Unauthorized access" },
                    { status: 403 }
                  );
                }

    const { doctorId, availability } = await req.json();

if (!doctorId || !availability) {
  return NextResponse.json(
    { message: "Missing data" },
    { status: 400 }
  );
}

const doctor = await sql`
  SELECT id
  FROM doctors
  WHERE id = ${doctorId}
  LIMIT 1
`;

if (doctor.length === 0) {
  return NextResponse.json(
    { message: "Doctor not found" },
    { status: 404 }
  );
}

await sql`
  UPDATE doctors
  SET availability = ${JSON.stringify(availability)}
  WHERE id = ${doctorId}
`;
return NextResponse.json(
    { message: "slots changed sucessfully" },
    { status: 200}
  );

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}