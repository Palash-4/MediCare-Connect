"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

import { FaHeartbeat, FaUserCircle } from "react-icons/fa";

import { FiMenu, FiX, FiSearch, FiMoon, FiSun, FiBell } from "react-icons/fi";

import { MdDashboard, MdLogout } from "react-icons/md";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const user = null;

  const role = "Patient";

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Find Doctors", href: "/doctors" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-10 flex items-center justify-between text-sm">
          <p>🚑 Emergency Hotline: +880 1234 567 890</p>

          <p className="hidden md:block">🩺 Trusted Healthcare Platform</p>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 flex items-center justify-center shadow-lg">
                <FaHeartbeat className="text-white text-2xl" />
              </div>

              <div>
                <h1 className="text-3xl font-bold whitespace-nowrap text-slate-900 dark:text-white">
                  <span className="text-blue-600">MediCare</span> Connect
                </h1>

                <p className="text-sm text-slate-500">
                  Smart Healthcare Platform
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8 font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 ${pathname === item.href
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-700 dark:text-slate-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-800"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-5">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-3 rounded-full bg-slate-100 dark:bg-slate-800"
                >
                  {theme === "dark" ? (
                    <FiSun size={20} />
                  ) : (
                    <FiMoon size={20} />
                  )}
                </button>
              )}

              <Link
                href="/login"
                className={`px-4 py-2 rounded-xl transition-all ${pathname === "/login"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-700 dark:text-slate-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-800"
                  }`}
              >
                Sign In
              </Link>

              <Link
                href="/register"
                className={`px-4 py-2 rounded-xl transition-all duration-300 ${pathname === "/register"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-700 dark:text-slate-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-800"
                  }`}
              >
                Join Us
              </Link>
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
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {user && (
                  <>
                    <Link href="/dashboard">Dashboard</Link>

                    <Link href="/appointments">My Appointments</Link>

                    <Link href="/prescriptions">Prescriptions</Link>

                    <Link href="/profile">Profile</Link>
                  </>
                )}

                {mounted && (
                  <button
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className="text-left"
                  >
                    {theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
                  </button>
                )}

                {!user && (
                  <>
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
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
