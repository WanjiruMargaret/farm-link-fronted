import React, { useState, useEffect, useCallback } from 'react';
import { Loader, Trash2, BookOpen, Clock, ClipboardList, PiggyBank, X, Plus, DollarSign, TrendingUp, BarChart3, AlertTriangle, Calendar } from 'lucide-react';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, deleteDoc, onSnapshot, collection, query, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';

// --- FireBase and Utility Setup for Single File ---

// Global variable setup (required by the environment)
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Firestore Path Helper (Private Data)
const getFirestorePath = (userId, collectionName) => `/artifacts/${appId}/users/${userId}/${collectionName}`;

// Simple Markdown Renderer (for diagnosis output)
const renderMarkdown = (text) => {
    if (!text) return null;
    return text.split('\n\n').map((paragraph, index) => (
        <p key={index} className="mb-2 text-sm" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
    ));
};

const DIAGNOSIS_COLLECTION = 'diagnosis_records';
const MANAGEMENT_COLLECTION = 'management_records'; // Will hold income, expense, and activity types

// Custom Hook to initialize Firebase and Auth
const useFirebase = () => {
    const [db, setDb] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [authError, setAuthError] = useState(null);

    useEffect(() => {
        try {
            const app = initializeApp(firebaseConfig);
            const firestoreDb = getFirestore(app);
            const auth = getAuth(app);
            
            // Wait for auth state change to determine userId
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                if (user) {
                    setUserId(user.uid);
                    setDb(firestoreDb);
                    setIsAuthReady(true);
                } else {
                    // Sign in anonymously if no token is present, otherwise use the custom token
                    if (initialAuthToken) {
                        await signInWithCustomToken(auth, initialAuthToken);
                    } else {
                        await signInAnonymously(auth);
                    }
                }
            }, (error) => {
                console.error("Firebase Auth Error:", error);
                setAuthError("Failed to authenticate with Firebase.");
                setIsAuthReady(true); // Stop loading even on error
            });

            return () => unsubscribe();
        } catch (e) {
            console.error("Firebase Initialization Error:", e);
            setAuthError("Failed to initialize Firebase.");
            setIsAuthReady(true);
        }
    }, []);

    return { db, userId, isAuthReady, authError };
};

