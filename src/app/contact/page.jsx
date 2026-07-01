"use client";

import Link from "next/link";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function ContactPage() {
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
            Contact Us
          </h1>

          <p className="
          mt-6
          text-lg
          text-slate-600
          dark:text-slate-400
          ">
            We are here to help you. Feel free
            to contact our support team for any
            healthcare-related inquiries.
          </p>

        </div>

        <div className="
        grid
        lg:grid-cols-2
        gap-10
        mt-20
        ">

          <div className="
          bg-white
          dark:bg-slate-900
          border
          border-slate-200
          dark:border-slate-800
          rounded-3xl
          p-10
          shadow-lg
          ">

            <h2 className="
            text-3xl
            font-bold
            text-slate-900
            dark:text-white
            ">
              Get In Touch
            </h2>

            <div className="space-y-10 mt-12">

              <div className="flex gap-5">
                <FaEnvelope
                  size={35}
                  className="text-blue-500"
                />
                <div>
                  <h3 className="
                  text-xl
                  font-semibold
                  text-slate-900
                  dark:text-white
                  ">
                    Email
                  </h3>
                  <p className="
                  text-slate-600
                  dark:text-slate-400
                  ">
                    support@medicare.com
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <FaPhoneAlt
                  size={35}
                  className="text-green-500"
                />
                <div>
                  <h3 className="
                  text-xl
                  font-semibold
                  text-slate-900
                  dark:text-white
                  ">
                    Phone
                  </h3>
                  <p className="
                  text-slate-600
                  dark:text-slate-400
                  ">
                    +8801712345678
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <FaMapMarkerAlt
                  size={35}
                  className="text-red-500"
                />
                <div>
                  <h3 className="
                  text-xl
                  font-semibold
                  text-slate-900
                  dark:text-white
                  ">
                    Address
                  </h3>
                  <p className="
                  text-slate-600
                  dark:text-slate-400
                  ">
                    Dhanmondi, Dhaka, Bangladesh
                  </p>
                </div>
              </div>

            </div>

          </div>

          <div className="
          bg-white
          dark:bg-slate-900
          border
          border-slate-200
          dark:border-slate-800
          rounded-3xl
          p-10
          shadow-lg
          ">

            <h2 className="
            text-3xl
            font-bold
            text-slate-900
            dark:text-white
            ">
              Send Message
            </h2>

            <form className="space-y-6 mt-10">

              <input
                type="text"
                placeholder="Your Name"
                className="
                w-full
                p-4
                rounded-xl
                border
                border-slate-300
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
                text-slate-900
                dark:text-white
                "
              />

              <input
                type="email"
                placeholder="Your Email"
                className="
                w-full
                p-4
                rounded-xl
                border
                border-slate-300
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
                text-slate-900
                dark:text-white
                "
              />

              <textarea
                rows={6}
                placeholder="Write your message..."
                className="
                w-full
                p-4
                rounded-xl
                border
                border-slate-300
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
                text-slate-900
                dark:text-white
                "
              />

              <button
                className="
                w-full
                py-4
                rounded-xl
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-semibold
                duration-300
                "
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

        <div className="
        flex
        flex-col
        md:flex-row
        justify-center
        gap-5
        mt-20
        ">

          <Link href="/">
            <button className="
            bg-slate-300
            dark:bg-slate-800
            text-slate-900
            dark:text-white
            px-8
            py-3
            rounded-xl
            ">
              Back Home
            </button>
          </Link>

          <Link href="/doctors">
            <button className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-8
            py-3
            rounded-xl
            ">
              Find Doctors
            </button>
          </Link>

        </div>

      </div>
    </div>
  );
}