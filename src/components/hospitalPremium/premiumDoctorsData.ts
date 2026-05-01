export type PremiumDoctor = {
  id: string;
  slug: string;
  name: string;
  role: string;
  achievement: string;
  listingExperience: string;
  detailExperience: string;
  credentials: string;
  image: string;
  hospitalLabel: string;
};

type SlotState = "available" | "selected" | "unavailable";

export type PremiumSlot = {
  id: string;
  label: string;
  state: SlotState;
};

export type PremiumSlotDay = {
  id: string;
  label: string;
  slots: PremiumSlot[];
};

function createDoctorSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const premiumDoctorSeed = [
  {
    id: "doc-1",
    name: "Dr.Chandra Shakar Reddy",
    role: "cardio specialist",
    achievement: "MBBS, MD - General Medicine, DM - Gastroenterology",
    listingExperience: "5 years experience, more than 1500 patients",
    detailExperience: "5 years of experience",
    credentials:
      "MBBS, MD - General Medicine, DM - Gastroenterology, Fortis Hospital, Jaipur",
    image: "/hospital/doctor1.png",
    hospitalLabel: "Apollo hospital",
  },
  {
    id: "doc-2",
    name: "Dr.Padma Latha",
    role: "cardio specialist",
    achievement: "Gold Medalist in AIIMS Bibinagar",
    listingExperience: "15 years experience, more than 1800 patients",
    detailExperience: "15 years of experience",
    credentials:
      "MBBS, MD - Internal Medicine, DM - Cardiology, Fortis Hospital, Jaipur",
    image: "/hospital/doctor2.png",
    hospitalLabel: "Apollo hospital",
  },
  {
    id: "doc-3",
    name: "Dr.Bupal Reddy",
    role: "ENT specialist",
    achievement: "Senior consultant in minimally invasive care",
    listingExperience: "10 years experience, more than 1400 patients",
    detailExperience: "10 years of experience",
    credentials:
      "MBBS, MS - ENT, Fellowship in Endoscopic Surgery, Fortis Hospital, Jaipur",
    image: "/hospital/doctor3.png",
    hospitalLabel: "Apollo hospital",
  },
  {
    id: "doc-4",
    name: "Dr.Latha",
    role: "cardio specialist",
    achievement: "Advanced cardiac diagnostics specialist",
    listingExperience: "10 years experience, more than 1600 patients",
    detailExperience: "10 years of experience",
    credentials:
      "MBBS, MD - General Medicine, DM - Cardiology, Fortis Hospital, Jaipur",
    image: "/hospital/doctor4.png",
    hospitalLabel: "Apollo hospital",
  },
  {
    id: "doc-5",
    name: "Dr.Sri Lakshmi",
    role: "cardio specialist",
    achievement: "Award-winning preventive heart care specialist",
    listingExperience: "10 years experience, more than 1500 patients",
    detailExperience: "10 years of experience",
    credentials:
      "MBBS, MD - General Medicine, DM - Gastroenterology, Fortis Hospital, Jaipur",
    image: "/hospital/doctor5.png",
    hospitalLabel: "Apollo hospital",
  },
] satisfies Omit<PremiumDoctor, "slug">[];

export const premiumDoctors: PremiumDoctor[] = premiumDoctorSeed.map((doctor) => ({
  ...doctor,
  slug: createDoctorSlug(doctor.name),
}));

export const premiumSlotDays: PremiumSlotDay[] = [
  {
    id: "30-3-2026",
    label: "30-3-2026",
    slots: [
      { id: "30-930", label: "9:30 AM", state: "selected" },
      { id: "30-1030", label: "10:30 AM", state: "available" },
      { id: "30-1100", label: "11:00 AM", state: "available" },
      { id: "30-1130", label: "11:30AM", state: "unavailable" },
      { id: "30-1200", label: "12:00PM", state: "available" },
      { id: "30-1230", label: "12:30 PM", state: "available" },
      { id: "30-130", label: "1:30 PM", state: "available" },
      { id: "30-200", label: "2:00PM", state: "available" },
      { id: "30-230", label: "2:30PM", state: "available" },
      { id: "30-430", label: "4:30PM", state: "unavailable" },
      { id: "30-530", label: "5:30PM", state: "available" },
      { id: "30-600", label: "6:00 PM", state: "available" },
    ],
  },
  {
    id: "31-3-2026",
    label: "31-3-2026",
    slots: [
      { id: "31-930", label: "9:30 AM", state: "selected" },
      { id: "31-1030", label: "10:30 AM", state: "available" },
      { id: "31-1100", label: "11:00 AM", state: "available" },
      { id: "31-1130", label: "11:30AM", state: "unavailable" },
      { id: "31-1200", label: "12:00PM", state: "available" },
      { id: "31-1230", label: "12:30 PM", state: "available" },
      { id: "31-130", label: "1:30 PM", state: "available" },
      { id: "31-200", label: "2:00PM", state: "available" },
      { id: "31-230", label: "2:30PM", state: "available" },
      { id: "31-430", label: "4:30PM", state: "unavailable" },
      { id: "31-530", label: "5:30PM", state: "available" },
      { id: "31-600", label: "6:00 PM", state: "available" },
    ],
  },
  {
    id: "1-4-2026",
    label: "1-4-2026",
    slots: [
      { id: "1-930", label: "9:30 AM", state: "selected" },
      { id: "1-1030", label: "10:30 AM", state: "available" },
      { id: "1-1100", label: "11:00 AM", state: "available" },
      { id: "1-1130", label: "11:30AM", state: "unavailable" },
      { id: "1-1200", label: "12:00PM", state: "available" },
      { id: "1-1230", label: "12:30 PM", state: "available" },
      { id: "1-130", label: "1:30 PM", state: "available" },
      { id: "1-200", label: "2:00PM", state: "available" },
      { id: "1-230", label: "2:30PM", state: "available" },
      { id: "1-430", label: "4:30PM", state: "unavailable" },
      { id: "1-530", label: "5:30PM", state: "available" },
      { id: "1-600", label: "6:00 PM", state: "available" },
    ],
  },
];

export const defaultPremiumSlotDayId = premiumSlotDays[1].id;

export function getPremiumDoctorBySlug(slug: string) {
  return premiumDoctors.find((doctor) => doctor.slug === slug);
}

export function getPremiumSlotDay(dayId: string) {
  return (
    premiumSlotDays.find((slotDay) => slotDay.id === dayId) ?? premiumSlotDays[1]
  );
}

export function getDefaultPremiumSlotId(dayId: string) {
  return (
    getPremiumSlotDay(dayId).slots.find(
      (slot) => slot.state === "selected" || slot.state === "available",
    )?.id ?? ""
  );
}
