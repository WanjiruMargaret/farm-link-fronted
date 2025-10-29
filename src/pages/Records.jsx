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
