"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    FaTrash,
    FaUserSlash,
} from "react-icons/fa";

export default function ManageUsersPage() {
    const [users, setUsers] = useState([]);

    const API_URL =
        process.env.NEXT_PUBLIC_API_URL;
    useEffect(() => {
        fetch(`${API_URL}/api/users`)
            .then((res) => res.json())
            .then((data) => {
                const validUsers = data.filter(
                    (item) => item.email
                );

                setUsers(validUsers);
            });
    }, []);

    // ==========================
    // Suspend User
    // ==========================
    const handleSuspend = async (id) => {
        try {
            const res = await fetch(
                `${API_URL}/api/users/status/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        status: "suspended",
                    }),
                }
            );

            const data = await res.json();

            if (data.modifiedCount > 0) {
                toast.success(
                    "User Suspended"
                );

                setUsers((prev) =>
                    prev.map((user) =>
                        user._id === id
                            ? {
                                ...user,
                                status:
                                    "suspended",
                            }
                            : user
                    )
                );
            }
        } catch (error) {
            console.log(error);
            toast.error(
                "Failed To Suspend"
            );
        }
    };

    // ==========================
    // Delete User
    // ==========================
    const handleDelete = async (id) => {
        try {
            const res = await fetch(
                `${API_URL}/api/users/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (data.deletedCount > 0) {
                toast.success(
                    "User Deleted"
                );

                setUsers((prev) =>
                    prev.filter(
                        (user) => user._id !== id
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

    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 rounded-3xl p-8 text-white shadow-xl">
                <h1 className="text-4xl font-bold">
                    Manage Users
                </h1>

                <p className="mt-3 text-blue-100">
                    View, suspend and remove users.
                </p>
            </div>

            {/* Users */}
            <div className="space-y-5">

                {users.map(
                    (user, index) => (
                        <div
                            key={user._id}
                            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg"
                        >
                            <div className="grid lg:grid-cols-[2fr_1fr_2fr] gap-8 items-center">

                                {/* User Info */}
                                <div className="flex items-center gap-5">

                                    <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
                                        {index + 1}
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-bold text-white">
                                            {user.name ||
                                                "No Name"}
                                        </h2>

                                        <p className="text-slate-400 break-all">
                                            {user.email}
                                        </p>
                                    </div>

                                </div>

                                {/* Status */}
                                <div>
                                    <p className="text-slate-400 text-sm mb-2">
                                        Status
                                    </p>

                                    <span
                                        className={`px-4 py-2 rounded-full text-sm font-semibold
                    ${user.status ===
                                                "suspended"
                                                ? "bg-red-500/20 text-red-400"
                                                : "bg-green-500/20 text-green-400"
                                            }`}
                                    >
                                        {user.status ||
                                            "active"}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 justify-end">

                                    <button
                                        onClick={() =>
                                            handleSuspend(
                                                user._id
                                            )
                                        }
                                        disabled={
                                            user.status ===
                                            "suspended"
                                        }
                                        className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-slate-700 disabled:text-slate-500 text-black px-5 py-3 rounded-xl flex items-center gap-2 transition font-semibold"
                                    >
                                        <FaUserSlash />

                                        Suspend
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                user._id
                                            )
                                        }
                                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition"
                                    >
                                        <FaTrash />

                                        Delete
                                    </button>

                                </div>

                            </div>
                        </div>
                    )
                )}

                {users.length === 0 && (
                    <div className="bg-slate-900 rounded-3xl p-20 text-center">
                        <h2 className="text-3xl font-bold text-white">
                            No Users Found
                        </h2>

                        <p className="text-slate-400 mt-3">
                            No registered users available.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
}