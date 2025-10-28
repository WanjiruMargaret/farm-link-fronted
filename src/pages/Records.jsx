import React, { useState, useEffect } from "react";

export default function RecordsManagement() {
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("records");
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("Crops");

  useEffect(() => {
    localStorage.setItem("records", JSON.stringify(records));
  }, [records]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !type) return;

    const newRecord = {
      id: Date.now(),
      name,
      type,
      category,
    };

    setRecords([...records, newRecord]);
    setName("");
    setType("");
    setCategory("Crops");
  };

  const handleDelete = (id) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6">
        Records Management
      </h2>

      <form
        onSubmit={handleAdd}
        className="bg-white p-6 rounded-xl shadow-md mb-6 space-y-4"
      >
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-full"
        >
          <option value="Crops">🌾 Crops</option>
          <option value="Livestock">🐄 Livestock</option>
          <option value="Sales">💰 Sales</option>
          <option value="Equipment">🧰 Equipment</option>
        </select>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-full"
        />

        <input
          type="text"
          placeholder="Amount eg: 100kg, 5 cows,ksh 500"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-full"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Add Record
        </button>
      </form>

      <div className="space-y-4">
        {records.length === 0 ? (
          <p className="text-gray-500 text-center">No records yet.</p>
        ) : (
          records.map((record) => (
            <div
              key={record.id}
              className="flex justify-between items-center bg-white p-4 rounded-xl shadow"
            >
              <div>
                <p className="font-semibold text-green-700">{record.name}</p>
                <p className="text-gray-700">{record.type}</p>
                <p className="text-sm text-gray-500 italic">
                  {record.category}
                </p>
              </div>
              <button
                onClick={() => handleDelete(record.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
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
