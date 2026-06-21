import { getUserFromToken } from "@/lib/getUserFromToken";
import sql from "@/lib/dbs";
export async function GET() {
  try {
    const user = await getUserFromToken();

    const presentAppointments = await sql`
      SELECT *
      FROM appointments
      WHERE patient_id = ${user.userId} AND status!='cancelled' AND (
      appointment_date::DATE >= CURRENT_DATE 
      OR status= 'booked'
      )
    `;

    return Response.json({ presentAppointments });
  } catch (error) {
    console.error(error)
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}