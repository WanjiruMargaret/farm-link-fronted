
// Added Zap, Loader, MessageSquare, Trash2 for better UI feedback
import { CloudUpload, Zap, Loader, MessageSquare, Trash2 } from "lucide-react";

// Assuming your Flask backend is accessible at the root path (/)
const API_BASE_URL = "http://localhost:5000/api/"; 

// Renaming to match common convention, but feel free to rename back to AiDiagnosis
export default function AIDiagnosisPage() {
    // UPDATED: Now stores the File object, Base64 string, loading/result states
    const [selectedFile, setSelectedFile] = useState(null); 
    const [imageBase64, setImageBase64] = useState(null); 
    const [symptoms, setSymptoms] = useState("");
    const [loading, setLoading] = useState(false);
    const [diagnosis, setDiagnosis] = useState(null);
    const [error, setError] = useState(null);

    // --- Image Handling & Base64 Conversion ---
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file || !file.type.startsWith('image/')) {
            alert("Please select a valid image file.");
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
            alert("Please upload an image or describe the symptoms.");
            return;
        }

        setLoading(true);
        setDiagnosis(null);
        setError(null);

        try {
            // 1. Prepare the multimodal payload for the Flask /gemini/ask route
            const payload = {
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
        } catch (err) {
            console.error("Analysis Error:", err);
            setError(`Analysis failed. Please ensure your Flask backend is running. Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Helper to render basic markdown for a cleaner result output
    const renderMarkdown = (text) => {
        if (!text) return null;
        return text.split('\n').map((line, index) => {
            let content = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
             if (content.match(/^### /)) {
                return <h4 key={index} className="text-xl font-semibold text-green-700 mt-4 mb-2">{content.substring(4)}</h4>
            }
            if (content.match(/^## /)) {
                return <h3 key={index} className="text-2xl font-bold text-green-800 mt-6 mb-3">{content.substring(3)}</h3>
            }
            return <p key={index} className="text-gray-700 leading-relaxed my-1">{content}</p>;
        });
    };

    // --- RENDER FUNCTION (Preserving original styling) ---
    return (
        <div className="min-h-screen bg-green-50 flex flex-col items-center p-6 sm:p-10">
            {/* Title (Kept original styling) */}
            <h2 className="text-3xl font-bold text-green-700 mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6" /> AI Diagnosis
            </h2>

            {/* Main Content Area */}
            <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">

                {/* Image Upload Area */}
                <label 
                    htmlFor="image-upload" 
                    className="flex flex-col items-center justify-center w-full h-40 bg-white rounded-2xl shadow-inner border-2 border-dashed border-green-400 cursor-pointer hover:bg-green-100 transition duration-300"
                >
                    <CloudUpload className="w-10 h-10 text-green-500 mb-2" />
                    <p className="text-gray-600 font-medium">
                        {selectedFile ? `File: ${selectedFile.name}` : "Click to upload image"}
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

                {/* Textarea (Kept original styling) */}
                <textarea
                    placeholder="Describe any additional symptoms..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    rows={4}
                    className="w-full max-w-md mt-6 p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    disabled={loading}
                />

                {/* Analyse Button (Updated with loading state) */}
                <button
                    onClick={handleAnalyse}
                    className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md flex items-center justify-center gap-2 disabled:bg-gray-400"
                    disabled={loading || (!selectedFile && !symptoms.trim())}
                >
                    {loading ? (
                        <>
                            <Loader className="w-5 h-5 animate-spin" />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <MessageSquare className="w-5 h-5" />
                            Analyse
                        </>
                    )}
                </button>
            </div>

            {/* Diagnosis Result Area */}
            {(diagnosis || error) && (
                <div className="w-full max-w-md mt-8 p-6 bg-white rounded-xl shadow-lg border-t-4 border-green-500">
                    <h3 className="text-xl font-bold text-green-800 mb-3">Diagnosis Result</h3>
                    
                    {error && (
                        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            <p className="font-semibold">Error:</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    {diagnosis && (
                        <div className="text-base leading-relaxed">
                            {renderMarkdown(diagnosis)}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
