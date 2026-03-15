export type HospitalRecord = {
  id: string;
  slug:string;
  name: string;
  city: string;
  diseaseTags: string[];
  services: string[];
};

function toSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export const HOSPITALS:HospitalRecord[]= [
  {
    id: "h-001",
    slug:"apollo-multispeciality-hospital",
    name: "Apollo Multispeciality Hospital",
    city: "Chennai",
    diseaseTags: ["cardiology", "diabetes", "kidney disease", "stroke"],
    services: ["ICU", "Cath Lab", "Dialysis", "Emergency 24x7"],
  },
  {
    id: "h-002",
    slug:"fortis-memorial-hospital",
    name: "Fortis Memorial Hospital",
    city: "Gurugram",
    diseaseTags: ["cancer", "cardiology", "neurology", "liver disease"],
    services: ["Oncology", "Robotic Surgery", "Transplant", "Emergency 24x7"],
  },
  {
    id: "h-003",
    slug:"manipal-hospital",
    name: "Manipal Hospital",
    city: "Bengaluru",
    diseaseTags: ["orthopedic", "diabetes", "asthma", "thyroid","head ache"],
    services: ["Orthopedics", "Pulmonology", "Endocrinology", "Lab"],
  },
  {
    id: "h-004",
    slug:"narayana-health-city",
    name: "Narayana Health City",
    city: "Bengaluru",
    diseaseTags: ["heart attack", "kidney disease", "pediatric cardiology"],
    services: ["Cardiac Surgery", "Nephrology", "Pediatrics", "Emergency 24x7"],
  },
  {
    id: "h-005",
    slug:"max-super-speciality-hospital",
    name: "Max Super Speciality Hospital",
    city: "New Delhi",
    diseaseTags: ["cancer", "diabetes", "neurology", "kidney disease"],
    services: ["Oncology", "Neurology", "Dialysis", "Radiology"],
  },
  {
    id: "h-006",
    slug:"kims-hospital",
    name: "KIMS Hospital",
    city: "Hyderabad",
    diseaseTags: ["cardiology", "stroke", "liver disease", "asthma"],
    services: ["Cardiology", "Neurology", "Hepatology", "Emergency 24x7"],
  },
];

// export const getHospitalsByDisease = (disease: string): HospitalRecord[] => {
//   const query = disease.trim().toLowerCase();

//   if (!query) {
//     return HOSPITALS;
//   }

//   return HOSPITALS.filter((hospital) =>
//     hospital.diseaseTags.some((tag) => tag.toLowerCase().includes(query))
//   );
// };
export function findHospital(hospital: string): HospitalRecord[] {
  const query = hospital.trim().toLowerCase();

  if (!query) {
    return HOSPITALS;
  }

  return HOSPITALS.filter((hospitalItem) =>
    hospitalItem.diseaseTags.some((disease) =>
      disease.toLowerCase().includes(query)
    )
  );
}

export function findHospitalBySlug(slug: string): HospitalRecord | undefined {
  const normalizedSlug = toSlug(slug);
  return HOSPITALS.find(
    (hospital) =>
      toSlug(hospital.slug) === normalizedSlug ||
      toSlug(hospital.name) === normalizedSlug
  );
}
// export function findHospital(query:string){
//   const searchText=query.trim().toLocaleLowerCase()
//   return HOSPITALS.filter((hospitalItem)=>{
//       hospitalItem.diseaseTags.some((disease)=>{
//             disease.toLowerCase().includes(searchText)
//       })
//   })
// }
