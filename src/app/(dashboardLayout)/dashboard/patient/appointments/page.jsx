"use client";

export default function AppointmentPage() {
  return (
    <div className="space-y-6">

      <div className="bg-slate-900 rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-white">
          My Appointments
        </h1>

        <p className="text-slate-400 mt-2">
          View and manage appointments
        </p>
      </div>

      <div className="bg-slate-900 rounded-3xl p-8">

        <table className="w-full text-white">

          <thead>
            <tr>
              <th>Doctor</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Dr. Sarah Ahmed</td>
              <td>25 June 2026</td>
              <td>Pending</td>
            </tr>
          </tbody>

        </table>

      </div>
    </div>
  );
}