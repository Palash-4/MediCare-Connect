"use client";

import { authClient } from "@/lib/auth-client";
import PatientOverviewItems from "@/components/home/PatientOverviewItems";

export default function PatientDashboard() {
  const { data: session } = authClient.useSession();

  return (
    <div className="space-y-8">

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-sky-500 rounded-3xl p-8 shadow-xl text-white">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div>
            <h1 className="text-4xl font-bold">
              Welcome Back,
              <span className="block mt-2">
                {session?.user?.name || "Patient"} 👋
              </span>
            </h1>

            <p className="mt-3 text-blue-100 max-w-xl">
              Manage appointments, connect with doctors,
              access medical records and monitor your
              healthcare journey from one place.
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl text-center">
            <p className="text-sm text-blue-100">
              Current Plan
            </p>

            <h2 className="text-2xl font-bold">
              Basic Member
            </h2>
          </div>

        </div>

      </div>

      {/* Stats & Subscription */}
      <PatientOverviewItems />

      {/* Recent Appointments */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6 border border-slate-200 dark:border-slate-800">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            Recent Appointments
          </h2>

          <button className="text-blue-600 font-semibold hover:underline">
            View All
          </button>
        </div>

        <div className="space-y-4">

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">

            <div>
              <h3 className="font-semibold">
                Dr. Sarah Ahmed
              </h3>

              <p className="text-sm text-slate-500">
                Cardiology
              </p>
            </div>

            <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
              25 June 2026
            </span>

          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">

            <div>
              <h3 className="font-semibold">
                Dr. Hasan Karim
              </h3>

              <p className="text-sm text-slate-500">
                Neurology
              </p>
            </div>

            <span className="bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm font-medium">
              30 June 2026
            </span>

          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">

            <div>
              <h3 className="font-semibold">
                Dr. Mahmud Rahman
              </h3>

              <p className="text-sm text-slate-500">
                Orthopedics
              </p>
            </div>

            <span className="bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-medium">
              05 July 2026
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

