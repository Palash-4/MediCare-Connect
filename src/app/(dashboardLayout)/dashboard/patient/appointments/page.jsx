"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
  FaCalendarAlt,
  FaClock,
  FaUserMd,
} from "react-icons/fa";

export default function AppointmentPage() {
  const { data: session } =
    authClient.useSession();

  const [appointments, setAppointments] =
    useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/${session.user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [session]);

  const handleCancel = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success(
          "Appointment Cancelled"
        );

        setAppointments(
          appointments.filter(
            (item) => item._id !== id
          )
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Something went wrong"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const pending =
    appointments.filter(
      (item) =>
        item.appointmentStatus ===
        "pending"
    ).length;

  const accepted =
    appointments.filter(
      (item) =>
        item.appointmentStatus ===
        "accepted"
    ).length;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-slate-900 rounded-3xl p-8 shadow-xl">
        <h1 className="text-4xl font-bold text-white">
          My Appointments
        </h1>

        <p className="text-slate-400 mt-2">
          View and manage your
          appointments
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-slate-900 rounded-3xl p-6">
          <h2 className="text-slate-400">
            Total Appointments
          </h2>

          <p className="text-4xl font-bold text-white mt-3">
            {appointments.length}
          </p>
        </div>

        <div className="bg-slate-900 rounded-3xl p-6">
          <h2 className="text-slate-400">
            Pending
          </h2>

          <p className="text-4xl font-bold text-yellow-400 mt-3">
            {pending}
          </p>
        </div>

        <div className="bg-slate-900 rounded-3xl p-6">
          <h2 className="text-slate-400">
            Accepted
          </h2>

          <p className="text-4xl font-bold text-green-400 mt-3">
            {accepted}
          </p>
        </div>

      </div>

      {/* Appointment List */}
      {appointments.length === 0 ? (
        <div className="bg-slate-900 rounded-3xl p-16 text-center">
          <h2 className="text-2xl text-white">
            No Appointments Found
          </h2>

          <p className="text-slate-400 mt-3">
            Book an appointment with a
            doctor.
          </p>
        </div>
      ) : (
        <div className="space-y-5">

          {appointments.map(
            (
              appointment,
              index
            ) => (
              <div
                key={
                  appointment._id
                }
                className="bg-slate-900 rounded-3xl p-6 border border-slate-800 hover:border-blue-500 transition"
              >
                <div className="grid md:grid-cols-7 gap-6 items-center">

                  {/* Serial */}
                  <div>
                    <p className="text-slate-500 text-sm">
                      Appointment
                    </p>

                    <h2 className="text-3xl font-bold text-white">
                      #
                      {index + 1}
                    </h2>
                  </div>

                  {/* Doctor */}
                  <div>
                    <p className="text-slate-500 text-sm mb-2">
                      Doctor
                    </p>

                    <div className="flex items-center gap-2">
                      <FaUserMd className="text-cyan-400" />

                      <span className="text-white font-semibold">
                        {
                          appointment.doctorName
                        }
                      </span>
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <p className="text-slate-500 text-sm mb-2">
                      Date
                    </p>

                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-400" />

                      <span className="text-white">
                        {
                          appointment.appointmentDate
                        }
                      </span>
                    </div>
                  </div>

                  {/* Time */}
                  <div>
                    <p className="text-slate-500 text-sm mb-2">
                      Time
                    </p>

                    <div className="flex items-center gap-2">
                      <FaClock className="text-green-400" />

                      <span className="text-white">
                        {
                          appointment.appointmentTime
                        }
                      </span>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <p className="text-slate-500 text-sm mb-2">
                      Status
                    </p>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${appointment.appointmentStatus ===
                          "accepted"
                          ? "bg-green-500/20 text-green-400"
                          : appointment.appointmentStatus ===
                            "rejected"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                    >
                      {
                        appointment.appointmentStatus
                      }
                    </span>
                  </div>

                  {/* Payment */}
                  <div>
                    <p className="text-slate-500 text-sm mb-2">
                      Payment
                    </p>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${appointment.paymentStatus ===
                          "paid"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-gray-500/20 text-gray-400"
                        }`}
                    >
                      {
                        appointment.paymentStatus
                      }
                    </span>
                  </div>

                  {/* Action */}
                  <div>
                    <button
                      onClick={() =>
                        handleCancel(
                          appointment._id
                        )
                      }
                      className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl text-white font-semibold transition"
                    >
                      Cancel
                    </button>
                  </div>

                </div>
              </div>
            )
          )}

        </div>
      )}
    </div>
  );
}