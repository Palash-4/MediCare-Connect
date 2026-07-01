"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaUserMd,
  FaStar,
} from "react-icons/fa";

export default function FeaturedDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/doctors`
    )
      .then((res) => res.json())
      .then((data) => {
        // শুধু প্রথম 3 জন দেখাবে
        setDoctors(data.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-slate-100 dark:bg-gradient-to-b dark:from-slate-950 dark:via-blue-950 dark:to-slate-950">
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </section>
    );
  }

  return (
    <section
      className="
      py-20
      bg-slate-100
      dark:bg-gradient-to-b
      dark:from-slate-950
      dark:via-blue-950
      dark:to-slate-950
      transition-colors
    "
    >
      <div className="max-w-7xl mx-auto px-5">

        {/* Heading */}

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-900 dark:text-white">
            Featured Doctors
          </h2>

          <p className="mt-4 text-slate-600 dark:text-slate-300 text-lg">
            Meet our experienced and verified
            healthcare professionals.
          </p>
        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="
              bg-white
              dark:bg-slate-900/80
              backdrop-blur-md
              rounded-3xl
              p-8
              shadow-xl
              border
              border-slate-200
              dark:border-slate-800
              hover:-translate-y-3
              duration-300
            "
            >
              {/* Image */}

              <div className="flex flex-col items-center">

                {doctor.profileImage ? (
                  <img
                    src={
                      doctor.profileImage
                    }
                    alt=""
                    className="
                    w-28
                    h-28
                    rounded-full
                    object-cover
                    border-4
                    border-cyan-400
                  "
                  />
                ) : (
                  <div
                    className="
                    w-28
                    h-28
                    rounded-full
                    bg-slate-200
                    dark:bg-slate-800
                    flex
                    justify-center
                    items-center
                    border-4
                    border-cyan-400
                  "
                  >
                    <FaUserMd
                      size={45}
                      className="text-cyan-400"
                    />
                  </div>
                )}

                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-6 text-center">
                  {doctor.doctorName}
                </h3>

                <p className="text-cyan-500 mt-2">
                  {
                    doctor.specialization
                  }
                </p>
              </div>

              {/* Info */}

              <div className="mt-8 space-y-4">

                <p className="text-slate-600 dark:text-slate-300">
                  Experience :
                  <span className="font-semibold ml-2 text-slate-900 dark:text-white">
                    {
                      doctor.experience
                    }
                  </span>
                </p>

                <p className="text-slate-600 dark:text-slate-300">
                  Fee :
                  <span className="font-semibold ml-2 text-green-500">
                    ৳
                    {
                      doctor.consultationFee
                    }
                  </span>
                </p>

                <p className="text-slate-600 dark:text-slate-300">
                  Hospital :
                  <span className="font-semibold ml-2 text-slate-900 dark:text-white">
                    {
                      doctor.hospitalName
                    }
                  </span>
                </p>

                <p className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <FaStar className="text-yellow-400" />

                  <span>
                    {
                      doctor.verificationStatus
                    }
                  </span>
                </p>
              </div>

              {/* Button */}

              <Link
                href={`/doctors/${doctor._id}`}
              >
                <button
                  className="
                  w-full
                  mt-8
                  py-3
                  rounded-2xl
                  bg-blue-600
                  text-white
                  font-semibold
                  hover:bg-blue-700
                  transition
                "
                >
                  View Profile
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Find All Doctors Button */}

        <div className="text-center mt-16">
          <Link href="/doctors">
            <button
              className="
              px-8
              py-4
              rounded-2xl
              bg-blue-600
              text-white
              font-semibold
              hover:bg-blue-700
              transition
            "
            >
              Find All Doctors
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}