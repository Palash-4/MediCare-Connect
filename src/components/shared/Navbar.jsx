"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

import {
  FaUser,
  FaSignOutAlt,
  FaThLarge,
  FaCalendarAlt,
  FaHeartbeat,
} from "react-icons/fa";

import { FiMoon, FiSun } from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();

    toast.success("Logged Out");

    router.push("/");
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Find Doctors", href: "/doctors" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },

    ...(session
      ? [{ name: "Dashboard", href: "/dashboard" }]
      : []),
  ];

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

      {/* Navbar */}
      <nav className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 flex items-center justify-center">
                <FaHeartbeat className="text-white text-2xl" />
              </div>

              <div>
                <h1 className="text-3xl font-bold">
                  <span className="text-blue-600">
                    MediCare
                  </span>{" "}
                  Connect
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
                  className={`px-4 py-2 rounded-xl ${pathname === item.href
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-50"
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
                  onClick={() =>
                    setTheme(
                      theme === "dark"
                        ? "light"
                        : "dark"
                    )
                  }
                  className="p-3 rounded-full bg-slate-100 dark:bg-slate-800"
                >
                  {theme === "dark" ? (
                    <FiSun size={20} />
                  ) : (
                    <FiMoon size={20} />
                  )}
                </button>
              )}

              {!session ? (
                <>
                  <Link
                    href="/login"
                    className={`px-4 py-2 rounded-xl transition-all duration-300 ${pathname === "/login"
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-slate-1000 dark:text-slate-200 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/register"
                    className={`px-4 py-2 rounded-xl transition-all duration-300 ${pathname === "/register"
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-slate-1000 dark:text-slate-200 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                  >
                    Join Us
                  </Link>
                </>
              ) : (
                <div
                  className="relative"
                  ref={dropdownRef}
                >
                  <button
                    onClick={() =>
                      setDropdownOpen(
                        !dropdownOpen
                      )
                    }
                  >
                    <Image
                      width={44}
                      height={44}
                      src={
                        session?.user?.image ||
                        "https://i.pravatar.cc/150?img=12"
                      }
                      alt="profile"
                      className="rounded-full border-2 border-blue-500"
                    />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border overflow-hidden">

                      <div className="px-4 py-4 border-b">
                        <p className="font-bold">
                          {session?.user?.name}
                        </p>

                        <p className="text-xs text-slate-500">
                          {session?.user?.email}
                        </p>
                      </div>

                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-100"
                      >
                        <FaThLarge />
                        Dashboard
                      </Link>

                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-100"
                      >
                        <FaUser />
                        My Profile
                      </Link>

                      <Link
                        href="/appointments"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-100"
                      >
                        <FaCalendarAlt />
                        My Appointments
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50"
                      >
                        <FaSignOutAlt />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </nav>
    </header>
  );
}
