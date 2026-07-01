"use client";

import Link from "next/link";
import {
  FaUserMd,
  FaHospital,
  FaHeartbeat,
  FaShieldAlt,
} from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="
    min-h-screen
    py-20
    bg-slate-100
    dark:bg-slate-950
    transition-colors
    ">

      <div className="max-w-7xl mx-auto px-5">

        <div className="text-center">

          <h1 className="
          text-5xl
          font-bold
          text-slate-900
          dark:text-white
          ">
            About MediCare Connect
          </h1>

          <p className="
          text-slate-600
          dark:text-slate-400
          max-w-3xl
          mx-auto
          mt-6
          text-lg
          ">
            MediCare Connect is a modern
            healthcare platform that connects
            patients with doctors and hospitals
            through a secure appointment
            management system.
          </p>

        </div>

        <div className="
        mt-16
        bg-white
        dark:bg-slate-900
        rounded-3xl
        p-10
        shadow-lg
        border
        border-slate-200
        dark:border-slate-800
        ">

          <h2 className="
          text-3xl
          font-bold
          text-slate-900
          dark:text-white
          ">
            Our Mission
          </h2>

          <p className="
          mt-6
          text-lg
          leading-8
          text-slate-600
          dark:text-slate-400
          ">
            Our mission is to simplify healthcare
            services by providing easy doctor
            discovery, online appointment booking,
            secure medical records and seamless
            communication between patients and
            healthcare professionals.
          </p>

        </div>

        <div className="
        grid
        md:grid-cols-2
        lg:grid-cols-4
        gap-8
        mt-16
        ">

          {[
            {
              icon: (
                <FaUserMd
                  size={45}
                  className="text-cyan-400"
                />
              ),
              title:
                "Expert Doctors",
              desc:
                "Find experienced and verified doctors instantly.",
            },
            {
              icon: (
                <FaHospital
                  size={45}
                  className="text-green-500"
                />
              ),
              title:
                "Trusted Hospitals",
              desc:
                "Access healthcare services from leading hospitals.",
            },
            {
              icon: (
                <FaHeartbeat
                  size={45}
                  className="text-red-500"
                />
              ),
              title:
                "Better Care",
              desc:
                "Improve healthcare experience through technology.",
            },
            {
              icon: (
                <FaShieldAlt
                  size={45}
                  className="text-cyan-400"
                />
              ),
              title:
                "Secure Platform",
              desc:
                "Protect patient information with secure authentication.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="
              bg-white
              dark:bg-slate-900
              border
              border-slate-200
              dark:border-slate-800
              rounded-3xl
              p-10
              text-center
              shadow-lg
              hover:-translate-y-2
              duration-300
              "
            >
              <div className="flex justify-center">
                {item.icon}
              </div>

              <h3 className="
              text-2xl
              font-bold
              mt-6
              text-slate-900
              dark:text-white
              ">
                {item.title}
              </h3>

              <p className="
              mt-4
              text-slate-600
              dark:text-slate-400
              ">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

        <div className="
        mt-20
        rounded-3xl
        p-14
        text-center
        bg-gradient-to-r
        from-blue-900
        via-blue-800
        to-cyan-700
        text-white
        ">

          <h2 className="text-5xl font-bold">
            Start Your Healthcare Journey
          </h2>

          <p className="mt-5 text-blue-100">
            Discover verified doctors and book
            appointments online.
          </p>

          <div className="
          flex
          flex-col
          md:flex-row
          justify-center
          gap-5
          mt-10
          ">

            <Link href="/">
              <button className="
              bg-slate-900
              px-8
              py-3
              rounded-xl
              hover:bg-slate-800
              duration-300
              ">
                Back Home
              </button>
            </Link>

            <Link href="/doctors">
              <button className="
              bg-white
              text-blue-700
              font-semibold
              px-8
              py-3
              rounded-xl
              hover:scale-105
              duration-300
              ">
                Find Doctors
              </button>
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}