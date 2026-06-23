"use client";

import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-white">
          My Profile
        </h1>

        <p className="text-slate-400 mt-2">
          Manage your personal information
        </p>
      </div>

      <div className="bg-slate-900 rounded-3xl p-8">
        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="text-slate-400">
              Full Name
            </label>

            <input
              defaultValue={session?.user?.name}
              className="w-full mt-2 p-3 rounded-xl bg-slate-800"
            />
          </div>

          <div>
            <label className="text-slate-400">
              Email
            </label>

            <input
              defaultValue={session?.user?.email}
              disabled
              className="w-full mt-2 p-3 rounded-xl bg-slate-800"
            />
          </div>

        </div>

        <button className="mt-6 bg-blue-600 px-6 py-3 rounded-xl">
          Update Profile
        </button>
      </div>
    </div>
  );
}