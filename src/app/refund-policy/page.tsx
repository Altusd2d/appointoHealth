import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | BookMyDoctor",
  description: "Refund and cancellation policy for Appointo Health and BookMyDoctor users.",
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
    title: "1. APPOINTMENT BOOKING",
    paragraphs: [
      "Appointment booking through the Appointo Health platform is currently completely free for patients.",
      "Consultation fees, if applicable, are paid directly to the hospital or clinic at the time of the appointment and are not collected by Appointo Health.",
    ],
  },
  {
    title: "2. CANCELLATION OF APPOINTMENTS BY PATIENTS",
    paragraphs: [
      "Users may cancel appointments through the platform before the scheduled appointment time.",
      "Recommended Cancellation Window:",
    ],
    items: [
      "Cancellations made at least 2 hours before the scheduled appointment time will be processed without any issue.",
      "Cancellations made less than 2 hours before the appointment may result in the slot being forfeited, subject to the hospital's policy.",
    ],
    note: "To cancel an appointment, log in to your account on www.appointohealth.in and use the appointment management feature.",
  },
  {
    title: "3. CANCELLATION BY HOSPITALS OR APPOINTO HEALTH",
    paragraphs: ["Hospitals may cancel or reschedule appointments due to:"],
    items: [
      "Doctor unavailability or medical emergencies",
      "Hospital scheduling changes or operational reasons",
      "Unforeseen circumstances beyond the hospital's control",
    ],
    groups: [
      {
        heading: "Appointo Health may cancel appointments in cases of",
        items: [
          "Platform technical issues",
          "Fraudulent or suspicious booking activity",
          "Violation of these policies",
        ],
      },
    ],
    note: "Users will be notified via SMS/email if their appointment is cancelled or rescheduled.",
  },
  {
    title: "4. REFUND POLICY FOR PATIENTS",
    paragraphs: [
      "Since Appointo Health does not collect consultation fees from patients, we do not process refunds for medical consultations.",
      "Any consultation fees paid directly to a hospital or clinic are subject to that hospital's or clinic's own refund and cancellation policy. Patients must contact the hospital directly for any consultation fee refund requests.",
      "Appointo Health is not liable for refund disputes between patients and hospitals/clinics. We recommend confirming the hospital's refund policy before your appointment.",
    ],
  },
  {
    title: "5. PLATFORM FEES",
    paragraphs: [
      "Currently, Appointo Health does not charge any booking or platform fees to patients.",
      "If platform fees are introduced in the future, refund terms for such fees will be clearly communicated to users and updated in this policy with adequate prior notice (minimum 7 days) before implementation.",
    ],
  },
  {
    title: "6. HOSPITAL SUBSCRIPTION FEES",
    paragraphs: [
      "Hospitals or clinics using the Appointo Health platform may pay subscription fees for listing services.",
      "Subscription fees paid by hospitals are generally non-refundable unless otherwise stated in a separate written agreement between Appointo Health and the hospital.",
      "Disputes regarding hospital subscription fee refunds will be handled on a case-by-case basis as per the applicable agreement.",
    ],
  },
  {
    title: "7. NON-REFUNDABLE SITUATIONS",
    paragraphs: ["Refunds (if applicable in future) will not be applicable in cases including but not limited to:"],
    items: [
      "Missed appointments (no-shows) by the patient",
      "Late cancellations (within 2 hours of the appointment time)",
      "Appointments cancelled due to violation of platform policies",
      "Cases governed by the hospital's own refund policy",
    ],
  },
  {
    title: "8. CONSUMER RIGHTS",
    paragraphs: [
      "Nothing in this policy shall limit or exclude any rights you may have as a consumer under the Consumer Protection Act, 2019 and applicable Indian consumer protection laws.",
    ],
  },
  {
    title: "9. CHANGES TO THIS POLICY",
    paragraphs: [
      "Appointo Health reserves the right to update or modify this Refund & Cancellation Policy at any time. Updated versions will be published on the website with the revised \"Last Updated\" date. Significant changes will be communicated via email or platform notification.",
    ],
  },
  {
    title: "10. CONTACT INFORMATION",
    contact: [
      "Company Name: Appointo Health",
      "Website: www.appointohealth.in",
      "Email: support@appointohealth.in",
      "Phone: +91 XXXXX XXXXX [Please update with actual number]",
    ],
  },
  {
    title: "11. ACKNOWLEDGEMENT",
    paragraphs: [
      "By using the Appointo Health platform, users acknowledge that they have read and understood this Refund & Cancellation Policy and agree to abide by its terms.",
    ],
  },
];

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Refund &amp; Cancellation Policy</h1>
        <p className="mt-3 text-sm font-medium text-slate-600">APPOINTO HEALTH</p>
        <p className="mt-1 text-sm text-slate-500">Last Updated: March 2026</p>

        <p className="mt-6 text-base leading-7 text-slate-700">
          This Refund &amp; Cancellation Policy explains the rules related to appointment cancellations and refunds for users of
          the Appointo Health platform.
        </p>
        <p className="mt-4 text-base leading-7 text-slate-700">
          Appointo Health is a technology platform that facilitates appointment bookings between patients and
          hospitals/clinics. We do not provide medical services or collect consultation fees from patients.
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

