import React from "react";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
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

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-green-800">
          Welcome to your dashboard!
        </h3>
        <p className="text-green-700">
          Here you’ll manage your crops, livestock, and sales.
        </p>
      </div>

      <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <section className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-green-800 mb-3">
            🌾 Crop Management
          </h2>
          <img
            src="/images/tomato.jpeg"
            alt="Healthy Crops"
            className="rounded-lg mb-4 h-40 w-full object-cover"
          />
          <p className="text-gray-700 text-sm">
            Track your crops, get planting reminders, and record harvest data.
            Manage your fields smarter to increase yield.
          </p>
          <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Manage Crops
          </button>
        </section>

        <section className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-green-800 mb-3">
            🐄 Livestock Management
          </h2>
          <img
            src="/images/cow.png"
            alt="Livestock"
            className="rounded-lg mb-4 h-32 w-full object-contain"
          />
          <p className="text-gray-700 text-sm">
            Monitor livestock health, track feed schedules, and record
            production data.
          </p>
          <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Manage Livestock
          </button>
        </section>

        <section className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-green-800 mb-3">
            🤖 AI Diagnosis
          </h2>
          <p className="text-gray-700 text-sm mb-3">
            Upload a photo of your crop or animal to detect potential diseases
            using our AI-powered system.
          </p>
          <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Start Diagnosis
          </button>
        </section>

        <section className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition lg:col-span-2">
          <h2 className="text-xl font-semibold text-green-800 mb-3">
            💰 Marketplace
          </h2>
          <p className="text-gray-700 text-sm mb-4">
            Connect directly with buyers and sellers. Explore real-time crop and
            livestock prices.
          </p>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Go to Marketplace
          </button>
        </section>
      </main>
    </div>
  );
}
