"use client";
import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';

declare global {
  interface Window { recaptchaVerifier: RecaptchaVerifier; }
}

export default function PhoneAuthUI() {
  
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmResult, setConfirmResult] = useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const formattedPhone = `+91${phone}`;
const router=useRouter();
  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible', // Changed to invisible for a better UX
    });
  }, []);

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const result = await signInWithPhoneNumber(auth,formattedPhone, window.recaptchaVerifier);
      setConfirmResult(result);
      alert("OTP Sent!");
    } catch (err) {
      console.error(err);
      alert("Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      await confirmResult?.confirm(otp);
      alert("Successfully Verified!");
      router.push("/login")

    } catch (err) {
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {confirmResult ? "Verify Code" : "Sign In"}
        </h2>
        
        {/* Invisible ReCAPTCHA Container */}
        <div id="recaptcha-container"></div>

        {!confirmResult ? (
          <div className="space-y-4">
            <input
              type="tel"
              placeholder="+1234567890"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setPhone(e.target.value)}
            />
            <button 
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter 6-digit code"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setOtp(e.target.value)}
            />
            <button 
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}