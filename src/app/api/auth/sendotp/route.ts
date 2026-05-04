import sql from "@/lib/dbs"

function generateOTP(){
    return Math.floor(100000 + Math.random() * 900000).toString();
}


export async function POST(req:Request) {
    const body=await req.json();
    const otp=generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins
    const ott=await sql`
    insert into otps (identifier, otp, expires_at)
    values (${body.email},${otp},${expiresAt}) returning*
    `
    console.log("OTP",ott)
    return Response.json({message:{ott}})
}