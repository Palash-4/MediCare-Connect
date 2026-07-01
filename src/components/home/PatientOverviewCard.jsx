"use client";

import { useEffect, useState } from "react";
import {
  FaUserMd,
  FaCalendarCheck,
  FaMoneyBill,
  FaStar,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export default function PatientOverviewItems() {
  const { data: session } =
    authClient.useSession();

  const [stats, setStats] =
    useState({
      appointments: 0,
      doctors: 0,
      payments: 0,
      reviews: 0,
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!session?.user?.email)
      return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/patient/${session.user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setStats({
          appointments:
            data.totalAppointments ||
            0,
          doctors:
            data.totalDoctors ||
            0,
          payments:
            data.totalPayments ||
            0,
          reviews:
            data.totalReviews ||
            0,
        });

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [session]);

  const cards = [
    {
      title:
        "Upcoming Appointments",
      value:
        stats.appointments,
      icon: (
        <FaCalendarCheck
          size={24}
        />
      ),
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      title:
        "Favorite Doctors",
      value: stats.doctors,
      icon: (
        <FaUserMd size={24} />
      ),
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title:
        "Total Payments",
      value:
        stats.payments,
      icon: (
        <FaMoneyBill
          size={24}
        />
      ),
      color:
        "text-purple-400",
      bg:
        "bg-purple-500/10",
    },
    {
      title: "My Reviews",
      value:
        stats.reviews,
      icon: (
        <FaStar size={24} />
      ),
      color:
        "text-yellow-400",
      bg:
        "bg-yellow-500/10",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((item) => (
        <div
          key={item.title}
          className="
            bg-slate-800
            border border-slate-700
            rounded-3xl
            p-6
            flex justify-between items-center
            hover:border-blue-500
            hover:-translate-y-1
            transition
          "
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
  );
}