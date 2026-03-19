export default function AboutUs() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(145deg,#edf4fb_0%,#ffffff_58%,#f1f1f1_100%)] px-4 py-10 sm:px-8 md:px-12 md:py-14">
      <div className="pointer-events-none absolute -right-24 -top-16 h-72 w-72 rounded-full bg-[#c7def5]/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#d9d9d9]/60 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl">
        <article className="rounded-2xl border border-[#c2d7ee] bg-white/85 p-5 shadow-[0_12px_30px_rgba(8,45,82,0.12)] backdrop-blur sm:p-7 md:p-8">
          <span className="inline-flex rounded-xl border border-[#0a4f91] bg-white px-4 py-1.5 text-lg font-semibold italic text-[#005fbe] shadow-[0_2px_8px_rgba(0,0,0,0.15)] sm:text-xl">
            About us
          </span>

          <p className="mt-5 max-w-3xl text-xl font-medium leading-tight text-[#131313] sm:text-2xl md:text-[34px]">
            We provide seamless services for advance booking. We also connect you with the best hospitals for different facilities.
          </p>

          <p className="mt-5 text-2xl font-semibold leading-snug sm:text-3xl md:text-[44px]">
            <span className="text-[#6a6a6a]">No More </span>
            <span className="text-[#0a325d]">Waiting</span>
            <span className="text-[#6a6a6a]"> Start Booking </span>
            <span className="text-[#0a325d]">Your Slot</span>
            <span className="text-[#6a6a6a]"> Today</span>
          </p>

          <p className="mt-5 text-2xl font-semibold leading-tight text-[#101010] sm:text-3xl md:text-[46px]">
            No Wealth Is Greater Than Health
          </p>
        </article>
      </div>
    </section>
  );
}
