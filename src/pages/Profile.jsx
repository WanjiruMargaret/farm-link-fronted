const Profile = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Profile</h1>
        
        {/* Profile Info */}
        <div className="flex items-center mb-12">
          <div className="w-32 h-32 rounded-full overflow-hidden mr-8">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
              alt="Michael Brown"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Michael Brown</h2>
            <p className="text-gray-600 text-lg">michael.brown@example.com</p>
          </div>
        </div>

        {/* Farm Details */}
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Farm Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-between items-center py-4 border-b border-gray-200">
              <span className="text-lg font-medium text-gray-700">Farm Name</span>
              <span className="text-lg text-gray-600">Green Pastures</span>
            </div>
            
            <div className="flex justify-between items-center py-4 border-b border-gray-200">
              <span className="text-lg font-medium text-gray-700">Location</span>
              <span className="text-lg text-gray-600">Nairobi, Kenya</span>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-secondary font-medium">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;