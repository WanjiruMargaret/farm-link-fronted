<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Loader, Trash2, BookOpen, Clock, ClipboardList, PiggyBank, X, Plus, AlertTriangle } from 'lucide-react';
// FIX: Changing the import path to explicitly include the '.jsx' extension 
// and ensuring the relative path is correct. While '../contexts/FirebaseContext' 
// should work, sometimes the extension is needed to resolve the dependency in certain environments.
import { useFirebase, LoadingScreen, getFirestorePath } from '../contexts/FirebaseContext';
import { renderMarkdown } from '../utils/markdownUtils.jsx';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';

const DIAGNOSIS_COLLECTION = 'diagnosis_records';
const MANAGEMENT_COLLECTION = 'management_records'; 

// --- Sub-Component: AI Diagnosis History ---
const DiagnosisHistory = ({ db, userId }) => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRecord, setSelectedRecord] = useState(null);

    // Real-time listener for Diagnosis Records
    useEffect(() => {
        if (!db) return;

        const recordsQuery = query(
            collection(db, getFirestorePath(userId, DIAGNOSIS_COLLECTION)),
            orderBy('timestamp', 'desc')
        );

        const unsubscribe = onSnapshot(recordsQuery, (snapshot) => {
            const fetchedRecords = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                // Use a null check for timestamp to prevent errors if the document is still being written
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
        // Using a custom confirmation message/modal is preferred over window.confirm, 
        // but keeping it simple for now as per previous instructions.
        if (!db || !window.confirm("Are you sure you want to delete this diagnosis record?")) return;
        
        try {
            const docRef = doc(db, getFirestorePath(userId, DIAGNOSIS_COLLECTION), recordId);
            await deleteDoc(docRef);
        } catch (error) {
            console.error("Error deleting record:", error);
            // Use custom modal/toast for errors in a full app
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
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
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
                            <p className="text-gray-700">{record.query}</p>
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
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-xl shadow border-l-4 border-green-500 hover:shadow-lg"
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
                        <div className="flex gap-3">
                            <button
                                onClick={() => setSelectedRecord(record)}
                                className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-lg font-medium hover:bg-green-200 transition duration-300 text-sm"
                            >
                                <BookOpen className="w-4 h-4" /> View Details
                            </button>
                            <button
                                onClick={() => handleDelete(record.id)}
                                className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-lg font-medium hover:bg-red-600 transition duration-300 text-sm"
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

// --- Sub-Component: Farm Management Records (CRUD) ---
const ManagementRecords = ({ db, userId }) => {
    const [records, setRecords] = useState([]);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Crops");
    const [loading, setLoading] = useState(true);

    // Real-time listener for Management Records
    useEffect(() => {
        if (!db) return;

        const recordsQuery = query(
            collection(db, getFirestorePath(userId, MANAGEMENT_COLLECTION)),
            orderBy('timestamp', 'desc')
        );

        const unsubscribe = onSnapshot(recordsQuery, (snapshot) => {
            const fetchedRecords = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                // Use a null check for timestamp
                timestamp: doc.data().timestamp?.toDate()?.toLocaleString() || 'Pending',
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
        // Simple validation check
        if (!name.trim() || !amount.trim() || !db) return;

        try {
            const managementRef = collection(db, getFirestorePath(userId, MANAGEMENT_COLLECTION));
            await addDoc(managementRef, {
                name: name.trim(),
                amount: amount.trim(),
                category,
                timestamp: serverTimestamp(),
            });
            setName("");
            setAmount("");
            setCategory("Crops");
        } catch (error) {
            console.error("Error adding management record:", error);
            // Use custom modal/toast for errors
        }
    };

    const handleDelete = async (recordId) => {
        if (!db || !window.confirm("Are you sure you want to delete this management record?")) return;
        
        try {
            const docRef = doc(db, getFirestorePath(userId, MANAGEMENT_COLLECTION), recordId);
            await deleteDoc(docRef);
        } catch (error) {
            console.error("Error deleting record:", error);
            // Use custom modal/toast for errors
        }
    };

    if (loading) {
        return <div className="text-center text-gray-500 p-8"><Loader className="w-6 h-6 animate-spin inline-block mr-2" /> Loading management records...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <form
                onSubmit={handleAdd}
                className="bg-white p-6 rounded-xl shadow-2xl mb-6 space-y-4 w-full max-w-lg mx-auto border border-gray-100"
            >
                <div className="text-center text-lg font-semibold text-green-600 mb-4">Add New Entry</div>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-green-500 focus:border-green-500"
                >
                    <option value="Crops">🌾 Crops</option>
                    <option value="Livestock">🐄 Livestock</option>
                    <option value="Sales">💰 Sales</option>
                    <option value="Equipment">🧰 Equipment</option>
                    <option value="Other">... Other</option>
                </select>

                <input
                    type="text"
                    placeholder="Name (e.g., Maize Harvest, Fertilizer Purchase)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-green-500 focus:border-green-500"
                    required
                />

                <input
                    type="text"
                    placeholder="Amount (e.g., 100kg, 5 cows, Ksh 500 cost)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-green-500 focus:border-green-500"
                    required
                />

                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-300 shadow-md"
                >
                    <Plus className="w-5 h-5" /> Add Record
                </button>
            </form>

            <div className="space-y-4">
                {records.length === 0 ? (
                    <p className="text-gray-500 text-center p-8 bg-white rounded-xl shadow">No farm management entries yet.</p>
                ) : (
                    records.map((record) => (
                        <div
                            key={record.id}
                            className="flex justify-between items-center bg-white p-4 rounded-xl shadow transition duration-300 hover:shadow-lg border-l-4 border-blue-400"
                        >
                            <div className="flex-grow min-w-0 pr-4">
                                <p className="font-semibold text-gray-800">{record.name}</p>
                                <p className="text-gray-600">{record.amount}</p>
                                <p className="text-xs text-blue-500 italic mt-1">
                                    {record.category} - {record.timestamp}
                                </p>
                            </div>
                            <button
                                onClick={() => handleDelete(record.id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition duration-300 text-sm flex items-center gap-1"
                            >
                                <Trash2 className="w-4 h-4" /> Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};


// --- Main Page Component ---
export default function Records() {
    // Note: The structure of the FirebaseContext component is assumed here.
    const { db, userId, isAuthReady, authError } = useFirebase();
    const [activeTab, setActiveTab] = useState('history'); // 'history' or 'management'

    if (authError) return <div className="p-10 text-center text-red-700">{authError}</div>;
    if (!isAuthReady || !db || !userId) return <LoadingScreen />;

    return (
        <div className="min-h-full p-6 sm:p-10 bg-gray-50">
            <h2 className="text-3xl font-bold text-green-700 mb-6 flex items-center gap-2 max-w-4xl mx-auto">
                <ClipboardList className="w-6 h-6" /> Farm Records Center
            </h2>

            <div className="flex justify-center mb-8 border-b border-gray-200 max-w-2xl mx-auto">
                <button
                    onClick={() => setActiveTab('history')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-lg font-semibold transition duration-200 ${
                        activeTab === 'history' ? 'border-b-4 border-green-600 text-green-700' : 'text-gray-500 hover:text-green-600'
                    }`}
                >
                    <Clock className="w-5 h-5" /> AI Diagnosis History
                </button>
                <button
                    onClick={() => setActiveTab('management')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-lg font-semibold transition duration-200 ${
                        activeTab === 'management' ? 'border-b-4 border-blue-600 text-blue-700' : 'text-gray-500 hover:text-blue-600'
                    }`}
                >
                    <PiggyBank className="w-5 h-5" /> Management Records
                </button>
            </div>

            {activeTab === 'history' && <DiagnosisHistory db={db} userId={userId} />}
            {activeTab === 'management' && <ManagementRecords db={db} userId={userId} />}
        </div>
    );
}
=======
import React, { useState } from 'react';
import { Plus, Calendar, DollarSign, TrendingUp, BarChart3, Trash2 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';

const Records = () => {
  const [records, setRecords] = useLocalStorage('farmlink-records', []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState('expenses');
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    type: 'expense',
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    crop: ''
  });

  const categories = {
    expense: ['Seeds', 'Fertilizer', 'Labor', 'Equipment', 'Transport', 'Other'],
    income: ['Crop Sales', 'Livestock Sales', 'Dairy', 'Other'],
    activity: ['Planting', 'Harvesting', 'Spraying', 'Weeding', 'Irrigation']
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      ...formData,
      id: Date.now(),
      amount: parseFloat(formData.amount) || 0
    };
    setRecords([...records, newRecord]);
    setFormData({ type: 'expense', category: '', amount: '', description: '', date: new Date().toISOString().split('T')[0], crop: '' });
    setShowAddForm(false);
    setToast({ message: 'Record added successfully!', type: 'success' });
  };

  const deleteRecord = (id) => {
    setRecords(records.filter(r => r.id !== id));
    setToast({ message: 'Record deleted', type: 'success' });
  };

  const getFilteredRecords = () => {
    return records.filter(record => {
      if (activeTab === 'expenses') return record.type === 'expense';
      if (activeTab === 'income') return record.type === 'income';
      if (activeTab === 'activities') return record.type === 'activity';
      return true;
    });
  };

  const getTotalExpenses = () => records.filter(r => r.type === 'expense').reduce((sum, r) => sum + r.amount, 0);
  const getTotalIncome = () => records.filter(r => r.type === 'income').reduce((sum, r) => sum + r.amount, 0);
  const getProfit = () => getTotalIncome() - getTotalExpenses();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Farm Records</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Record</span>
            </button>
            <Navbar />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Income</p>
                <p className="text-2xl font-bold text-green-600">KES {getTotalIncome().toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">KES {getTotalExpenses().toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Net Profit</p>
                <p className={`text-2xl font-bold ${getProfit() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  KES {getProfit().toLocaleString()}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Records</p>
                <p className="text-2xl font-bold text-purple-600">{records.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg mb-6">
          {['expenses', 'income', 'activities'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-6 rounded-md font-medium transition capitalize ${
                activeTab === tab ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Records Table */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4 capitalize">{activeTab} Records</h3>
            {getFilteredRecords().length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No {activeTab} records yet</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Add First Record
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3">Date</th>
                      <th className="text-left py-3">Category</th>
                      <th className="text-left py-3">Description</th>
                      {activeTab !== 'activities' && <th className="text-left py-3">Amount</th>}
                      <th className="text-left py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredRecords().map(record => (
                      <tr key={record.id} className="border-b hover:bg-gray-50">
                        <td className="py-3">{new Date(record.date).toLocaleDateString()}</td>
                        <td className="py-3">{record.category}</td>
                        <td className="py-3">{record.description}</td>
                        {activeTab !== 'activities' && (
                          <td className={`py-3 font-bold ${
                            record.type === 'income' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            KES {record.amount.toLocaleString()}
                          </td>
                        )}
                        <td className="py-3">
                          <button
                            onClick={() => deleteRecord(record.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Record Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Add New Record</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value, category: ''})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select category</option>
                  {categories[formData.type].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              {formData.type !== 'activity' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount (KES)</label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Add Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

export default Records;
>>>>>>> 1d2cab2a3ed6cea1893f1f12ded2787c2a1c6849
