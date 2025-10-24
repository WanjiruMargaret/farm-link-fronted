import React, { useState, useEffect } from "react";

export default function LivestockManagement() {
  const [livestock, setLivestock] = useState(() => {
    const saved = localStorage.getItem("livestock");
    return saved ? JSON.parse(saved) : [];
  });

  const [newAnimal, setNewAnimal] = useState({ name: "", type: "", age: "" });

  useEffect(() => {
    localStorage.setItem("livestock", JSON.stringify(livestock));
  }, [livestock]);

  const handleAddAnimal = (e) => {
    e.preventDefault();
    if (!newAnimal.name || !newAnimal.type || !newAnimal.age) return;

    const animalToAdd = {
      id: livestock.length ? Math.max(...livestock.map((a) => a.id)) + 1 : 1,
      ...newAnimal,
    };
    setLivestock([...livestock, animalToAdd]);
    setNewAnimal({ name: "", type: "", age: "" });
  };

  const handleDelete = (id) => {
    setLivestock(livestock.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6">
        Livestock Management
      </h2>

      <form
        onSubmit={handleAddAnimal}
        className="bg-white p-6 rounded-2xl shadow-md mb-6 space-y-4"
      >
        <input
          type="text"
          placeholder="Animal Name"
          value={newAnimal.name}
          onChange={(e) => setNewAnimal({ ...newAnimal, name: e.target.value })}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          placeholder="Animal Type"
          value={newAnimal.type}
          onChange={(e) => setNewAnimal({ ...newAnimal, type: e.target.value })}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          placeholder="Age"
          value={newAnimal.age}
          onChange={(e) => setNewAnimal({ ...newAnimal, age: e.target.value })}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Add Animal
        </button>
      </form>

      <div className="space-y-4">
        {livestock.length === 0 ? (
          <p className="text-gray-500 text-center">No animals added yet.</p>
        ) : (
          livestock.map((animal) => (
            <div
              key={animal.id}
              className="flex justify-between items-center bg-white p-4 rounded-2xl shadow"
            >
              <div>
                <p className="font-semibold text-green-700">{animal.name}</p>
                <p className="text-gray-600">{animal.type}</p>
                <p className="mt-1 text-gray-700">Age: {animal.age}</p>
              </div>
              <button
                onClick={() => handleDelete(animal.id)}
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
