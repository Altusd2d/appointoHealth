"use client";

import { useRouter } from "next/navigation";
import { ShieldAlert, Home, ArrowLeft } from "lucide-react";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-red-100">
            <ShieldAlert className="h-12 w-12 text-red-600" />
          </div>
        </div> */}

        {/* <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Access Denied
        </h1> */}

        <p className="text-gray-600 mb-8">
          {/* You don't have permission to access this page.
          Please contact an administrator if you believe this is a mistake. */}
          Unauthorized please login 
        </p>

        <div className="space-y-3">
          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
          >
            <Home size={18} />
            Go to Home
          </button>

          <button
            onClick={() => router.back()}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 py-3 rounded-lg transition"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}