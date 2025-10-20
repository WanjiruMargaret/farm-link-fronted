import { useState } from 'react';

const Profile = () => {
  const [user] = useState({
    name: 'John Doe',
    email: 'john@farmlink.com',
    location: 'Nairobi, Kenya',
    farmSize: '5 acres',
    crops: ['Maize', 'Tomatoes', 'Beans']
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-primary text-2xl font-bold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="ml-6">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-green-100">{user.location}</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Info */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input 
                    type="email" 
                    value={user.email}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input 
                    type="text" 
                    value={user.location}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Farm Size</label>
                  <input 
                    type="text" 
                    value={user.farmSize}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Farm Info */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Farm Information</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Crops Grown</label>
                <div className="flex flex-wrap gap-2">
                  {user.crops.map(crop => (
                    <span key={crop} className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                      {crop}
                    </span>
                  ))}
                  <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-300">
                    + Add Crop
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary">
              Save Changes
            </button>
            <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;