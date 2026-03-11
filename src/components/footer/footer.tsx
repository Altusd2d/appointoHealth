import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#001a33] text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">BookMyDoctor</h2>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/70">
              Book appointments faster, reduce waiting time, and connect with
              trusted hospitals and doctors near you.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#core-services" className="transition hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#process" className="transition hover:text-white">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#blog" className="transition hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold">Support</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              <li>
                <Link href="#" className="transition hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="transition hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="transition hover:text-white">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="transition hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="transition hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold">Get in Touch</h3>
            <div className="mt-4 space-y-2 text-sm text-white/75">
              <p>Email: support@bookmydoctor.com</p>
              <p>Phone: +91 98765 43210</p>
              <p>Mon - Sat: 9:00 AM to 8:00 PM</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-center text-xs text-white/60 sm:text-sm">
          Copyright {year} BookMyDoctor. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
