"use client";

import { useEffect, useState } from "react";
import { Users, Stethoscope, Building2, CalendarDays } from "lucide-react";

interface DashboardStats {
  total_users: number;
  total_doctors: number;
  total_hospitals: number;
  total_appointments: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    total_users: 0,
    total_doctors: 0,
    total_hospitals: 0,
    total_appointments: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  async function fetchDashboardStats() {
    try {
      const res = await fetch("/api/admin/statistics");
      const data = await res.json();

      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const cards = [
    {
      title: "Total Users",
      value: stats.total_users,
      icon: Users,
    },
    {
      title: "Total Doctors",
      value: stats.total_doctors,
      icon: Stethoscope,
    },
    {
      title: "Total Hospitals",
      value: stats.total_hospitals,
      icon: Building2,
    },
    {
      title: "Total Appointments",
      value: stats.total_appointments,
      icon: CalendarDays,
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">{error}</div>
    );
  }
  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white rounded-2xl shadow-md border p-6 hover:shadow-lg transition">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">{card.title}</p>

                  <h2 className="text-3xl font-bold mt-2">
                    {card.value.toLocaleString()}
                  </h2>
                </div>

                <div className="bg-blue-100 p-3 rounded-xl">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
