"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import sethascope from "../../../public/sign-up/sethascope.png";
import heartrate from "../../../public/sign-up/heart_rate.png";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const TIME_SLOTS = Array.from({ length: 13 }, (_, index) => {
  const hour24 = 10 + index;
  const hour12 = ((hour24 + 11) % 12) + 1;
  const meridiem = hour24 >= 12 ? "PM" : "AM";
  return `${hour12}:00 ${meridiem}`;
});

const getDaysInMonth = (year: number, monthIndex: number) =>
  new Date(year, monthIndex + 1, 0).getDate();

export default function BookingForm() {
  const today = new Date();
  const currentYear = today.getFullYear();

  const [selectedMonth] = useState(today.getMonth());
  const [selectedYear] = useState(currentYear);
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [selectedSlot] = useState(TIME_SLOTS[0]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  const dayOptions = useMemo(
    () =>
      Array.from(
        { length: getDaysInMonth(selectedYear, selectedMonth) },
        (_, index) => index + 1,
      ),
    [selectedMonth, selectedYear],
  );
  const selectedMonthName = MONTHS[selectedMonth];

  useEffect(() => {
    if (selectedDate > dayOptions.length) {
      setSelectedDate(dayOptions.length);
    }
  }, [dayOptions.length, selectedDate]);

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const numericValue = event.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(numericValue);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const alphaOnly = event.target.value
      .replace(/[^a-zA-Z\s]/g, "")
      .replace(/\s{2,}/g, " ");
    setName(alphaOnly.toUpperCase());
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const cleanText = event.target.value
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .replace(/\s{2,}/g, " ");
    setDescription(cleanText);
  };

  const DOCTORS = [
    {
      id: "d-002",
      name: "Dr.Padma Latha",
      speciality: "cardio specialist",
      experience: "15 years of experience",
      credentials:
        "MBBS, MD - General Medicine, DM - Gastroenterology, Fortis Hospital, Jaipur",
      initials: "PL",
    },
  ];

  return (
    <main className="overflow-x-hidden bg-white px-4 py-10 md:px-6 xl:px-10">
      <section className="mx-auto flex w-full max-w-7xl flex-col overflow-hidden rounded-xl bg-[#efefef] md:shadow-2xl lg:flex-row">
        <div className="relative hidden w-full flex-col items-center justify-between overflow-hidden bg-white px-6 pb-8 pt-24 lg:flex lg:w-[40%] lg:px-8 xl:w-[38%]">
          <h1 className="z-10 text-center text-[40px] font-bold uppercase leading-tight text-[#042b52] lg:text-5xl">
            Appointo
            <br />
            Health
          </h1>

          <div className="pointer-events-none relative mt-6 flex h-[320px] w-full items-center justify-center">
            <Image
              src={heartrate}
              alt="Heartbeat line"
              className="absolute left-0 top-1/2 h-auto w-full w-[39vw] -translate-y-1/2 object-contain"
            />
            <Image
              src={sethascope}
              alt="Stethoscope"
              className="absolute left-[70%] top-[6%] h-[250px] w-auto object-contain z-20"
              priority
            />
          </div>

          <p className="mt-8 mb-10 text-center text-3xl leading-tight text-[#00264c] [font-family:serif] md:text-5xl">
            Your Life Ours
            <br />
            Responsibility
          </p>
        </div>

        <div className="relative w-full overflow-hidden bg-[#e7e7e7] px-6 py-8 lg:w-[60%] lg:pl-10 lg:py-10 xl:w-[62%]">
          {/* <div className="pointer-events-none absolute inset-0 md:hidden">
            <Image
              src={heartrate}
              alt=""
              fill
              className="object-cover opacity-25 blur-[1px]"
            />
            <div className="absolute inset-0 bg-white/35 backdrop-blur-[3px]" />
            <p className="absolute left-1/2 top-5 -translate-x-1/2 text-center text-6xl font-bold uppercase leading-[0.9] text-[#0a2d54]/8">
              Appointo
              <br />
              Health
            </p>
            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-5xl leading-tight text-[#0a2d54]/10 [font-family:serif]">
              Your Life Ours
              <br />
              Responsibility
            </p>
          </div> */}

          {/* <h2 className="relative z-10 mb-6 text-center text-4xl font-bold text-[#00264c]">Book Appoinment</h2> */}
          <div className="mt-8 space-y-6 mb-8">
            {DOCTORS.map((doctor) => (
              <article
                key={doctor.id}
                className="rounded-2xl border border-[#d8d8d8] bg-white px-6 py-5 shadow-[0_3px_10px_rgba(0,0,0,0.15)] sm:px-8"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-10">
                  <div className="flex flex-col items-center">
                    <div
                      className="grid h-[100px] w-[100px] place-items-center rounded-full xl:h-[170px] xl:w-[170px] 
                               sm:h-[120px] sm:w-[120px] md:h-[100px] md:w-[100px]
                             bg-gradient-to-br from-[#d9dde4] to-[#b8c3d6] text-4xl font-semibold text-[#334155]
                             sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl"
                    >
                      {doctor.initials}
                    </div>
                    {/* <span className="mt-2 rounded-md border border-[#7ba9e8] px-3 py-1 text-sm text-[#1c71d8]">
                              {hospital.name.toLowerCase()}
                            </span> */}
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-medium text-[#0a67d4] sm:text-2xl">
                      {doctor.name}
                    </h2>
                    <p className="mt-2 text-lg text-[#1d1d1d] sm:text-md">
                      {doctor.speciality}
                    </p>
                    <p className="mt-0.5 text-base text-[#8a8a8a] sm:text-md">
                      {doctor.experience}
                    </p>
                    <p className=" max-w-3xl text-base leading-7 text-[#161616] sm:mt-1 sm:text-md">
                      {doctor.credentials}
                    </p>
                    {/* <button
                              className="px-3 py-1.5 rounded-lg text-black text-[14px] border border-[#cbcdcd]
                                bg-[#199fd9] "
                            >
                              Book an doctor
                            </button> */}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <form
            onSubmit={(event) => event.preventDefault()}
            className="relative z-0 space-y-4 xl:pl-6 xl:pr-3 [&_input]:cursor-text [&_textarea]:cursor-text"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <label className=" font-semibold text-[#1f1f1f]">
                Name *
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Please enter name"
                  className="mt-3 h-9 md:text-sm w-full rounded bg-white px-2 text-xs text-[#1d1d1d] outline-none ring-1 ring-[#d7d7d7] placeholder:text-[#bcbcbc]"
                />
              </label>
              <label className="font-semibold text-[#1f1f1f]">
                Age *
                <input
                  type="number"
                  name="age"
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                  placeholder="Please enter age"
                  className="mt-3 h-9 w-full md:text-sm rounded bg-white px-2 text-xs text-[#1d1d1d] outline-none ring-1 ring-[#d7d7d7] placeholder:text-[#bcbcbc]"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
              <label className="text-xs md:text-sm font-semibold text-[#1f1f1f]">
                Phone Number *
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  inputMode="numeric"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  autoComplete="tel-national"
                  placeholder="1234567890"
                  className="mt-3 h-9 w-full rounded bg-white px-2 text-xs text-[#1d1d1d] outline-none ring-1 ring-[#d7d7d7] placeholder:text-[#bcbcbc]"
                />
              </label>
              <fieldset className="text-xs md:text-sm font-semibold text-[#1f1f1f]">
                <legend className="mb-1 mt-4">Gender *</legend>
                <div className="mt-2 flex items-center gap-3 text-[10px] font-medium text-[#303030]">
                  <label className="flex items-center gap-1">
                    <input type="radio" name="gender" className="h-3 w-3" />{" "}
                    MALE
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="radio" name="gender" className="h-3 w-3" />{" "}
                    Female
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="radio" name="gender" className="h-3 w-3" />{" "}
                    Others
                  </label>
                </div>
              </fieldset>
            </div>

            {/* <div>
              <p className="text-xs font-semibold text-[#1f1f1f]">Enter OTP</p>
              <div className="mt-2 flex gap-2">
                {[0, 1, 2, 3].map((slot) => (
                  <input
                    key={slot}
                    maxLength={1}
                    placeholder="*"
                    className="h-8 w-8 rounded bg-white text-center text-sm outline-none ring-1 ring-[#d7d7d7]"
                  />
                ))}
              </div>
            </div> */}
            <div>
              <label className="text-xs md:text-sm font-semibold text-[#1f1f1f]">
                Description
                <textarea
                  rows={2}
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Tell me about the problem"
                  className="mt-3 w-full resize-none rounded-md bg-white px-3 py-3 text-xs md:text-sm text-[#1d1d1d] outline-none ring-1 ring-[#d7d7d7] placeholder:text-[#bcbcbc]"
                />
              </label>
            </div>

            <div className="pt-2">
              <p className="text-lg md:text-[20px] font-semibold tracking-wide text-[#111111]">
                SLOT* ({selectedDate} {selectedMonthName} {selectedYear},{" "}
                {selectedSlot})
              </p>
            </div>

            {/* <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <label className="text-xs md:text-sm font-semibold text-[#1f1f1f]">
                Date*
                <select
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(Number(event.target.value))}
                  className="mt-2 h-10 w-full rounded-md bg-white px-3 text-xs md:text-sm text-[#1d1d1d] outline-none ring-1 ring-[#d7d7d7]"
                >
                  {dayOptions.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-xs md:text-sm font-semibold text-[#1f1f1f]">
                Month*
                <select
                  value={selectedMonth}
                  onChange={(event) => setSelectedMonth(Number(event.target.value))}
                  className="mt-2 h-10 w-full rounded-md bg-white px- text-xs md:text-sm text-[#1d1d1d] outline-none ring-1 ring-[#d7d7d7]"
                >
                  {MONTHS.map((month, index) => (
                    <option key={month} value={index}>
                      {month}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-xs md:text-sm font-semibold text-[#1f1f1f]">
                Year*
                <select
                  value={selectedYear}
                  onChange={(event) => setSelectedYear(Number(event.target.value))}
                  className="mt-2 h-10 w-full rounded-md bg-white px-3 text-xs md:text-sm text-[#1d1d1d] outline-none ring-1 ring-[#d7d7d7]"
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-xs md:text-sm font-semibold text-[#1f1f1f]">
                Slot*
                <select
                  value={selectedSlot}
                  onChange={(event) => setSelectedSlot(event.target.value)}
                  className="mt-2 h-10 w-full rounded-md bg-white  text-xs md:text-sm text-[#1d1d1d] outline-none ring-1 ring-[#d7d7d7]"
                >
                  {TIME_SLOTS.map((timeSlot) => (
                    <option key={timeSlot} value={timeSlot}>
                      {timeSlot}
                    </option>
                  ))}
                </select>
              </label>
            </div> */}
            <button
              type="submit"
              className="mt-4 h-11 w-full rounded-md bg-[#002b5a] text-lg font-bold text-white cursor-pointer shadow-[0_10px_24px_rgba(0,43,90,0.35)] transition-shadow duration-200 hover:shadow-[0_14px_30px_rgba(0,43,90,0.45)]"
            >
              Book an appointment
            </button>

            {/* <p className="py-2.5 text-sm text-[#0d3055]">I already have a account?</p> */}

            {/* <Link
              href="/login"
              className="flex h-11 w-full items-center justify-center rounded-md bg-[#002b5a] 
              text-lg font-bold text-white shadow-2xl"
            >
              Login
            </Link> */}
          </form>
        </div>
      </section>
    </main>
  );
}
