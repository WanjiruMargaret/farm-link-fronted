import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { FirebaseProvider } from "./contexts/FirebaseContext"; // Consolidated Import
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
// 👈 Added the missing component from your second block
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'));


// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      {/* 1. Wrap entire app with FirebaseProvider for authentication/DB access */}
      <FirebaseProvider> 
        {/* 2. Wrap main application components with CartProvider for state management */}
        <CartProvider>
          {/* 3. Wrap everything that uses lazy loading with Suspense */}
          <Suspense fallback={<PageLoader />}>
            <OfflineIndicator />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected/Main App Routes */}
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />

              {/* Farming Tools */}
              <Route path="/ai-diagnosis" element={<AIDiagnosis />} />
              <Route path="/records" element={<Records />} />
              <Route path="/finance" element={<FarmFinance />} />

              {/* Marketplace & Commerce */}
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/market-prices" element={<MarketPrices />} />
              <Route path="/my-products" element={<MyProducts />} />

              {/* Community & Notifications */}
              <Route path="/community" element={<CommunityHub />} />
              <Route path="/notifications" element={<NotificationsPage />} />
          </Routes>
          <InstallPrompt />
        </Suspense>
      </CartProvider>
      </FirebaseProvider>
    </ErrorBoundary>
  );
}

export default App;