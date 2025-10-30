import React from "react";
import { Routes, Route } from "react-router-dom";
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