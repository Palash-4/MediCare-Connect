import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-2 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-10 items-center rounded-[40px] overflow-hidden bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 p-8 lg:p-14">

          {/* Left Content */}
          <div>

            <span className="inline-block px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium border border-blue-500/30">
              Trusted Healthcare Platform
            </span>

            <h1 className="mt-6 text-5xl lg:text-7xl font-bold text-white leading-tight">
              Your Health,
              <br />
              Our
              <span className="text-sky-400"> Priority</span>
            </h1>

            <p className="mt-6 text-slate-300 text-lg leading-8 max-w-xl">
              Book appointments with verified doctors,
              manage prescriptions, pay securely,
              and access healthcare services anytime.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                href="/doctors"
                className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Find Doctors
              </Link>

              <Link
                href="/register"
                className="px-8 py-4 rounded-2xl border border-slate-600 text-white hover:bg-white/10 transition"
              >
                Register Now
              </Link>

            </div>

          </div>

          {/* Right Content */}
          <div className="relative">

            <div className="absolute top-5 left-5 z-10 bg-slate-900/90 backdrop-blur-md text-white rounded-2xl px-5 py-4 shadow-xl">
              <div className="flex items-center gap-1 text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className="font-semibold mt-2">
                500+ Doctors Available
              </p>
            </div>

            <div className="overflow-hidden rounded-[30px] border border-slate-700">
              <Image
                src="https://images.unsplash.com/photo-1584515933487-779824d29309"
                alt="Healthcare"
                width={700}
                height={500}
                className="w-full h-[450px] object-cover"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}