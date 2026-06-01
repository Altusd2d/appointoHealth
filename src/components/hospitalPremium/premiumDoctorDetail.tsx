"use client";

import Image from "next/image";
import { useState, type ChangeEvent } from "react";
import type { PremiumDoctor } from "./premiumDoctorsData";
import {
  defaultPremiumSlotDayId,
  getDefaultPremiumSlotId,
  getPremiumSlotDay,
  premiumSlotDays,
} from "./premiumDoctorsData";

type PremiumDoctorDetailProps = {
  doctor: PremiumDoctor;
};

export default function PremiumDoctorDetail({
  doctor,
}: PremiumDoctorDetailProps) {
  const [selectedDayId, setSelectedDayId] = useState(defaultPremiumSlotDayId);
  const [selectedSlotId, setSelectedSlotId] = useState(
    getDefaultPremiumSlotId(defaultPremiumSlotDayId),
  );
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("male");
  const [description, setDescription] = useState("");

  const selectedDay = getPremiumSlotDay(selectedDayId);
  const selectedSlot =
    selectedDay.slots.find((slot) => slot.id === selectedSlotId) ??
    selectedDay.slots[0];

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const alphaOnly = event.target.value
      .replace(/[^a-zA-Z\s]/g, "")
      .replace(/\s{2,}/g, " ");
    setName(alphaOnly);
  };

  const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAge(event.target.value.replace(/\D/g, "").slice(0, 3));
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value.replace(/\D/g, "").slice(0, 10));
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  return (
    <main className="min-h-screen bg-[#f2f2f2] px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
      <section className="mx-auto w-full max-w-5xl rounded-[28px] bg-white px-5 py-6 shadow-[0_14px_34px_rgba(15,23,42,0.16)] sm:px-7 sm:py-8 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="flex flex-col items-center md:w-[170px]">
            <Image
              src={doctor.image}
              alt={doctor.name}
              width={156}
              height={156}
              className="h-[126px] w-[126px] rounded-full object-cover shadow-[0_8px_22px_rgba(15,23,42,0.18)] sm:h-[146px] sm:w-[146px]"
              priority
            />
            <span className="mt-3 rounded-md border border-[#86b2ea] bg-white px-3 py-1 text-[13px] text-[#2376d6] shadow-[0_3px_8px_rgba(36,91,169,0.15)]">
              {doctor.hospitalLabel}
            </span>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-[30px] font-medium leading-tight text-[#1b76cf] sm:text-[36px]">
              {doctor.name}
            </h1>
            <p className="mt-2 text-[18px] text-[#1c1c1c]">{doctor.role}</p>
            <p className="mt-1 text-[16px] text-[#8e8e8e]">
              {doctor.detailExperience}
            </p>
            <p className="mt-5 max-w-3xl text-[17px] leading-7 text-[#171717]">
              {doctor.credentials}
            </p>
          </div>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-3 gap-3 text-center">
            {premiumSlotDays.map((day) => {
              const isSelected = day.id === selectedDayId;

              return (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => {
                    setSelectedDayId(day.id);
                    setSelectedSlotId(getDefaultPremiumSlotId(day.id));
                  }}
                  className={`rounded-xl px-2 py-2 transition ${
                    isSelected
                      ? "text-[24px] font-medium text-[#1b76cf] sm:text-[32px]"
                      : "text-[17px] font-normal text-[#222222] hover:text-[#1b76cf] sm:text-[21px]"
                  }`}
                >
                  {day.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {selectedDay.slots.map((slot) => {
              const isUnavailable = slot.state === "unavailable";
              const isSelected = selectedSlotId === slot.id && !isUnavailable;

              return (
                <button
                  key={slot.id}
                  type="button"
                  disabled={isUnavailable}
                  onClick={() => setSelectedSlotId(slot.id)}
                  className={`h-[48px] rounded-md border text-[17px] font-normal shadow-[0_2px_4px_rgba(16,24,40,0.04)] transition ${
                    isSelected
                      ? "border-[#0d6cc8] bg-[#0d6cc8] text-white"
                      : isUnavailable
                        ? "cursor-not-allowed border-[#dddddd] bg-white text-[#c8c8c8]"
                        : "border-[#7bb3df] bg-white text-[#3180c8] hover:bg-[#f4f9ff]"
                  }`}
                >
                  {slot.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-14 text-center">
          <h2 className="text-[26px] font-semibold text-[#08233f] sm:text-[34px]">
            SLOT* ({selectedDay.label} {selectedSlot.label.toLowerCase()})
          </h2>
        </div>

        <form
          onSubmit={(event) => event.preventDefault()}
          className="mx-auto mt-8 max-w-4xl rounded-sm bg-[#f7f7f7] px-5 py-6 sm:px-8 sm:py-7"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <label className="text-[15px] font-semibold text-[#202020]">
              Name *
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Please enter name"
                className="mt-2 h-11 w-full rounded-sm bg-white px-3 text-[14px] text-[#1a1a1a] outline-none ring-1 ring-[#ececec] placeholder:text-[#c0c0c0]"
              />
            </label>

            <label className="text-[15px] font-semibold text-[#202020]">
              Age*
              <input
                type="text"
                value={age}
                onChange={handleAgeChange}
                placeholder="Please enter age"
                className="mt-2 h-11 w-full rounded-sm bg-white px-3 text-[14px] text-[#1a1a1a] outline-none ring-1 ring-[#ececec] placeholder:text-[#c0c0c0]"
              />
            </label>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <label className="text-[15px] font-semibold text-[#202020]">
              Phone Number *
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                inputMode="numeric"
                maxLength={10}
                placeholder="1234567890"
                className="mt-2 h-11 w-full rounded-sm bg-white px-3 text-[14px] text-[#1a1a1a] outline-none ring-1 ring-[#ececec] placeholder:text-[#c0c0c0]"
              />
            </label>

            <fieldset className="text-[15px] font-semibold text-[#202020]">
              <legend>Gender *</legend>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-[12px] font-medium text-[#373737]">
                <label className="flex items-center gap-1.5">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(event) => setGender(event.target.value)}
                    className="h-3.5 w-3.5"
                  />
                  MALE
                </label>
                <label className="flex items-center gap-1.5">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={(event) => setGender(event.target.value)}
                    className="h-3.5 w-3.5"
                  />
                  Female
                </label>
                <label className="flex items-center gap-1.5">
                  <input
                    type="radio"
                    name="gender"
                    value="others"
                    checked={gender === "others"}
                    onChange={(event) => setGender(event.target.value)}
                    className="h-3.5 w-3.5"
                  />
                  Others
                </label>
              </div>
            </fieldset>
          </div>

          <label className="mt-6 block text-[15px] font-semibold text-[#202020]">
            Description
            <textarea
              rows={3}
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Tell me about the problem"
              className="mt-2 w-full resize-none rounded-sm bg-white px-3 py-3 text-[14px] text-[#1a1a1a] outline-none ring-1 ring-[#ececec] placeholder:text-[#c0c0c0]"
            />
          </label>
        </form>

        <button
          type="button"
          className="mx-auto mt-9 flex h-[54px] w-full max-w-4xl items-center justify-center rounded-md bg-[#0d6cc8] px-6 text-[24px] font-semibold text-white shadow-[0_10px_24px_rgba(13,108,200,0.35)] transition hover:bg-[#085ebc]"
        >
          Book a appointment
        </button>
      </section>
    </main>
  );
}
