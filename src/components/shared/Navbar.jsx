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

import {
  FiMoon,
  FiSun,
  FiMenu,
  FiX,
} from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  console.log("SESSION =", session);

  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
  const { error } = await authClient.signOut();

  if (error) {
    toast.error("Logout Failed");
    return;
  }

  toast.success("Logged Out Successfully");

  window.location.href = "/";
};

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Find Doctors", href: "/doctors" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },

    ...(session
  ? [{ name: "Dashboard", href: "/dashboard/patient" }]
  : []),
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-between text-xs md:text-sm">
          <p className="hidden sm:block">
            🚑 Emergency Hotline: +880 1234 567 890
          </p>

          <p className="mx-auto md:mx-0">
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
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 flex items-center justify-center">
                <FaHeartbeat className="text-white text-xl md:text-2xl" />
              </div>

              <div>
                <h1 className="text-xl md:text-3xl font-bold">
                  <span className="text-blue-600">
                    MediCare
                  </span>{" "}
                  Connect
                </h1>

                <p className="hidden md:block text-sm text-slate-500">
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
                    : "hover:bg-blue-50 dark:hover:bg-slate-800"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop Right Side */}
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
                    className="px-4 py-2 rounded-xl hover:bg-blue-50"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/register"
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white"
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
                      setDropdownOpen(!dropdownOpen)
                    }
                  >
                    <Image
                      width={44}
                      height={44}
                      src={
                        session?.user?.image ||
                        "/default-avatar.svg"
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
                        href="/dashboard/patient"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <FaThLarge />
                        Dashboard
                      </Link>

                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <FaUser />
                        My Profile
                      </Link>

                      <Link
                        href="/appointments"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <FaCalendarAlt />
                        My Appointments
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                      >
                        <FaSignOutAlt />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-3">

              {mounted && (
                <button
                  onClick={() =>
                    setTheme(theme === "dark" ? "light" : "dark")
                  }
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800"
                >
                  {theme === "dark" ? (
                    <FiSun size={18} />
                  ) : (
                    <FiMoon size={18} />
                  )}
                </button>
              )}

              <button
                onClick={() =>
                  setMobileMenuOpen(!mobileMenuOpen)
                }
                className="p-2 border rounded-lg"
              >
                {mobileMenuOpen ? (
                  <FiX size={22} />
                ) : (
                  <FiMenu size={22} />
                )}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-white dark:bg-slate-950">

            <div className="flex flex-col p-4 space-y-3">

              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {item.name}
                </Link>
              ))}

              {!session ? (
                <>
                  <Link
                    href="/login"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/register"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className="px-4 py-3 rounded-xl bg-blue-600 text-white"
                  >
                    Join Us
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-3 rounded-xl bg-red-500 text-white"
                  >
                    Logout
                  </button>
                </>
              )}

            </div>

          </div>
        )}
      </nav>
    </header>
  );
}
