"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaUserMd,
  FaHospital,
  FaMoneyBill,
  FaClock,
} from "react-icons/fa";

export default function DoctorDetails() {
  const { id } = useParams();

  const [doctor, setDoctor] =
    useState(null);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/doctors/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setDoctor(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!doctor?._id) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold mb-5">
          Doctor Not Found
        </h1>

        <Link href="/doctors">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-xl">
            Back To Doctors
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-5">

        <div className="bg-slate-900 rounded-3xl p-10 text-white">

          <div className="grid lg:grid-cols-2 gap-12">

            <div className="flex justify-center">
              {doctor.profileImage ? (
                <img
                  src={doctor.profileImage}
                  alt=""
                  className="w-72 h-72 rounded-3xl object-cover border-4 border-cyan-400"
                />
              ) : (
                <div className="w-72 h-72 rounded-3xl bg-slate-800 flex justify-center items-center">
                  <FaUserMd
                    size={120}
                    className="text-cyan-400"
                  />
                </div>
              )}
            </div>

            <div>

              <h1 className="text-5xl font-bold">
                {doctor.doctorName}
              </h1>

              <p className="text-cyan-400 text-2xl mt-4">
                {doctor.specialization}
              </p>

              <div className="space-y-5 mt-10">

                <p className="flex items-center gap-3 text-xl">
                  <FaClock />
                  Experience:
                  {doctor.experience}
                </p>

                <p className="flex items-center gap-3 text-xl">
                  <FaHospital />
                  Hospital:
                  {doctor.hospitalName}
                </p>

                <p className="flex items-center gap-3 text-xl">
                  <FaMoneyBill />
                  Fee:
                  ৳
                  {
                    doctor.consultationFee
                  }
                </p>

                <p className="text-xl">
                  Qualification:
                  <span className="text-cyan-400 ml-2">
                    {
                      doctor.qualifications
                    }
                  </span>
                </p>

                <p className="text-xl">
                  Status:
                  <span className="text-green-400 ml-2">
                    {
                      doctor.verificationStatus
                    }
                  </span>
                </p>

              </div>

              <div className="flex gap-4 mt-12">

                <Link href="/doctors">
                  <button className="bg-slate-700 px-8 py-3 rounded-xl">
                    Back
                  </button>
                </Link>

                <Link href="/dashboard/patient/doctors">
                  <button className="bg-blue-600 px-8 py-3 rounded-xl">
                    Book Appointment
                  </button>
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}