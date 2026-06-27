"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
  FaCalendarAlt,
  FaUser,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

export default function DocAppointmentPage() {
  const { data: session } = authClient.useSession();

  const [appointments, setAppointments] =
    useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    fetch(
      `http://localhost:5000/api/doctor-appointments/${session.user.email}`
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

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/appointments/status/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        setAppointments((prev) =>
          prev.map((item) =>
            item._id === id
              ? {
                  ...item,
                  appointmentStatus:
                    status,
                }
              : item
          )
        );

        toast.success(
          `Appointment ${status}`
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 rounded-3xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold">
          Appointments
        </h1>

        <p className="mt-2 text-blue-100">
          Manage patient appointments
          and schedule.
        </p>
      </div>

      {/* Empty */}
      {appointments.length === 0 && (
        <div className="bg-slate-900 rounded-3xl p-20 text-center">
          <FaCalendarAlt
            size={70}
            className="mx-auto text-slate-500"
          />

          <h2 className="text-2xl font-bold text-white mt-5">
            No Appointments Yet
          </h2>

          <p className="text-slate-400 mt-2">
            Patients appointments
            will appear here.
          </p>
        </div>
      )}

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6">

        {appointments.map(
          (appointment) => (
            <div
              key={appointment._id}
              className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-5">
                <FaUser
                  className="text-cyan-400"
                  size={28}
                />

                <div>
                  <h2 className="text-white text-xl font-bold">
                    {
                      appointment.patientName
                    }
                  </h2>

                  <p className="text-slate-400">
                    {
                      appointment.patientEmail
                    }
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-slate-300">
                <p>
                  📅 Date:
                  {" "}
                  {
                    appointment.appointmentDate
                  }
                </p>

                <p>
                  🕒 Time:
                  {" "}
                  {
                    appointment.appointmentTime
                  }
                </p>

                <p>
                  🤒 Symptoms:
                  {" "}
                  {
                    appointment.symptoms
                  }
                </p>

                <p>
                  Status:
                  {" "}
                  <span
                    className={`font-semibold ${
                      appointment.appointmentStatus ===
                      "accepted"
                        ? "text-green-400"
                        : appointment.appointmentStatus ===
                          "rejected"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {
                      appointment.appointmentStatus
                    }
                  </span>
                </p>
              </div>

              {appointment.appointmentStatus ===
                "pending" && (
                <div className="flex gap-4 mt-6">

                  <button
                    onClick={() =>
                      updateStatus(
                        appointment._id,
                        "accepted"
                      )
                    }
                    className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
                  >
                    <FaCheck />
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        appointment._id,
                        "rejected"
                      )
                    }
                    className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
                  >
                    <FaTimes />
                    Reject
                  </button>

                </div>
              )}
            </div>
          )
        )}

      </div>
    </div>
  );
}