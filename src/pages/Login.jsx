import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Call backend API
      const data = await loginUser(formData.email, formData.password);

      // Save JWT token (if backend sends one)
      localStorage.setItem("token", data.access_token);

      // Redirect to dashboard/home
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-green-800 mb-4 text-center">
          Welcome Back!
        </h2>
        <p className="text-green-700 mb-6 text-center">
          Log in to continue managing your farm
        </p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-green-700 font-medium mb-1"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-green-700 font-medium mb-1"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Login
          </button>

          <div className="flex justify-between mt-2">
            <label className="flex items-center space-x-2 text-green-600">
              <input
                type="checkbox"
                className="form-checkbox h4 w4 text-green 600"
              />
              <span>Remember Me</span>
            </label>
            <button type="button" className="text-green-600 hover:underline">
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
