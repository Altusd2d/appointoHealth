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
CREATE TABLE IF NOT EXISTS doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  specialist TEXT,
  education TEXT,
  experience TEXT,
  image TEXT,
  hospital_id UUID REFERENCES hospitals(id) ON DELETE SET NULL
);
`;


await sql`
CREATE TABLE IF NOT EXISTS doctor_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
  slot_time TIMESTAMP NOT NULL
);
`;

  // Appointments table
await sql`
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES doctors(id),
  user_id UUID REFERENCES users(id),

  name TEXT,
  age INT,
  phone_number TEXT,
  gender TEXT CHECK (gender IN ('male', 'female', 'others')),

  description TEXT,
  slot_time TIMESTAMP,

  status TEXT CHECK (status IN ('completed', 'waiting', 'not_completed')) DEFAULT 'waiting',

  location TEXT,
  hospital_id UUID REFERENCES hospitals(id),

  created_at TIMESTAMP DEFAULT NOW()
);
`;

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

}