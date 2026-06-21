"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import sethascope from "../../../public/sign-up/sethascope.png";
import heartrate from "../../../public/sign-up/heart_rate.png";
import { useSearchParams } from "next/navigation";
import { useBookingStore } from "@/store/bookingStore";
import { useRouter } from "next/navigation";
type doctor = {
  id: string;
  name: string;
  specialist: string | null;
  education: string | null;
  experience: string | null;
  image: string | null;
  hospital_id: string | null;
  availability: Record<string, number[]> | null;
  slot: string | null;
};

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
  // const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0]);
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
      // setSelectedDate(dayOptions.length);
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

  const [error, setError] = useState("");
  const [gender, setGender] = useState("male");
  const route = useRouter();
  
  const booking = useBookingStore((state) => state.booking);
  const SelectedSlot=booking?.slotTime;
  const SelectedDate = booking?.slotDate?.split("T")[0];
  const BookAnAppoinment = async () => {
    setError("");

    if (!booking) {
      setError("Booking information missing");
      return;
    }

    if (!name.trim()) {
      setError("Please enter name");
      return;
    }

    if (!age.trim()) {
      setError("Please enter age");
      return;
    }

    if (Number(age) <= 0) {
      setError("Please enter valid age");
      return;
    }

    if (phone.length !== 10) {
      setError("Please enter valid phone number");
      return;
    }

    try {
      const payload = {
        doctor_id: booking.doctorId,
        hospital_id: booking.hospitalId,

        name: name.trim(),

        age: Number(age),

        phone_number: phone,

        gender: gender.toLowerCase(),

        slot_time: booking.slotTime,

        location: booking.hospitalLocation,

        description: description.trim(),

        appointment_date: booking.slotDate.split("T")[0],
      };
      //  setSelectedSlot(slot_time)
      console.log(payload);

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to book appointment");
        return;
      }

      alert("Appointment booked successfully");
      route.push("/user-dashboard");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <main className="overflow-x-hidden bg-white px-4 pt-4 pb-6 md:px-6 xl:px-10">
      <section className="mx-auto flex w-full max-w-7xl flex-col overflow-hidden rounded-xl bg-[#efefef] md:shadow-xl lg:flex-row">
        <div className="relative hidden w-full flex-col items-center justify-between overflow-hidden bg-white px-6 pb-8 pt-2 lg:flex lg:w-[40%] lg:px-8 xl:w-[38%]">
          <h1 className="z-10 text-center text-[40px] font-bold uppercase leading-tight text-[#042b52] lg:text-5xl">
            Appointo
            <br />
            Health
          </h1>

          <div className="pointer-events-none relative isolate mt- flex h-[320px] w-full items-center justify-center overflow-visible">
            <Image
              src={heartrate}
              alt="Heartbeat line"
              className="absolute left-1/2 top-1/2 z-0 h-auto w-full max-w-[380px] -translate-x-1/2 -translate-y-1/2 object-contain xl:max-w-[430px]"
            />
            <Image
              src={sethascope}
              alt="Stethoscope"
              className="absolute -right-14 top-[42%] z-30 h-[250px] w-auto -translate-y-[52%] translate-x-[8%] object-contain xl:h-[290px]"
              priority
            />
          </div>

          <p className=" text-center text-3xl leading-tight text-[#00264c] [font-family:serif] md:text-5xl">
            Your Life Ours
            <br />
            Responsibility
          </p>
        </div>

        <div className="relative w-full overflow-hidden bg-[#e7e7e7] px-6 py-8 lg:w-[60%] lg:pl-10 lg:py-2 xl:w-[62%]">
          <div className="mb-5">
            <article className="rounded-2xl border border-[#d8d8d8] bg-white px-6 py-4 sm:px-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
                <div className="flex flex-col items-center">
                  <div
                    className="grid h-[100px] w-[100px] place-items-center rounded-full
          xl:h-[150px] xl:w-[150px]
          sm:h-[120px] sm:w-[120px]
          md:h-[100px] md:w-[100px]
          bg-gradient-to-br from-[#d9dde4] to-[#b8c3d6]
          text-4xl font-semibold text-[#334155]
          sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl">
                    {booking?.doctorName?.charAt(0)}
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-medium text-[#0a67d4] md:text-2xl">
                    {booking?.doctorName}
                  </h2>

                  <p className="mt-2 text-lg text-[#1d1d1d] sm:text-md">
                    Specialist: {booking?.specialist}
                  </p>

                  <p className="mt-0.5 text-base text-[#8a8a8a] sm:text-md">
                    Experience: {booking?.experience}
                  </p>

                  <p className="max-w-3xl text-base leading-7 text-[#161616] sm:mt-1 sm:text-md">
                    Qualification: {booking?.education}
                  </p>
                </div>
              </div>
            </article>
          </div>
          <form
            onSubmit={(event) => event.preventDefault()}
            className="relative z-0 space-y-4 xl:pl-6 xl:pr-3 [&_input]:cursor-text [&_textarea]:cursor-text">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <label className=" font-semibold text-[#1f1f1f]">
                Name *
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Please enter name"
                  className="mt-2 h-9 md:text-sm w-full rounded bg-white px-2 text-xs text-[#1d1d1d] outline-none ring-1 ring-[#d7d7d7] placeholder:text-[#bcbcbc]"
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
                  className="mt-2 h-9 w-full md:text-sm rounded bg-white px-2 text-xs text-[#1d1d1d] outline-none ring-1 ring-[#d7d7d7] placeholder:text-[#bcbcbc]"
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
                  className="mt-2 h-9 w-full rounded bg-white px-2 text-xs text-[#1d1d1d] outline-none ring-1 ring-[#d7d7d7] placeholder:text-[#bcbcbc]"
                />
              </label>
              <fieldset className="text-xs md:text-sm font-semibold text-[#1f1f1f]">
                <legend className="mb-1 mt-4">Gender *</legend>
                <div className="mt-1.5 flex items-center gap-3 text-[10px] font-medium text-[#303030]">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={gender === "Male"}
                      onChange={(e) => setGender(e.target.value)}
                      className="h-3 w-3"
                    />
                    MALE
                  </label>

                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={gender === "Female"}
                      onChange={(e) => setGender(e.target.value)}
                      className="h-3 w-3"
                    />
                    Female
                  </label>

                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="gender"
                      value="Others"
                      checked={gender === "Others"}
                      onChange={(e) => setGender(e.target.value)}
                      className="h-3 w-3"
                    />
                    Others
                  </label>
                </div>
              </fieldset>
            </div>

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

            <div className="">
              <p className="text-lg md:text-[20px] font-semibold tracking-wide text-[#111111]">
                SLOT* ({SelectedDate} ,{" "}
                {SelectedSlot})
              </p>
              {error && (
                <p className="text-red-600 text-sm font-medium">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className=" md:h-11 h-10 w-full mb-1.5 rounded-md bg-[#002b5a] text-md md:text-lg font-bold text-white cursor-pointer shadow-xl  
              transition-shadow duration-200 hover:shadow-[0_14px_30px_rgba(0,43,90,0.45)]"
              onClick={() => {
                BookAnAppoinment();
              }}>
              Book an appointment
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
