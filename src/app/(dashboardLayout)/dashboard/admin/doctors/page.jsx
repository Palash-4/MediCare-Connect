"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import {
    FaUserMd,
    FaHospital,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
} from "react-icons/fa";

export default function AdminDoctorsPage() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDoctors();
    }, []);

    // ==========================
    // Fetch Doctors
    // ==========================
    const fetchDoctors = async () => {
        try {
            const res = await fetch(
                "http://localhost:5000/api/doctors"
            );

            const data = await res.json();

            setDoctors(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // ==========================
    // Update Status
    // ==========================
    const handleStatus = async (
        id,
        status
    ) => {
        try {
            const res = await fetch(
                `http://localhost:5000/api/doctors/status/${id}`,
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
                toast.success(
                    `Doctor ${status}`
                );

                setDoctors((prev) =>
                    prev.map((doctor) =>
                        doctor._id === id
                            ? {
                                ...doctor,
                                verificationStatus:
                                    status,
                            }
                            : doctor
                    )
                );
            }
        } catch (error) {
            console.log(error);
            toast.error(
                "Operation Failed"
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
                    Manage Doctors
                </h1>

                <p className="mt-3 text-blue-100">
                    View, verify and manage
                    registered doctors
                </p>
            </div>

            {/* Empty State */}
            {doctors.length === 0 && (
                <div className="bg-slate-900 rounded-3xl p-20 text-center">
                    <FaUserMd
                        size={70}
                        className="mx-auto text-slate-600"
                    />

                    <h2 className="text-3xl font-bold text-white mt-6">
                        No Doctors Found
                    </h2>

                    <p className="text-slate-400 mt-3">
                        No doctors available.
                    </p>
                </div>
            )}

            {/* Doctors */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {doctors.map(
                    (doctor, index) => (
                        <div
                            key={doctor._id}
                            className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl hover:border-blue-500 transition-all duration-300"
                        >
                            {/* Top */}
                            <div className="flex items-center gap-4">
                                <Image
                                    src={
                                        doctor.profileImage ||
                                        "https://i.ibb.co/fd5qCY7/avatar.png"
                                    }
                                    alt="doctor"
                                    width={80}
                                    height={80}
                                    className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
                                />

                                <div>
                                    <p className="text-sm text-slate-500">
                                        Doctor #
                                        {index + 1}
                                    </p>

                                    <h2 className="text-xl font-bold text-white">
                                        {
                                            doctor.doctorName
                                        }
                                    </h2>

                                    <p className="text-cyan-400">
                                        {
                                            doctor.specialization
                                        }
                                    </p>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="space-y-3 mt-6">
                                <div className="flex items-center gap-2 text-slate-300">
                                    <FaHospital className="text-cyan-400" />

                                    <span>
                                        {
                                            doctor.hospitalName
                                        }
                                    </span>
                                </div>

                                <p className="text-slate-300">
                                    Consultation Fee:
                                    <span className="text-green-400 font-bold ml-2">
                                        ৳
                                        {
                                            doctor.consultationFee
                                        }
                                    </span>
                                </p>

                                {/* Status */}
                                <div className="flex items-center gap-2">
                                    {doctor.verificationStatus ===
                                        "verified" ? (
                                        <>
                                            <FaCheckCircle className="text-green-400" />

                                            <span className="text-green-400 font-semibold">
                                                Verified
                                            </span>
                                        </>
                                    ) : doctor.verificationStatus ===
                                        "rejected" ? (
                                        <>
                                            <FaTimesCircle className="text-red-400" />

                                            <span className="text-red-400 font-semibold">
                                                Rejected
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <FaClock className="text-yellow-400" />

                                            <span className="text-yellow-400 font-semibold">
                                                Pending
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-6 flex gap-3">
                                <button
                                    onClick={() =>
                                        handleStatus(
                                            doctor._id,
                                            "verified"
                                        )
                                    }
                                    disabled={
                                        doctor.verificationStatus ===
                                        "verified"
                                    }
                                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-900 disabled:opacity-60 py-3 rounded-2xl text-white font-semibold transition"
                                >
                                    Verify
                                </button>

                                <button
                                    onClick={() =>
                                        handleStatus(
                                            doctor._id,
                                            "rejected"
                                        )
                                    }
                                    disabled={
                                        doctor.verificationStatus ===
                                        "rejected"
                                    }
                                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-900 disabled:opacity-60 py-3 rounded-2xl text-white font-semibold transition"
                                >
                                    Reject
                                </button>

                                <button
                                    onClick={() =>
                                        handleStatus(
                                            doctor._id,
                                            "pending"
                                        )
                                    }
                                    disabled={
                                        doctor.verificationStatus ===
                                        "pending"
                                    }
                                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-900 disabled:opacity-60 py-3 rounded-2xl text-black font-semibold transition"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}