import React from 'react';
import { MapPin, ShoppingCart } from 'lucide-react';

const MarketCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{product.location}</span>
        </div>
        <p className="text-sm text-gray-600 mb-3">Seller: {product.seller}</p>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-green-600">
              KES {product.price.toLocaleString()}
            </span>
            <span className="text-gray-500 ml-1">{product.unit}</span>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center space-x-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;