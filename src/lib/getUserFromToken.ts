import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface JwtPayload {
  userId: string;
  role?: string;
  name?: string;
}

export async function getUserFromToken(): Promise<JwtPayload> {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as JwtPayload;

  return decoded;
}