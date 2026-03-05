export type HospitalRecord = {
  id: string;
  name: string;
  city: string;
  diseaseTags: string[];
  services: string[];
};

export const HOSPITALS:HospitalRecord[]= [
  {
    id: "h-001",
    name: "Apollo Multispeciality Hospital",
    city: "Chennai",
    diseaseTags: ["cardiology", "diabetes", "kidney disease", "stroke"],
    services: ["ICU", "Cath Lab", "Dialysis", "Emergency 24x7"],
  },
  {
    id: "h-002",
    name: "Fortis Memorial Hospital",
    city: "Gurugram",
    diseaseTags: ["cancer", "cardiology", "neurology", "liver disease"],
    services: ["Oncology", "Robotic Surgery", "Transplant", "Emergency 24x7"],
  },
  {
    id: "h-003",
    name: "Manipal Hospital",
    city: "Bengaluru",
    diseaseTags: ["orthopedic", "diabetes", "asthma", "thyroid"],
    services: ["Orthopedics", "Pulmonology", "Endocrinology", "Lab"],
  },
  {
    id: "h-004",
    name: "Narayana Health City",
    city: "Bengaluru",
    diseaseTags: ["heart disease", "kidney disease", "pediatric cardiology"],
    services: ["Cardiac Surgery", "Nephrology", "Pediatrics", "Emergency 24x7"],
  },
  {
    id: "h-005",
    name: "Max Super Speciality Hospital",
    city: "New Delhi",
    diseaseTags: ["cancer", "diabetes", "neurology", "kidney disease"],
    services: ["Oncology", "Neurology", "Dialysis", "Radiology"],
  },
  {
    id: "h-006",
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
