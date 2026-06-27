"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  FaUserInjured,
  FaEnvelope,
  FaCalendarAlt,
} from "react-icons/fa";

export default function DocPatientsPage() {
  const { data: session } =
    authClient.useSession();

  const [patients, setPatients] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    fetch(
      `http://localhost:5000/api/doctor-patients/${session.user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPatients(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [session]);

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
          My Patients
        </h1>

        <p className="mt-2 text-blue-100">
          Manage all patients who booked
          appointments with you.
        </p>
      </div>

      {/* Empty State */}
      {patients.length === 0 && (
        <div className="bg-slate-900 rounded-3xl p-20 text-center">
          <FaUserInjured
            size={70}
            className="mx-auto text-slate-500"
          />

          <h2 className="text-2xl text-white font-bold mt-5">
            No Patients Found
          </h2>

          <p className="text-slate-400 mt-2">
            Patient information will appear
            here after appointments.
          </p>
        </div>
      )}

      {/* Patient Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {patients.map((patient) => (
          <div
            key={patient._id}
            className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-14 h-14 rounded-full bg-cyan-500 flex items-center justify-center">
                <FaUserInjured
                  className="text-white"
                  size={25}
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  {patient.patientName}
                </h2>

                <p className="text-slate-400">
                  Patient
                </p>
              </div>
            </div>

            <div className="space-y-3 text-slate-300">

              <p className="flex items-center gap-3">
                <FaEnvelope className="text-cyan-400" />
                {patient.patientEmail}
              </p>

              <p className="flex items-center gap-3">
                <FaCalendarAlt className="text-green-400" />
                {patient.appointmentDate}
              </p>

              <p>
                🕒 {patient.appointmentTime}
              </p>

              <p>
                🤒 Symptoms:
                {" "}
                {patient.symptoms}
              </p>

              <p>
                Status:
                {" "}
                <span
                  className={`font-semibold ${
                    patient.appointmentStatus ===
                    "accepted"
                      ? "text-green-400"
                      : patient.appointmentStatus ===
                        "rejected"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {
                    patient.appointmentStatus
                  }
                </span>
              </p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}