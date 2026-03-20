import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Appointo",
  description: "Privacy policy for Appointo Health and Appointo platform users.",
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

const policySections: PolicySection[] = [
  {
    title: "1. INFORMATION WE COLLECT",
    paragraphs: ["We may collect the following types of information:"],
    groups: [
      {
        heading: "Personal Information",
        items: ["Full name", "Phone number", "Email address", "Age and gender (optional)"],
      },
      {
        heading: "Sensitive Personal Data (as defined under IT Rules 2011 & DPDP Act 2023)",
        items: ["Health and medical information shared while booking appointments"],
        note: "We collect sensitive personal data only with your explicit consent and use it solely for appointment facilitation.",
      },
      {
        heading: "Appointment Information",
        items: ["Hospital name, Doctor name, Appointment date and time, Booking history"],
      },
      {
        heading: "Technical Information",
        items: ["IP address, Device type, Browser type, Website usage data"],
      },
      {
        heading: "Communication Information",
        items: ["Messages sent through the platform, Customer support communications"],
      },
    ],
  },
  {
    title: "2. HOW WE USE YOUR INFORMATION",
    items: [
      "Facilitate doctor appointment bookings",
      "Send appointment confirmations and reminders",
      "Communicate service updates or notifications",
      "Improve our platform and user experience",
      "Prevent fraud and unauthorized activity",
      "Comply with legal requirements under applicable Indian laws",
    ],
  },
  {
    title: "3. SHARING OF INFORMATION",
    paragraphs: ["We do not sell or rent your personal data to any third party.", "Your information may be shared with:"],
    groups: [
      {
        heading: "Hospitals and Clinics",
        items: ["Your booking information is shared with the hospital where you schedule an appointment."],
      },
      {
        heading: "Service Providers",
        items: ["We may share limited information with trusted third-party providers who help us operate the platform (e.g., SMS/email notification services)."],
      },
      {
        heading: "Legal Authorities",
        items: ["Information may be disclosed if required by law, court order, or government authorities."],
      },
    ],
    note: "Third-party service providers are contractually obligated to protect your data and may not use it for their own purposes.",
  },
  {
    title: "4. DATA SECURITY",
    paragraphs: [
      "We implement reasonable technical and organizational security measures to protect your information from unauthorized access, loss, alteration, or misuse.",
      "However, no internet-based platform can guarantee 100% security. In the event of a data breach affecting your rights, we will notify you as required by applicable law.",
    ],
  },
  {
    title: "5. DATA RETENTION",
    paragraphs: ["We retain personal information only as long as necessary to:"],
    items: [
      "Provide services and maintain booking history",
      "Comply with legal and regulatory obligations (minimum 3 years for health-related records as per applicable guidelines)",
      "Resolve disputes and enforce agreements",
    ],
    note: "After the retention period expires, data will be securely deleted or anonymized. Users may request deletion of their account and personal data by contacting us at support@Appointohealth.in.",
  },
  {
    title: "6. USER RIGHTS",
    paragraphs: ["Under applicable Indian data protection laws, you have the right to:"],
    items: [
      "Access your personal data held by us",
      "Correct inaccurate or incomplete information",
      "Request deletion of personal data (subject to legal retention requirements)",
      "Withdraw consent for data processing at any time",
      "Nominate another individual to exercise these rights on your behalf (as per DPDP Act 2023)",
    ],
    note: "To exercise these rights, please contact us at: support@Appointohealth.in",
  },
  {
    title: "7. COOKIES AND TRACKING TECHNOLOGIES",
    paragraphs: [
      "Our website uses cookies to improve functionality, understand user behaviour, and enhance user experience. For details, please refer to our separate Cookie Policy available on our website.",
      "Users can disable cookies through their browser settings.",
    ],
  },
  {
    title: "8. CHILDREN'S PRIVACY",
    paragraphs: [
      "Our platform is not intended for individuals under the age of 18 without verifiable parental or guardian consent. We do not knowingly collect personal data from minors. If such data is collected inadvertently, it will be deleted upon notification.",
    ],
  },
  {
    title: "9. THIRD-PARTY LINKS",
    paragraphs: [
      "Our platform may contain links to third-party websites (e.g., hospital websites). We are not responsible for the privacy practices of those websites. We encourage you to review their privacy policies before sharing any information.",
    ],
  },
  {
    title: "10. GRIEVANCE OFFICER",
    paragraphs: [
      "In accordance with Rule 5(9) of the IT (SPDI) Rules, 2011, we have appointed a Grievance Officer to address privacy-related complaints or concerns:",
    ],
    contact: [
      "Grievance Officer: [Name of Grievance Officer]",
      "Email: support@Appointohealth.in",
      "Website: www.Appointohealth.in",
      "Address: [Registered Office Address, Hyderabad, Telangana, India]",
    ],
    note: "We will address your grievance within 30 days of receipt.",
  },
  {
    title: "11. CHANGES TO THIS POLICY",
    paragraphs: [
      'Appointo Health may update this Privacy Policy from time to time. Updated policies will be posted on this page with a revised "Last Updated" date. Significant changes will be communicated via email or platform notification.',
    ],
  },
  {
    title: "12. CONTACT INFORMATION",
    contact: [
      "Company Name: Appointo Health",
      "Website: www.Appointohealth.in",
      "Email: support@Appointohealth.in",
      "Phone: +91 XXXXX XXXXX [Please update with actual number]",
    ],
  },
  {
    title: "13. CONSENT",
    paragraphs: [
      "By using the Appointo Health platform, you acknowledge that you have read and understood this Privacy Policy and consent to the collection and use of your information as described herein.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Privacy Policy</h1>
        <p className="mt-3 text-sm font-medium text-slate-600">APPOINTO HEALTH</p>
        <p className="mt-1 text-sm text-slate-500">Last Updated: March 2026</p>

        <p className="mt-6 text-base leading-7 text-slate-700">
          Appointo Health (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy and is committed to
          protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect
          your information when you use our website www.Appointohealth.in and related services.
        </p>
        <p className="mt-4 text-base leading-7 text-slate-700">
          This policy is formulated in compliance with the Information Technology Act, 2000, Information Technology
          (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and
          the Digital Personal Data Protection Act, 2023 (DPDP Act).
        </p>
        <p className="mt-4 text-base leading-7 text-slate-700">
          By using our platform, you agree to the collection and use of information in accordance with this Privacy
          Policy.
        </p>

        <div className="mt-10 space-y-8">
          {policySections.map((section) => (
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

