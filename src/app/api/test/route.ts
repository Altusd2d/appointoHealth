import sql from "@/lib/dbs";

export async function GET() {
  const tables = await sql`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
  `;

  return Response.json(tables);
}