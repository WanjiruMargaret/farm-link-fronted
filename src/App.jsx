import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";
import InstallPrompt from "./components/InstallPrompt";
import OfflineIndicator from "./components/OfflineIndicator";

// Lazy load components for better performance
const Welcome = lazy(() => import("./pages/Welcome"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AIDiagnosis = lazy(() => import("./pages/AIDiagnosis"));
const Records = lazy(() => import("./pages/Records"));
const About = lazy(() => import("./pages/About"));
const Home = lazy(() => import('./pages/Home'));
const CommunityHub = lazy(() => import('./pages/CommunityHub'));
const Profile = lazy(() => import('./pages/Profile'));
const Marketplace = lazy(() => import('./pages/Marketplace'));
const Cart = lazy(() => import('./pages/Cart'));

const MarketPrices = lazy(() => import('./pages/MarketPrices'));
const FarmFinance = lazy(() => import('./pages/FarmFinance'));
const MyProducts = lazy(() => import('./pages/MyProducts'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);
import { FirebaseProvider } from "./contexts/FirebaseContext.jsx"; // ✅ Added .jsx extension
import Welcome from "./pages/Welcome.jsx"; // ✅ Added .jsx extension
import Login from "./pages/Login.jsx"; // ✅ Added .jsx extension
import Signup from "./pages/Signup.jsx"; // ✅ Added .jsx extension
import Dashboard from "./pages/Dashboard.jsx"; // ✅ Added .jsx extension
import AIDiagnosis from "./pages/AIDiagnosis.jsx"; // ✅ Added .jsx extension
import Records from "./pages/Records.jsx"; // ✅ Added .jsx extension
import About from "./pages/About.jsx"; // ✅ Added .jsx extension
import Home from "./pages/Home.jsx"; // ✅ Added .jsx extension
import CommunityHub from "./pages/CommunityHub.jsx"; // ✅ Added .jsx extension
import Profile from "./pages/Profile.jsx"; // ✅ Added .jsx extension
import Marketplace from "./pages/Marketplace.jsx"; // ✅ Added .jsx extension
import NotificationsPage from "./pages/NotificationsPage.jsx"; // ✅ Added .jsx extension

function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <Suspense fallback={<PageLoader />}>
          <OfflineIndicator />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ai-diagnosis" element={<AIDiagnosis />} />
            <Route path="/records" element={<Records />} />
            <Route path="/about" element={<About />} />
            <Route path="/home" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/community" element={<CommunityHub />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="/market-prices" element={<MarketPrices />} />
            <Route path="/finance" element={<FarmFinance />} />
            <Route path="/my-products" element={<MyProducts />} />
          </Routes>
          <InstallPrompt />
        </Suspense>
      </CartProvider>
    </ErrorBoundary>
  );
  return (
    <FirebaseProvider> {/* 👈 Wrap all routes with the Provider */}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-diagnosis" element={<AIDiagnosis />} />
        <Route path="/records" element={<Records />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/community" element={<CommunityHub />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Routes>
    </FirebaseProvider>
 );
}

export default App;