import arrow from "../../../public/process/image.svg";
import step1 from "../../../public/process/cuida_search-outline.png";
import step2 from "../../../public/process/material-symbols_login.png";
import step3 from "../../../public/process/____.png";
import step4 from "../../../public/process/Vector (2).png";
import step5 from "../../../public/process/Vector (3).png";
import arrow2 from "../../../public/process/image-removebg-preview.png"
import { StaticImageData } from "next/image";
import Image from "next/image";

type Step = {
  id: number;
  stepLabel: string;
  title: string;
  description: string;
  icon: StaticImageData;
};

const processSteps: Step[] = [
  {
    id: 1,
    stepLabel: "Step 1",
    title: "Search for your requirement",
    description:
      "Search for your requirements like surgeons, scans in the search bar and see the hospitals with your exact requirement and budget.",
    icon: step1,
  },
  {
    id: 2,
    stepLabel: "Step 2",
    title: "Login/Signup",
    description:
      "If you are new then signup, if not, login with your details and continue.",
    icon: step2,
  },
  {
    id: 3,
    stepLabel: "Step 3",
    title: "Fill the form for booking a slot",
    description:
      "Add details like name, age, gender, problem, and selected option to confirm the appointment.",
    icon: step3,
  },
  {
    id: 4,
    stepLabel: "Step 4",
    title: "Enter the OTP",
    description:
      "After filling the form, you will receive an OTP. Enter it to confirm the booking.",
    icon: step4,
  },
  {
    id: 5,
    stepLabel: "Step 5",
    title: "Confirmation",
    description:
      "Check your details once again. If any issue occurs during booking, contact us.",
    icon: step5,
  },
];

export default function Process() {
  return (
    <section className="bg-[#041874] px-6 py-8 h-fit">
      <div className="mx-auto grid  grid-cols-1">
        {processSteps.map((item,ind) => {
          const evenInd=ind%2;
          return(
            (
          <article key={item.id} className={`flex px-22 ${evenInd?"flex-row-reverse":""}`}>
              <div className={`rounded-xl  p-4 text-center bg-white h-70 bg-amber-800
                 mt-20 w-md -gap-y-10`}>
                <p className="text-2xl font-semibold italic text-[#111]">
                  {item.stepLabel}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-black">
                  {item.title}
                </h3>
                <p className="mt-2 text-md leading-tight text-[#444]">
                  {item.description}
                </p>
              </div>
            {
              !evenInd && <Image alt="" src={arrow} className={`text-white  `} />
            }
            {
              evenInd && <Image alt="" src={arrow2} className={`text-white `} />
            }
          </article>
        )
          )
        })}
      </div>
    </section>
  );
}

{/* <div className="bg-white rounded-full size-20 ">
                <Image
                  src={item.icon}
                  alt=""
                  width={40}
                  height={40}
                  className="text-center pt-10 pl-4"
                />
              </div> */}