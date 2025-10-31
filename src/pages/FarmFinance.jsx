import React, { useState } from 'react';
import { Calculator, CreditCard, TrendingUp, PiggyBank, AlertCircle, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';

// 💡 NEW IMPORTS FOR FIREBASE LOGIC
import { db } from '../firebase'; // Adjust path to your Firebase config
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 


const FarmFinance = () => {
    // 💡 IMPORTANT: Placeholder for User ID. Replace this with your actual Firebase Auth context or hook.
    const userId = "farmer_123_temp_id"; 

    const [activeTab, setActiveTab] = useState('loans');
    const [loanAmount, setLoanAmount] = useState('');
    const [loanPeriod, setLoanPeriod] = useState('12');
    const [toast, setToast] = useState(null);

    // --- FINANCIAL CONSTANTS ---
    const ANNUAL_RATE = 0.12; // 12% per annum
    const PROCESSING_FEE_RATE = 0.02; // 2% processing fee
    // ---------------------------

    const loanProducts = [
        {
            name: 'Crop Production Loan',
            rate: '12%',
            maxAmount: 'KES 100,000',
            period: '6-12 months',
            requirements: ['Farm ownership/lease', 'Previous harvest records', 'ID & KRA PIN'],
            description: 'Short-term financing for seeds, fertilizers, and farming inputs'
        },
        {
            name: 'Equipment Finance',
            rate: '15%',
            maxAmount: 'KES 300,000',
            period: '12-36 months',
            requirements: ['Business registration', 'Down payment 20%', 'Collateral'],
            description: 'Purchase small equipment, irrigation systems, and farm tools'
        },
        {
            name: 'Livestock Loan',
            rate: '14%',
            maxAmount: 'KES 200,000',
            period: '12-24 months',
            requirements: ['Veterinary records', 'Farm inspection', 'Insurance coverage'],
            description: 'Buy cattle, goats, poultry, and livestock infrastructure'
        }
    ];

    const insuranceProducts = [
        {
            name: 'Crop Insurance',
            premium: '3-5% of sum insured',
            coverage: 'Weather, pests, diseases',
            maxCover: 'KES 50,000',
            description: 'Protect your crops against natural disasters and pest attacks'
        },
        {
            name: 'Livestock Insurance',
            premium: '4-6% of sum insured',
            coverage: 'Death, theft, disease',
            maxCover: 'KES 100,000',
            description: 'Comprehensive coverage for your livestock investment'
        },
        {
            name: 'Equipment Insurance',
            premium: '2-3% of sum insured',
            coverage: 'Theft, damage, breakdown',
            maxCover: 'KES 150,000',
            description: 'Protect your valuable farm equipment and machinery'
        }
    ];

    // --- NEW LOGIC: Loan Calculator (Corrected) ---
    const calculateLoan = () => {
        if (!loanAmount || isNaN(parseFloat(loanAmount))) {
            setToast({ message: "Please enter a valid loan amount.", type: 'error' });
            return;
        }

        const principal = parseFloat(loanAmount);
        
        // 1. Calculate the full amount to be financed (Principal + Fee)
        const processingFee = principal * PROCESSING_FEE_RATE;
        const effectivePrincipal = principal + processingFee; 

        const rate = ANNUAL_RATE / 12; // Monthly interest rate
        const months = parseInt(loanPeriod);
        
        // Formula for monthly payment (M)
        const monthlyPayment = (effectivePrincipal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
        
        const totalPayment = monthlyPayment * months;
        const totalInterest = totalPayment - effectivePrincipal; 

        setToast({
          message: (
            `Monthly Payment: KES ${monthlyPayment.toLocaleString(undefined, {maximumFractionDigits: 0})} | ` + 
            `Total Interest: KES ${totalInterest.toLocaleString(undefined, {maximumFractionDigits: 0})}`
          ),
          type: 'success'
        });
    };

    // --- NEW LOGIC: Universal Application Submission (Firebase Tracking) ---
    const submitApplication = async (type, name, data = {}) => {
        if (userId === "farmer_123_temp_id") {
            // Optional: A warning if running without real authentication
            setToast({ message: "Application submitted locally. Please connect a user login system to save to database.", type: 'warning' });
        }

        try {
            const applicationsRef = collection(db, 'applications'); 
            
            await addDoc(applicationsRef, {
                userId: userId,
                type: type, // 'loan' or 'insurance'
                name: name, // e.g., 'Crop Production Loan'
                status: 'Pending Review',
                details: data,
                applicationDate: serverTimestamp(),
            });

            setToast({ 
                message: `${name} ${type} submitted successfully! A representative will contact you shortly.`, 
                type: 'success' 
            });

        } catch (error) {
            console.error("Error submitting application:", error);
            setToast({ message: "Failed to submit application. Please check your internet connection.", type: 'error' });
        }
    };
    // ----------------------------------------------------------------------


    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-blue-600 text-white p-4">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Farm Finance</h1>
                    <Navbar />
                </div>
            </header>

            <div className="max-w-6xl mx-auto p-6">
                {/* Tabs */}
                <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg mb-6">
                    {['loans', 'insurance', 'calculator'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-3 px-6 rounded-md font-medium transition capitalize ${
                                activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Loans Tab */}
                {activeTab === 'loans' && (
                    <div className="space-y-6">
                        <div className="bg-blue-50 p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-blue-800 mb-2">Why Choose Farm Loans?</h3>
                            <p className="text-blue-700">Access capital to expand your farming operations, buy equipment, or invest in high-yield crops. Our flexible terms are designed for agricultural cycles.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {loanProducts.map((loan, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                                    <h4 className="text-xl font-bold text-gray-800 mb-3">{loan.name}</h4>
                                    <p className="text-gray-600 mb-4">{loan.description}</p>
                                    
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Interest Rate:</span>
                                            <span className="font-medium text-blue-600">{loan.rate}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Max Amount:</span>
                                            <span className="font-medium">{loan.maxAmount}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Period:</span>
                                            <span className="font-medium">{loan.period}</span>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <h5 className="font-medium text-gray-700 mb-2">Requirements:</h5>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            {loan.requirements.map((req, i) => (
                                                <li key={i} className="flex items-center">
                                                    <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                                                    {req}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <button
                                        // 💡 UPDATED LOGIC: Call submitApplication
                                        onClick={() => submitApplication('loan', loan.name, { 
                                            loanAmount: loanAmount, 
                                            loanPeriod: loanPeriod 
                                        })}
                                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Insurance Tab */}
                {activeTab === 'insurance' && (
                    <div className="space-y-6">
                        <div className="bg-green-50 p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-green-800 mb-2">Protect Your Investment</h3>
                            <p className="text-green-700">Farm insurance protects against unpredictable losses from weather, disease, theft, and other risks. Secure your livelihood with comprehensive coverage.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {insuranceProducts.map((insurance, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                                    <h4 className="text-xl font-bold text-gray-800 mb-3">{insurance.name}</h4>
                                    <p className="text-gray-600 mb-4">{insurance.description}</p>
                                    
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Premium:</span>
                                            <span className="font-medium text-green-600">{insurance.premium}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Coverage:</span>
                                            <span className="font-medium">{insurance.coverage}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Max Cover:</span>
                                            <span className="font-medium">{insurance.maxCover}</span>
                                        </div>
                                    </div>

                                    <button
                                        // 💡 UPDATED LOGIC: Call submitApplication
                                        onClick={() => submitApplication('insurance', insurance.name)}
                                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                                    >
                                        Get Quote
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Calculator Tab */}
                {activeTab === 'calculator' && (
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                <Calculator className="w-6 h-6 mr-2" />
                                Loan Calculator
                            </h3>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (KES)</label>
                                    <input
                                        type="number"
                                        value={loanAmount}
                                        onChange={(e) => setLoanAmount(e.target.value)}
                                        placeholder="Enter loan amount"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Loan Period (months)</label>
                                    <select
                                        value={loanPeriod}
                                        onChange={(e) => setLoanPeriod(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="6">6 months</option>
                                        <option value="12">12 months</option>
                                        <option value="18">18 months</option>
                                        <option value="24">24 months</option>
                                        <option value="36">36 months</option>
                                    </select>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600">Interest Rate: <span className="font-medium">12% per annum</span></p>
                                    <p className="text-sm text-gray-600">Processing Fee: <span className="font-medium">2% of loan amount</span></p>
                                </div>
                            </div>

                            <button
                                onClick={calculateLoan}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                            >
                                Calculate Monthly Payment
                            </button>

                            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                                <div className="flex items-start">
                                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-yellow-800 font-medium">Important Note</p>
                                        <p className="text-sm text-yellow-700">This is an estimate. Actual rates may vary based on your credit profile and loan assessment.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Financial Tips */}
                        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Financial Tips for Farmers</h3>
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <PiggyBank className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                    <p className="text-gray-700">Save 10-15% of your income during harvest season for lean periods</p>
                                </div>
                                <div className="flex items-start">
                                    <TrendingUp className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                                    <p className="text-gray-700">Diversify crops to reduce risk and ensure steady income</p>
                                </div>
                                <div className="flex items-start">
                                    <CreditCard className="w-5 h-5 text-purple-500 mr-3 mt-0.5" />
                                    <p className="text-gray-700">Keep detailed records to improve loan eligibility</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
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

export default FarmFinance;;