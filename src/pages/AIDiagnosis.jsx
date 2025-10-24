import React, { useState } from "react";
import { CloudUpload } from "lucide-react";

export default function AiDiagnosis() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [symptoms, setSymptoms] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedImage(URL.createObjectURL(file));
  };

  const handleAnalyse = () => {
    if (!selectedImage) {
      alert("Please upload an image before analysis.");
      return;
    }
    alert("Analyzing image and symptoms...");
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6">AI Diagnosis</h2>

      <label className="flex flex-col items-center justify-center w-64 h-64 bg-white rounded-2xl shadow-md border-2 border-dashed border-green-400 cursor-pointer hover:bg-green-100 transition duration-300">
        <CloudUpload className="w-16 h-16 text-green-500 mb-2" />
        <p className="text-gray-600">Click to upload image</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      {selectedImage && (
        <div className="mt-6">
          <img
            src={selectedImage}
            alt="Preview"
            className="w-64 h-64 object-cover rounded-2xl shadow-md"
          />
        </div>
      )}

      <textarea
        placeholder="Describe any additional symptoms..."
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        className="w-full max-w-md mt-6 p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <button
        onClick={handleAnalyse}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
      >
        Analyse
      </button>
    </div>
  );
}
