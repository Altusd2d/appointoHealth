import { initDB } from "@/lib/init-db";
import { NextResponse } from "next/server";

export async function GET() {
  await initDB();

  return NextResponse.json({
    message: "DB initialized",
  });
}