"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import sethascope from "../../../public/sign-up/sethascope.png"
import heartrate from "../../../public/sign-up/heart_rate.png"

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
  const yearOptions = Array.from({ length: 10 }, (_, index) => currentYear + index);

  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const dayOptions = useMemo(
    () => Array.from({ length: getDaysInMonth(selectedYear, selectedMonth) }, (_, index) => index + 1),
    [selectedMonth, selectedYear]
  );
  const selectedMonthName = MONTHS[selectedMonth];

  useEffect(() => {
    if (selectedDate > dayOptions.length) {
      setSelectedDate(dayOptions.length);
    }
  }, [dayOptions.length, selectedDate]);

  return (
    <main className=" bg-white px-4 py-10 md:px-6">
      <section className="mx-auto flex w-full max-w-5xl flex-col overflow-hidden 
       bg-[#efefef] md:flex-row md:shadow-2xl rounded-xl">
        <div className="relative hidden md:flex w-full flex-col items-center
         justify-between bg-white px-6 pb-8 pt-10 md:w-1/2 md:px-8">
          <h1 className="z-10 text-center text-4xl font-bold uppercase
           leading-tight text-[#042b52] lg:text-5xl text-[40px]">
            Appointo 
            <br />
            Health
          </h1>

          <div className="flex items-center ">
          <Image
            src={heartrate}
            alt="Heartbeat line"
            // width={240}
            // height={90}
            className="mt-1 ml-14 w-[30vw] h-[200px] left-[0%]
            absolute top-[40%] object-contain"
          />
          <Image
            src={sethascope}
            alt="Stethoscope"
            // width={210}
            // height={280}
            className=" 
             md:w-[20vwpx] h-[290px] xl:-ml-20 -ml-15 object-contain 
             absolute top-[30%] lg:left-[60%] z-20 left[50%] xl:w-[64vw]"
            priority
          />
          </div>

          <p className="mt-8 text-center text-3xl leading-tight text-[#00264c] [font-family:serif] md:text-5xl">
            Your Life Ours
            <br />
            Responsibility
          </p>
        </div>

        <div className="relative w-full overflow-hidden bg-[#e7e7e7] px-6 py-8 md:w-1/2 md:px-10 md:py-10">
          <div className="pointer-events-none absolute inset-0 md:hidden">
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
          </div>

          <h2 className="relative z-10 mb-6 text-center text-4xl font-bold text-[#00264c]">Sign Up</h2>

          <form
            onSubmit={(event) => event.preventDefault()}
            className="relative z-10 space-y-4 xl:pl-6 xl:pr-3"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <label className=" font-semibold text-[#1f1f1f]">
                Name *
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
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
                  placeholder="1234567890"
                  className="mt-3 h-9 w-full rounded bg-white px-2 text-xs text-[#1d1d1d] outline-none ring-1 ring-[#d7d7d7] placeholder:text-[#bcbcbc]"
                />
              </label>
              <fieldset className="text-xs md:text-sm font-semibold text-[#1f1f1f]">
                <legend className="mb-1 mt-4">Gender *</legend>
                <div className="mt-2 flex items-center gap-3 text-[10px] font-medium text-[#303030]">
                  <label className="flex items-center gap-1">
                    <input type="radio" name="gender" className="h-3 w-3" /> MALE
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="radio" name="gender" className="h-3 w-3" /> Female
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="radio" name="gender" className="h-3 w-3" /> Others
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
                  rows={3}
                  placeholder="Tell me about the problem"
                  className="mt-3 w-full resize-none rounded-md bg-white px-3 py-3 text-xs md:text-sm text-[#1d1d1d] outline-none ring-1 ring-[#d7d7d7] placeholder:text-[#bcbcbc]"
                />
              </label>
            </div>

            <div className="pt-2">
              <p className="text-lg md:text-[20px] font-semibold tracking-wide text-[#111111]">
                SLOT* ({selectedDate} {selectedMonthName} {selectedYear}, {selectedSlot})
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
                  className="mt-2 h-10 w-full rounded-md bg-white px-3 text-xs md:text-sm text-[#1d1d1d] outline-none ring-1 ring-[#d7d7d7]"
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
                  className="mt-2 h-10 w-full rounded-md bg-white px-3 text-xs md:text-sm text-[#1d1d1d] outline-none ring-1 ring-[#d7d7d7]"
                >
                  {TIME_SLOTS.map((timeSlot) => (
                    <option key={timeSlot} value={timeSlot}>
                      {timeSlot}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button
              type="submit"
              className="mt-4 h-11 w-full rounded-md shadow-2xl bg-[#002b5a]
               text-lg font-bold text-white cursor-pointer"
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
