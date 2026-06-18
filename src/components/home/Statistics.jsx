import {
  FaUserMd,
  FaUsers,
  FaCalendarCheck,
  FaStar,
} from "react-icons/fa";

export default function Statistics() {
  const stats = [
    {
      title: "Doctors",
      value: "120+",
      icon: <FaUserMd />,
    },
    {
      title: "Patients",
      value: "2500+",
      icon: <FaUsers />,
    },
    {
      title: "Appointments",
      value: "5000+",
      icon: <FaCalendarCheck />,
    },
    {
      title: "Reviews",
      value: "1800+",
      icon: <FaStar />,
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item) => (
            <div
              key={item.title}
              className="bg-blue-600 text-white p-8 rounded-3xl text-center"
            >
              <div className="text-4xl mb-4">
                {item.icon}
              </div>

              <h2 className="text-4xl font-bold">
                {item.value}
              </h2>

              <p>{item.title}</p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}