// --- Sub-Component: AI Diagnosis History (from HEAD) ---
const DiagnosisHistory = ({ db, userId }) => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRecord, setSelectedRecord] = useState(null);

    // Real-time listener for Diagnosis Records
    useEffect(() => {
        if (!db || !userId) return;

        const recordsQuery = query(
            collection(db, getFirestorePath(userId, DIAGNOSIS_COLLECTION)),
            orderBy('timestamp', 'desc')
        );

        const unsubscribe = onSnapshot(recordsQuery, (snapshot) => {
            const fetchedRecords = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate()?.toLocaleString() || 'Pending',
            }));
            setRecords(fetchedRecords);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching diagnosis records: ", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [db, userId]);

    // Delete handler
    const handleDelete = async (recordId) => {
        // Keeping window.confirm as per the previous instruction context for simplicity.
        if (!db || !window.confirm("Are you sure you want to delete this diagnosis record?")) return;
        
        try {
            const docRef = doc(db, getFirestorePath(userId, DIAGNOSIS_COLLECTION), recordId);
            await deleteDoc(docRef);
        } catch (error) {
            console.error("Error deleting record:", error);
        }
    };

    // Modal Component for Details
    const DetailModal = ({ record, onClose }) => {
        if (!record) return null;
        
        const placeholderImage = "https://placehold.co/400x250/34D399/FFFFFF?text=Image+Unavailable";

        return (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all">
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-bold text-green-700 flex items-center gap-2">
                                <BookOpen className="w-6 h-6" /> Diagnosis Detail
                            </h3>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <img 
                            src={record.image_url || placeholderImage} 
                            alt="Diagnosed Plant" 
                            className="w-full h-auto rounded-lg mb-4 object-cover border border-gray-200"
                            style={{ aspectRatio: '16/9' }}
                            onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
                        />

                        <p className="text-sm text-gray-500 mb-2 italic">
                            Recorded: {record.timestamp}
                        </p>
                        
                        <div className="p-3 bg-gray-50 rounded-lg mb-4">
                            <p className="font-semibold text-gray-800">Query/Symptoms:</p>
                            <p className="text-gray-700 text-sm">{record.query}</p>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-bold text-green-700 mb-2">AI Diagnosis & Treatment</h4>
                            <div className="text-sm space-y-2">
                                {renderMarkdown(record.diagnosis)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return <div className="text-center text-gray-500 p-8"><Loader className="w-6 h-6 animate-spin inline-block mr-2" /> Loading history...</div>;
    }

    return (
        <div className="space-y-4 max-w-4xl mx-auto">
            {records.length === 0 ? (
                <p className="text-gray-500 text-center p-8 bg-white rounded-xl shadow">No diagnosis records found. Start analyzing a plant!</p>
            ) : (
                records.map((record) => (
                    <div
                        key={record.id}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-xl shadow border-l-4 border-green-500 hover:shadow-lg transition duration-200"
                    >
                        <div className="flex-grow min-w-0 pr-4 mb-3 sm:mb-0">
                            <p className="text-sm text-gray-500 italic mb-1 flex items-center gap-1">
                                <Clock className="w-4 h-4" /> {record.timestamp}
                            </p>
                            <p className="font-semibold text-lg text-gray-800 truncate">{record.query}</p>
                            <p className="text-green-600 text-sm italic">
                                {record.diagnosis ? 'AI Report Available' : 'Processing...'}
                            </p>
                        </div>
                        <div className="flex gap-3 flex-shrink-0">
                            <button
                                onClick={() => setSelectedRecord(record)}
                                className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-lg font-medium hover:bg-green-200 transition duration-300 text-sm shadow-sm"
                            >
                                <BookOpen className="w-4 h-4" /> View Details
                            </button>
                            <button
                                onClick={() => handleDelete(record.id)}
                                className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-lg font-medium hover:bg-red-600 transition duration-300 text-sm shadow-sm"
                            >
                                <Trash2 className="w-4 h-4" /> Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
            <DetailModal record={selectedRecord} onClose={() => setSelectedRecord(null)} />
        </div>
    );
};


// --- Sub-Component: Financial and Activity Management Records (Merged & Enhanced) ---
const FinancialManagement = ({ db, userId }) => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [activeTab, setActiveTab] = useState('summary'); // 'summary', 'income', 'expenses', 'activities'
    const [formData, setFormData] = useState({
        type: 'expense',
        category: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
    });

    const categories = {
        expense: ['Seeds', 'Fertilizer', 'Labor', 'Equipment', 'Transport', 'Other'],
        income: ['Crop Sales', 'Livestock Sales', 'Dairy', 'Other'],
        activity: ['Planting', 'Harvesting', 'Spraying', 'Weeding', 'Irrigation', 'Maintenance']
    };

    // Real-time listener
    useEffect(() => {
        if (!db || !userId) return;

        const recordsQuery = query(
            collection(db, getFirestorePath(userId, MANAGEMENT_COLLECTION)),
            orderBy('timestamp', 'desc')
        );

        const unsubscribe = onSnapshot(recordsQuery, (snapshot) => {
            const fetchedRecords = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                amount: parseFloat(doc.data().amount || 0), // Ensure amount is treated as number
                timestamp: doc.data().timestamp?.toDate()?.toLocaleString() || 'Pending',
                date: doc.data().date || doc.data().timestamp?.toDate()?.toISOString().split('T')[0] || 'N/A'
            }));
            setRecords(fetchedRecords);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching management records: ", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [db, userId]);


    const handleAdd = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.description.trim() || !formData.category || !db) return;
        if (formData.type !== 'activity' && (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0)) {
            // Use console log instead of alert
            console.error("Amount must be a valid number for Income/Expense records.");
            return;
        }

        try {
            const managementRef = collection(db, getFirestorePath(userId, MANAGEMENT_COLLECTION));
            await addDoc(managementRef, {
                type: formData.type,
                category: formData.category,
                amount: formData.type !== 'activity' ? parseFloat(formData.amount) : 0,
                description: formData.description.trim(),
                date: formData.date,
                timestamp: serverTimestamp(),
            });

            // Reset form
            setFormData({ type: 'expense', category: '', amount: '', description: '', date: new Date().toISOString().split('T')[0] });
            setShowAddForm(false);
            
        } catch (error) {
            console.error("Error adding management record:", error);
        }
    };

    const handleDelete = async (recordId) => {
        // Keeping window.confirm as per the previous instruction context for simplicity.
        if (!db || !window.confirm("Are you sure you want to delete this management record?")) return;
        
        try {
            const docRef = doc(db, getFirestorePath(userId, MANAGEMENT_COLLECTION), recordId);
            await deleteDoc(docRef);
        } catch (error) {
            console.error("Error deleting record:", error);
        }
    };

    const getFilteredRecords = useCallback(() => {
        return records.filter(record => {
            if (activeTab === 'income') return record.type === 'income';
            if (activeTab === 'expenses') return record.type === 'expense';
            if (activeTab === 'activities') return record.type === 'activity';
            return false;
        }).sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending
    }, [records, activeTab]);

    const getTotalExpenses = () => records.filter(r => r.type === 'expense').reduce((sum, r) => sum + r.amount, 0);
    const getTotalIncome = () => records.filter(r => r.type === 'income').reduce((sum, r) => sum + r.amount, 0);
    const getProfit = () => getTotalIncome() - getTotalExpenses();

    // Loader State
    if (loading) {
        return <div className="text-center text-gray-500 p-8"><Loader className="w-6 h-6 animate-spin inline-block mr-2" /> Loading records...</div>;
    }

    // --- Sub-Components: Modal and Views ---

    const AddRecordModal = () => (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4 border-b pb-3">
                        <h3 className="text-xl font-bold text-blue-700 flex items-center gap-2">
                            <Plus className="w-5 h-5" /> Add New Farm Entry
                        </h3>
                        <button onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100 transition">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleAdd} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Entry Type</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({...formData, type: e.target.value, category: ''})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                                <option value="activity">Activity</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select category</option>
                                {categories[formData.type]?.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {formData.type !== 'activity' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (Numeric Value)</label>
                                <input
                                    type="number"
                                    placeholder="e.g., 5000 (KES, USD, etc.)"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        )}
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <input
                                type="text"
                                placeholder="e.g., Purchased new sack of seeds"
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-300 shadow-md"
                        >
                            <Plus className="w-5 h-5" /> Save Record
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );

    const RecordsList = ({ records, type }) => (
        <div className="space-y-3">
            {records.length === 0 ? (
                <p className="text-gray-500 text-center p-8 bg-white rounded-xl shadow border-l-4 border-gray-300">
                    No {type} records available. Click 'Add Record' to start logging.
                </p>
            ) : (
                records.map(record => (
                    <div
                        key={record.id}
                        className={`flex justify-between items-center bg-white p-4 rounded-xl shadow-sm transition duration-200 hover:shadow-lg border-l-4 ${
                            record.type === 'income' ? 'border-green-500' : 
                            record.type === 'expense' ? 'border-red-500' : 'border-blue-500'
                        }`}
                    >
                        <div className="flex-grow min-w-0 pr-4">
                            <p className="font-semibold text-gray-800 truncate">{record.description}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                <span className={`font-medium capitalize ${record.type === 'activity' ? 'text-blue-600' : 'text-gray-600'}`}>{record.category}</span>
                                <span className="mx-2 text-gray-400">|</span>
                                <span className="text-gray-500">{new Date(record.date).toLocaleDateString()}</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-4 flex-shrink-0">
                            {record.type !== 'activity' && (
                                <p className={`text-lg font-bold ${record.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                    {record.amount?.toLocaleString()}
                                </p>
                            )}
                            <button
                                onClick={() => handleDelete(record.id)}
                                className="bg-red-100 hover:bg-red-500 text-red-600 hover:text-white p-2 rounded-full transition duration-300 shadow-sm"
                                aria-label="Delete record"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );

    const SummaryView = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Income</p>
                            <p className="text-2xl font-bold text-green-700 mt-1">{getTotalIncome().toLocaleString()}</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-green-500" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Expenses</p>
                            <p className="text-2xl font-bold text-red-700 mt-1">{getTotalExpenses().toLocaleString()}</p>
                        </div>
                        <DollarSign className="w-8 h-8 text-red-500" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Net Profit</p>
                            <p className={`text-2xl font-bold mt-1 ${getProfit() >= 0 ? 'text-blue-700' : 'text-red-700'}`}>
                                {getProfit().toLocaleString()}
                            </p>
                        </div>
                        <BarChart3 className="w-8 h-8 text-blue-500" />
                    </div>
                </div>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-lg">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Activity Overview</h4>
                <div className="flex flex-wrap gap-4">
                    {Object.entries(categories.activity).map(([key, value]) => {
                        const count = records.filter(r => r.type === 'activity' && r.category === value).length;
                        return (
                            <div key={key} className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-center min-w-[120px]">
                                <p className="text-3xl font-bold text-blue-600">{count}</p>
                                <p className="text-sm text-gray-600">{value}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    // --- Main Render for Financial Management ---
    return (
        <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
                 <h3 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
                    <PiggyBank className="w-6 h-6" /> Financial Management
                </h3>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Record</span>
                </button>
            </div>

            {/* Sub-Tabs */}
            <div className="flex space-x-1 bg-gray-200 p-1 rounded-xl mb-6 shadow-inner">
                {['summary', 'income', 'expenses', 'activities'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2 px-4 rounded-lg font-semibold transition capitalize ${
                            activeTab === tab ? 'bg-white text-blue-600 shadow-lg' : 'text-gray-600 hover:text-blue-600'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>


            {activeTab === 'summary' && <SummaryView />}
            {activeTab === 'income' && <RecordsList records={getFilteredRecords()} type="Income" />}
            {activeTab === 'expenses' && <RecordsList records={getFilteredRecords()} type="Expenses" />}
            {activeTab === 'activities' && <RecordsList records={getFilteredRecords()} type="Activities" />}

            {showAddForm && <AddRecordModal />}
        </div>
    );
};


// --- Main App Component ---
export default function Records() {
    const { db, userId, isAuthReady, authError } = useFirebase();
    const [activeTab, setActiveTab] = useState('history'); // 'history' or 'management'

    if (authError) return (
        <div className="min-h-screen p-10 bg-red-50">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
                <AlertTriangle className="w-6 h-6 text-red-500 inline-block mr-2" />
                <span className="font-semibold text-red-700">Authentication Error:</span> {authError}
            </div>
        </div>
    );
    
    if (!isAuthReady || !db || !userId) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Loader className="w-8 h-8 animate-spin text-green-500" />
            <p className="ml-3 text-xl text-gray-600">Connecting to FarmLink...</p>
        </div>
    );

    return (
        <div className="min-h-screen p-6 sm:p-10 bg-gray-50 font-sans">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-8 flex items-center gap-3">
                    <ClipboardList className="w-8 h-8 text-green-700" /> Farm Records Center
                </h2>
                
                {/* Main Tabs */}
                <div className="flex justify-center mb-10 border-b-2 border-gray-300 max-w-4xl mx-auto">
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 text-xl font-bold transition duration-200 ${
                            activeTab === 'history' ? 'border-b-4 border-green-600 text-green-700' : 'text-gray-500 hover:text-green-600 hover:bg-gray-100'
                        }`}
                    >
                        <Clock className="w-6 h-6" /> AI Diagnosis History
                    </button>
                    <button
                        onClick={() => setActiveTab('management')}
                        className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 text-xl font-bold transition duration-200 ${
                            activeTab === 'management' ? 'border-b-4 border-blue-600 text-blue-700' : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100'
                        }`}
                    >
                        <PiggyBank className="w-6 h-6" /> Financial & Activity Log
                    </button>
                </div>
            </div>

            {activeTab === 'history' && <DiagnosisHistory db={db} userId={userId} />}
            {activeTab === 'management' && <FinancialManagement db={db} userId={userId} />}
            
            <p className="text-center text-xs text-gray-400 mt-10">User ID: {userId}</p>
        </div>
    );
}
