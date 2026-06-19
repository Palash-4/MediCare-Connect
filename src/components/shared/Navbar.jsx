"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

import { FaHeartbeat } from "react-icons/fa";
import { FiMenu, FiX, FiMoon, FiSun } from "react-icons/fi";



export default function Navbar() {

  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const [showProfileMenu, setShowProfileMenu] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();

    toast.success("Logged Out");

    router.push("/");
  };

  const role = "Patient";

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
                  onClick={() =>
                    setTheme(theme === "dark" ? "light" : "dark")
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
                    className={`px-4 py-2 rounded-xl transition-all ${pathname === "/login"
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-50"
                      }`}
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/register"
                    className={`px-4 py-2 rounded-xl transition-all ${pathname === "/register"
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-50"
                      }`}
                  >
                    Join Us
                  </Link>
                </>
              ) : (
                <div className="relative">

                  <button
                    onClick={() =>
                      setShowProfileMenu(!showProfileMenu)
                    }
                    className="flex items-center gap-2"
                  >
                    <img
                      src={
                        session?.user?.image ||
                        "https://i.pravatar.cc/150?img=12"
                      }
                      alt="profile"
                      className="w-11 h-11 rounded-full object-cover border-2 border-blue-500"
                    />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-lg border dark:border-slate-700 overflow-hidden">

                      <div className="px-4 py-3 border-b dark:border-slate-700">
                        <p className="font-semibold">
                          {session?.user?.name}
                        </p>

                        <p className="text-xs text-slate-500">
                          {session?.user?.email}
                        </p>
                      </div>

                      <Link
                        href="/profile"
                        className="block px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        My Profile
                      </Link>

                      <Link
                        href="/dashboard"
                        className="block px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        Dashboard
                      </Link>

                      <Link
                        href="/appointments"
                        className="block px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        My Appointments
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50"
                      >
                        Logout
                      </button>

                    </div>
                  )}
                </div>
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
          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden border-t dark:border-slate-800 py-4">
              <div className="flex flex-col gap-4">

                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {session ? (
                  <>
                    <Link href="/dashboard">
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="text-left text-red-500"
                    >
                      Logout
                    </button>
                  </>
                ) : (
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
