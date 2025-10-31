<<<<<<< HEAD
import React from 'react';
import Navbar from '../components/Navbar';

const Records = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Farm Records</h1>
          <Navbar />
        </div>
      </header>
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Farm Records Management</h2>
          <p className="text-gray-600">Keep track of your farming activities, expenses, and harvests.</p>
        </div>
      </div>
    </div>
  );
};

export default Records;
=======
import React, { useState, useCallback } from 'react';
import {
  Loader, Trash2, BookOpen, Clock, ClipboardList, PiggyBank, X, Plus, DollarSign, TrendingUp, BarChart3, AlertTriangle
} from 'lucide-react';

import { doc, deleteDoc, onSnapshot, collection, query, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { useFirebase } from '../contexts/FirebaseContext'; // Import the provider's hook

// Constants for Firestore collections
const DIAGNOSIS_COLLECTION = 'diagnosis_records';
const MANAGEMENT_COLLECTION = 'management_records';

// NOTE: The incorrect getFirestorePath helper function has been removed!

// Simple Markdown renderer
const renderMarkdown = (text) => {
  if (!text) return null;
  return text.split('\n\n').map((paragraph, index) => (
    <p
      key={index}
      className="mb-2 text-sm"
      dangerouslySetInnerHTML={{
        __html: paragraph
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\n/g, '<br/>')
      }}
    />
  ));
};

// --- Diagnosis History Component ---
const DiagnosisHistory = ({ db, userId }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);

  React.useEffect(() => {
    if (!db || !userId) return;

    // ✅ FIX 1: Correctly build the nested collection query: 'users/{userId}/diagnosis_records'
    const recordsQuery = query(
      collection(db, 'users', userId, DIAGNOSIS_COLLECTION),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(recordsQuery, (snapshot) => {
      const fetchedRecords = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate()?.toLocaleString() || 'Pending'
      }));
      setRecords(fetchedRecords);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching diagnosis records: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [db, userId]);

  const handleDelete = async (recordId) => {
    if (!db || !window.confirm("Are you sure you want to delete this diagnosis record?")) return;
    try {
      // ✅ FIX 2: Correctly build the nested document reference for deletion
      const docRef = doc(db, 'users', userId, DIAGNOSIS_COLLECTION, recordId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

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

  if (loading) return <div className="text-center text-gray-500 p-8"><Loader className="w-6 h-6 animate-spin inline-block mr-2" /> Loading history...</div>;

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

// --- Financial Management Component ---
const FinancialManagement = ({ db, userId }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');
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

  React.useEffect(() => {
    if (!db || !userId) return;

    // ✅ FIX 3: Correctly build the nested collection query: 'users/{userId}/management_records'
    const recordsQuery = query(
      collection(db, 'users', userId, MANAGEMENT_COLLECTION),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(recordsQuery, (snapshot) => {
      const fetchedRecords = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        amount: parseFloat(doc.data().amount || 0),
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
    if (!formData.description.trim() || !formData.category || !db) return;
    if (formData.type !== 'activity' && (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0)) {
      console.error("Amount must be a valid number for Income/Expense records.");
      return;
    }

    try {
      // ✅ FIX 4: Correctly build the nested collection reference for adding a document
      const managementRef = collection(db, 'users', userId, MANAGEMENT_COLLECTION);
      await addDoc(managementRef, {
        type: formData.type,
        category: formData.category,
        description: formData.description,
        amount: formData.type === 'activity' ? 0 : parseFloat(formData.amount),
        date: formData.date,
        timestamp: serverTimestamp()
      });
      setShowAddForm(false);
      setFormData({ type: 'expense', category: '', amount: '', description: '', date: new Date().toISOString().split('T')[0] });
    } catch (error) {
      console.error("Error adding management record:", error);
    }
  };

  if (loading) return <div className="text-center text-gray-500 p-8"><Loader className="w-6 h-6 animate-spin inline-block mr-2" /> Loading management records...</div>;

  // Summaries
  const totalIncome = records.filter(r => r.type === 'income').reduce((a, b) => a + b.amount, 0);
  const totalExpense = records.filter(r => r.type === 'expense').reduce((a, b) => a + b.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
          <PiggyBank className="w-6 h-6" /> Farm Financial & Activity Log
        </h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-200 transition"
        >
          <Plus className="w-4 h-4" /> Add Record
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl shadow space-y-4">
          <div className="flex gap-4 flex-wrap">
            <select
              value={formData.type}
              onChange={e => setFormData({ ...formData, type: e.target.value, category: '' })}
              className="border p-2 rounded flex-grow"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
              <option value="activity">Activity</option>
            </select>
            <select
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              className="border p-2 rounded flex-grow"
            >
              <option value="">Select Category</option>
              {categories[formData.type].map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            {formData.type !== 'activity' && (
              <input
                type="number"
                placeholder="Amount"
                value={formData.amount}
                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                className="border p-2 rounded flex-grow"
              />
            )}
            <input
              type="date"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              className="border p-2 rounded"
            />
          </div>
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className="border p-2 rounded w-full"
            rows={3}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Save Record</button>
        </form>
      )}

      <div className="flex justify-around flex-wrap gap-4">
        <div className="bg-green-50 p-4 rounded-xl flex-1 text-center">
          <p className="text-gray-500">Total Income</p>
          <p className="text-green-700 font-bold text-xl">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-xl flex-1 text-center">
          <p className="text-gray-500">Total Expense</p>
          <p className="text-red-700 font-bold text-xl">${totalExpense.toFixed(2)}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl flex-1 text-center">
          <p className="text-gray-500">Balance</p>
          <p className="text-blue-700 font-bold text-xl">${balance.toFixed(2)}</p>
        </div>
      </div>

      <div className="space-y-4">
        {records.map(record => (
          <div key={record.id} className="flex justify-between items-center bg-white p-4 rounded-xl shadow border-l-4 border-blue-500">
            <div>
              <p className="text-sm text-gray-500 italic">{record.date}</p>
              <p className="font-semibold">{record.category} - {record.type}</p>
              <p className="text-gray-700 text-sm">{record.description}</p>
            </div>
            {record.type !== 'activity' && (
              <p className={`font-bold ${record.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                ${record.amount.toFixed(2)}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Records Component ---
export default function Records() {
  const { db, userId, isAuthReady, authError } = useFirebase();
  const [activeTab, setActiveTab] = useState('history');

  if (authError) return (
    <div className="min-h-screen p-10 bg-red-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500 flex items-center gap-2">
        <AlertTriangle className="w-6 h-6 text-red-500" /> <span className="font-semibold text-red-700">Authentication Error:</span> {authError}
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

        {activeTab === 'history' && <DiagnosisHistory db={db} userId={userId} />}
        {activeTab === 'management' && <FinancialManagement db={db} userId={userId} />}

        <p className="text-center text-xs text-gray-400 mt-10">User ID: {userId}</p>
      </div>
    </div>
  );
}
>>>>>>> 1d10a388827edf4f2535fc29f1ac72f5fb2e86df
