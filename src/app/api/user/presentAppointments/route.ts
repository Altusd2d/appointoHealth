import { getUserFromToken } from "@/lib/getUserFromToken";
import sql from "@/lib/dbs";
export async function GET() {
  try {
    const user = await getUserFromToken();

 const presentAppointments = await sql`
SELECT
  a.*,
  jsonb_build_object(
    'id', d.id,
    'name', d.name,
    'specialist', d.specialist,
    'experience', d.experience,
    'education', d.education,
    'image', d.image
  ) AS doctor
FROM appointments a
JOIN doctors d
  ON a.doctor_id = d.id
WHERE a.patient_id = ${user.userId}
  AND a.status != 'cancelled'
  AND a.status != 'completed'
  AND (
    a.appointment_date::DATE >= CURRENT_DATE
    OR a.status = 'booked'
  )
`;

// console.log("presentt appointmensts "+presentAppointments+"two details")
// presentAppointments.forEach((appointment, index) => {
//   console.log(`Appointment ${index + 1}:`, appointment);
// });
    return Response.json({ presentAppointments});
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}
