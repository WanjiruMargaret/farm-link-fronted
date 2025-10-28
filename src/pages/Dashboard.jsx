import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center">
      <div className="max-w-6xl w-full p-6 flex-grow">
        <header className="bg-green-700 text-white flex items-center justify-between px-6 py-4 shadow-md">
          <div className="flex flex-col">
            <div className="flex items-center space-x-3">
              <img
                src="/images/logo.png"
                alt="FarmLink 360 Logo"
                className="w-8 h-8"
              />
              <h1 className="text-xl font-bold">FarmLink 360</h1>
            </div>
            <p className="italic text-xs ml-11">
              The Complete Digital Farm Companion
            </p>
          </div>
          <Navbar />
        </header>

        <div className="mt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-green-800">
                Welcome back,
              </h2>
              <p className="text-green-700">
                Here is what's happening in your farm.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { icon: "🌾", label: "Active Crops", value: "12" },
              { icon: "🐄", label: "Livestock", value: "5" },
              { icon: "☁️", label: "Current Weather", value: "24°C" },
              { icon: "🕓", label: "Pending Tasks", value: "3" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white shadow rounded-xl p-4 text-center hover:shadow-lg transition"
              >
                <h4 className="text-green-700 font-bold text-lg">
                  {item.icon} {item.value}
                </h4>
                <p className="text-gray-600 text-sm">{item.label}</p>
              </motion.div>
            ))}
          </div>

          <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <section className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">
                    📁 Records
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Manage crop records, planting schedules, harvests and other
                    farm records in one 📁 place.
                  </p>
                  <Link to="/records">
                    <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                      Open Records
                    </button>
                  </Link>
                </section>

                <section className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
                  <h2 className="text-xl font-semibold text-green-800 mb-3">
                    🤖 AI Diagnosis
                  </h2>
                  <p className="text-gray-700 text-sm mb-3">
                    Upload a photo of your crop or animal to detect potential
                    diseases using our AI-powered system.
                  </p>
                  <Link to="/ai-diagnosis">
                    <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                      Start Diagnosis
                    </button>
                  </Link>
                </section>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <section className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    💬 Ask Community
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Post a question or share a problem with other farmers and
                    experts in the community.
                  </p>
                  <Link to="/community">
                    <button className="px-4 py-2 bg-white border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition">
                      Open Community
                    </button>
                  </Link>
                </section>

                <section className="bg-white p-4 rounded-xl shadow">
                  <h2 className="font-semibold text-gray-800 mb-3">
                    💰 Marketplace
                  </h2>
                  <p className="text-gray-700 text-sm mb-4">
                    Connect directly with buyers and sellers. Explore real-time
                    crop and livestock prices.
                  </p>
                  <Link to="/marketplace">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                      Go to Marketplace
                    </button>
                  </Link>
                </section>

                <section className="bg-white p-4 rounded-xl shadow">
                  <h2 className="font-semibold text-gray-800 mb-3">
                    🌤️ Weather Alerts
                  </h2>
                  <p className="text-gray-700 text-sm mb-4">
                    Get real-time weather updates and alerts tailored to your
                    farm's location.
                  </p>
                  <Link to="/Weather">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                      View Alerts
                    </button>
                  </Link>
                </section>

                <section className="bg-white p-4 rounded-xl shadow">
                  <h2 className="font-semibold text-gray-800 mb-3">
                    👤 Profile
                  </h2>
                  <p className="text-gray-700 text-sm mb-4">
                    View and edit your personal and farm information, settings,
                    and preferences.
                  </p>
                  <Link to="/Profile">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                      Go to Profile
                    </button>
                  </Link>
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>

      <footer className="bg-green-700 text-white text-center py-4 mt-8 w-full rounded-t-xl shadow-md">
        <p className="text-sm mx-auto max-w-4xl">
          © {new Date().getFullYear()} FarmLink 360. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
