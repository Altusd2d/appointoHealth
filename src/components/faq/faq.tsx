const faqItems = [
  {
    question: "How do I book an appointment?",
    answer:
      "You can search for a doctor by specialization, hospital, or location. Select your preferred time slot and confirm your booking online within seconds.",
  },
  {
    question: "Can I book appointments 24/7?",
    answer: "Yes. Our platform allows you to book appointments anytime, including weekends and holidays.",
  },
  {
    question: "Will I receive booking confirmation?",
    answer: "Yes. Once your appointment is confirmed, you will receive confirmation via SMS, email.",
  },
  {
    question: "Can I reschedule or cancel my appointment?",
    answer:
      "Yes. You can reschedule or cancel appointments directly from your dashboard before the cancellation deadline.",
  },
  {
    question: "Is online payment secure?",
    answer:
      "Absolutely. All payments are processed through secure, encrypted payment gateways to ensure complete safety of your transaction.",
  },
  {
    question: "What happens if the doctor cancels?",
    answer:
      "If a doctor cancels your appointment, you will be notified immediately and can either reschedule or request a full refund.",
  },
  {
    question: "Can I book for someone else?",
    answer:
      "Yes. You can book appointments for family members by entering their details during booking.",
  },
  {
    question: "Are the doctors verified?",
    answer:
      "All listed doctors are verified professionals with valid certifications and experience.",
  },
  {
    question: "Can I get an online consultation?",
    answer:
      "Yes. Selected doctors offer video consultations. You can filter doctors by the \"Online Consultation\" option.",
  },
  {
    question: "How early should I arrive for my appointment?",
    answer: "We recommend arriving at least 10-15 minutes before your scheduled appointment time.",
  },
  {
    question: "What if I miss my appointment?",
    answer:
      "Missed appointments may not be eligible for refund depending on clinic policy. Please check cancellation terms while booking.",
  },
];
export const metadata = {
  title: "FAQ | Appointo Health Help Center",
  description:
    "Find answers to common questions about doctor appointments, cancellations, online consultations, payments, and healthcare services on Appointo Health.",
};
export default function Faq() {
  return (
    <section id="faq" className="bg-[#f5f8fc] px-4 py-12 sm:px-6 md:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-[980px]">
        <div className="mb-8 text-center">
          {/* <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0066cc]">Support</p> */}
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#0f172a] sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-xl border border-[#dbe7f5] bg-white p-4 shadow-sm transition hover:border-[#9ec6ef]"
              
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-left text-base font-medium text-[#0f172a] sm:text-lg">
                <span>{item.question}</span>
                <span className="text-xl leading-none text-[#0066cc] transition group-open:rotate-45">+</span>
              </summary>
              <p className="pt-3 text-sm leading-6 text-[#475569] sm:text-base">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
