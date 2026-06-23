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

    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ message: "Id required" }, { status: 404 });
    }

    const app = await sql`
        select * from appointments where id=${id}
        `;

    if (app.length === 0) {
      return NextResponse.json(
        { message: "Hospital not found" },
        { status: 404 },
      );
    }

    const change = await sql`
  UPDATE appointments
  SET status = ${status}
  WHERE id = ${id}
  
`;
    return NextResponse.json({ message: change }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "inter server error" },
      { status: 500 },
    );
  }
}
