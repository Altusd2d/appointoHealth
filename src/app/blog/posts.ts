export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  content: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-choose-right-doctor-online",
    title: "How to Choose the Right Doctor Online in 10 Minutes",
    description:
      "A practical, step-by-step guide to finding the right specialist, checking credibility, and booking confidently.",
    author: "BookMyDoctor Editorial Team",
    publishedAt: "2026-03-04",
    readTime: "5 min read",
    tags: ["Doctor Booking", "Patient Guide", "Healthcare"],
    content: [
      "Choosing a doctor online can feel overwhelming when every profile looks similar. The fastest way is to focus on three checks: qualification, specialty match, and recent patient feedback.",
      "Start by defining your need clearly. If symptoms are specific, search by specialty instead of general physician. For example, persistent skin irritation should go to dermatology, while chronic knee pain should go to orthopedics.",
      "Next, review experience in years plus treatment focus. A doctor with focused practice in your condition is usually a stronger fit than a generic profile with broad claims.",
      "Read reviews for patterns, not emotion. Look for repeated comments on diagnosis clarity, waiting time, and communication quality. One extreme review should not decide your booking.",
      "Finally, choose an available slot that gives enough time for consultation and keep your reports ready before the appointment. Better preparation leads to better diagnosis and faster follow-up planning.",
    ],
  },
  {
    slug: "teleconsultation-vs-clinic-visit",
    title: "Teleconsultation vs Clinic Visit: When to Pick Which",
    description:
      "Understand what conditions work well for online consultations and when an in-person visit is the safer option.",
    author: "BookMyDoctor Editorial Team",
    publishedAt: "2026-03-04",
    readTime: "4 min read",
    tags: ["Telemedicine", "Consultation", "Healthcare Tips"],
    content: [
      "Teleconsultation is ideal for follow-ups, medication adjustments, minor infections, allergy guidance, and lifestyle counseling. It saves travel time and reduces waiting-room exposure.",
      "An in-person clinic visit is better when physical examination is essential. Examples include chest pain, breathing difficulty, severe abdominal pain, high fever in children, injury, or neurological symptoms.",
      "If you are unsure, start with teleconsultation and let the doctor escalate to a physical visit when needed. This hybrid flow is efficient and clinically safe for many patients.",
      "For the best online consultation, share clear symptom history, upload old prescriptions, and list current medicines in advance. Good input quality improves medical decisions.",
      "The goal is not to replace clinic care. The goal is to use digital consultation as a smart first layer and move to in-person care exactly when required.",
    ],
  },
  {
    slug: "prepare-for-first-doctor-appointment",
    title: "How to Prepare for Your First Doctor Appointment",
    description:
      "A simple checklist to help you explain symptoms clearly and get more value from every consultation.",
    author: "BookMyDoctor Editorial Team",
    publishedAt: "2026-03-04",
    readTime: "4 min read",
    tags: ["Patient Checklist", "Appointments", "Health Records"],
    content: [
      "Most patients lose consultation time because they explain symptoms in a scattered way. A 2-minute preparation can change the outcome dramatically.",
      "Write down your top 3 symptoms, when they started, and what makes them worse or better. Mention any fever, pain scale, sleep changes, appetite shifts, or side effects from medicines.",
      "Carry previous prescriptions, recent test reports, and current medication list including supplements. Missing this information can lead to repeated tests and delayed treatment.",
      "Ask focused questions: What is the probable diagnosis? Which red flags require urgent help? How long should medication continue? When should I return for follow-up?",
      "After the visit, follow prescription timing exactly and schedule follow-up before symptoms become severe again. Consistency is often more important than medication changes.",
    ],
  },
  {
    slug: "digital-health-records-benefits",
    title: "Why Digital Health Records Improve Treatment Outcomes",
    description:
      "Learn how digital records help doctors make faster, safer, and more consistent clinical decisions.",
    author: "BookMyDoctor Editorial Team",
    publishedAt: "2026-03-04",
    readTime: "5 min read",
    tags: ["Digital Health", "Medical Records", "Patient Safety"],
    content: [
      "Treatment quality drops when clinical history is fragmented. Digital health records solve this by creating one timeline of symptoms, prescriptions, tests, and follow-up notes.",
      "Doctors can detect treatment response faster when they see historical trends. This reduces duplicate prescriptions and improves diagnosis confidence, especially for chronic cases.",
      "Patients also benefit from better continuity. Even when visiting a new specialist, prior records provide context and reduce repeated investigations.",
      "Digital records support safer emergency care because allergies, existing conditions, and active medicines are visible quickly when every minute matters.",
      "The key practice is simple: upload reports consistently after every consultation. Complete data over time becomes a powerful clinical asset for both patient and doctor.",
    ],
  },
];

export const getPostBySlug = (slug: string) =>
  BLOG_POSTS.find((post) => post.slug === slug);
