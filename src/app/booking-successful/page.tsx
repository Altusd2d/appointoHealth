import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function AppointmentSuccess() {
  return (
    <div className="pt-10 pb-28 bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl border border-slate-100">

        <div className="flex flex-col items-center text-center">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Appointment Confirmed
          </h1>

          <p className="mt-2 text-slate-600">
            Your appointment has been booked successfully.
            {/* A confirmation email has been sent. */}
          </p>
        </div>

      

        <div className="mt-8 space-y-3">
          <Link
            href="/user-dashboard"
            className="block w-full rounded-xl bg-blue-600 py-3 text-center font-medium text-white hover:bg-blue-700 transition"
          >
            View My Appointments
          </Link>

          <Link
            href="/"
            className="block w-full rounded-xl border py-3 text-center font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}