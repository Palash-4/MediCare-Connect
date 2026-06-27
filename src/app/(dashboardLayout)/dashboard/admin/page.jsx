"use client";

import { useEffect, useState } from "react";
import {
  FaUserMd,
  FaUser,
  FaCalendarCheck,
  FaMoneyBill,
} from "react-icons/fa";

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0,
    totalPayments: 0,
  });

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/admin`
    )
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 text-white">
        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-3 text-blue-100">
          Manage users, doctors and
          appointments.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-slate-900 p-6 rounded-3xl">
          <FaUserMd
            size={35}
            className="text-cyan-400"
          />

          <h2 className="text-4xl text-white font-bold mt-4">
            {stats.totalDoctors}
          </h2>

          <p className="text-slate-400">
            Total Doctors
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl">
          <FaUser
            size={35}
            className="text-green-400"
          />

          <h2 className="text-4xl text-white font-bold mt-4">
            {stats.totalPatients}
          </h2>

          <p className="text-slate-400">
            Total Patients
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl">
          <FaCalendarCheck
            size={35}
            className="text-yellow-400"
          />

          <h2 className="text-4xl text-white font-bold mt-4">
            {stats.totalAppointments}
          </h2>

          <p className="text-slate-400">
            Appointments
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl">
          <FaMoneyBill
            size={35}
            className="text-blue-400"
          />

          <h2 className="text-4xl text-white font-bold mt-4">
            {stats.totalPayments}
          </h2>

          <p className="text-slate-400">
            Payments
          </p>
        </div>

      </div>
    </div>
  );
}