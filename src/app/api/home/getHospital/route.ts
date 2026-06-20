import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/dbs";

export async function POST(req: NextRequest) {
  try {
    // console.log("dskjjfksdjfn:", decoded);

    const body = await req.json();
    const { name } = body;
    
    let hos = await sql`
SELECT
  h.*,
  COALESCE(
    json_agg(d.*) FILTER (WHERE d.id IS NOT NULL),
    '[]'
  ) AS doctors
FROM hospitals h
LEFT JOIN doctors d
  ON d.hospital_id = h.id
WHERE h.name ILIKE ${`%${name}%`}
GROUP BY h.id
`;

    if (hos.length == 0) {
      hos = await sql`
  SELECT DISTINCT h.*
  FROM hospitals h
  JOIN doctors d
    ON h.id = d.hospital_id
  WHERE d.specialist ILIKE ${`%${name}%`}
`;
    }
hos.forEach((hospital) => {
  console.log(hospital.doctors);
});
    return NextResponse.json({ message: hos }, { status: 200 });
  } catch (error) {
    console.log("ERROR:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
