import sql from "@/lib/dbs";
import jwt from "jsonwebtoken";

export async function POST(req:Request) {
    const body=await req.json();
    const record = await sql`
  SELECT * FROM otps
  WHERE identifier = ${body.identifier}
  ORDER BY expires_at DESC
  LIMIT 1
`;
console.log(record)
    if (record.length===0){
        return Response.json({message:"OPT not found"},{status:400})
    }
    const rec=record[0];
    if (rec.otp !== body.otp) {
    return Response.json({ message: "Invalid OTP" }, { status: 400 });
  }
  if (new Date() > new Date(rec.expires_at)) {
    return Response.json({ message: "OTP expired" }, { status: 400 });
  }
  const users=await sql`
    select * from users where email=${body.email}
  `;
  let user;
  if(users.length===0){
    const newUser=await sql`
    insert into users (email)
    values (${body.email})
    returning *
    `
    user=newUser[0];
  }
  else{
    user=users[0];
  }
   const token = jwt.sign(
    { userId: user.id },
    "secret_key",
    { expiresIn: "1d" }
  );
  return Response.json({
    message: "Login successful",
    token,
    user
  });

}