"use client"
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaHeartbeat } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";


export default function RegisterPage() {
    const onSubmit = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const image = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword =
            e.target.confirmPassword.value;

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const regex =
            /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;

        if (!regex.test(password)) {
            toast.error(
                "Password must contain at least 6 characters, 1 number and 1 special character"
            );
            return;
        }

        const { data, error } =
            await authClient.signUp.email({
                name,
                email,
                password,
                image,
            });

        if (error) {
            toast.error(error.message || "Registration Failed");
            return;
        }

        toast.success("Account Created Successfully");

        e.target.reset();

        console.log(data);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8">

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 flex items-center justify-center">
                        <FaHeartbeat className="text-white text-3xl" />
                    </div>
                </div>

                {/* Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Create Account
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Join MediCare Connect and manage your healthcare easily
                    </p>
                </div>

                <form
                    onSubmit={onSubmit}
                    className="space-y-5"
                >

                    {/* Name */}
                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Photo URL
                        </label>

                        <input
                            type="url"
                            name="photo"
                            placeholder="https://example.com/photo.jpg"
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <div className="mt-2 text-xs text-slate-500 space-y-1">
                            <p>✓ Minimum 6 characters</p>
                            <p>✓ At least 1 number</p>
                            <p>✓ At least 1 special character</p>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                        Create Account
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-slate-300"></div>

                    <span className="text-sm text-slate-500">
                        OR
                    </span>

                    <div className="flex-1 h-px bg-slate-300"></div>
                </div>

                {/* Google Register */}
                <button className="w-full border border-slate-300 dark:border-slate-700 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                    <FcGoogle size={22} />
                    Continue with Google
                </button>

                {/* Login Link */}
                <p className="text-center text-sm text-slate-500 mt-6">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

            </div>
        </div>
    );
}