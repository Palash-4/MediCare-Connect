"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  FaUserMd,
  FaHospital,
  FaMoneyBill,
  FaClock,
  FaHome,
  FaArrowLeft,
} from "react-icons/fa";

export default function DoctorDetails() {
  const { id } = useParams();

  const { data: session } =
    authClient.useSession();

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
      <div className="min-h-screen flex justify-center items-center bg-slate-100 dark:bg-slate-950">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  if (!doctor?._id) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-950">

        <FaUserMd
          size={90}
          className="text-slate-400"
        />

        <h1 className="text-5xl font-bold text-slate-900 dark:text-white mt-8">
          Doctor Not Found
        </h1>

        <p className="text-slate-500 mt-3">
          The doctor information
          could not be found.
        </p>

        <Link href="/doctors">
          <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl">
            Back To Doctors
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 dark:bg-slate-950 min-h-screen py-20 transition-colors duration-300">

      <div className="max-w-6xl mx-auto px-5">

        {/* Navigation */}

        <div className="flex flex-wrap gap-4 justify-center mb-10">

          <Link href="/">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl">
              <FaHome />
              Home
            </button>
          </Link>

          <Link href="/doctors">
            <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-xl">
              <FaArrowLeft />
              Back To Doctors
            </button>
          </Link>

        </div>

        {/* Card */}

        <div className="bg-slate-900 rounded-3xl p-10 text-white shadow-2xl">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Image */}

            <div className="flex justify-center">

              {doctor.profileImage ? (
                <img
                  src={
                    doctor.profileImage
                  }
                  alt={
                    doctor.doctorName
                  }
                  className="
                    w-72
                    h-72
                    rounded-3xl
                    object-cover
                    border-4
                    border-cyan-400
                  "
                />
              ) : (
                <div className="
                  w-72
                  h-72
                  rounded-3xl
                  bg-slate-800
                  flex
                  justify-center
                  items-center
                ">
                  <FaUserMd
                    size={120}
                    className="text-cyan-400"
                  />
                </div>
              )}

            </div>

            {/* Information */}

            <div>

              <h1 className="text-5xl font-bold">
                {
                  doctor.doctorName
                }
              </h1>

              <p className="text-cyan-400 text-2xl mt-4">
                {
                  doctor.specialization
                }
              </p>

              <div className="space-y-6 mt-10">

                <p className="flex items-center gap-3 text-xl">
                  <FaClock />
                  Experience :
                  <span>
                    {
                      doctor.experience
                    }{" "}
                    Years
                  </span>
                </p>

                <p className="flex items-center gap-3 text-xl">
                  <FaHospital />
                  Hospital :
                  <span>
                    {
                      doctor.hospitalName
                    }
                  </span>
                </p>

                <p className="flex items-center gap-3 text-xl">
                  <FaMoneyBill />
                  Consultation Fee :
                  <span className="text-green-400 font-bold">
                    ৳
                    {
                      doctor.consultationFee
                    }
                  </span>
                </p>

                <p className="text-xl">
                  Qualification :
                  <span className="text-cyan-400 ml-2">
                    {
                      doctor.qualifications ||
                      "Not Added"
                    }
                  </span>
                </p>

                <p className="text-xl">
                  Status :
                  <span className="text-green-400 ml-2 capitalize">
                    {
                      doctor.verificationStatus
                    }
                  </span>
                </p>

              </div>

              {/* Buttons */}

              <div className="flex flex-wrap gap-4 mt-12">

                <Link href="/doctors">
                  <button className="bg-slate-700 hover:bg-slate-800 px-8 py-3 rounded-xl">
                    Back
                  </button>
                </Link>

                {!session ? (
                  <Link
                    href={`/register?redirect=/doctors/${doctor._id}`}
                  >
                    <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl">
                      Register To Book
                    </button>
                  </Link>
                ) : (
                  <Link
                    href={`/dashboard/patient/doctors?doctorId=${doctor._id}`}
                  >
                    <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl">
                      Book Appointment
                    </button>
                  </Link>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}