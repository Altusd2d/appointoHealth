import { NextResponse } from "next/server";
import sql from "@/lib/dbs";

export async function POST(req:Request) {
try{
 const body=await req.json();
  const {id,date}=body;
  console.log(date);
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
// const availability = JSON.parse(slots[0].availability);
const availability = slots[0].availability;
const res=availability[day]
// console.log(res)

const slotsOnThatDay=await sql`
SELECT appointment_time
    FROM appointments
    WHERE doctor_id = ${id}
    and appointment_date=${date}
`;
// console.log(slotsOnThatDay)

const bookedSlots = new Set(
  slotsOnThatDay.map(slot => slot.appointment_time)
);

// console.log("bboked slots on date",bookedSlots)

const slot_time = [
  "00:00:00", "00:30:00",
  "01:00:00", "01:30:00",
  "02:00:00", "02:30:00",
  "03:00:00", "03:30:00",
  "04:00:00", "04:30:00",
  "05:00:00", "05:30:00",
  "06:00:00", "06:30:00",
  "07:00:00", "07:30:00",
  "08:00:00", "08:30:00",
  "09:00:00", "09:30:00",
  "10:00:00", "10:30:00",
  "11:00:00", "11:30:00",
  "12:00:00", "12:30:00",
  "13:00:00", "13:30:00",
  "14:00:00", "14:30:00",
  "15:00:00", "15:30:00",
  "16:00:00", "16:30:00",
  "17:00:00", "17:30:00",
  "18:00:00", "18:30:00",
  "19:00:00", "19:30:00",
  "20:00:00", "20:30:00",
  "21:00:00", "21:30:00",
  "22:00:00", "22:30:00",
  "23:00:00", "23:30:00"
];


for (let i = 0; i < slot_time.length; i++) {
  if (bookedSlots.has(slot_time[i])) {
    res[i] = 2;
  }
}
// console.log(availability[day])
  return NextResponse.json({message:res},{status:200});
}
catch(err){
  console.log(err);
  return NextResponse.json({message:"internal server error"},{status:500})
}
}