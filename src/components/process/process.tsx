import step1 from "../../../public/process/cuida_search-outline.png";
import step2 from "../../../public/process/material-symbols_login.png";
import step3 from "../../../public/process/____.png";
import step4 from "../../../public/process/Vector (2).png";
import step5 from "../../../public/process/Vector (3).png";
import Image, { StaticImageData } from "next/image";

type Step = {
  id: number;
  stepNo: number;
  title: string;
  description: string;
  icon: StaticImageData;
  x: number;
  y: number;
};

const CANVAS_W = 1100;
const CANVAS_H = 1390;
const CARD_W = 430;
const CARD_H = 268;

const LEFT_X = 74;
const RIGHT_X = 596;
const Y1 = 48;
const Y2 = 238;
const Y3 = 528;
const Y4 = 718;
const Y5 = 1008;

const desktopSteps: Step[] = [
  {
    id: 1,
    stepNo: 1,
    title: "Search for your requirement",
    description:
      "Search for your requirements like surgeons, scans in the search bar and see the hospitals with your exact requirement and budget.",
    icon: step1,
    x: LEFT_X,
    y: Y1,
  },
  {
    id: 2,
    stepNo: 2,
    title: "Login/Signup",
    description: "If you are new then signup, if not login with your details and continue.",
    icon: step2,
    x: RIGHT_X,
    y: Y2,
  },
  {
    id: 4,
    stepNo: 4,
    title: "Enter the OTP",
    description: "After filling the form, you will receive an OTP. Enter it to confirm the booking.",
    icon: step4,
    x: LEFT_X,
    y: Y3,
  },
  {
    id: 3,
    stepNo: 3,
    title: "Fill the form for book a slot",
    description:
      "Add details like name, age, gender, problem and selected option to confirm the appointment.",
    icon: step3,
    x: RIGHT_X,
    y: Y4,
  },
  {
    id: 5,
    stepNo: 5,
    title: "Conformation",
    description: "Check your details once again. If any issue occurs during booking, contact us.",
    icon: step5,
    x: LEFT_X,
    y: Y5,
  },
];

const mobileSteps = [
  ...desktopSteps.filter((step) => step.id === 1 || step.id === 2),
  ...desktopSteps.filter((step) => step.id === 4 || step.id === 3 || step.id === 5),
];

const xp = (n: number) => `${(n / CANVAS_W) * 100}%`;
const yp = (n: number) => `${(n / CANVAS_H) * 100}%`;

function StepCard({ step }: { step: Step }) {
  return (
    <article
      className="absolute rounded-2xl bg-[#ececec] px-[2%] pb-[1%] pt-[2%] text-center shadow-sm h-[300px]"
      style={{ left: xp(step.x), top: yp(step.y), width: xp(CARD_W), height: yp(CARD_H) }}
    >
      <p className="text-[clamp(18px,2.2vw,40px)] italic font-semibold leading-none text-[#111] ">
        Step{" "}
        <span className="inline-flex  h-[clamp(27px,1.9vw,34px)] w-[clamp(27px,1.9vw,34px)] items-center justify-center rounded-full border border-[#0f0f0f] text-[clamp(11px,1vw,20px)] not-italic">
          {step.stepNo}
        </span>
      </p>
      <h3 className="mt-[2.9%] text-[clamp(14px,2vw,38px)] font-semibold leading-7 text-[#0d0d0d]">
        {step.title}
      </h3>
      <p className="mx-auto mt-[4.4%] max-w-[82%] text-[clamp(14px,1vw,17px)] leading-[1.35] text-[#5e5e5e]">
        {step.description}
      </p>

      <div className="absolute left-1/2 top-[94%]  flex h-[clamp(78px,5.5vw,90px)] w-[clamp(52px,7.2vw,104px)] -translate-x-1/2 -translate-y-[36%] items-start justify-center rounded-b-[999px] bg-[#ececec] pt-[clamp(4px,0.7vw,10px)]">
        <Image src={step.icon} alt="" className="h-auto w-[clamp(20px,3vw,44px)] max-xl:mt-6 mt-4" />
      </div>
    </article>
  );
}

function MobileStepCard({ step }: { step: Step }) {
  return (
    <article className="relative rounded-2xl bg-[#ececec] px-4 pb-11 pt-4 text-center">
      <p className="text-2xl italic font-semibold leading-none text-[#111]">
        Step{" "}
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#0f0f0f] text-sm not-italic">
          {step.stepNo}
        </span>
      </p>
      <h3 className="mt-2 text-xl font-semibold text-[#0d0d0d]">{step.title}</h3>
      <p className="mx-auto mt-2 max-w-[280px] text-xs leading-[1.35] text-[#5e5e5e]">{step.description}</p>
      <div className="absolute -bottom-6 left-1/2 flex h-12 w-14 -translate-x-1/2 items-start justify-center rounded-b-3xl bg-[#ececec] pt-1.5">
        <Image src={step.icon} alt="" className="h-auto w-7" />
      </div>
    </article>
  );
}

export default function Process() {
  return (
    <section className="bg-[#07156f] px-3 pt-3 md:px-6 md:pt-6 max-lg:pb-10">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-10 lg:hidden">
          {mobileSteps.map((step) => (
            <MobileStepCard key={step.id} step={step} />
          ))}
        </div>

        <div className="relative mx-auto hidden w-full max-w-[1100px] lg:block " style={{ aspectRatio: `${CANVAS_W}/${CANVAS_H}` }}>
          <svg
            viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
            className="absolute inset-0 h-full w-full "
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            
          >
            <defs>
              <marker
                id="flowArrow"
                viewBox="0 0 12 12"
                refX="6"
                refY="6"
                markerWidth="8"
                markerHeight="8"
                orient="auto-start-reverse"
              >
                <path d="M2 2L10 6L2 10" fill="none" stroke="#edf4ff" strokeWidth="1.5" />
              </marker>
            </defs>

            <path
              d={`M${LEFT_X + CARD_W} ${Y1 + 58} H${RIGHT_X + CARD_W / 2} V${Y2}`}
              fill="none"
              stroke="#edf4ff"
              strokeWidth="3"
              markerEnd="url(#flowArrow)"
            />
            <path
              d={`M${RIGHT_X} ${Y2 + CARD_H / 2} H${LEFT_X + CARD_W / 2} V${Y3}`}
              fill="none"
              stroke="#edf4ff"
              strokeWidth="3"
              markerEnd="url(#flowArrow)"
            />
            <path
              d={`M${LEFT_X + CARD_W} ${Y3 + CARD_H / 2} H${RIGHT_X + CARD_W / 2} V${Y4}`}
              fill="none"
              stroke="#edf4ff"
              strokeWidth="3"
              markerEnd="url(#flowArrow)"
            />
            <path
              d={`M${RIGHT_X} ${Y4 + CARD_H / 2} H${LEFT_X + CARD_W / 2} V${Y5}`}
              fill="none"
              stroke="#edf4ff"
              strokeWidth="3"
              markerEnd="url(#flowArrow)"
            />
            
          </svg>

          {desktopSteps.map((step) => (
            <StepCard key={step.id} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}
