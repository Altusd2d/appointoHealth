import sql from "@/lib/dbs";

export async function initDB() {
  // Enable UUID support
  await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`;

  // Users table
await sql`
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  phone_number TEXT,
  email TEXT UNIQUE,
  age INT,
  gender TEXT CHECK (gender IN ('male', 'female', 'others')),
  bio TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
`;






//hospital
  await sql`
CREATE TABLE IF NOT EXISTS hospitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  gmail TEXT not NULL UNIQUE,
  password TEXT not NULL,
  logo TEXT,
  location TEXT,
  description TEXT,
  hero_image1 TEXT,
  hero_image2 TEXT,
  is_premium BOOLEAN DEFAULT false,
  open_time TEXT
);
`;

  // Doctors table
  await sql`
CREATE TABLE doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  name TEXT NOT NULL,

  specialist TEXT,
  
  education TEXT,

  experience TEXT,

  image TEXT,

  hospital_id UUID REFERENCES hospitals(id),

  availability JSONB
);
`;


//doctor week scdule
await sql`
CREATE TABLE IF NOT EXISTS doctor_weekly_availability (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    doctor_id UUID NOT NULL
        REFERENCES doctors(id)
        ON DELETE CASCADE,

    day_name TEXT NOT NULL
        CHECK (
            day_name IN (
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
            )
        ),

    slot_time TIME NOT NULL,

    status TEXT NOT NULL DEFAULT 'unavailable'
        CHECK (
            status IN (
                'available',
                'unavailable'
            )
        ),

    UNIQUE(
        doctor_id,
        day_name,
        slot_time
    )
)`
    ;

//Appointments slots
await sql`
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    doctor_id UUID NOT NULL
        REFERENCES doctors(id),

    patient_id UUID NOT NULL,

    

    appointment_date DATE NOT NULL,

    appointment_time TIME NOT NULL,

    name text not null,

    age text not null,

    phone_number text not null,

    gender TEXT NOT NULL
CHECK (
    gender IN (
        'male',
        'female',
        'other'
    )
),

    description text ,



    status TEXT NOT NULL DEFAULT 'booked'
        CHECK (
            status IN (
                'booked',
                'cancelled',
                'completed'
            )
        ),
    payment NUMERIC(10,2) default 0,
    created_at TIMESTAMP DEFAULT NOW(),

    UNIQUE(
        doctor_id,
        appointment_date,
        appointment_time
    )
)
`;


  // Appointments table
// await sql`
// CREATE TABLE IF NOT EXISTS appointments (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   doctor_id UUID REFERENCES doctors(id),
//   user_id UUID REFERENCES users(id),

//   name TEXT,
//   age INT,
//   phone_number TEXT,
//   gender TEXT CHECK (gender IN ('male', 'female', 'others')),

//   description TEXT,
//   slot_time TIMESTAMP,

//   status TEXT CHECK (status IN ('completed', 'waiting', 'not_completed')) DEFAULT 'waiting',

//   location TEXT,
//   hospital_id UUID REFERENCES hospitals(id),

//   created_at TIMESTAMP DEFAULT NOW()
// );
// `;

//equipment table
await sql`
CREATE TABLE IF NOT EXISTS equipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  image TEXT,
  description TEXT,
  hospital_id UUID REFERENCES hospitals(id) ON DELETE CASCADE
);
`;


await sql`
CREATE TABLE IF NOT EXISTS otps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT, -- email or phone
  otp TEXT,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
`;



await sql`
CREATE TABLE IF NOT EXISTS doctor_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    doctor_id UUID NOT NULL
        REFERENCES doctors(id) ON DELETE CASCADE,

    day_name TEXT NOT NULL
        CHECK (
            day_name IN (
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
            )
        ),

    slot_time TIME NOT NULL,

    status TEXT NOT NULL DEFAULT 'unavailable'
        CHECK (
            status IN (
                'available',
                'booked',
                'unavailable'
            )
        ),

   

    created_at TIMESTAMP DEFAULT NOW(),

    UNIQUE(
        doctor_id,
        day_name,
        slot_time
    )
);


`;







}



