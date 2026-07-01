"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session } =
    authClient.useSession();

  const [loading, setLoading] =
    useState(true);

  const [image, setImage] =
    useState(null);

  const [profile, setProfile] =
    useState({
      name: "",
      email: "",
      image: "",
    });

  useEffect(() => {
    if (!session?.user?.email) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${session.user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProfile({
          name:
            data?.name ||
            session.user.name ||
            "",

          email:
            data?.email ||
            session.user.email ||
            "",

          image:
            data?.image ||
            session.user.image ||
            "",
        });

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [session]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]:
        e.target.value,
    });
  };

  // ImgBB Upload
  const uploadImage = async (
    imageFile
  ) => {
    const formData =
      new FormData();

    formData.append(
      "image",
      imageFile
    );

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data =
      await res.json();

    return data.data.display_url;
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      let imageUrl =
        profile.image;

      // New Image Upload
      if (image) {
        imageUrl =
          await uploadImage(
            image
          );
      }

      const updatedProfile =
        {
          ...profile,
          image: imageUrl,
        };

      const res =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${profile.email}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              updatedProfile
            ),
          }
        );

      const data =
        await res.json();

      if (
        data.modifiedCount >
          0 ||
        data.upsertedCount >
          0
      ) {
        setProfile(
          updatedProfile
        );

        setImage(null);

        toast.success(
          "Profile Updated Successfully"
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed To Update Profile"
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
    <div className="space-y-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 rounded-3xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold">
          My Profile
        </h1>

        <p className="mt-3 text-blue-100">
          Manage your personal
          information
        </p>
      </div>

      {/* Profile Card */}
      <form
        onSubmit={
          handleSubmit
        }
        className="bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-800"
      >
        {/* Profile Preview */}
        <div className="flex flex-col items-center mb-10">

          <img
            src={
              image
                ? URL.createObjectURL(
                    image
                  )
                : profile.image ||
                  session
                    ?.user
                    ?.image ||
                  "https://ui-avatars.com/api/?name=User"
            }
            alt="profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          />

          <h2 className="text-white text-2xl font-bold mt-4">
            {
              profile.name
            }
          </h2>

          <p className="text-slate-400">
            {
              profile.email
            }
          </p>
        </div>

        {/* Inputs */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Name */}
          <div>
            <label className="text-slate-300 block mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={
                profile.name
              }
              onChange={
                handleChange
              }
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-slate-300 block mb-2">
              Email
            </label>

            <input
              type="email"
              disabled
              value={
                profile.email
              }
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-400"
            />
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="text-slate-300 block mb-2">
              Upload
              Profile
              Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(
                e
              ) =>
                setImage(
                  e.target
                    .files[0]
                )
              }
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl text-white font-bold text-lg transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}