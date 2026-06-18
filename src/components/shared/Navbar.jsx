"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { FaHeartbeat, FaUserCircle } from "react-icons/fa";

import {
  FiMenu,
  FiX,
  FiSearch,
  FiMoon,
  FiSun,
} from "react-icons/fi";

import {
  MdDashboard,
  MdLogout,
} from "react-icons/md";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Temporary User Data
  const user = true;
  const role = "Patient";

  const navLinks = (
    <>
      <Link
        href="/"
        className="hover:text-blue-600 transition duration-200"
      >
        Home
      </Link>

      <Link
        href="/doctors"
        className="hover:text-blue-600 transition duration-200"
      >
        Find Doctors
      </Link>

      <Link
        href="/about"
        className="hover:text-blue-600 transition duration-200"
      >
        About Us
      </Link>

      <Link
        href="/contact"
        className="hover:text-blue-600 transition duration-200"
      >
        Contact Us
      </Link>

      {user && (
        <Link
          href="/dashboard"
          className="font-semibold text-blue-600"
        >
          Dashboard
        </Link>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50">

      {/* Top Bar */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-10 flex items-center justify-between text-sm">
          <p>🚑 Emergency Hotline: +880 1234 567 890</p>

          <p className="hidden md:block">
            🩺 Trusted Healthcare Platform
          </p>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-all">

        <div className="max-w-7xl mx-auto px-4 lg:px-8">

          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 flex items-center justify-center shadow-lg">
                <FaHeartbeat className="text-white text-xl" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  <span className="text-blue-600">
                    MediCare
                  </span>{" "}
                  Connect
                </h1>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Smart Healthcare Platform
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8 font-medium text-slate-700 dark:text-slate-200">
              {navLinks}
            </div>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-3">

              {/* Search */}
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition dark:bg-slate-800 dark:text-slate-200">
                <FiSearch />
                Search
              </button>

              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={() =>
                    setTheme(
                      theme === "dark"
                        ? "light"
                        : "dark"
                    )
                  }
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800"
                >
                  {theme === "dark" ? (
                    <FiSun size={18} />
                  ) : (
                    <FiMoon size={18} />
                  )}
                </button>
              )}

              {!user ? (
                <>
                  <Link
                    href="/login"
                    className="px-5 py-2 border rounded-xl hover:border-blue-600 hover:text-blue-600"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/register"
                    className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Join Us
                  </Link>
                </>
              ) : (
                <details className="relative">

                  <summary className="list-none cursor-pointer">
                    <img
                      src="https://i.pravatar.cc/150"
                      alt="profile"
                      className="w-11 h-11 rounded-full border-2 border-blue-500"
                    />
                  </summary>

                  <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border dark:border-slate-700 p-4">

                    <div className="border-b dark:border-slate-700 pb-3">
                      <h3 className="font-semibold dark:text-white">
                        Hasan Al Tarek
                      </h3>

                      <span className="inline-block mt-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                        {role}
                      </span>
                    </div>

                    <div className="pt-3 space-y-3">

                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 hover:text-blue-600"
                      >
                        <MdDashboard />
                        Dashboard
                      </Link>

                      <Link
                        href="/profile"
                        className="flex items-center gap-2 hover:text-blue-600"
                      >
                        <FaUserCircle />
                        Profile
                      </Link>

                      <button className="flex items-center gap-2 text-red-500">
                        <MdLogout />
                        Logout
                      </button>

                    </div>
                  </div>
                </details>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-2xl dark:text-white"
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden border-t dark:border-slate-800 py-4">

              <div className="flex flex-col gap-4 text-slate-700 dark:text-slate-200">

                {navLinks}

                {mounted && (
                  <button
                    onClick={() =>
                      setTheme(
                        theme === "dark"
                          ? "light"
                          : "dark"
                      )
                    }
                    className="flex items-center gap-2"
                  >
                    {theme === "dark"
                      ? "☀ Light Mode"
                      : "🌙 Dark Mode"}
                  </button>
                )}

                <Link
                  href="/login"
                  className="border rounded-lg py-2 text-center"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  className="bg-blue-600 text-white rounded-lg py-2 text-center"
                >
                  Join Us
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}