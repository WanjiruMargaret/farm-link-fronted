import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AIDiagnosis from "./pages/AIDiagnosis";
import Records from "./pages/Records";
import About from "./pages/About";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/ai-diagnosis" element={<AIDiagnosis />} />
      <Route path="/records" element={<Records />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
export default App;
