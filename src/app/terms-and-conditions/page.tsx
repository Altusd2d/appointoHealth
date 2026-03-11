import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | BookMyDoctor",
  description: "Terms and conditions for using the Appointo Health and BookMyDoctor platform.",
};

const sections = [
  {
    title: "1. ACCEPTANCE OF TERMS",
    paragraphs: [
      "By accessing or using the Appointo Health platform, including www.appointohealth.in and related services, you agree to be bound by these Terms & Conditions. If you do not agree, please discontinue use of the platform.",
    ],
  },
  {
    title: "2. SERVICES PROVIDED",
    paragraphs: [
      "Appointo Health provides an online platform to discover healthcare providers and facilitate appointment bookings. We do not provide medical advice, diagnosis, or treatment.",
      "The final responsibility for medical care rests with the hospital, clinic, or doctor you consult.",
    ],
  },
  {
    title: "3. USER ELIGIBILITY AND ACCOUNT",
    paragraphs: ["You agree that the information provided by you is accurate and up to date."],
    items: [
      "You must be at least 18 years old to create and manage your account independently.",
      "If you are using the platform on behalf of another person, you confirm that you are authorized to do so.",
      "You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.",
    ],
  },
  {
    title: "4. APPOINTMENT BOOKING AND CANCELLATION",
    items: [
      "Appointments are subject to doctor and hospital availability.",
      "Booking confirmations, rescheduling, or cancellations may depend on hospital or clinic policies.",
      "Users should review timing and location details carefully before confirming a booking.",
      "Appointo Health is not liable for cancellation, delays, or unavailability caused by providers.",
    ],
  },
  {
    title: "5. FEES AND PAYMENTS",
    paragraphs: [
      "Platform usage may be free or subject to service charges, as communicated from time to time.",
      "Consultation fees and other medical charges are determined by the relevant hospital or doctor.",
      "Any applicable refund will be processed according to provider policy and applicable law.",
    ],
  },
  {
    title: "6. USER RESPONSIBILITIES",
    items: [
      "Provide truthful, complete, and current information.",
      "Do not misuse the platform, including unauthorized access, scraping, or interference with platform operations.",
      "Do not post or share unlawful, abusive, defamatory, or misleading content.",
      "Use the platform in compliance with all applicable Indian laws and regulations.",
    ],
  },
  {
    title: "7. MEDICAL DISCLAIMER",
    paragraphs: [
      "Information available on the platform is for facilitation and general informational purposes only.",
      "It does not replace professional medical judgment. In medical emergencies, contact emergency services or the nearest hospital immediately.",
    ],
  },
  {
    title: "8. INTELLECTUAL PROPERTY",
    paragraphs: [
      "All platform content, including trademarks, logos, text, design, and software, is owned by or licensed to Appointo Health and protected under applicable intellectual property laws.",
      "You may not reproduce, modify, distribute, or commercially exploit platform content without prior written permission.",
    ],
  },
  {
    title: "9. THIRD-PARTY LINKS AND SERVICES",
    paragraphs: [
      "The platform may contain links to third-party websites or services. Appointo Health is not responsible for their content, terms, or privacy practices.",
      "Your use of such third-party services is at your own risk and subject to their policies.",
    ],
  },
  {
    title: "10. LIMITATION OF LIABILITY",
    paragraphs: [
      "To the maximum extent permitted by law, Appointo Health shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform.",
      "Our role is limited to providing appointment facilitation technology and related support services.",
    ],
  },
  {
    title: "11. INDEMNITY",
    paragraphs: [
      "You agree to indemnify and hold harmless Appointo Health, its affiliates, officers, employees, and partners from any claims, losses, liabilities, or expenses arising out of your misuse of the platform or violation of these Terms.",
    ],
  },
  {
    title: "12. TERMINATION",
    paragraphs: [
      "We reserve the right to suspend or terminate access to the platform in case of suspected misuse, legal non-compliance, or breach of these Terms.",
      "You may stop using the platform at any time.",
    ],
  },
  {
    title: "13. GOVERNING LAW AND JURISDICTION",
    paragraphs: [
      "These Terms shall be governed by the laws of India. Courts in Hyderabad, Telangana, shall have exclusive jurisdiction over disputes arising from or related to these Terms.",
    ],
  },
  {
    title: "14. CHANGES TO THESE TERMS",
    paragraphs: [
      'Appointo Health may update these Terms & Conditions from time to time. Revised versions will be posted with an updated "Last Updated" date. Continued use of the platform constitutes acceptance of the updated Terms.',
    ],
  },
  {
    title: "15. CONTACT INFORMATION",
    contact: [
      "Company Name: Appointo Health",
      "Website: www.appointohealth.in",
      "Email: support@appointohealth.in",
      "Phone: +91 XXXXX XXXXX [Please update with actual number]",
      "Address: [Registered Office Address, Hyderabad, Telangana, India]",
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Terms &amp; Conditions</h1>
        <p className="mt-3 text-sm font-medium text-slate-600">APPOINTO HEALTH</p>
        <p className="mt-1 text-sm text-slate-500">Last Updated: March 2026</p>

        <p className="mt-6 text-base leading-7 text-slate-700">
          These Terms &amp; Conditions govern your access to and use of the Appointo Health platform and services. By
          using this platform, you agree to comply with these Terms.
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

              {section.contact?.length ? (
                <div className="mt-4 space-y-2 text-base leading-7 text-slate-700">
                  {section.contact.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
