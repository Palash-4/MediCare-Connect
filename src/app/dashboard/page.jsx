import Sidebar from "@/components/dashboard/Sidebar";
import {
    FaCalendarAlt,
    FaFileMedical,
    FaMoneyBillWave,
    FaStar,
} from "react-icons/fa";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-slate-100 p-6">
            <div className="grid lg:grid-cols-4 gap-6">

                <Sidebar />

                <div className="lg:col-span-3 space-y-6">

                    {/* Banner */}
                    <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-8 rounded-3xl">
                        <h1 className="text-4xl font-bold">
                            Welcome Back 👋
                        </h1>

                        <p className="mt-3">
                            Access appointments, doctors, payments and healthcare records.
                        </p>
                    </div>
        cd

                    {/* Stats */}
                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

                        <div className="bg-white p-5 rounded-2xl shadow">
                            <FaCalendarAlt size={30} className="text-green-600" />
                            <h2 className="text-3xl font-bold mt-3">3</h2>
                            <p>Appointments</p>
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow">
                            <FaFileMedical size={30} className="text-blue-600" />
                            <h2 className="text-3xl font-bold mt-3">5</h2>
                            <p>Medical Records</p>
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow">
                            <FaMoneyBillWave size={30} className="text-purple-600" />
                            <h2 className="text-3xl font-bold mt-3">$250</h2>
                            <p>Total Payments</p>
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow">
                            <FaStar size={30} className="text-yellow-500" />
                            <h2 className="text-3xl font-bold mt-3">4</h2>
                            <p>Reviews</p>
                        </div>

                    </div>

                    {/* Appointments */}
                    <div className="bg-white rounded-3xl p-6 shadow">
                        <h2 className="text-2xl font-bold mb-5">
                            Upcoming Appointments
                        </h2>

                        <div className="space-y-4">

                            <div className="flex justify-between items-center border p-4 rounded-xl">
                                <div>
                                    <h3 className="font-semibold">
                                        Dr. Sarah
                                    </h3>

                                    <p className="text-sm text-slate-500">
                                        25 June 2026 • 10:00 AM
                                    </p>
                                </div>

                                <span className="badge badge-warning">
                                    Pending
                                </span>
                            </div>

                            <div className="flex justify-between items-center border p-4 rounded-xl">
                                <div>
                                    <h3 className="font-semibold">
                                        Dr. Amanda
                                    </h3>

                                    <p className="text-sm text-slate-500">
                                        28 June 2026 • 11:30 AM
                                    </p>
                                </div>

                                <span className="badge badge-success">
                                    Confirmed
                                </span>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}