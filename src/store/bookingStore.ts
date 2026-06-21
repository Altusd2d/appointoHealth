import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BookingData {
  doctorId: string;
  doctorName: string;
  specialist: string;
  education: string;
  experience: string;

  hospitalId: string;
  hospitalName: string;
  hospitalLocation: string;

  slotDate: string;
  slotTime: string;
}

interface BookingStore {
  booking: BookingData | null;

  setBooking: (data: BookingData) => void;

  clearBooking: () => void;
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      booking: null,

      setBooking: (data) =>
        set({
          booking: data,
        }),

      clearBooking: () =>
        set({
          booking: null,
        }),
    }),
    {
      name: "booking-storage",
    }
  )
);