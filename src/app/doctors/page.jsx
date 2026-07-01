"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FaUserMd, FaStar } from "react-icons/fa";

export default function FindDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] =
    useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/doctors`
    )
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const specializations = [
    ...new Set(
      doctors.map(
        (doctor) =>
          doctor.specialization
      )
    ),
  ];

  const filteredDoctors =
    useMemo(() => {
      let filtered = [...doctors];

      // Search
      if (search) {
        filtered =
          filtered.filter((doctor) =>
            doctor.doctorName
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )
          );
      }

      // Filter
      if (specialization) {
        filtered =
          filtered.filter(
            (doctor) =>
              doctor.specialization ===
              specialization
          );
      }

      // Sort
      if (sort === "fee") {
        filtered.sort(
          (a, b) =>
            a.consultationFee -
            b.consultationFee
        );
      }

      if (
        sort === "experience"
      ) {
        filtered.sort(
          (a, b) =>
            parseInt(
              b.experience
            ) -
            parseInt(
              a.experience
            )
        );
      }

      return filtered;
    }, [
      doctors,
      search,
      specialization,
      sort,
    ]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-100 dark:bg-slate-950">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 bg-slate-100 dark:bg-slate-950 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-5">

        {/* Heading */}

        <h1 className="text-5xl font-bold text-center text-slate-900 dark:text-white">
          Find Doctors
        </h1>

        <p className="text-center text-slate-500 dark:text-slate-400 mt-4">
          Find verified healthcare
          professionals and book
          appointments easily.
        </p>

        {/* Navigation Buttons */}

        <div className="flex justify-center gap-4 mt-10 mb-14">

          <Link href="/">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition">
              🏠 Home
            </button>
          </Link>

        </div>

        {/* Filters */}

        <div className="grid md:grid-cols-3 gap-5 mb-16">

          <input
            type="text"
            placeholder="Search Doctor Name"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              w-full
              px-5
              py-4
              rounded-xl
              border
              border-slate-300
              bg-white
              text-slate-800
              placeholder:text-slate-500
              outline-none
              focus:ring-2
              focus:ring-blue-500
              dark:bg-slate-900
              dark:border-slate-700
              dark:text-white
              dark:placeholder:text-slate-400
            "
          />

          <select
            value={
              specialization
            }
            onChange={(e) =>
              setSpecialization(
                e.target.value
              )
            }
            className="
              w-full
              px-5
              py-4
              rounded-xl
              border
              border-slate-300
              bg-white
              text-slate-800
              dark:bg-slate-900
              dark:border-slate-700
              dark:text-white
            "
          >
            <option value="">
              All Specializations
            </option>

            {specializations.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}
          </select>

          <select
            value={sort}
            onChange={(e) =>
              setSort(
                e.target.value
              )
            }
            className="
              w-full
              px-5
              py-4
              rounded-xl
              border
              border-slate-300
              bg-white
              text-slate-800
              dark:bg-slate-900
              dark:border-slate-700
              dark:text-white
            "
          >
            <option value="">
              Sort By
            </option>

            <option value="fee">
              Consultation Fee
            </option>

            <option value="experience">
              Experience
            </option>
          </select>
        </div>

        {/* Empty State */}

        {filteredDoctors.length ===
          0 && (
          <div className="text-center py-24">

            <FaUserMd
              size={90}
              className="mx-auto text-slate-400"
            />

            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mt-8">
              No Doctors Found
            </h2>

            <p className="text-slate-500 mt-3">
              Try another search
              keyword or
              specialization.
            </p>

            <Link href="/">
              <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl">
                Back To Home
              </button>
            </Link>

          </div>
        )}

        {/* Cards */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {filteredDoctors.map(
            (doctor) => (
              <div
                key={doctor._id}
                className="
                  bg-slate-900
                  rounded-3xl
                  p-8
                  text-white
                  shadow-xl
                  hover:-translate-y-2
                  duration-300
                "
              >

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
                    <div className="
                      w-28
                      h-28
                      rounded-full
                      bg-slate-800
                      flex
                      justify-center
                      items-center
                      border-4
                      border-cyan-400
                    ">
                      <FaUserMd
                        size={45}
                        className="text-cyan-400"
                      />
                    </div>
                  )}

                  <h2 className="text-3xl font-bold mt-6 text-center">
                    {
                      doctor.doctorName
                    }
                  </h2>

                  <p className="text-cyan-400 mt-2">
                    {
                      doctor.specialization
                    }
                  </p>
                </div>

                <div className="mt-8 space-y-4 text-slate-300">

                  <p>
                    Experience :
                    <span className="text-white ml-2">
                      {
                        doctor.experience
                      }{" "}
                      Years
                    </span>
                  </p>

                  <p>
                    Fee :
                    <span className="text-green-400 ml-2">
                      ৳
                      {
                        doctor.consultationFee
                      }
                    </span>
                  </p>

                  <p>
                    Hospital :
                    <span className="text-white ml-2">
                      {
                        doctor.hospitalName
                      }
                    </span>
                  </p>

                  <p className="flex items-center gap-2">
                    <FaStar className="text-yellow-400" />

                    <span>
                      {
                        doctor.verificationStatus
                      }
                    </span>
                  </p>

                </div>

                <Link
                  href={`/doctors/${doctor._id}`}
                >
                  <button className="
                    w-full
                    mt-8
                    bg-blue-600
                    hover:bg-blue-700
                    py-3
                    rounded-xl
                    font-semibold
                    transition
                  ">
                    View Details
                  </button>
                </Link>

              </div>
            )
          )}
        </div>

      </div>

    </div>
  );
}