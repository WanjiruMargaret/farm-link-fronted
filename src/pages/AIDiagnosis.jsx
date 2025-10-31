import React, { useState } from 'react';
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