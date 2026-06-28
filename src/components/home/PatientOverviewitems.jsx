"use client";

import { useEffect, useState } from "react";
import {
  FaUserMd,
  FaCalendarCheck,
  FaFileMedical,
  FaStar,
  FaCrown,
} from "react-icons/fa";

export default function PatientOverviewItems() {
  const [stats, setStats] = useState({
    appointments: 0,
    doctors: 0,
    records: 0,
    rating: 0,
  });

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/patient`
    )
      .then((res) => res.json())
      .then((data) => {
        setStats({
          appointments:
            data.appointments || 0,
          doctors:
            data.doctors || 0,
          records:
            data.records || 0,
          rating:
            data.rating || 0,
        });
      })
      .catch((err) =>
        console.log(err)
      );
  }, []);

  const cards = [
    {
      title: "Appointments",
      value: stats.appointments,
      icon: <FaCalendarCheck size={24} />,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      title: "Doctors",
      value: stats.doctors,
      icon: <FaUserMd size={24} />,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "Records",
      value: stats.records,
      icon: <FaFileMedical size={24} />,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      title: "Rating",
      value: stats.rating,
      icon: <FaStar size={24} />,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((item) => (
          <div
            key={item.title}
            className="bg-slate-800 border border-slate-700 rounded-3xl p-6 flex justify-between items-center hover:border-blue-500 transition"
          >
            <div>
              <p className="text-slate-400 text-xs uppercase">
                {item.title}
              </p>

              <h2
                className={`text-4xl font-bold mt-2 ${item.color}`}
              >
                {item.value}
              </h2>
            </div>

            <div
              className={`${item.bg} p-4 rounded-2xl ${item.color}`}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-transparent p-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-2xl font-bold flex items-center gap-2 text-white">
              <FaCrown className="text-yellow-400" />
              Premium Healthcare Plan
            </h3>

            <p className="text-slate-400 mt-3 max-w-2xl">
              Upgrade to Premium and unlock unlimited doctor
              consultations, priority booking, medical history
              access and 24/7 healthcare support.
            </p>
          </div>

          <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-3 rounded-2xl transition">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}