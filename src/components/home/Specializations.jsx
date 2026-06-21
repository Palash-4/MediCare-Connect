import {
  FaHeartbeat,
  FaBrain,
  FaBone,
  FaBaby,
} from "react-icons/fa";

const specializations = [
  {
    name: "Cardiology",
    icon: <FaHeartbeat />,
  },
  {
    name: "Neurology",
    icon: <FaBrain />,
  },
  {
    name: "Orthopedics",
    icon: <FaBone />,
  },
  {
    name: "Pediatrics",
    icon: <FaBaby />,
  },
  {
    name: "Dermatology",
    icon: "🩹",
  },
];

export default function Specializations() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-4xl font-bold text-center mb-12">
          Medical Specializations
        </h2>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">

          {specializations.map((item) => (
            <div
              key={item.name}
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow text-center"
            >
              <div className="text-4xl text-blue-600 mb-4">
                {item.icon}
              </div>

              <h3 className="font-semibold">
                {item.name}
              </h3>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}