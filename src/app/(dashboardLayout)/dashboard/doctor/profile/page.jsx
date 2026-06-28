"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function DoctorProfilePage() {
  const { data: session } = authClient.useSession();

  const [image, setImage] = useState(null);

  const [doctor, setDoctor] = useState({
    doctorName: "",
    specialization: "",
    qualifications: "",
    experience: "",
    consultationFee: "",
    hospitalName: "",
    availableDays: [],
    startTime: "",
    endTime: "",
  });

  const uploadImage = async (imageFile) => {
  const formData = new FormData();

  formData.append("image", imageFile);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  return data.data.display_url;
};

  const weekDays = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const handleChange = (e) => {
    setDoctor({
      ...doctor,
      [e.target.name]: e.target.value,
    });
  };

  const handleDayChange = (day) => {
    if (doctor.availableDays.includes(day)) {
      setDoctor({
        ...doctor,
        availableDays: doctor.availableDays.filter(
          (d) => d !== day
        ),
      });
    } else {
      setDoctor({
        ...doctor,
        availableDays: [...doctor.availableDays, day],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      if (image) {
        imageUrl = await uploadImage(image);
      }

      const doctorData = {
        ...doctor,
        profileImage: imageUrl,
        email: session?.user?.email,
        verificationStatus: "pending",
        createdAt: new Date(),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/doctors`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            doctorData
          ),
        }
      );

      const data = await res.json();

      if (data.insertedId) {
        toast.success(
          "Doctor Profile Created Successfully"
        );

        setDoctor({
          doctorName: "",
          specialization: "",
          qualifications: "",
          experience: "",
          consultationFee: "",
          hospitalName: "",
          availableDays: [],
          startTime: "",
          endTime: "",
        });

        setImage(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 rounded-3xl p-8 text-white mb-8 shadow-xl">
        <h1 className="text-4xl font-bold">
          Complete Doctor Profile
        </h1>

        <p className="mt-3 text-blue-100">
          Complete your profile and get
          verified by admin to start
          receiving appointments.
        </p>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-800"
      >

        {/* Profile Preview */}
        <div className="flex flex-col items-center mb-10">

          <img
            src={
              image
                ? URL.createObjectURL(image)
                : session?.user?.image ||
                  "https://i.ibb.co/fd5qCY7/avatar.png"
            }
            alt="Doctor"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          />

          <h2 className="text-white text-2xl font-bold mt-4">
            {doctor.doctorName ||
              "Doctor Name"}
          </h2>

          <p className="text-slate-400">
            {doctor.specialization ||
              "Specialization"}
          </p>
        </div>

        {/* Inputs */}
        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="text-white block mb-2">
              Doctor Name
            </label>

            <input
              type="text"
              name="doctorName"
              value={doctor.doctorName}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700"
            />
          </div>

          <div>
            <label className="text-white block mb-2">
              Specialization
            </label>

            <input
              type="text"
              name="specialization"
              value={doctor.specialization}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700"
            />
          </div>

          <div>
            <label className="text-white block mb-2">
              Qualifications
            </label>

            <input
              type="text"
              name="qualifications"
              value={doctor.qualifications}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700"
            />
          </div>

          <div>
            <label className="text-white block mb-2">
              Experience (Years)
            </label>

            <input
              type="number"
              name="experience"
              value={doctor.experience}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700"
            />
          </div>

          <div>
            <label className="text-white block mb-2">
              Consultation Fee
            </label>

            <input
              type="number"
              name="consultationFee"
              value={doctor.consultationFee}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700"
            />
          </div>

          <div>
            <label className="text-white block mb-2">
              Hospital Name
            </label>

            <input
              type="text"
              name="hospitalName"
              value={doctor.hospitalName}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700"
            />
          </div>

        </div>

        {/* Image Upload */}
        <div className="mt-6">
          <label className="text-white block mb-2">
            Upload Doctor Image
          </label>

          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) =>
              setImage(e.target.files[0])
            }
            className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700"
          />
        </div>

        {/* Available Days */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-white mb-4">
            Available Days
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {weekDays.map((day) => (
              <label
                key={day}
                className={`p-3 rounded-xl cursor-pointer border transition ${
                  doctor.availableDays.includes(day)
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-slate-800 border-slate-700 text-slate-300"
                }`}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={doctor.availableDays.includes(
                    day
                  )}
                  onChange={() =>
                    handleDayChange(day)
                  }
                />

                {day}
              </label>
            ))}

          </div>
        </div>

        {/* Time Slots */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <div>
            <label className="text-white block mb-2">
              Start Time
            </label>

            <input
              type="time"
              name="startTime"
              value={doctor.startTime}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700"
            />
          </div>

          <div>
            <label className="text-white block mb-2">
              End Time
            </label>

            <input
              type="time"
              name="endTime"
              value={doctor.endTime}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700"
            />
          </div>

        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full mt-10 bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl text-white font-bold text-lg transition"
        >
          Save Doctor Profile
        </button>

      </form>
    </div>
  );
}