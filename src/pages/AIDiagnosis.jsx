import React, { useState } from 'react';
<<<<<<< HEAD
import { CloudUpload, Camera, AlertTriangle, CheckCircle, Lightbulb, Phone } from 'lucide-react';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';

const AIDiagnosis = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [symptoms, setSymptoms] = useState('');
  const [diagnosisType, setDiagnosisType] = useState('crop');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [toast, setToast] = useState(null);

  const commonDiseases = {
    crop: [
      {
        name: 'Tomato Blight',
        symptoms: ['Dark spots on leaves', 'Yellow edges', 'Wilting'],
        treatment: 'Apply copper-based fungicide, improve air circulation',
        severity: 'high'
      },
      {
        name: 'Maize Streak Virus',
        symptoms: ['Yellow streaks on leaves', 'Stunted growth'],
        treatment: 'Remove infected plants, control leafhopper vectors',
        severity: 'medium'
      }
    ],
    livestock: [
      {
        name: 'Newcastle Disease',
        symptoms: ['Respiratory distress', 'Diarrhea', 'Nervous signs'],
        treatment: 'Vaccination, isolate affected birds, consult vet',
        severity: 'high'
      }
    ]
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const simulateAIAnalysis = () => {
    const diseases = commonDiseases[diagnosisType];
    const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
    
    return {
      disease: randomDisease.name,
      confidence: Math.floor(Math.random() * 30) + 70,
      symptoms: randomDisease.symptoms,
      treatment: randomDisease.treatment,
      severity: randomDisease.severity,
      recommendations: [
        'Monitor affected area daily',
        'Take photos to track progress',
        'Consult local agricultural officer if symptoms worsen'
      ]
    };
  };

  const handleAnalyse = async () => {
    if (!selectedImage && !symptoms.trim()) {
      setToast({ message: 'Please upload a photo OR describe the problem', type: 'error' });
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      const diagnosis = simulateAIAnalysis();
      setResult(diagnosis);
      setToast({ message: 'Analysis complete!', type: 'success' });
    } catch (error) {
      setToast({ message: 'Analysis failed. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">AI Disease Diagnosis</h1>
          <Navbar />
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <Lightbulb className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-800">How it works</h3>
              <p className="text-blue-700 text-sm mt-1">
                Upload a clear photo of affected crops or livestock. Our AI analyzes symptoms and provides treatment recommendations.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Upload Image for Analysis</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">What are you diagnosing?</label>
              <div className="flex space-x-4">
                <button
                  onClick={() => setDiagnosisType('crop')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition ${
                    diagnosisType === 'crop'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  🌱 Crops
                </button>
                <button
                  onClick={() => setDiagnosisType('livestock')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition ${
                    diagnosisType === 'livestock'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  🐄 Livestock
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo (Optional)</label>
              <label className="flex flex-col items-center justify-center w-full h-48 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <CloudUpload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-gray-600 font-medium">Click to upload photo</p>
                    <p className="text-gray-500 text-xs">JPG, PNG up to 10MB</p>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe the Problem
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={diagnosisType === 'crop' ? 
                  "Describe what you see: Are leaves turning yellow? Any spots or holes?" :
                  "Describe the symptoms: Is the animal eating normally? Any unusual behavior?"
                }
              />
            </div>

            <button
              onClick={handleAnalyse}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" color="white" />
                  <span className="ml-2">Analyzing...</span>
                </>
              ) : (
                'Analyze with AI'
              )}
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Diagnosis Results</h2>
            
            {!result && !loading && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔬</div>
                <p className="text-gray-500 mb-2">Upload a photo OR describe the problem</p>
                <p className="text-gray-400 text-sm">Our AI will analyze and provide treatment recommendations</p>
              </div>
            )}

            {loading && (
              <div className="text-center py-12">
                <LoadingSpinner size="lg" />
                <p className="text-gray-600 mt-4">AI is analyzing your image...</p>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                <div className={`p-4 rounded-lg border-l-4 ${
                  result.severity === 'high' ? 'bg-red-50 border-red-500' : 'bg-yellow-50 border-yellow-500'
                }`}>
                  <div className="flex items-center mb-2">
                    {result.severity === 'high' ? (
                      <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-yellow-600 mr-2" />
                    )}
                    <h3 className="font-bold text-gray-800">{result.disease}</h3>
                  </div>
                  <p className="text-sm text-gray-600">Confidence: {result.confidence}%</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Treatment:</h4>
                  <p className="text-gray-700 bg-green-50 p-3 rounded-lg">{result.treatment}</p>
                </div>

                {result.severity === 'high' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Phone className="w-5 h-5 text-red-600 mr-2" />
                      <h4 className="font-medium text-red-800">Contact Professional</h4>
                    </div>
                    <p className="text-red-700 text-sm">This condition requires immediate attention.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <p className="text-yellow-800 text-sm">
            <strong>Disclaimer:</strong> This AI diagnosis is for guidance only. Always consult with agricultural experts.
          </p>
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

export default AIDiagnosis;
=======
import { Zap, Loader, AlertTriangle, BookOpen, MessageSquare, Trash2, CloudUpload } from "lucide-react";

// 🛑 IMPORTANT: These imports must match your file structure.
// 1. Hook from Context
import { useFirebase } from '../contexts/FirebaseContext'; 
// 2. Component from 'components' folder (assuming you created this file)
import LoadingScreen from '../components/LoadingScreen'; 
// 3. Utility from 'utils' folder (assuming you created this file)
import { renderMarkdown } from '../utils/markdownUtils'; 

// Assuming your Flask backend is accessible at the root path (/)
const API_BASE_URL = "http://localhost:5000/api/"; 


export default function AIDiagnosis() {
    // These values come from your FirebaseContext.jsx via the hook
    const { userId, isAuthReady, authError } = useFirebase(); 
    const [selectedFile, setSelectedFile] = useState(null); 
    const [imageBase64, setImageBase64] = useState(null); 
    const [symptoms, setSymptoms] = useState("");
    const [loading, setLoading] = useState(false);
    const [diagnosis, setDiagnosis] = useState(null);
    const [error, setError] = useState(null);
    
    // Custom alert function (replacing window.alert for consistent error display)
    const showMessage = (msg) => setError(msg);

    // --- Authentication and Loading Checks ---
    if (authError) return <div className="p-10 text-center text-red-700">{authError}</div>;
    if (!isAuthReady || !userId) return <LoadingScreen />;

    // --- Image Handling & Base64 Conversion ---
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file || !file.type.startsWith('image/')) {
            showMessage("Please select a valid image file.");
            return;
        }

        setSelectedFile(file);
        setError(null);
        setDiagnosis(null); // Clear old results

        // Convert file to Base64 for the API payload
        const reader = new FileReader();
        reader.onload = (event) => {
            // Extract the base64 part only (removing the "data:image/jpeg;base64," prefix)
            const base64 = event.target.result.split(',')[1];
            setImageBase64(base64);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setSelectedFile(null);
        setImageBase64(null);
        // Reset the file input field (important for re-uploading the same file)
        document.getElementById("image-upload").value = null; 
    };

    // --- Core Analysis Logic (The necessary fetch call) ---
    const handleAnalyse = async () => {
        if (!selectedFile && !symptoms.trim()) {
            showMessage("Please upload an image or describe the symptoms.");
            return;
        }

        setLoading(true);
        setDiagnosis(null);
        setError(null);

        try {
            // 1. Prepare the multimodal payload for the Flask /gemini/ask route
            const payload = {
                user_id: userId, // Include userId for Flask to save history
                query: symptoms.trim() || "Analyze the attached image for any plant disease or issue.",
                image: imageBase64 ? {
                    base64: imageBase64,
                    // ✅ FIX: Ensure mimeType is included for the Flask backend to correctly process the image.
                    mimeType: selectedFile.type, 
                } : undefined,
            };

            // 2. Call the Flask endpoint
            const response = await fetch(`${API_BASE_URL}gemini/ask`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok) {
                // If Flask returns a 500, the error property will contain the detailed traceback/message
                throw new Error(result.error || `Flask error: Status ${response.status}`);
            }

            // 3. Display the AI response
            setDiagnosis(result.response);
            // setSymptoms(""); // Optionally keep symptoms if user wants to see their input
            removeImage(); // Clear image after successful submission
        } catch (err) {
            console.error("Analysis Error:", err);
            setError(`Analysis failed. Please ensure your Flask backend is running and the GEMINI_API_KEY is set. Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // --- RENDER FUNCTION (Preserving original styling) ---
    return (
        <div className="min-h-screen bg-green-50 flex flex-col items-center p-6 sm:p-10">
            {/* Title */}
            <h2 className="text-3xl font-bold text-green-700 mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6" /> AI Plant Diagnosis
            </h2>
            <p className="text-gray-500 mb-4">User ID: <code className="font-mono bg-gray-200 p-1 rounded text-sm">{userId}</code></p>

            {/* Main Content Area */}
            <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-2xl border border-gray-100">
                {/* Image Upload Area */}
                <label 
                    htmlFor="image-upload" 
                    className="flex flex-col items-center justify-center w-full h-40 bg-white rounded-2xl shadow-inner border-2 border-dashed border-green-400 cursor-pointer hover:bg-green-100 transition duration-300"
                >
                    <CloudUpload className="w-10 h-10 text-green-500 mb-2" />
                    <p className="text-gray-600 font-medium text-center px-4">
                        {selectedFile ? `File: ${selectedFile.name}` : "Click to upload an image of the affected plant"}
                    </p>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        disabled={loading}
                    />
                </label>

                {/* Image Preview (Updated to use selectedFile and include remove button) */}
                {selectedFile && (
                    <div className="mt-6 relative">
                        <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Preview"
                            className="w-full h-auto object-cover rounded-2xl shadow-md border border-gray-200"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 shadow-md hover:bg-red-600 transition"
                            aria-label="Remove image"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                )}

                <div className="my-6 text-center text-gray-500 font-semibold">
                    --- OR ---
                </div>

                {/* Textarea (Kept original styling) */}
                <textarea
                    placeholder="Describe symptoms or ask a related question (e.g., 'My tomato leaves are yellowing')."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    rows={4}
                    className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 resize-none"
                    disabled={loading}
                />

                {/* Analyse Button (Updated with loading state) */}
                <button
                    onClick={handleAnalyse}
                    className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-300 shadow-lg flex items-center justify-center gap-2 disabled:bg-green-300"
                    disabled={loading || (!selectedFile && !symptoms.trim())}
                >
                    {loading ? (
                        <>
                            <Loader className="w-5 h-5 animate-spin" />
                            Diagnosing...
                        </>
                    ) : (
                        <>
                            <MessageSquare className="w-5 h-5" />
                            Get Diagnosis
                        </>
                    )}
                </button>
            </div>

            {/* Diagnosis Result Area */}
            {(diagnosis || error) && (
                <div className="w-full max-w-md mt-8 p-6 bg-white rounded-xl shadow-2xl border-t-4 border-green-500">
                    <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                        <BookOpen className="w-5 h-5" /> Diagnosis Result
                    </h3>
                    
                    {/* Error Box */}
                    {error && (
                        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5" />
                            <p className="text-sm font-semibold">{error}</p>
                        </div>
                    )}

                    {/* Diagnosis Output */}
                    {diagnosis && (
                        <div className="text-base leading-relaxed mt-3 space-y-3">
                            {/* Assuming renderMarkdown takes the raw string response and converts it */}
                            {renderMarkdown(diagnosis)} 
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
>>>>>>> 1d10a388827edf4f2535fc29f1ac72f5fb2e86df
