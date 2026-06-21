"use client";

export default function Statistics({ stats }) {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">

      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold">
            Our Achievements
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Trusted Healthcare Platform
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-slate-500">
            We connect thousands of patients with experienced doctors
            and provide quality healthcare services across the country.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center mt-12">

          <div className="group bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <span className="block text-5xl font-bold text-transparent bg-clip-text">
              {stats.totalDoctors}+
            </span>

            <p className="mt-4 text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider text-sm">
              Expert Doctors
            </p>
          </div>

          <div className="group bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <span className="block text-5xl font-bold text-transparent bg-clip-text">
              {stats.totalPatients.toLocaleString()}+
            </span>

            <p className="mt-4 text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider text-sm">
              Happy Patients
            </p>
          </div>

          <div className="group bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <span className="block text-5xl font-bold text-transparent  bg-clip-text">
              {stats.totalAppointments.toLocaleString()}+
            </span>

            <p className="mt-4 text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider text-sm">
              Appointments
            </p>
          </div>

          <div className="group bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <span className="block text-5xl font-bold text-transparent  bg-clip-text">
              {stats.totalReviews}+
            </span>

            <p className="mt-4 text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider text-sm">
              Positive Reviews
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}