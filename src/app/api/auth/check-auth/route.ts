

import { getUserFromToken } from "@/lib/getUserFromToken";

export async function GET() {
  try {
    await getUserFromToken();
    return Response.json({ authenticated: true },{status:200});
  } catch (error){
    console.error(error)
    return Response.json({ authenticated: false }, { status: 400 });
  }
}

// import { getUserFromToken } from "@/lib/getUserFromToken";

// export async function GET() {
//   const user = await getUserFromToken();

//   if (!user) {
//     return Response.json(
//       { authenticated: false },
//       { status: 200 }
//     );
//   }

//   return Response.json(
//     { authenticated: true },
//     { status: 400 }
//   );
// }

//  import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";

// export async function getUserFromToken(): Promise<boolean> {
//   const cookieStore = await cookies();

//   const token = cookieStore.get("token")?.value;

//   if (!token) {
//     return false;
//   }

//   try {
//     jwt.verify(token, process.env.JWT_SECRET!);
//     return true;
//   } catch {
//     return false;
//   }
// }