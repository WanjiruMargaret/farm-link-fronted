export default function About() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-green-700 mb-4">
        About FarmLink 360
      </h1>

      <p className="max-w-2xl text-gray-700 text-center mb-6">
        FarmLink 360 is your all-in-one digital farm companion designed to
        simplify farm management. Our mission is to empower farmers with smart
        tools for managing crops, livestock, and market access — all from one
        easy-to-use platform.
      </p>

      <p className="max-w-2xl text-gray-700 text-center mb-6">
        The platform enables farmers to easily diagnose crop and livestock
        diseases using AI, track their farm performance, and connect directly to
        buyers — reducing losses caused by middlemen and poor information
        access.
      </p>

      <p className="max-w-2xl text-gray-700 text-center">
        Core features include AI-powered disease detection, real-time market
        prices, weather updates, and a digital marketplace — all accessible from
        both web and mobile devices.
      </p>

      <button
        onClick={() => (window.location.href = "/")}
        className="mt-8 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
      >
        Back to Home
      </button>
    </div>
  );
}
