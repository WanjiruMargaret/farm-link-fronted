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
          A farmer-first marketplace and management toolkit that removes
          middlemen, helps you manage crops and livestock, and uses AI to
          diagnose problems fast.
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

          <section className="text-center p-6 bg-green-100 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Why FarmLink 360?
            </h4>
            <p className="text-gray-700 mb-4">
              Middlemen often take large cuts and leave farmers with low
              profits. FarmLink 360 empowers farmers with tools to sell direct,
              manage their operations, and get rapid AI-powered insights so they
              can increase yield and income.
            </p>

            <div className="flex justify-center gap-3">
              <Link
                to="/login"
                className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Already have an account? Log in
              </Link>
              <Link
                to="/signup"
                className="px-6 py-3 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
                aria-label="Sign up for FarmLink 360"
              >
                Sign Up -- Get Started
              </Link>
            </div>

            <Link to="/about" className="text-gray-700 hover:underline">
              Learn More
            </Link>
          </section>
        </main>
      </header>
    </div>
  );
}
