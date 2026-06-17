import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/dbs";



export async function POST(req:NextRequest) {
  try {


  

   const body=await req.json();
   const {name}=body;
   
let hos = await sql`
SELECT
  a.id,
  a.name,
  a.logo,
  a.location,
  a.description,
  a.hero_image1,
  a.hero_image2,
  a.is_premium,
  a.open_time,

  COALESCE(
    json_agg(
      json_build_object(
        'id', b.id,
        'name', b.name,
        'specialist', b.specialist,
        'education', b.education,
        'experience', b.experience,
        'image', b.image,
        'availability', b.availability
      )
    ) FILTER (WHERE b.id IS NOT NULL),
    '[]'
  ) AS doctors

FROM hospitals a
LEFT JOIN doctors b
  ON b.hospital_id = a.id

WHERE a.name ILIKE ${`%${name}%`}

GROUP BY a.id;
`;
if(hos.length==0){
     hos = await sql`
  SELECT DISTINCT h.*
  FROM hospitals h
  JOIN doctors d
    ON h.id = d.hospital_id
  WHERE d.specialist ILIKE ${`%${name}%`}
`;
}


  
   

    
      return NextResponse.json(
        { message: hos },
        { status: 200 }
      );
    

    
  } catch (error) {
    console.log("ERROR:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}