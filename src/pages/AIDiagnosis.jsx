import React, { useState } from 'react';
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