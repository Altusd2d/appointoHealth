import sql from "@/lib/dbs";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🔍 Check if user exists
    const existingUser = await sql`
      SELECT * FROM users WHERE phone_number = ${body.phone_number}
    `;

    if (existingUser.length > 0) {
      return Response.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // 🔐 Hash password
    // const hashedPassword = await bcrypt.hash(body.password, 10);

    // ➕ Insert user
    const user = await sql`
      INSERT INTO users (name, phone_number)
      VALUES (${body.name}, ${body.phone_number})
      RETURNING *
    `;

    return Response.json(user);

  } catch (error: unknown) {
    console.error(error);

    return Response.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}