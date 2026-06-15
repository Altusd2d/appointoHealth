"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Page() {
  // export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });

      const data = await response.json();

      if (data.success) {
        router.push("/admin-login");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Manage hospitals and doctors
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <Link href="/admin-features/AddDoctor">
            <div className="cursor-pointer rounded-xl border border-gray-200 p-6 transition-all hover:-translate-y-1 hover:border-blue-500 hover:shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">
                Add Doctor
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Register a new doctor in the system.
              </p>
            </div>
          </Link>

          <Link href="/admin-features/AddHospital">
            <div className="cursor-pointer rounded-xl border border-gray-200 p-6 transition-all hover:-translate-y-1 hover:border-blue-500 hover:shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">
                Add Hospital
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Add a new hospital to the platform.
              </p>
            </div>
          </Link>

          <Link href="/admin-features/searchHospital">
            <div className="cursor-pointer rounded-xl border border-gray-200 p-6 transition-all hover:-translate-y-1 hover:border-blue-500 hover:shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">
                Search Hospital
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Search and view hospital information.
              </p>
            </div>
          </Link>

          <Link href="/admin-features/getAllHospitals">
            <div className="cursor-pointer rounded-xl border border-gray-200 p-6 transition-all hover:-translate-y-1 hover:border-blue-500 hover:shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">
                View All Hospitals
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Display all registered hospitals.
              </p>
            </div>
          </Link>
          <Link href="/admin-features/statistics">
            <div className="cursor-pointer rounded-xl border border-gray-200 p-6 transition-all hover:-translate-y-1 hover:border-blue-500 hover:shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">
                Dashboard Statistics
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                View total users, doctors, hospitals, and appointments.
              </p>
            </div>
          </Link>
          <div className="cursor-pointer rounded-xl border border-gray-200 p-6 transition-all hover:-translate-y-1 hover:border-blue-500 hover:shadow-md">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer">
              Logout
            </button>
            <p className="mt-2 text-sm text-gray-500">
              Securely logout of your admin account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
