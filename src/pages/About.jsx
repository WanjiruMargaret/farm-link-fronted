import React from "react";
import { TrendingUp, Users, Globe, Award, Target, DollarSign } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Empowering Kenya's Farmers Through Technology
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            FarmLink 360 connects farmers directly to markets, eliminates waste, and uses AI to solve real farming challenges. 
            We're building a sustainable agricultural ecosystem that benefits everyone.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
              <Globe className="w-12 h-12 mx-auto mb-3 text-blue-600" />
              <h3 className="text-lg font-bold mb-2 text-gray-800">Market Size</h3>
              <p className="text-3xl font-bold text-blue-600">KES 2.1T</p>
              <p className="text-sm text-gray-600">Total Addressable Market</p>
            </div>
            <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
              <TrendingUp className="w-12 h-12 mx-auto mb-3 text-green-600" />
              <h3 className="text-lg font-bold mb-2 text-gray-800">Target Farmers</h3>
              <p className="text-3xl font-bold text-green-600">5M+</p>
              <p className="text-sm text-gray-600">Smallholder farmers</p>
            </div>
            <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
              <Target className="w-12 h-12 mx-auto mb-3 text-purple-600" />
              <h3 className="text-lg font-bold mb-2 text-gray-800">Our Goal</h3>
              <p className="text-3xl font-bold text-purple-600">Direct</p>
              <p className="text-sm text-gray-600">Market connections</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Problem Statement */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Real Problems We're Addressing
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-red-50 p-8 rounded-lg border-l-4 border-red-500">
              <h3 className="text-xl font-bold text-red-700 mb-4">Middlemen Take Large Cuts</h3>
              <p className="text-gray-700 mb-4">
                Many Kenyan farmers sell their produce well below market price due to middlemen taking excessive cuts.
              </p>
              <div className="text-2xl font-bold text-red-600">Major Issue</div>
              <div className="text-sm text-gray-600">Reduced farmer income</div>
            </div>
            <div className="bg-red-50 p-8 rounded-lg border-l-4 border-red-500">
              <h3 className="text-xl font-bold text-red-700 mb-4">Post-Harvest Waste</h3>
              <p className="text-gray-700 mb-4">
                Significant agricultural produce is wasted due to poor market access, storage, and timing issues.
              </p>
              <div className="text-2xl font-bold text-red-600">Big Problem</div>
              <div className="text-sm text-gray-600">Value lost regularly</div>
            </div>
            <div className="bg-red-50 p-8 rounded-lg border-l-4 border-red-500">
              <h3 className="text-xl font-bold text-red-700 mb-4">Disease & Pest Damage</h3>
              <p className="text-gray-700 mb-4">
                Late detection of crop and livestock diseases causes significant yield losses across Kenya.
              </p>
              <div className="text-2xl font-bold text-red-600">Serious Loss</div>
              <div className="text-sm text-gray-600">Preventable damage</div>
            </div>
          </div>
        </section>

        {/* Platform Readiness */}
        <section className="mb-16 bg-gray-900 text-white p-12 rounded-xl">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Ready for Launch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <div className="text-3xl font-bold text-green-400 mb-2">5M+</div>
              <div className="text-gray-300">Target Farmers</div>
              <div className="text-sm text-green-400">Smallholder farmers in Kenya</div>
            </div>
            <div className="text-center">
              <Target className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <div className="text-3xl font-bold text-blue-400 mb-2">26</div>
              <div className="text-gray-300">Products Ready</div>
              <div className="text-sm text-blue-400">Crops & livestock</div>
            </div>
            <div className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <div className="text-3xl font-bold text-purple-400 mb-2">47</div>
              <div className="text-gray-300">Counties</div>
              <div className="text-sm text-purple-400">Potential reach</div>
            </div>
            <div className="text-center">
              <Award className="w-12 h-12 mx-auto mb-4 text-orange-400" />
              <div className="text-3xl font-bold text-orange-400 mb-2">5</div>
              <div className="text-gray-300">Core Features</div>
              <div className="text-sm text-orange-400">Fully functional</div>
            </div>
          </div>
        </section>

        {/* Scaling Impact */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-12 rounded-xl text-center">
            <h2 className="text-3xl font-bold mb-6">Scaling Our Impact Across East Africa</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              We're building a platform to reach more farmers and create greater impact across the region. 
              Our technology solution is ready to help transform agriculture.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-2 text-gray-800">Next Phase</h3>
                <p className="text-3xl font-bold text-blue-600">Regional</p>
                <p className="text-sm text-gray-600">East Africa expansion</p>
              </div>
              <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-2 text-gray-800">Focus Areas</h3>
                <p className="text-lg font-semibold text-green-600">Technology</p>
                <p className="text-sm text-gray-600">AI, mobile, infrastructure</p>
              </div>
              <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-2 text-gray-800">Goal</h3>
                <p className="text-lg font-semibold text-purple-600">100K Farmers</p>
                <p className="text-sm text-gray-600">By 2027</p>
              </div>
            </div>
            <a
              href="mailto:partnerships@farmlink360.co.ke"
              className="inline-block bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition"
            >
              Partner With Us
            </a>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="font-semibold text-gray-800 mb-2">For Farmers</h3>
              <p className="text-gray-600 mb-2">Join our platform and start selling direct</p>
              <p className="text-green-600 font-semibold">farmers@farmlink360.co.ke</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-800 mb-2">For Stakeholders</h3>
              <p className="text-gray-600 mb-2">Learn about collaboration opportunities</p>
              <p className="text-blue-600 font-semibold">stakeholders@farmlink360.co.ke</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-800 mb-2">For Partners</h3>
              <p className="text-gray-600 mb-2">Collaborate with us to scale impact</p>
              <p className="text-purple-600 font-semibold">partnerships@farmlink360.co.ke</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-700">
              <strong>Phone:</strong> +254 700 123 456 | <strong>Address:</strong> Nairobi, Kenya
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
