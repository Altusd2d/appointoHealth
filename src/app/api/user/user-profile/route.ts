import sql from "@/lib/dbs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getUserFromToken } from "@/lib/getUserFromToken";
export async function GET() {
  try {
    // const token = (await cookies()).get("token")?.value;
    // if (!token) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }
    // const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
    //   userId: string;
    // };
    // console.log("decodec"+ decoded)
     const decoded = await getUserFromToken();
     console.log(decoded)
    const user = await sql`SELECT * FROM users
       WHERE id=${decoded.userId}`;
    if (user.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    // console.log(user);
    return NextResponse.json({
      user: user[0],
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      {
        status: 500,
      },
    );
  }
}
