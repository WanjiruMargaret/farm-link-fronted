import React, { useState, useEffect } from "react";

export default function CropManagement() {
  const [crops, setCrops] = useState(() => {
    const saved = localStorage.getItem("crops");
    return saved ? JSON.parse(saved) : [];
  });

  const [newCrop, setNewCrop] = useState({ name: "", type: "", status: "" });
  useEffect(() => {
    localStorage.setItem("crops", JSON.stringify(crops));
  }, [crops]);

  const handleAddCrop = (e) => {
    e.preventDefault();
    if (!newCrop.name || !newCrop.type || !newCrop.status) return;

    const cropToAdd = {
      id: crops.length ? Math.max(...crops.map((c) => c.id)) + 1 : 1,
      ...newCrop,
    };
    setCrops([...crops, cropToAdd]);
    setNewCrop({ name: "", type: "", status: "" });
  };

  const handleDelete = (id) => {
    setCrops(crops.filter((crop) => crop.id !== id));
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6">
        Crop Management
      </h2>

      <form
        onSubmit={handleAddCrop}
        className="bg-white p-6 rounded-2xl shadow-md mb-6 space-y-4"
      >
        <input
          type="text"
          placeholder="Crop Name"
          value={newCrop.name}
          onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          placeholder="Crop Type"
          value={newCrop.type}
          onChange={(e) => setNewCrop({ ...newCrop, type: e.target.value })}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          placeholder="Status"
          value={newCrop.status}
          onChange={(e) => setNewCrop({ ...newCrop, status: e.target.value })}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Add Crop
        </button>
      </form>

      <div className="space-y-4">
        {crops.length === 0 ? (
          <p className="text-gray-500 text-center">No crops added yet.</p>
        ) : (
          crops.map((crop) => (
            <div
              key={crop.id}
              className="flex justify-between items-center bg-white p-4 rounded-2xl shadow"
            >
              <div>
                <p className="font-semibold text-green-700">{crop.name}</p>
                <p className="text-gray-600">{crop.type}</p>
                <p
                  className={`mt-1 font-medium ${
                    crop.status.toLowerCase() === "harvested"
                      ? "text-green-800"
                      : "text-yellow-700"
                  }`}
                >
                  {crop.status}
                </p>
              </div>
              <button
                onClick={() => handleDelete(crop.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition duration-300"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
