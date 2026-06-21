import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    response.cookies.delete("token");
  
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}