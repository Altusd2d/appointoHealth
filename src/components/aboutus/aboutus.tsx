export default function AboutUs() {
  return (
    <section className="bg-[#ececec] px-4 py-8 sm:px-8 sm:py-10 md:px-12 md:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <span
          className="inline-flex rounded-xl border border-[#0a4f91] bg-white px-5 py-1 text-[22px] font-medium italic text-[#005fbe] shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
          style={{ fontFamily: "cursive" }}
        >
          About us
        </span>

        <p className="mt-6 max-w-4xl text-2xl font-semibold leading-tight text-[#141414] sm:text-3xl md:text-[40px]">
          We provide shemeless services for advance booking We also give best hospitals for different facilities.
        </p>

        <p className="mt-6 text-[28px] font-semibold leading-snug sm:text-[36px] md:text-[52px]">
          <span className="text-[#6e6e6e]">No More </span>
          <span className="text-[#0a325d]">Waiting</span>
          <span className="text-[#6e6e6e]"> Start Booking </span>
          <span className="text-[#0a325d]">Your Slot</span>
          <span className="text-[#6e6e6e]"> Today</span>
        </p>

        <p className="mt-6 text-[30px] font-semibold leading-tight text-[#111111] sm:text-[40px] md:text-[58px]">
          No Wealth Is Greater Than Health
        </p>
      </div>
    </section>
  );
}
