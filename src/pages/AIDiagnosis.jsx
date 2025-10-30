import React, { useState } from 'react';
import { CloudUpload, Camera, AlertTriangle, CheckCircle, Lightbulb, Phone } from 'lucide-react';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import apiService from '../services/api';

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
      },
      {
        name: 'Bean Rust',
        symptoms: ['Orange spots on leaves', 'Leaf drop'],
        treatment: 'Apply fungicide, plant resistant varieties',
        severity: 'medium'
      }
    ],
    livestock: [
      {
        name: 'Newcastle Disease',
        symptoms: ['Respiratory distress', 'Diarrhea', 'Nervous signs'],
        treatment: 'Vaccination, isolate affected birds, consult vet',
        severity: 'high'
      },
      {
        name: 'Mastitis',
        symptoms: ['Swollen udder', 'Abnormal milk', 'Fever'],
        treatment: 'Antibiotic treatment, improve hygiene',
        severity: 'medium'
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
      confidence: Math.floor(Math.random() * 30) + 70, // 70-99%
      symptoms: randomDisease.symptoms,
      treatment: randomDisease.treatment,
      severity: randomDisease.severity,
      recommendations: [
        'Monitor affected area daily',
        'Take photos to track progress',
        'Consult local agricultural officer if symptoms worsen',
        'Keep detailed records for future reference'
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
      const formData = new FormData();
      
      if (selectedImage) {
        // Get the actual file from the input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput.files[0]) {
          formData.append('image', fileInput.files[0]);
        }
      }
      
      formData.append('symptoms', symptoms);
      formData.append('diagnosisType', diagnosisType);
      
      const diagnosis = await apiService.submitDiagnosis(formData);
      setResult(diagnosis);
      setToast({ message: 'Analysis complete!', type: 'success' });
    } catch (error) {
      console.error('Diagnosis failed:', error);
      // Fallback to simulation if API fails
      const diagnosis = simulateAIAnalysis();
      setResult(diagnosis);
      setToast({ message: 'Using offline analysis (API unavailable)', type: 'warning' });
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
        {/* Info Banner */}
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
          {/* Upload Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Upload Image for Analysis</h2>
            
            {/* Type Selection */}
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

            {/* Method Selection */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Choose how to describe the problem:</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-gray-300 rounded-lg p-4 text-center">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="font-medium text-gray-700">Upload Photo</p>
                  <p className="text-xs text-gray-500">Take a picture of the problem</p>
                </div>
                <div className="border-2 border-green-500 bg-green-50 rounded-lg p-4 text-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white text-sm font-bold">Aa</span>
                  </div>
                  <p className="font-medium text-green-700">Describe Problem</p>
                  <p className="text-xs text-green-600">Tell us what you see</p>
                </div>
              </div>
            </div>

            {/* Photo Upload Option */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Option 1: Upload Photo (Optional)</label>
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
import React, { useState } from 'react';
import { CloudUpload, Zap, Loader, AlertTriangle, BookOpen, MessageSquare, Trash2 } from "lucide-react";

// 🛑 CORRECTED IMPORTS:
// 1. Hook from Context
import { useFirebase } from '../contexts/FirebaseContext'; 
// 2. Component from 'components' folder
import LoadingScreen from '../components/LoadingScreen'; 
// 3. Utility from 'utils' folder
import { renderMarkdown } from '../utils/markdownUtils'; 

// Assuming your Flask backend is accessible at the root path (/)
const API_BASE_URL = "http://localhost:5000/api/"; 

/**
 * Handles the multimodal request for plant diagnosis.
 * NOTE: This function does NOT save the record, the FLASK BACKEND handles this in geminiroutes.py.
 */
const diagnosePlant = async (userId, query, image) => {
    const API_URL = `${API_BASE_URL}gemini/ask`; 
    
    // We should implement exponential backoff for robustness, but for now, we proceed with a simple fetch.
    const payload = {
        user_id: userId,
        query: query,
        image: image,
    };

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to get diagnosis from server (Status: ${response.status}).`);
    }

    return await response.json(); 
};


export default function AIDiagnosis() {
    // These values come from your FirebaseContext.jsx via the hook
    const { userId, isAuthReady, authError } = useFirebase(); 
    const [selectedFile, setSelectedFile] = useState(null); 
    const [imageBase64, setImageBase64] = useState(null); 
    const [symptoms, setSymptoms] = useState("");
    const [loading, setLoading] = useState(false);
    const [diagnosis, setDiagnosis] = useState(null);
    const [error, setError] = useState(null);
    
    // Custom alert function (replacing window.alert)
    const showMessage = (msg) => setError(msg);

    if (authError) return <div className="p-10 text-center text-red-700">{authError}</div>;
    // LoadingScreen is now imported correctly and this conditional check will work
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
            // Extract the base64 part only
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
                throw new Error(result.error || `Flask error: Status ${response.status}`);
            }

            // 3. Display the AI response
            setDiagnosis(result.response);
            setSymptoms(""); // Clear symptoms after successful submission
            removeImage(); // Clear image after successful submission
        } catch (err) {
            console.error("Analysis Error:", err);
            setError(`Analysis failed. Please ensure your Flask backend is running. Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // --- RENDER FUNCTION (Preserving original styling) ---
    return (
        <div className="min-h-screen bg-green-50 flex flex-col items-center p-6 sm:p-10">
            {/* Title (Kept original styling) */}
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

            {/* Text Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Option 2: Describe the Problem
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={diagnosisType === 'crop' ? 
                  "Describe what you see: Are leaves turning yellow? Any spots or holes? Is the plant wilting? When did you first notice the problem?" :
                  "Describe the symptoms: Is the animal eating normally? Any unusual behavior? Discharge from eyes/nose? When did symptoms start?"
                }
              />
              <p className="text-xs text-gray-500 mt-1">
                The more details you provide, the better our diagnosis will be
              </p>
            </div>

            {/* Analyze Button */}
            <button
              onClick={handleAnalyse}
              disabled={loading}
              className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-50 flex items-center justify-center"
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

          {/* Results Section */}
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
                <p className="text-gray-500 text-sm">This may take a few moments</p>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                {/* Disease Identification */}
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

                {/* Symptoms */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Identified Symptoms:</h4>
                  <ul className="space-y-1">
                    {result.symptoms.map((symptom, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Treatment */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Recommended Treatment:</h4>
                  <p className="text-gray-700 bg-green-50 p-3 rounded-lg">{result.treatment}</p>
                </div>

                {/* Recommendations */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Next Steps:</h4>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Emergency Contact */}
                {result.severity === 'high' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Phone className="w-5 h-5 text-red-600 mr-2" />
                      <h4 className="font-medium text-red-800">Urgent: Contact Veterinarian</h4>
                    </div>
                    <p className="text-red-700 text-sm">This condition requires immediate professional attention.</p>
                    <p className="text-red-600 font-medium mt-1">Emergency Vet: +254 700 123 456</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <p className="text-yellow-800 text-sm">
            <strong>Disclaimer:</strong> This AI diagnosis is for guidance only. Always consult with agricultural experts or veterinarians for serious conditions.
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
                            {renderMarkdown(diagnosis)} 
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}