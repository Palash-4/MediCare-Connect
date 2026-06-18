const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Ahmed",
    specialization: "Cardiology",
    experience: "8 Years",
    fee: 1200,
  },
  {
    id: 2,
    name: "Dr. Mahmud Hasan",
    specialization: "Neurology",
    experience: "10 Years",
    fee: 1500,
  },
  {
    id: 3,
    name: "Dr. Tanvir Islam",
    specialization: "Orthopedics",
    experience: "7 Years",
    fee: 1000,
  },
];

export default function FeaturedDoctors() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-4xl font-bold text-center mb-12">
          Featured Doctors
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6"
            >
              <div className="w-20 h-20 rounded-full bg-blue-100 mx-auto mb-4"></div>

              <h3 className="text-xl font-bold text-center">
                {doctor.name}
              </h3>

              <p className="text-center text-blue-600">
                {doctor.specialization}
              </p>

              <p className="text-center mt-2">
                Experience: {doctor.experience}
              </p>

              <p className="text-center mt-2 font-semibold">
                Fee: ৳{doctor.fee}
              </p>

              <button className="w-full mt-5 bg-blue-600 text-white py-3 rounded-xl">
                View Profile
              </button>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}