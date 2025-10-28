import React, { useState } from 'react';
import './index.css'; // Import the consolidated CSS

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState('crops');

  const marketData = {
    crops: [
      { id: 1, name: 'Potatoes', location: 'Nyandaria', price: 'KES 35', unit: 'per kg' },
      { id: 2, name: 'Onions', location: 'Nairobi', price: 'KES 50', unit: 'per kg' },
      { id: 3, name: 'Cabbage', location: 'Kiambu', price: 'KES 30', unit: 'per kg' }
    ],
    livestock: [
      { id: 4, name: 'Dairy Cow', location: 'Nakuru', price: 'KES 85,000', unit: 'per animal' },
      { id: 5, name: 'Beef Cattle', location: 'Kajiado', price: 'KES 65,000', unit: 'per animal' },
      { id: 6, name: 'Goat', location: 'Machakos', price: 'KES 7,500', unit: 'per animal' }
    ]
  };

  return (
    <div className="marketplace">
      <h1>Marketplace</h1>
      <div className="tabs">
        <button onClick={() => setActiveTab('crops')} className={activeTab === 'crops' ? 'active' : ''}>
          Crops
        </button>
        <button onClick={() => setActiveTab('livestock')} className={activeTab === 'livestock' ? 'active' : ''}>
          Livestock
        </button>
      </div>
      <div className="products">
        {marketData[activeTab].map(product => (
          <div key={product.id} className="product-card">
            <h2>{product.name}</h2>
            <p>Location: {product.location}</p>
            <p>Price: {product.price} {product.unit}</p>
            <button className="buy-button">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;