"use client";

import Image from "next/image";

const reviews = [
  {
    id: 1,
    name: "Rahim Ahmed",
    role: "Patient",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    review:
      "The appointment booking process was incredibly smooth. I found a specialist within minutes and received excellent care.",
  },
  {
    id: 2,
    name: "Fatema Begum",
    role: "Patient",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    review:
      "Doctors were highly professional and supportive. The platform made healthcare access much easier for my family.",
  },
];

export default function Testimonials() {
  return (
    <section className="mt-12 py-2">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold">
            Testimonials
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold">
            Patient Success Stories
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-slate-500">
            Discover how MediCare Connect is helping patients
            connect with trusted doctors and receive quality
            healthcare services.
          </p>
        </div>

        {/* Reviews */}
        <div className="grid md:grid-cols-2 gap-8">

          {reviews.map((review) => (
            <div
              key={review.id}
              className="
                bg-white dark:bg-slate-900
                border border-slate-200 dark:border-slate-800
                rounded-3xl
                p-8
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >
              <div className="mb-6">
                <span className="text-5xl text-blue-500">
                  "
                </span>

                <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  {review.review}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Image
                  width={56}
                  height={56}
                  src={review.image}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                />

                <div>
                  <h4 className="font-bold text-lg">
                    {review.name}
                  </h4>

                  <p className="text-blue-600 text-sm font-medium">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}