"use client";

import { useEffect, useMemo, useState } from "react";
import { FaUserMd, FaStar } from "react-icons/fa";
import Link from "next/link";

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

            // Search by Name
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

            // Filter by Specialization
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
                        b.experience -
                        a.experience
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
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }



    return (
        <div className="bg-slate-100 min-h-screen py-20">

            <div className="max-w-7xl mx-auto px-5">

                {/* Heading */}

                <h1 className="text-5xl font-bold text-center mb-14">
                    Find Doctors
                </h1>

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
                        className="w-full px-5 py-4 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full px-5 py-4 rounded-xl border border-slate-300"
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
                        className="w-full px-5 py-4 rounded-xl border border-slate-300"
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
                                size={80}
                                className="mx-auto text-slate-400"
                            />

                            <h2 className="text-3xl font-bold mt-6">
                                No Doctors Found
                            </h2>

                            <p className="text-slate-500 mt-2">
                                Try different
                                search or filters
                            </p>
                        </div>
                    )}

                {/* Cards */}

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                    {filteredDoctors.map((doctor) => (
                        <div
                            key={doctor._id}
                            className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl hover:-translate-y-2 duration-300"
                        >
                            {console.log("Doctor =", doctor)}
                            {console.log("ID =", doctor._id)}


                            <div className="flex flex-col items-center">

                                {doctor.profileImage ? (
                                    <img
                                        src={
                                            doctor.profileImage
                                        }
                                        alt=""
                                        className="w-28 h-28 rounded-full object-cover border-4 border-cyan-400"
                                    />
                                ) : (
                                    <div className="w-28 h-28 rounded-full bg-slate-800 flex justify-center items-center border-4 border-cyan-400">
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

                                <button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition">
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