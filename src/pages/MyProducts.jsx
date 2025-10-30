import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, MapPin, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import apiService from '../services/api';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'crops',
    quantity: '',
    unit: 'kg',
    price: '',
    location: '',
    description: '',
    harvestDate: '',
    image: null
  });

  const categories = [
    { id: 'crops', name: 'Crops' },
    { id: 'livestock', name: 'Livestock' },
    { id: 'dairy', name: 'Dairy Products' },
    { id: 'poultry', name: 'Poultry Products' }
  ];

  useEffect(() => {
    loadMyProducts();
  }, []);

  const loadMyProducts = async () => {
    try {
      const response = await apiService.getMyProducts();
      setProducts(response.products || []);
    } catch (error) {
      console.error('Failed to load products:', error);
      // Mock data for demo
      setProducts([
        {
          id: 1,
          name: 'Fresh Tomatoes',
          category: 'crops',
          quantity: 500,
          unit: 'kg',
          price: 60,
          location: 'Meru',
          description: 'Organic tomatoes, freshly harvested',
          harvestDate: '2024-01-15',
          status: 'active'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(newProduct).forEach(key => {
        if (newProduct[key]) formData.append(key, newProduct[key]);
      });

      const response = await apiService.addProduct(formData);
      setProducts([response.product, ...products]);
      setNewProduct({
        name: '', category: 'crops', quantity: '', unit: 'kg',
        price: '', location: '', description: '', harvestDate: '', image: null
      });
      setShowAddModal(false);
    } catch (error) {
      console.error('Failed to add product:', error);
      // Add locally for demo
      const product = {
        id: Date.now(),
        ...newProduct,
        status: 'active'
      };
      setProducts([product, ...products]);
      setShowAddModal(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm('Delete this product?')) return;
    
    try {
      await apiService.deleteProduct(productId);
      setProducts(products.filter(p => p.id !== productId));
    } catch (error) {
      console.error('Failed to delete product:', error);
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Products</h1>
          <Navbar />
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Products for Sale</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading your products...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                      {product.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Quantity:</span>
                      <span className="font-medium">{product.quantity} {product.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price:</span>
                      <span className="font-bold text-green-600">KES {product.price}/{product.unit}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{product.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Harvested: {product.harvestDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="flex-1 flex items-center justify-center space-x-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex-1 flex items-center justify-center space-x-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌾</div>
            <p className="text-gray-500 mb-4">No products listed yet</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              Add Your First Product
            </button>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Add New Product</h3>
              
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Product Name</label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Quantity</label>
                    <input
                      type="number"
                      value={newProduct.quantity}
                      onChange={(e) => setNewProduct({...newProduct, quantity: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Unit</label>
                    <select
                      value={newProduct.unit}
                      onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      <option value="kg">Kg</option>
                      <option value="piece">Piece</option>
                      <option value="liter">Liter</option>
                      <option value="bag">Bag</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Price (KES)</label>
                    <input
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input
                      type="text"
                      value={newProduct.location}
                      onChange={(e) => setNewProduct({...newProduct, location: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., Meru, Nakuru"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Harvest Date</label>
                    <input
                      type="date"
                      value={newProduct.harvestDate}
                      onChange={(e) => setNewProduct({...newProduct, harvestDate: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="Describe your product quality, farming methods, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Product Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.files[0]})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
                  >
                    Add Product
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProducts;