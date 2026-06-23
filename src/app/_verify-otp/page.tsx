"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

export default function PhoneAuthUI() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmResult, setConfirmResult] = useState<ConfirmationResult | null>(
    null,
  );

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    initialized.current = true;

    const initRecaptcha = async () => {
      try {
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
              size: "normal",
            },
          );

          await window.recaptchaVerifier.render();
        }
      } catch (error) {
        console.error("reCAPTCHA Init Error:", error);
      }
    };

    initRecaptcha();

    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = undefined;
      }
    };
  }, []);

  const handleSendOtp = async () => {
    try {
      setLoading(true);

      if (phone.length !== 10) {
        alert("Please enter a valid 10-digit mobile number");
        return;
      }

      const phoneNumber = `+91${phone}`;

      const verifier = window.recaptchaVerifier;

      if (!verifier) {
        throw new Error("reCAPTCHA not initialized");
      }

      const result = await signInWithPhoneNumber(auth, phoneNumber, verifier);

      setConfirmResult(result);

      alert("OTP Sent Successfully");
    } catch (error: any) {
      console.error("OTP Error:", error);
      console.log(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN);
      alert(error || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
    
      if (!confirmResult) {
        alert("Please send OTP first");
        return;
      }

      await confirmResult.confirm(otp);

      alert("Phone Number Verified Successfully");

      router.push("/login");
    } catch (error: any) {
      console.error("Verify Error:", error);
      console.log(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN);
      alert(error.message|| "Invalid OTP");
    } finally {
      setLoading(false);
      
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Phone Authentication
        </h1>

        <div
          id="recaptcha-container"
          style={{
            minHeight: "80px",
            border: "1px solid red",
          }}
        />
        {!confirmResult ? (
          <div className="space-y-4">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              maxLength={10}
              placeholder="Enter Mobile Number"
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
            />

            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-700 disabled:opacity-50">
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              placeholder="Enter OTP"
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-500"
            />

            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full rounded-lg bg-green-600 p-3 text-white hover:bg-green-700 disabled:opacity-50">
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
