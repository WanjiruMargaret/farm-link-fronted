const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to FarmLink 360
        </h1>
        <p className="text-xl text-gray-600">
          Your smart digital farm companion for managing crops, livestock, and connecting to markets
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="text-3xl mb-4">🌾</div>
          <h3 className="text-lg font-semibold mb-2">Disease Diagnosis</h3>
          <p className="text-gray-600">Upload images to identify plant and livestock diseases</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="text-3xl mb-4">💬</div>
          <h3 className="text-lg font-semibold mb-2">Community Hub</h3>
          <p className="text-gray-600">Connect with farmers and get expert advice</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="text-3xl mb-4">📈</div>
          <h3 className="text-lg font-semibold mb-2">Farm Records</h3>
          <p className="text-gray-600">Track income, expenses, and profit/loss</p>
        </div>
      </div>
    </div>
  );
};

export default Home;