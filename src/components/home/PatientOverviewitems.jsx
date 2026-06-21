"use client";

import {
  FaUserMd,
  FaCalendarCheck,
  FaFileMedical,
  FaStar,
  FaCrown,
} from "react-icons/fa";

export default function PatientOverviewItems() {
  const cards = [
    {
      title: "Appointments",
      value: 3,
      icon: <FaCalendarCheck size={24} />,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      title: "Doctors",
      value: 12,
      icon: <FaUserMd size={24} />,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "Records",
      value: 5,
      icon: <FaFileMedical size={24} />,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      title: "Rating",
      value: "4.9",
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
            className="bg-slate-800 border border-slate-700 rounded-3xl p-6 flex justify-between items-center"
          >
            <div>
              <p className="text-slate-400 text-xs uppercase">
                {item.title}
              </p>

              <h2 className={`text-4xl font-bold mt-2 ${item.color}`}>
                {item.value}
              </h2>
            </div>

            <div className={`${item.bg} p-4 rounded-2xl ${item.color}`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-transparent p-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

          <div>
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <FaCrown className="text-yellow-400" />
              Premium Healthcare Plan
            </h3>

            <p className="text-slate-400 mt-3 max-w-2xl">
              Upgrade to Premium and unlock unlimited doctor
              consultations, priority booking, medical history
              access and 24/7 healthcare support.
            </p>
          </div>

          <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-3 rounded-2xl">
            Upgrade Now
          </button>

        </div>
      </div>

    </div>
  );
}