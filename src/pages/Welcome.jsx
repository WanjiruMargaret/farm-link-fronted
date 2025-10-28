import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 p-6">
      <header className="w-full max-w-4xl text-center py-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <img
            src="/images/logo.png"
            alt="FarmLink 360 logo"
            className="w-18 h-18 mb-4"
          />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-green-800 mb-4">
            FarmLink 360
          </h1>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          The Complete Digital Farm Companion
        </h2>

        <p className="text-lg sm:text-xl text-gray-700 mb-6">
          Connecting Kenyan farmers directly to markets through smart technology. 
          Eliminate middlemen, reduce waste, and increase farm profitability with AI-powered tools and community support.
        </p>

        <main className="w-full max-w-4xl">
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <article className="p-6 bg-green-300 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Marketplace
              </h3>
              <p className="text-gray-600">
                Sell your produce directly to buyers on our marketplace. No
                middlemen, fair pricing, and transparent transactions so you
                keep more of your profit.
              </p>
            </article>

            <article className="p-6 bg-green-300 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Community
              </h3>
              <p className="text-gray-600">
                Connect with other farmers to share tips, ask questions, and
                support each other. Build a stronger farming community together.
              </p>
            </article>

            <article className="p-6 bg-green-300 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Record
              </h3>
              <p className="text-gray-600">
                Track planting, harvesting, feed, and health records in one
                place to better manage yields and costs.
              </p>
            </article>

            <article className="p-6 bg-green-300 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Weather Alerts
              </h3>
              <p className="text-gray-600">
                Get real-time weather updates and alerts tailored to your farm's
                location. Prepare for adverse conditions and protect your crops
                and livestock.
              </p>
            </article>

            <article className="p-6 bg-green-300 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                AI Diagnosis
              </h3>
              <p className="text-gray-600">
                Upload a photo of an animal or crop showing symptoms and our AI
                will analyze likely causes and suggest next steps — a fast first
                look for better on-farm decisions.
              </p>
            </article>

            <article className="p-6 bg-green-300 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                About & Support
              </h3>
              <p className="text-gray-600">
                Learn more about FarmLink 360's mission, how it supports
                farmers, and how to get help or provide feedback to improve the
                platform.
              </p>
            </article>
          </section>

          {/* Problem & Solution */}
          <section className="mb-10 bg-white p-8 rounded-lg shadow-md">
            <h4 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Solving Real Problems for Kenyan Farmers
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h5 className="text-lg font-semibold text-red-600 mb-4">Current Challenges</h5>
                <div className="space-y-3">
                  <div className="bg-red-50 p-3 rounded">
                    <div className="font-semibold text-gray-800">Middlemen Take Large Cuts</div>
                    <div className="text-sm text-gray-600">Farmers often sell far below market price</div>
                    <div className="text-red-600 font-bold">Major income loss</div>
                  </div>
                  <div className="bg-red-50 p-3 rounded">
                    <div className="font-semibold text-gray-800">Post-Harvest Waste</div>
                    <div className="text-sm text-gray-600">Produce spoils due to poor market access</div>
                    <div className="text-red-600 font-bold">Significant losses</div>
                  </div>
                  <div className="bg-red-50 p-3 rounded">
                    <div className="font-semibold text-gray-800">Disease & Pest Damage</div>
                    <div className="text-sm text-gray-600">Late detection reduces crop yields</div>
                    <div className="text-red-600 font-bold">Preventable losses</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="text-lg font-semibold text-green-600 mb-4">FarmLink Solutions</h5>
                <div className="space-y-3">
                  <div className="bg-green-50 p-3 rounded">
                    <div className="font-semibold text-gray-800">Direct Market Access</div>
                    <div className="text-sm text-gray-600">Connect directly with buyers</div>
                    <div className="text-green-600 font-bold">Higher farmer income</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <div className="font-semibold text-gray-800">AI Disease Detection</div>
                    <div className="text-sm text-gray-600">Early detection and treatment advice</div>
                    <div className="text-green-600 font-bold">Better crop health</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <div className="font-semibold text-gray-800">Smart Timing</div>
                    <div className="text-sm text-gray-600">Market insights for better decisions</div>
                    <div className="text-green-600 font-bold">Reduced waste</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Farmer Benefits */}
          <section className="mb-10 bg-gradient-to-r from-blue-600 to-green-600 text-white p-8 rounded-lg">
            <h4 className="text-xl font-bold mb-6 text-center text-white">Why Farmers Choose FarmLink</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center bg-white text-gray-800 p-4 rounded shadow-md">
                <div className="text-2xl font-bold text-blue-600">💰</div>
                <div className="text-sm text-gray-600">Higher Prices</div>
                <div className="font-semibold text-gray-800">Sell direct to buyers</div>
              </div>
              <div className="text-center bg-white text-gray-800 p-4 rounded shadow-md">
                <div className="text-2xl font-bold text-green-600">🤖</div>
                <div className="text-sm text-gray-600">AI Help</div>
                <div className="font-semibold text-gray-800">Instant disease detection</div>
              </div>
              <div className="text-center bg-white text-gray-800 p-4 rounded shadow-md">
                <div className="text-2xl font-bold text-purple-600">👥</div>
                <div className="text-sm text-gray-600">Community</div>
                <div className="font-semibold text-gray-800">Learn from other farmers</div>
              </div>
              <div className="text-center bg-white text-gray-800 p-4 rounded shadow-md">
                <div className="text-2xl font-bold text-orange-600">📱</div>
                <div className="text-sm text-gray-600">Easy to Use</div>
                <div className="font-semibold text-gray-800">Works on any phone</div>
              </div>
            </div>
          </section>

          <section className="text-center p-6 bg-green-100 rounded-lg">
            <h4 className="text-2xl font-bold text-gray-800 mb-4">
              Join the Agricultural Revolution
            </h4>
            <p className="text-gray-700 mb-6">
              We're building the future of farming in Kenya and across East Africa. 
              Join us in creating a more efficient, profitable, and sustainable agricultural ecosystem.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
              <Link
                to="/login"
                className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Farmer Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-3 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
              >
                Join as Farmer
              </Link>
              <a
                href="mailto:partnerships@farmlink360.co.ke"
                className="px-6 py-3 bg-gray-600 text-white rounded-md shadow hover:bg-gray-700"
              >
                Partner With Us
              </a>
            </div>

            <Link to="/about" className="text-gray-700 hover:underline">
              Learn More About Our Mission
            </Link>
          </section>
        </main>
      </header>
    </div>
  );
}
