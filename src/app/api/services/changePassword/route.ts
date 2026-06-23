import sql from "@/lib/dbs"
import { sendEmail } from "@/lib/mail";
import { NextResponse } from "next/server";


function generateOTP(){
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req:Request) {
    const body=await req.json();
    try{
        // let {mail,id}=body;
        const{gmail}=body
        console.log(gmail)
        const hos=await sql`
        select *  from hospitals
        where gmail=${gmail} 
        `
        console.log(hos.length)
        if(hos.length==0){
            return NextResponse.json({message:"could't find hospital"},{status:404})
        }
        
       
        
      //mail code
      body.SearchName=hos[0].name;


const otp=generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins


      await sendEmail({
  to: gmail,
  subject:`request from appointo`,
  data:`OTP for changing password is ${otp} `
});

await sql`
  DELETE FROM otps
  WHERE identifier = ${gmail}
`;


    const ott=await sql`
    insert into otps (identifier, otp, expires_at)
    values (${gmail},${otp},${expiresAt}) returning*
    `

        return NextResponse.json({message:`otp sended to to ${gmail} enter the otp correctly`},{status:200})

    }catch(error){
        console.log(error);
       return  NextResponse.json({message:"inter server error"},{status:500})
    }
    
}