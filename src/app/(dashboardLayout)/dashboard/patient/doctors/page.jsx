"use client";

import { useEffect, useState } from "react";
import API_URL from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { FaUserMd, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

export default function DoctorsPage() {
  const { data: session } = authClient.useSession();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedDoctor, setSelectedDoctor] =
    useState(null);

  const [appointment, setAppointment] =
    useState({
      appointmentDate: "",
      appointmentTime: "",
      symptoms: "",
    });

  useEffect(() => {
    fetch(`${API_URL}/doctors`)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleBookAppointment =
    async () => {
      try {
        if (
          !appointment.appointmentDate ||
          !appointment.appointmentTime ||
          !appointment.symptoms
        ) {
          return toast.error(
            "Please fill all fields"
          );
        }

        const appointmentData = {
          patientName:
            session?.user?.name,
          patientEmail:
            session?.user?.email,

          doctorName:
            selectedDoctor.doctorName,
          doctorEmail:
            selectedDoctor.email,

          appointmentDate:
            appointment.appointmentDate,
          appointmentTime:
            appointment.appointmentTime,
          symptoms:
            appointment.symptoms,

          appointmentStatus:
            "pending",

          paymentStatus: "paid",

          createdAt: new Date(),
        };

        const res = await fetch(
          `${API_URL}/appointments`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              appointmentData
            ),
          }
        );

        const data =
          await res.json();

        if (data.insertedId) {
          toast.success(
            "Appointment Booked Successfully"
          );

          setSelectedDoctor(null);

          setAppointment({
            appointmentDate: "",
            appointmentTime: "",
            symptoms: "",
          });
        }
      } catch (error) {
        console.log(error);
        toast.error(
          "Something went wrong"
        );
      }
    };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-white">
          Available Doctors
        </h1>

        <p className="text-slate-400 mt-2">
          Browse verified doctors
        </p>
      </div>

      {/* Doctor Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="bg-slate-900 rounded-3xl p-6 border border-slate-800"
          >
            <div className="flex items-center gap-4">
              {doctor.profileImage ? (
                <img
                  src={
                    doctor.profileImage
                  }
                  alt=""
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-slate-800 flex justify-center items-center">
                  <FaUserMd
                    size={28}
                    className="text-cyan-400"
                  />
                </div>
              )}

              <div>
                <h2 className="text-xl font-bold text-white">
                  {
                    doctor.doctorName
                  }
                </h2>

                <p className="text-cyan-400">
                  {
                    doctor.specialization
                  }
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-2 text-slate-300">
              <p>
                Experience :
                <span className="text-white ml-2">
                  {
                    doctor.experience
                  }{" "}
                  Years
                </span>
              </p>

              <p>
                Fee :
                <span className="text-green-400 ml-2">
                  ৳
                  {
                    doctor.consultationFee
                  }
                </span>
              </p>

              <p>
                Hospital :
                <span className="text-white ml-2">
                  {
                    doctor.hospitalName
                  }
                </span>
              </p>

              <p className="flex items-center gap-2">
                <FaStar className="text-yellow-400" />

                <span>
                  {
                    doctor.verificationStatus
                  }
                </span>
              </p>
            </div>

            <button
              onClick={() =>
                setSelectedDoctor(
                  doctor
                )
              }
              className="w-full mt-5 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold text-white"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
          <div className="bg-slate-900 rounded-3xl p-8 w-full max-w-xl">

            <h2 className="text-3xl font-bold text-white mb-6">
              Book Appointment
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                disabled
                value={
                  selectedDoctor.doctorName
                }
                className="w-full p-3 rounded-xl bg-slate-800 text-white"
              />

              <input
                type="date"
                className="w-full p-3 rounded-xl bg-slate-800 text-white"
                value={
                  appointment.appointmentDate
                }
                onChange={(e) =>
                  setAppointment({
                    ...appointment,
                    appointmentDate:
                      e.target.value,
                  })
                }
              />

              <input
                type="time"
                className="w-full p-3 rounded-xl bg-slate-800 text-white"
                value={
                  appointment.appointmentTime
                }
                onChange={(e) =>
                  setAppointment({
                    ...appointment,
                    appointmentTime:
                      e.target.value,
                  })
                }
              />

              <textarea
                rows="4"
                placeholder="Symptoms..."
                className="w-full p-3 rounded-xl bg-slate-800 text-white"
                value={
                  appointment.symptoms
                }
                onChange={(e) =>
                  setAppointment({
                    ...appointment,
                    symptoms:
                      e.target.value,
                  })
                }
              />

              <div className="flex gap-4 pt-3">

                <button
                  onClick={() =>
                    setSelectedDoctor(
                      null
                    )
                  }
                  className="flex-1 py-3 rounded-xl bg-red-600 text-white"
                >
                  Cancel
                </button>

                <button
                  onClick={
                    handleBookAppointment
                  }
                  className="flex-1 py-3 rounded-xl bg-blue-600 text-white"
                >
                  Confirm Booking
                </button>

              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}