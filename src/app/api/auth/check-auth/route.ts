

import { getUserFromToken } from "@/lib/getUserFromToken";

export async function GET() {
  try {
    await getUserFromToken();
    return Response.json({ authenticated: true },{status:200});
  } catch (error){
    console.error(error)
    return Response.json({ authenticated: false }, { status: 500 });
  }
}