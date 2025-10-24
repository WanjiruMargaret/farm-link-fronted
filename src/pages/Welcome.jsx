import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">FarmLink 360</h1>

      <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
        The Complete Digital Farm Companion
      </h2>

      <div className="flex gap-4 mb-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-6 py-2 bg-green-100 text-gray-800 rounded hover:bg-green-200"
        >
          Sign Up
        </Link>
      </div>

      <Link to="/about" className="text-gray-700 hover:underline">
        Learn More
      </Link>
    </div>
  );
}
