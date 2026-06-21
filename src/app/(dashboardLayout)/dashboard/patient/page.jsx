"use client";

import { authClient } from "@/lib/auth-client";
import PatientOverviewItems from "@/components/home/PatientOverviewItems";

export default function PatientDashboard() {
    const { data: session } = authClient.useSession();

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-8">
            <div className="space-y-6">

                {/* Welcome */}
                <div>
                    <h1 className="text-4xl font-bold">
                        Welcome Back,
                        <span className="text-cyan-400">
                            {" "} {session?.user?.name}
                        </span>
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Manage appointments and healthcare services.
                    </p>
                </div>

                <PatientOverviewItems />

            </div>
        </div>
    );
}