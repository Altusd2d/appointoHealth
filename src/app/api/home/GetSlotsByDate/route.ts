import { NextResponse } from "next/server";
import sql from "@/lib/dbs";

export async function POST(req:Request) {
//   const { id } = await params;
 const body=await req.json();

  const {id,date}=body;
//   console.log(date);
  if(!id || !date){
    return NextResponse.json({message:"date, id required "},{status:404})
  }

  const Date_day = new Date(date);
  
if (isNaN(new Date(date).getTime())) {
  return NextResponse.json(
    { message: "date is invalid" },
    { status: 400 }
  );
}

const day = Date_day.toLocaleDateString("en-US", {
  weekday: "long",
});

  const slots = await sql`
    SELECT availability
    FROM doctors
    WHERE id = ${id}
    
  `;

console.log(Date_day,",",day)
const availability = slots[0].availability;

// console.log(availability[day])
  return NextResponse.json({message:availability[day]},{status:200});
}
