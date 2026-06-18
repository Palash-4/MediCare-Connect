const reviews = [
  {
    id: 1,
    name: "Rahim Ahmed",
    review:
      "Amazing healthcare service and easy appointment booking.",
  },
  {
    id: 2,
    name: "Fatema Begum",
    review:
      "Doctors are highly professional and supportive.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-4xl font-bold text-center mb-12">
          Patient Success Stories
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow"
            >
              <p className="mb-4">
                "{review.review}"
              </p>

              <h3 className="font-bold">
                {review.name}
              </h3>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}