import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

type JwtPayload = {
  id: string;
  role: string;
  gmail?: string;
  name?: string;
};

export function proxy(req: NextRequest) {

  try {

    const pathname = req.nextUrl.pathname;

    // Public routes (NO LOGIN REQUIRED)
    if (
      pathname === "/api/hospital/login" ||
      pathname === "/api/admin/login" ||
      pathname === "/api/user/login"
    ) {
      return NextResponse.next();
    }

    // Get token from cookies
    const token = req.cookies.get("token")?.value;
    console.log("token",token)
    // No token
    if (!token) {
      return NextResponse.json(
        {
          message: "Unauthorized please login again"
        },
        {
          status: 401
        }
      );
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // Admin routes
    if (
      pathname.startsWith("/api/admin") &&
      decoded.role !== "admin"
    ) {
      return NextResponse.json(
        {
          message: "Admin only"
        },
        {
          status: 403
        }
      );
    }

    // Hospital routes
    if (
      pathname.startsWith("/api/hospital") &&
      decoded.role !== "hospital"
    ) {
      return NextResponse.json(
        {
          message:
            "Hospital only can change the data unauthorized please login again"
        },
        {
          status: 403
        }
      );
    }

    // User routes
    if (
      pathname.startsWith("/api/user") &&
      decoded.role !== "user"
    ) {
      return NextResponse.json(
        {
          message:
            "User only unauthorized please login again"
        },
        {
          status: 403
        }
      );
    }

    // Forward decoded data to APIs
    const headers = new Headers(req.headers);

    headers.set("user-id", decoded.id);

    headers.set("role", decoded.role);

    return NextResponse.next({
      request: {
        headers
      }
    });

  } catch (error) {

    return NextResponse.json(
      {
        message: "Invalid token"
      },
      {
        status: 401
      }
    );
  }
}

export const config = {
  matcher: [
    // "/api/admin/:path*",
    "/api/hospital/:path*",
    "/api/user/:path*"
  ]
};