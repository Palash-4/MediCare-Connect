const features = [
  "Verified Doctors",
  "Secure Online Payments",
  "Digital Prescriptions",
  "24/7 Support",
  "Easy Appointment Booking",
  "Role Based Dashboard",
];

export default function WhyChooseUs() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose MediCare Connect
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature) => (
            <div
              key={feature}
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow"
            >
              <h3 className="text-xl font-semibold">
                ✓ {feature}
              </h3>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}