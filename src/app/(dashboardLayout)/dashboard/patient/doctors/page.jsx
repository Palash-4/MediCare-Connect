"use client";

import { useEffect, useState } from "react";
import API_URL from "@/lib/api";
import { FaUserMd, FaStar } from "react-icons/fa";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/doctors`)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center text-white py-20">
        Loading Doctors...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="bg-slate-900 rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-white">
          Available Doctors
        </h1>

        <p className="text-slate-400 mt-2">
          Browse verified doctors
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="bg-slate-900 rounded-3xl p-6 border border-slate-800"
          >
            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
                <FaUserMd size={28} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  {doctor.doctorName}
                </h2>

                <p className="text-cyan-400">
                  {doctor.specialization}
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-2 text-slate-300">

              <p>
                Experience:
                <span className="text-white ml-2">
                  {doctor.experience}
                </span>
              </p>

              <p>
                Fee:
                <span className="text-green-400 ml-2">
                  ৳{doctor.consultationFee}
                </span>
              </p>

              <p>
                Hospital:
                <span className="text-white ml-2">
                  {doctor.hospitalName}
                </span>
              </p>

              <p className="flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                Verified:
                {doctor.verificationStatus}
              </p>

            </div>

            <button className="w-full mt-5 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold text-white">
              Book Appointment
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}