import Link from "next/link";

export default function Sidebar() {
    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow h-fit">

            <h2 className="text-xl font-bold mb-6">
                Dashboard
            </h2>

            <div className="flex flex-col gap-4">

                <Link href="/dashboard">
                    Overview
                </Link>

                <Link href="/appointments">
                    My Appointments
                </Link>

                <Link href="/payments">
                    Payment History
                </Link>

                <Link href="/reviews">
                    Reviews
                </Link>

                <Link href="/profile">
                    Profile
                </Link>

            </div>

        </div>
    );
}