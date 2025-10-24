import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex flex-wrap justify-center sm:justify-end w-full sm:w-auto space-x-4">
      <Link
        to="/marketplace"
        className="hover:text-green-200 transition font-medium"
      >
        Marketplace
      </Link>

      <Link
        to="/community"
        className="hover:text-green-200 transition font-medium"
      >
        Community
      </Link>

      <Link to="/crops" className="hover:text-green-200 transition font-medium">
        Crops
      </Link>

      <Link
        to="/livestock"
        className="hover:text-green-200 transition font-medium"
      >
        Livestock
      </Link>

      <Link
        to="/ai-diagnosis"
        className="hover:text-green-200 transition font-medium"
      >
        AI Diagnosis
      </Link>

      <Link
        to="/profile"
        className="hover:text-green-200 transition font-medium"
      >
        Profile
      </Link>
    </div>
  );
}
