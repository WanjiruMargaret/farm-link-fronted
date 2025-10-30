<<<<<<< HEAD
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault(); // prevent reload

    // Simulate successful signup (no backend yet)
    navigate("/dashboard"); // or "/login" if you prefer
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-4">
          Create an Account
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Join FarmLink 360 to start managing your farm digitally
        </p>

        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
=======
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Phone, MapPin, AlertCircle } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    farmSize: '',
    farmType: 'mixed',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const counties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Meru', 'Thika', 'Kiambu',
    'Machakos', 'Nyeri', 'Embu', 'Kakamega', 'Busia', 'Kisii', 'Nandi', 'Laikipia'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(\+254|0)[7-9]\d{8}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid Kenyan phone number';
    }
    
    if (!formData.location) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save user data
      localStorage.setItem('farmlink-user', JSON.stringify({
        ...formData,
        id: Date.now(),
        joinDate: new Date().toISOString()
      }));
      
      setToast({ message: 'Account created successfully! Redirecting...', type: 'success' });
      setTimeout(() => navigate('/marketplace'), 1000);
    } catch (error) {
      setToast({ message: 'Registration failed. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">F</span>
>>>>>>> 1d2cab2a3ed6cea1893f1f12ded2787c2a1c6849
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Join FarmLink 360</h1>
          <p className="text-gray-600">Start your digital farming journey today</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      errors.fullName ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.fullName && (
                  <div className="flex items-center mt-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.fullName}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <div className="flex items-center mt-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      errors.phone ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                    }`}
                    placeholder="+254 700 123 456"
                  />
                </div>
                {errors.phone && (
                  <div className="flex items-center mt-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.phone}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      errors.location ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                    }`}
                  >
                    <option value="">Select your county</option>
                    {counties.map(county => (
                      <option key={county} value={county}>{county}</option>
                    ))}
                  </select>
                </div>
                {errors.location && (
                  <div className="flex items-center mt-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.location}
                  </div>
                )}
              </div>
            </div>

            {/* Farm Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Farm Size (acres)</label>
                <input
                  type="number"
                  name="farmSize"
                  value={formData.farmSize}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Farm Type</label>
                <select
                  name="farmType"
                  value={formData.farmType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="crops">Crops Only</option>
                  <option value="livestock">Livestock Only</option>
                  <option value="mixed">Mixed Farming</option>
                  <option value="dairy">Dairy Farming</option>
                  <option value="poultry">Poultry Farming</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                    }`}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <div className="flex items-center mt-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.password}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      errors.confirmPassword ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className="flex items-center mt-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start">
              <input
                type="checkbox"
                required
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1"
              />
              <label className="ml-2 text-sm text-gray-600">
                I agree to the <span className="text-green-600 hover:underline cursor-pointer">Terms of Service</span> and{' '}
                <span className="text-green-600 hover:underline cursor-pointer">Privacy Policy</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" color="white" />
                  <span className="ml-2">Creating Account...</span>
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Signup;