"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  FaUserInjured,
  FaCalendarCheck,
  FaStar,
} from "react-icons/fa";

export default function DoctorOverview() {
  const { data: session } = authClient.useSession();

  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    averageRating: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    fetch(
      `http://localhost:5000/api/dashboard/doctor/${session.user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [session]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!session) {
  return (
    <div className="flex justify-center py-20">
      Loading...
    </div>
  );
}

  return (
    <div className="space-y-8">

      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 rounded-3xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold">
          Welcome Dr. {session?.user?.name}
        </h1>

        <p className="mt-3 text-blue-100">
          Manage appointments, patients and
          healthcare services efficiently.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-800">
          <FaUserInjured
            size={42}
            className="text-cyan-400"
          />

          <h2 className="text-4xl font-bold text-white mt-4">
            {stats.totalPatients}
          </h2>

          <p className="text-slate-400 mt-2">
            Total Patients
          </p>
        </div>

        <div className="bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-800">
          <FaCalendarCheck
            size={42}
            className="text-green-400"
          />

          <h2 className="text-4xl font-bold text-white mt-4">
            {stats.todayAppointments}
          </h2>

          <p className="text-slate-400 mt-2">
            Today's Appointments
          </p>
        </div>

        <div className="bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-800">
          <FaStar
            size={42}
            className="text-yellow-400"
          />

          <h2 className="text-4xl font-bold text-white mt-4">
            {stats.averageRating}
          </h2>

          <p className="text-slate-400 mt-2">
            Average Rating
          </p>
        </div>

      </div>

      {/* Quick Info */}
      <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-4">
          Doctor Dashboard
        </h2>

        <p className="text-slate-400">
          View appointments, manage patients,
          update your profile and monitor
          reviews from patients.
        </p>
      </div>

    </div>
  );
}