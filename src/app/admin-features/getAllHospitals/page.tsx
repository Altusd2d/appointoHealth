"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Hospital {
  id: number;
  name: string;
  location: string;
  gmail: string;
  phone: string;
}

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteHospitalId, setDeleteHospitalId] = useState<number | null>(null);
  const handleDelete = async (hospital: string) => {
  try {
    const res = await fetch("/api/admin/delHospital", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hospital,
      }),
    });

    const data = await res.json();
    console.log(data)
    if (!res.ok) {
      throw new Error(data.message || "Failed to delete hospital");
    }

    setHospitals((prev) =>
      prev.filter((hos) => hos.name !== hospital)
    );

    setDeleteHospitalId(null);

    alert("Hospital deleted successfully");
  } catch (error: any) {
    alert(error.message || "Something went wrong");
  }
};
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await fetch("/api/admin/getAllHospitals");

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch hospitals");
        }

        setHospitals(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        {/* <h1>Loading</h1> */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto mt-20 max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center">
        <h2 className="text-lg font-semibold text-red-600">Error</h2>
        <p className="mt-2 text-gray-600">{error}</p>
      </div>
    );
  }

  if (hospitals.length === 0) {
    return (
      <div className="mx-auto mt-20 max-w-md rounded-xl bg-white p-8 text-center shadow">
        <h2 className="text-xl font-bold">No Hospitals Found</h2>
        <p className="mt-2 text-gray-500">
          There are currently no hospitals available.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hospitals</h1>
            <p className="mt-1 text-gray-500">
              Total Hospitals: {hospitals.length}
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="rounded-2xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="flex justify-between">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                  {hospital.name?.charAt(0)}
                </div>

                {  deleteHospitalId !== hospital.id &&(
                       <button
                  onClick={() => setDeleteHospitalId(hospital.id)}
                  className="bg-red-600 w-fit h-8 rounded-lg px-1.5 cursor-pointer text-white">
                  Delete Hospital
                </button>
                )
                    
                }

                {deleteHospitalId === hospital.id && (
                  <div className="mt-2 rounded-lg border border-red-200 bg-red-50 p-3 ml-14">
                    <p className="text-gray-600">
                      Are you sure you want to delete{" "}
                      <span className="font-semibold text-red-600">
                        {hospital.name}
                      </span>
                      ?
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      This action cannot be undone.
                    </p>

                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => handleDelete(hospital.name)}
                        className="rounded bg-red-600 px-3 py-1 text-white cursor-pointer">
                        Yes, Delete
                      </button>

                      <button
                        onClick={() => setDeleteHospitalId(null)}
                        className="rounded bg-gray-500 px-3 py-1 text-white cursor-pointer">
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <h2 className="mb-2 text-xl font-semibold text-gray-900">
                {hospital.name}
              </h2>

              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {hospital.location || "N/A"}
                </p>

                <p>
                  <span className="font-medium">Gmail:</span>{" "}
                  {hospital.gmail || "N/A"}
                </p>

                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {hospital.phone || "N/A"}
                </p>
              </div>

              {/* <button className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
                View Details
              </button> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
