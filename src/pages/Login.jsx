import React from "react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-green-800 mb-4 text-center">
          Welcome Back!
        </h2>
        <p className="text-green-700 mb-6 text-center">
          Log in to continue managing your farm
        </p>

        <form className="space-y-4">
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
              required
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-green-700 font-medium mb-1"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
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
              required
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500"
            />
          </div>

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
