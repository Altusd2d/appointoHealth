import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Appointo",
  description: "Terms and conditions for using the Appointo Health and Appointo platform.",
};

type PolicyGroup = {
  heading: string;
  items: string[];
  note?: string;
};

type PolicySection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
  groups?: PolicyGroup[];
  contact?: string[];
  note?: string;
};

const sections: PolicySection[] = [
  {
    title: "1. DEFINITIONS",
    items: [
      "Service - The Appointo Health website (www.Appointohealth.in) used for booking doctor appointments.",
      "Platform - The Appointo Health website and related digital services.",
      "User / Patient - Any individual using the platform to search for hospitals or book appointments.",
      "Hospital / Healthcare Provider - Hospitals, clinics, and medical facilities registered on the Appointo Health platform.",
      "Doctor - A licensed medical professional listed on the platform by a registered hospital or healthcare provider.",
      "Appointment - A consultation slot booked by a patient with a hospital or doctor through the platform.",
      "Content - All text, graphics, images, information, and other materials available on the platform.",
    ],
  },
  {
    title: "2. ACCEPTANCE OF TERMS",
    paragraphs: ["By using Appointo Health, you confirm that:"],
    items: [
      "You are at least 18 years old or have verifiable parental/guardian consent",
      "You have the legal capacity to accept these Terms",
      "All information you provide is accurate and complete",
      "You agree to comply with all applicable laws of India",
    ],
    note: "Appointo Health reserves the right to update these Terms at any time. Continued use of the platform after changes constitutes your acceptance of the updated Terms. You will be notified of significant changes via email or platform notification.",
  },
  {
    title: "3. NATURE OF SERVICE",
    paragraphs: ["Appointo Health is a technology platform that allows users to:"],
    items: [
      "Search hospitals and doctors",
      "View available appointment slots",
      "Book in-person doctor appointments",
      "Receive appointment confirmations and reminders",
      "Manage appointment history",
    ],
    groups: [
      {
        heading: "Appointo Health DOES NOT provide",
        items: ["Medical advice or second opinions", "Medical diagnosis or treatment", "Emergency medical services"],
        note: "In case of a medical emergency, please immediately contact emergency services (102 / 108) or visit the nearest hospital.",
      },
    ],
  },
  {
    title: "4. HOSPITAL AND DOCTOR REGISTRATION",
    paragraphs: [
      "Hospitals and clinics may register on the platform to list their doctors and appointment availability.",
      "Hospitals are solely responsible for:",
    ],
    items: [
      "Ensuring listed doctors are qualified, licensed, and registered under applicable Indian medical laws (e.g., MCI/NMC Act)",
      "Maintaining accurate and up-to-date doctor information",
      "Managing appointment schedules",
      "Providing medical services to patients",
    ],
    note: "Appointo Health relies on information provided by hospitals and does not independently verify medical credentials. Users are advised to verify doctor credentials independently if needed.",
  },
  {
    title: "5. USER ACCOUNTS",
    paragraphs: ["To access certain features, users may need to create an account. Users agree to:"],
    items: [
      "Provide accurate registration information",
      "Maintain the confidentiality of login credentials",
      "Notify us immediately at support@Appointohealth.in of any unauthorized account access",
      "Use the platform responsibly and lawfully",
    ],
    groups: [
      {
        heading: "Appointo Health may suspend or terminate accounts if users",
        items: [
          "Provide false or misleading information",
          "Abuse the platform or its users",
          "Repeatedly book fake or no-show appointments",
          "Violate these Terms",
        ],
      },
    ],
  },
  {
    title: "6. APPOINTMENT BOOKING",
    paragraphs: [
      "Appointments booked through the platform are subject to hospital and doctor availability.",
      "Users must:",
    ],
    items: [
      "Verify appointment details before confirming",
      "Cancel appointments at least 2 hours before the scheduled time (where possible) to allow others to book the slot",
      "Arrive on time for scheduled appointments",
      "Carry necessary documents, ID proof, and medical reports",
    ],
    note: "Hospitals may reschedule or cancel appointments due to medical emergencies, doctor unavailability, or operational reasons. Appointo Health is not responsible for appointment delays or cancellations by hospitals.",
  },
  {
    title: "7. FEES AND PAYMENTS",
    groups: [
      {
        heading: "For Patients",
        items: [
          "Appointment booking through Appointo Health is currently free of charge",
          "Consultation fees are paid directly to the hospital or clinic",
          "Appointo Health does not collect or process consultation payments",
        ],
      },
      {
        heading: "For Hospitals",
        items: [
          "Hospitals may be charged a subscription fee to use the platform. Pricing and payment terms will be defined in separate agreements with hospitals.",
        ],
      },
    ],
  },
  {
    title: "8. PRIVACY AND DATA PROTECTION",
    paragraphs: [
      "Appointo Health collects and processes personal information in accordance with our Privacy Policy and applicable data protection laws, including the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023.",
      "For details on data collection and use, please refer to our Privacy Policy at www.Appointohealth.in.",
    ],
  },
  {
    title: "9. MEDICAL DISCLAIMER",
    paragraphs: ["Appointo Health is NOT a healthcare provider. The platform only facilitates appointment scheduling between patients and hospitals."],
    items: [
      "Medical consultations are provided solely by hospitals and registered doctors",
      "Appointo Health does not control, supervise, or guarantee the quality of medical services",
      "We are not responsible for medical outcomes, treatment decisions, or adverse events",
      "Disputes related to medical care must be resolved directly between the patient and the hospital",
    ],
  },
  {
    title: "10. USER CONDUCT",
    paragraphs: ["Users agree NOT to:"],
    items: [
      "Provide false, misleading, or defamatory information",
      "Create fake or malicious appointments",
      "Harass, threaten, or abuse hospital staff or other users",
      "Attempt to hack, disrupt, or overload the platform",
      "Use the platform for any illegal purpose under Indian law",
    ],
    note: "Violation may result in account suspension, termination, and possible legal action under applicable laws including the IT Act, 2000.",
  },
  {
    title: "11. INTELLECTUAL PROPERTY",
    paragraphs: [
      "All platform content, including logos, design, text, software, and technology, is owned by or licensed to Appointo Health and protected under applicable intellectual property laws of India.",
      "Users may not copy, reproduce, distribute, reverse-engineer, or modify platform content without prior written permission from Appointo Health.",
    ],
  },
  {
    title: "12. LIMITATION OF LIABILITY",
    paragraphs: ["The platform is provided on an \"as-is\" and \"as-available\" basis without warranties of any kind.", "Appointo Health shall not be liable for:"],
    items: [
      "Medical treatment outcomes or hospital negligence/malpractice",
      "Appointment delays or cancellations by hospitals",
      "Technical interruptions or downtime",
      "Data loss caused by external factors beyond our reasonable control",
    ],
    note: "To the maximum extent permitted by applicable Indian law, Appointo Health's total liability for any claim shall not exceed ?1,000 (Indian Rupees One Thousand Only). This limitation does not exclude or restrict liability for death or personal injury caused by our negligence, or any liability that cannot be excluded by law.",
  },
  {
    title: "13. DISPUTE RESOLUTION",
    paragraphs: [
      "These Terms are governed by and construed in accordance with the laws of India.",
      "Before initiating any formal legal proceedings, users agree to first contact our Grievance Officer at support@Appointohealth.in to attempt an amicable resolution within 30 days.",
      "Any unresolved disputes shall be subject to the exclusive jurisdiction of competent courts located in Hyderabad, Telangana, India.",
    ],
  },
  {
    title: "14. GRIEVANCE OFFICER",
    paragraphs: ["As required under the IT (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, we have appointed a Grievance Officer:"],
    contact: [
      "Grievance Officer: [Name of Grievance Officer]",
      "Email: support@Appointohealth.in",
      "Response Time: Within 48 hours of receipt; resolution within 30 days.",
    ],
  },
  {
    title: "15. MODIFICATIONS TO SERVICE",
    paragraphs: [
      "Appointo Health reserves the right to modify or discontinue platform features, update pricing, or amend these Terms. Users will be notified of major changes where applicable.",
    ],
  },
  {
    title: "16. SEVERABILITY",
    paragraphs: [
      "If any provision of these Terms is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect.",
    ],
  },
  {
    title: "17. CONTACT INFORMATION",
    contact: [
      "Company Name: Appointo Health",
      "Website: www.Appointohealth.in",
      "Email: support@Appointohealth.in",
      "Phone: +91 XXXXX XXXXX [Please update with actual number]",
    ],
  },
  {
    title: "18. ACKNOWLEDGEMENT",
    paragraphs: [
      "By using the Appointo Health platform, you acknowledge that you have read, understood, and agree to these Terms, and understand that Appointo Health only provides appointment booking facilitation services.",
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Terms and Conditions</h1>
        <p className="mt-3 text-sm font-medium text-slate-600">APPOINTO HEALTH</p>
        <p className="mt-1 text-sm text-slate-500">Last Updated: March 2026</p>

        <p className="mt-6 text-base leading-7 text-slate-700">
          Welcome to Appointo Health. These Terms and Conditions (&quot;Terms&quot;) govern your use of the Appointo
          Health website and services (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;).
        </p>
        <p className="mt-4 text-base leading-7 text-slate-700">
          By accessing or using our platform, you agree to comply with these Terms. If you do not agree, please do
          not use the platform.
        </p>

        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <section key={section.title} className="border-t border-slate-200 pt-6">
              <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>

              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-base leading-7 text-slate-700">
                  {paragraph}
                </p>
              ))}

              {section.items?.length ? (
                <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-7 text-slate-700">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}

              {section.groups?.map((group) => (
                <div key={group.heading} className="mt-4">
                  <h3 className="text-base font-semibold text-slate-800">{group.heading}</h3>
                  <ul className="mt-2 list-disc space-y-2 pl-6 text-base leading-7 text-slate-700">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {group.note ? <p className="mt-2 text-base leading-7 text-slate-700">{group.note}</p> : null}
                </div>
              ))}

              {section.contact?.length ? (
                <div className="mt-4 space-y-2 text-base leading-7 text-slate-700">
                  {section.contact.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              ) : null}

              {section.note ? <p className="mt-4 text-base leading-7 text-slate-700">{section.note}</p> : null}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

