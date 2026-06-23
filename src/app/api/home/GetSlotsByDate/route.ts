import { NextResponse } from "next/server";
import sql from "@/lib/dbs";

export async function POST(req:Request) {
try{
 const body=await req.json();
  const {id,date}=body;
  console.log(body);
  if(!id || !date){
    return NextResponse.json({message:"date, id required "},{status:404})
  }

if (isNaN(new Date(date).getTime())) {
  return NextResponse.json(
    { message: "date is invalid" },
    { status: 400 }
  );
}
const Date_day = new Date(new Date(date).getTime() + 330 * 60 * 1000);

const day = Date_day.toLocaleDateString("en-US", {
  weekday: "long",
});

console.log(Date_day,"  ",day);


  const slots = await sql`
    SELECT availability
    FROM doctors
    WHERE id = ${id}
    
  `;


const availability = JSON.parse(slots[0].availability);
// const availability = slots[0].availability;
const res=availability[day]

const formattedDate = new Date(Date_day)
  .toISOString()
  .split("T")[0];


const slotsOnThatDay=await sql`
SELECT appointment_time
    FROM appointments
    WHERE doctor_id = ${id}
    and appointment_date=${formattedDate}
`;

console.log("slotsOnThatDay",slotsOnThatDay)

const bookedSlots = new Set(
  slotsOnThatDay.map(slot => slot.appointment_time)
);

console.log("bboked slots on date",bookedSlots)

const slot_time = [
  "12:00AM", "12:30AM",
  "1:00AM", "1:30AM",
  "2:00AM", "2:30AM",
  "3:00AM", "3:30AM",
  "4:00AM", "4:30AM",
  "5:00AM", "5:30AM",
  "6:00AM", "6:30AM",
  "7:00AM", "7:30AM",
  "8:00AM", "8:30AM",
  "9:00AM", "9:30AM",
  "10:00AM", "10:30AM",
  "11:00AM", "11:30AM",
  "12:00PM", "12:30PM",
  "1:00PM", "1:30PM",
  "2:00PM", "2:30PM",
  "3:00PM", "3:30PM",
  "4:00PM", "4:30PM",
  "5:00PM", "5:30PM",
  "6:00PM", "6:30PM",
  "7:00PM", "7:30PM",
  "8:00PM", "8:30PM",
  "9:00PM", "9:30PM",
  "10:00PM", "10:30PM",
  "11:00PM", "11:30PM"
];


for (let i = 0; i < slot_time.length; i++) {
  if (bookedSlots.has(slot_time[i])) {
    res[i] = 2;
  }
}
  return NextResponse.json({message:res},{status:200});
}
catch(err){
  console.log(err);
  return NextResponse.json({message:"internal server error"},{status:500})
}
}