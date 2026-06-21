import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Appointo",
  description: "Cookie policy for Appointo Health and Appointo platform users.",
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
    title: "1. WHAT ARE COOKIES?",
    paragraphs: [
      "Cookies are small text files stored on your device (computer, smartphone, or tablet) when you visit a website. They help the website recognise your device, remember your preferences, and improve your user experience.",
      "In addition to cookies, we may use similar technologies such as web beacons, pixel tags, and local storage objects, which function in a similar way.",
    ],
  },
  {
    title: "2. LEGAL BASIS FOR USING COOKIES",
    paragraphs: [
      "We use cookies in accordance with the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices) Rules, 2011, and as aligned with the Digital Personal Data Protection Act, 2023.",
      "For non-essential cookies (such as advertising or analytics cookies), we rely on your explicit consent. Essential cookies are used on the basis of our legitimate interest in operating a functional website.",
    ],
  },
  {
    title: "3. TYPES OF COOKIES WE USE",
    groups: [
      {
        heading: "Essential Cookies",
        items: [
          "These are strictly necessary for the operation of our website.",
          "They enable core functionality such as logging in, accessing secure areas, and booking appointments.",
          "The website cannot function properly without these cookies.",
          "These cannot be disabled.",
        ],
      },
      {
        heading: "Performance / Analytics Cookies",
        items: [
          "These help us understand how visitors use our website (e.g., most-visited pages, time spent on pages), so we can improve our services.",
          "We obtain your consent before placing these cookies.",
        ],
      },
      {
        heading: "Functional Cookies",
        items: [
          "These remember your preferences and settings (e.g., language selection, saved login details).",
          "They improve your experience but are not strictly necessary.",
          "We obtain your consent before placing these cookies.",
        ],
      },
      {
        heading: "Advertising / Third-Party Cookies",
        items: [
          "These may be used by advertising partners to show relevant ads and track campaign effectiveness.",
          "These are only set with your explicit prior consent and you may opt out at any time.",
        ],
      },
    ],
  },
  {
    title: "4. HOW WE USE COOKIES",
    paragraphs: ["We use cookies to:"],
    items: [
      "Ensure the proper functioning of our website",
      "Improve website performance and user experience",
      "Personalise content and recommend relevant services",
      "Analyse website traffic and user behaviour",
      "Enable secure login and appointment booking features",
    ],
  },
  {
    title: "5. COOKIE CONSENT AND YOUR CHOICES",
    paragraphs: [
      "When you first visit our website, a cookie consent banner will be displayed, giving you the option to accept or decline non-essential cookies.",
      "You can manage or withdraw your cookie consent at any time by:",
    ],
    items: [
      "Clicking the \"Cookie Settings\" or \"Manage Preferences\" link on our website",
      "Adjusting your browser settings to block or delete cookies",
      "Using browser add-ons/extensions designed to manage cookies",
    ],
    note: "Please note that disabling certain cookies may affect the functionality of our website, including the ability to book appointments or log in. Withdrawing consent for cookies does not affect the lawfulness of any cookie-based processing carried out before your withdrawal.",
  },
  {
    title: "6. THIRD-PARTY COOKIES",
    paragraphs: [
      "Some cookies may be set by third-party services we use, such as analytics tools or advertising partners. These cookies are governed by the third-party's own privacy and cookie policies.",
      "We are not responsible for the content of third-party cookie policies. We encourage you to review them directly. Currently, third-party services we may use include Google Analytics and similar tools.",
    ],
  },
  {
    title: "7. HOW LONG DO COOKIES LAST?",
    items: [
      "Session Cookies - These are temporary cookies that expire when you close your browser.",
      "Persistent Cookies - These remain on your device for a set period (e.g., 30 days to 1 year) or until you delete them manually.",
    ],
    note: "We will only retain cookie data for as long as necessary for the purposes described in this policy.",
  },
  {
    title: "8. CHANGES TO THIS POLICY",
    paragraphs: [
      "We may update this Cookie Policy from time to time to reflect changes in technology, law, or our practices. Any changes will be posted on this page with an updated Effective Date. For significant changes, we will provide notice via a prominent banner on our website.",
    ],
  },
  {
    title: "9. CONTACT US",
    paragraphs: ["If you have any questions or concerns about our use of cookies, please contact us at:"],
    contact: [
      "Email:  support@appointohealth.in",
      "Website: www.appointohealth.in",
      "Grievance Officer:  support@appointohealth.in",
    ],
  },
];

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Cookie Policy</h1>
        <p className="mt-3 text-sm font-medium text-slate-600">APPOINTO HEALTH</p>
        <p className="mt-1 text-sm text-slate-500">Effective Date: 10 March 2026</p>

        <p className="mt-6 text-base leading-7 text-slate-700">
          Appointo Health (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) uses cookies and similar technologies on our website
          Appointohealth.in to provide a better browsing experience, improve our services, and understand how our
          platform is used.
        </p>
        <p className="mt-4 text-base leading-7 text-slate-700">
          This Cookie Policy should be read alongside our Privacy Policy. By continuing to use our website, you consent
          to our use of cookies as described in this policy. You may withdraw your consent at any time by adjusting
          your cookie preferences or browser settings.
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

