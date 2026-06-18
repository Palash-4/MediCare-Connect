import Link from "next/link";
import {
  FaHeartbeat,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo Section */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <FaHeartbeat className="text-blue-400 text-2xl" />

              <h2 className="text-2xl font-bold">
                MediCare Connect
              </h2>
            </div>

            <p className="text-slate-300 leading-7">
              Smart healthcare management platform
              connecting patients, doctors, and
              hospitals through a secure digital
              ecosystem.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-slate-300">
              <Link href="/">Home</Link>

              <Link href="/doctors">
                Find Doctors
              </Link>

              <Link href="/about">
                About Us
              </Link>

              <Link href="/contact">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Emergency */}
          <div>
            <h3 className="font-bold text-lg mb-5">
              Emergency Hotline
            </h3>

            <p className="text-slate-300 mb-3">
              Direct medical support line
            </p>

            <p className="text-2xl font-bold text-red-400">
              +880 1234 567 890
            </p>

            <p className="text-sm text-slate-400 mt-2">
              Available 24 Hours
            </p>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-lg mb-5">
              Social Channels
            </h3>

            <p className="text-slate-300 mb-4">
              Follow our healthcare updates
            </p>

            <div className="flex items-center gap-4 text-2xl">

              <a href="#">
                <FaFacebook className="hover:text-blue-500 transition" />
              </a>

              <a href="#">
                <FaLinkedin className="hover:text-blue-400 transition" />
              </a>

              <a href="#">
                <FaYoutube className="hover:text-red-500 transition" />
              </a>

            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-slate-400 text-sm">
            © 2026 MediCare Connect. All Rights Reserved.
          </p>

          <p className="text-slate-500 text-sm">
            Secure Healthcare Management Platform
          </p>

        </div>
      </div>
    </footer>
  );
}