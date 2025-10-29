import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ArrowLeft, CreditCard, Heart, Truck, Shield, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';

const Cart = () => {
  const { 
    cartItems, 
    savedForLater,
    updateQuantity, 
    removeFromCart, 
    saveForLater,
    moveToCart,
    getTotalPrice, 
    clearCart,
    getEstimatedDelivery,
    getRecommendations
  } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products from the marketplace</p>
          <Link
            to="/marketplace"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setToast({ message: 'Payment successful! Order placed.', type: 'success' });
      clearCart();
      setShowCheckout(false);
    } catch (error) {
      setToast({ message: 'Payment failed. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const applyPromoCode = () => {
    if (promoCode === 'FARM10') {
      setDiscount(getTotalPrice() * 0.1);
      setToast({ message: 'Promo code applied! 10% discount', type: 'success' });
    } else {
      setToast({ message: 'Invalid promo code', type: 'error' });
    }
  };

  const handleSaveForLater = (productId) => {
    saveForLater(productId);
    setToast({ message: 'Item saved for later', type: 'success' });
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 10000 ? 0 : 500;
  const total = subtotal + shipping - discount;

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Checkout</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b">
                  <span>{item.name} x {item.quantity}</span>
                  <span>KES {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="space-y-2 py-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>KES {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `KES ${shipping.toLocaleString()}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-KES {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-2 font-bold text-lg border-t">
                  <span>Total</span>
                  <span>KES {total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="radio" name="payment" className="mr-3" defaultChecked />
                  <span>M-Pesa</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="payment" className="mr-3" />
                  <span>Bank Transfer</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="payment" className="mr-3" />
                  <span>Cash on Delivery</span>
                </label>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowCheckout(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition"
              >
                Back to Cart
              </button>
              <button
                onClick={handlePayment}
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center disabled:opacity-50"
              >
                {loading ? <LoadingSpinner size="sm" color="white" /> : <CreditCard className="w-5 h-5 mr-2" />}
                {loading ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center">
          <Link to="/marketplace" className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between border-b py-4 last:border-b-0">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.location}</p>
                    <p className="text-green-600 font-bold">KES {item.price.toLocaleString()} {item.unit}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold">KES {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSaveForLater(item.id)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                      title="Save for later"
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                      title="Remove from cart"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t p-6">
            {/* Delivery Info */}
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Truck className="w-5 h-5 text-green-600" />
                <span className="font-medium">Estimated Delivery</span>
              </div>
              <p className="text-sm text-gray-600">{getEstimatedDelivery()}</p>
              {shipping === 0 && (
                <p className="text-sm text-green-600 font-medium">FREE shipping on orders over KES 10,000</p>
              )}
            </div>

            {/* Promo Code */}
            <div className="mb-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={applyPromoCode}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>KES {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `KES ${shipping.toLocaleString()}`}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-KES {discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center py-2 font-bold text-xl border-t">
                <span>Total</span>
                <span>KES {total.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Link
                to="/marketplace"
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition text-center"
              >
                Continue Shopping
              </Link>
              <button
                onClick={handleCheckout}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>

        {/* Saved for Later */}
        {savedForLater.length > 0 && (
          <div className="bg-white rounded-lg shadow-md mt-6">
            <div className="p-6">
              <h3 className="text-lg font-bold mb-4">Saved for Later ({savedForLater.length})</h3>
              <div className="space-y-4">
                {savedForLater.map(item => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-green-600 font-bold">KES {item.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => moveToCart(item.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        Move to Cart
                      </button>
                      <button
                        onClick={() => setSavedForLater(prev => prev.filter(i => i.id !== item.id))}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {cartItems.length > 0 && (
          <div className="bg-white rounded-lg shadow-md mt-6">
            <div className="p-6">
              <h3 className="text-lg font-bold mb-4">Frequently Bought Together</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getRecommendations().map(item => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                      <Shield className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-green-600 font-bold">KES {item.price.toLocaleString()}</p>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                        <span className="text-sm text-gray-600">(4.8)</span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                      Add
                    </button>
                  </div>
                ))}
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

export default Cart;