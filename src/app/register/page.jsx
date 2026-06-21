"use client";


import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaHeartbeat } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import toast from "react-hot-toast";


export default function RegisterPage() {
    const router = useRouter();
    const [image, setImage] = useState("");
    const [uploading, setUploading] = useState(false);
    const handleImageChange = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {
    setUploading(true);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    console.log(data);

    if (data.success) {
      setImage(data.data.display_url);
      toast.success("Image Uploaded");
    } else {
      toast.error("Image Upload Failed");
    }
  } catch (error) {
    console.log(error);
    toast.error("Image Upload Failed");
  } finally {
    setUploading(false);
  }
};
    const onSubmit = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const role = e.target.role.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (!image) {
            toast.error("Please upload profile image");
            return;
        }

        const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;

        if (!regex.test(password)) {
            toast.error(
                "Password must contain at least 6 characters, 1 number and 1 special character"
            );
            return;
        }

        try {
            const { data:userData, error } =
                await authClient.signUp.email({
                    name,
                    email,
                    password,
                    image,
                    role,
                });

            if (error) {
                console.log(error);
                toast.error(
                    error.message || "Registration Failed"
                );
                return;
            }

            toast.success(
                "Account Created Successfully"
            );

            e.target.reset();

            setTimeout(() => {
                router.push("/");
            }, 1000);

        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        }
    };

    const handleGoogleRegister = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/dashboard",
            });
        } catch (error) {
            toast.error("Google Sign In Failed");
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8">

                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 flex items-center justify-center">
                        <FaHeartbeat className="text-white text-3xl" />
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold">
                        Create Account
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Join MediCare Connect
                    </p>
                </div>

                <form
                    onSubmit={onSubmit}
                    className="space-y-5"
                >
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="Full Name"
                        className="w-full px-4 py-3 rounded-xl border"
                    />

                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Email Address"
                        className="w-full px-4 py-3 rounded-xl border"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        placeholder="Photo URL"
                        className="w-full px-4 py-3 rounded-xl border"
                    />
                    {uploading && (
                        <p className="text-sm text-blue-500">
                            Uploading image...
                        </p>
                    )}
                    {image && (
                        <img
                            src={image}
                            alt="preview"
                            className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-blue-500"
                        />
                    )}

                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Password"
                        className="w-full px-4 py-3 rounded-xl border"
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        required
                        placeholder="Confirm Password"
                        className="w-full px-4 py-3 rounded-xl border"
                    />

                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Select Role
                        </label>

                        <select
                            name="role"
                            required
                            className="w-full px-4 py-3 rounded-xl border"
                        >
                            <option value="">Choose Role</option>
                            <option value="patient">Patient</option>
                            <option value="doctor">Doctor</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={uploading}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50"
                    >
                        {uploading ? "Uploading..." : "Create Account"}
                    </button>
                </form>

                <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-slate-300"></div>
                    <span>OR</span>
                    <div className="flex-1 h-px bg-slate-300"></div>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleRegister}
                    className="w-full border py-3 rounded-xl flex items-center justify-center gap-3"
                >
                    <FcGoogle size={22} />
                    Continue with Google
                </button>

                <p className="text-center mt-6">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-blue-600 font-semibold"
                    >
                        Sign In
                    </Link>
                </p>

            </div>
        </div>
    );
}