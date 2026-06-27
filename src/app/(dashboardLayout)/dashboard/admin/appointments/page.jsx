"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaCalendarCheck,
  FaTrash,
} from "react-icons/fa";

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] =
    useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  // ==========================
  // Fetch Appointments
  // ==========================
  const fetchAppointments =
    async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/appointments`
        );

        const data =
          await res.json();

        setAppointments(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

  // ==========================
  // Delete Appointment
  // ==========================
  const handleDelete =
    async (id) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/appointments/${id}`,
          {
            method: "DELETE",
          }
        );

        const data =
          await res.json();

        if (
          data.deletedCount > 0
        ) {
          toast.success(
            "Appointment Deleted"
          );

          setAppointments(
            appointments.filter(
              (item) =>
                item._id !== id
            )
          );
        }
      } catch (error) {
        console.log(error);
        toast.error(
          "Delete Failed"
        );
      }
    };

  // ==========================
  // Loading
  // ==========================
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-3xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold">
          Manage Appointments
        </h1>

        <p className="mt-3 text-blue-100">
          View and monitor all
          appointments
        </p>
      </div>

      {/* Empty State */}
      {appointments.length ===
        0 && (
        <div className="bg-slate-900 rounded-3xl p-20 text-center">
          <FaCalendarCheck
            size={70}
            className="mx-auto text-slate-600"
          />

          <h2 className="text-3xl text-white font-bold mt-6">
            No Appointments Found
          </h2>

          <p className="text-slate-400 mt-3">
            No appointments are
            available right now.
          </p>
        </div>
      )}

      {/* Table */}
      {appointments.length >
        0 && (
        <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">
              <thead className="border-b border-slate-800">
                <tr className="text-slate-300">
                  <th className="text-left px-6 py-5">
                    #
                  </th>

                  <th className="text-left px-6 py-5">
                    Patient
                  </th>

                  <th className="text-left px-6 py-5">
                    Doctor
                  </th>

                  <th className="text-left px-6 py-5">
                    Date
                  </th>

                  <th className="text-left px-6 py-5">
                    Time
                  </th>

                  <th className="text-left px-6 py-5">
                    Status
                  </th>

                  <th className="text-left px-6 py-5">
                    Payment
                  </th>

                  <th className="text-center px-6 py-5">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {appointments.map(
                  (
                    appointment,
                    index
                  ) => (
                    <tr
                      key={
                        appointment._id
                      }
                      className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                    >
                      <td className="px-6 py-5 text-white font-semibold">
                        {index + 1}
                      </td>

                      <td className="px-6 py-5">
                        <div>
                          <h3 className="text-white font-semibold">
                            {appointment.patientName ||
                              "Unknown"}
                          </h3>

                          <p className="text-slate-400 text-sm">
                            Patient
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-white">
                        {
                          appointment.doctorName
                        }
                      </td>

                      <td className="px-6 py-5 text-slate-300">
                        {
                          appointment.appointmentDate
                        }
                      </td>

                      <td className="px-6 py-5 text-slate-300">
                        {
                          appointment.appointmentTime
                        }
                      </td>

                      {/* Appointment Status */}
                      <td className="px-6 py-5">
                        <span
                          className={`px-4 py-2 rounded-full text-xs font-bold
                        ${
                          appointment.appointmentStatus ===
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
                      </td>

                      {/* Payment Status */}
                      <td className="px-6 py-5">
                        <span
                          className={`px-4 py-2 rounded-full text-xs font-bold
                        ${
                          appointment.paymentStatus ===
                          "paid"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-slate-700 text-slate-300"
                        }`}
                        >
                          {
                            appointment.paymentStatus
                          }
                        </span>
                      </td>

                      {/* Delete */}
                      <td className="px-6 py-5 text-center">
                        <button
                          onClick={() =>
                            handleDelete(
                              appointment._id
                            )
                          }
                          className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl text-white font-semibold flex items-center gap-2 mx-auto transition"
                        >
                          <FaTrash />

                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}