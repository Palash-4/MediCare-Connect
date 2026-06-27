"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

import {
  FaThLarge,
  FaCalendarAlt,
  FaUserMd,
  FaUser,
  FaUsers,
  FaHeartbeat,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const [user, setUser] = useState(null);

  // MongoDB থেকে user data fetch
  useEffect(() => {
    if (!session?.user?.email) return;

    fetch(
      `http://localhost:5000/api/users/${session.user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.log(err));
  }, [session]);

  const role =
    user?.role || session?.user?.role;

  const handleLogout = async () => {
    await authClient.signOut();

    toast.success("Logged Out Successfully");

    router.push("/");
    router.refresh();
  };

  // ==========================
  // Patient Menu
  // ==========================
  const patientMenu = [
    {
      label: "Overview",
      icon: FaThLarge,
      href: "/dashboard/patient",
    },
    {
      label: "Appointments",
      icon: FaCalendarAlt,
      href: "/dashboard/patient/appointments",
    },
    {
      label: "Doctors",
      icon: FaUserMd,
      href: "/dashboard/patient/doctors",
    },
    {
      label: "Profile",
      icon: FaUser,
      href: "/dashboard/patient/profile",
    },
  ];

  // ==========================
  // Doctor Menu
  // ==========================
  const doctorMenu = [
    {
      label: "Overview",
      icon: FaThLarge,
      href: "/dashboard/doctor",
    },
    {
      label: "Patients",
      icon: FaUsers,
      href: "/dashboard/doctor/patients",
    },
    {
      label: "Appointments",
      icon: FaCalendarAlt,
      href: "/dashboard/doctor/appointments",
    },
    {
      label: "Profile",
      icon: FaUser,
      href: "/dashboard/doctor/profile",
    },
  ];

  // ==========================
  // Admin Menu
  // ==========================
  const adminMenu = [
    {
      label: "Overview",
      icon: FaThLarge,
      href: "/dashboard/admin",
    },
    {
      label: "Manage Users",
      icon: FaUsers,
      href: "/dashboard/admin/users",
    },
    {
      label: "Manage Doctors",
      icon: FaUserMd,
      href: "/dashboard/admin/doctors",
    },
    {
      label: "Appointments",
      icon: FaCalendarAlt,
      href: "/dashboard/admin/appointments",
    },
  ];

  const menuItems =
    role === "patient"
      ? patientMenu
      : role === "doctor"
      ? doctorMenu
      : role === "admin"
      ? adminMenu
      : [];

  return (
    <aside className="w-72 min-h-screen bg-[#0f172a] border-r border-slate-800 flex flex-col">

      {/* Logo */}
      <div className="h-24 flex items-center gap-3 px-6 border-b border-slate-800">

        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
          <FaHeartbeat className="text-white text-xl" />
        </div>

        <div>
          <h2 className="font-bold text-lg text-white">
            MediCare Connect
          </h2>

          <p className="text-xs text-slate-400">
            Healthcare Dashboard
          </p>
        </div>

      </div>

      {/* User Info */}
      <div className="p-6 border-b border-slate-800">

        <div className="flex items-center gap-3">

          <Image
            src={
              user?.image ||
              session?.user?.image ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user?.name ||
                  session?.user?.name ||
                  "User"
              )}`
            }
            alt="profile"
            width={55}
            height={55}
            className="rounded-full border-2 border-blue-500 object-cover"
          />

          <div>

            <h3 className="font-semibold text-white">
              {user?.name ||
                session?.user?.name}
            </h3>

            <p
              className={`text-xs font-bold uppercase mt-1
              ${
                role === "admin"
                  ? "text-red-400"
                  : role === "doctor"
                  ? "text-green-400"
                  : "text-blue-400"
              }`}
            >
              {role}
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">

        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest px-3 mb-3">
          Navigation
        </p>

        <div className="space-y-2">

          {menuItems.map(
            ({ label, icon: Icon, href }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition
                ${
                  pathname === href
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                  <Icon size={16} />
                </span>

                {label}
              </Link>
            )
          )}

        </div>

      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-slate-800 space-y-2">

        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition"
        >
          <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
            <FaHome size={14} />
          </span>

          Back to Site
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition"
        >
          <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
            <FaSignOutAlt size={14} />
          </span>

          Sign Out
        </button>

      </div>

    </aside>
  );
}