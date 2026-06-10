"use client";

import { useState } from "react";

export default function HospitalSearch() {
  const [hospital, setHospital] = useState("");
  const [requirement, setRequirement] = useState("doctors");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/getAppoinmentOrDoctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hospital,
          require: requirement,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        alert(data.message);
        return;
      }

      setResults(data.message);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">
          Search Healthcare Services
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search hospital..."
            value={hospital}
            onChange={(e) => setHospital(e.target.value)}
            className="flex-1 px-4 py-3 border rounded-lg"
          />

          <select
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            className="px-4 py-3 border rounded-lg">
            <option value="doctors">Doctors</option>
            <option value="appointments">Appointments</option>
          </select>

          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg">
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        <div className="mt-8">
          {results.length > 0 ? (
            <>
              <h3 className="text-xl font-semibold mb-4">
                {requirement === "doctors" ? "Doctors" : "Appointments"}
              </h3>

              <div className="grid gap-4">
                {results.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-lg p-4 shadow-sm">
                    {requirement === "doctors" ? (
                      <>
                        <span className=" text-lg">Name: {item.name}</span>
                        {/* </div> */}
                        <p>Education: {item.education}</p>
                        <p>Years of Experience: {item.experience}</p>
                        <p>specialist: {item.specialist}</p>
                      </>
                    ) : (
                      <>
                        <p>Appointment ID: {item.id}</p>
                        <p>Status: {item.status}</p>
                        <p>Date: {item.date}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            !loading &&
            hospital && (
              <div className="text-center py-10">
                <p className="text-gray-500 text-lg font-medium">
                  {requirement === "doctors"
                    ? "No Doctors Found"
                    : "No Appointments Found"}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
