import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('farmlink-cart', []);
  const [recentlyAdded, setRecentlyAdded] = useState(null);
  const [savedForLater, setSavedForLater] = useLocalStorage('farmlink-saved', []);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity, addedAt: new Date().toISOString() }];
    });
    setRecentlyAdded(product);
    setTimeout(() => setRecentlyAdded(null), 3000);
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const saveForLater = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
      setSavedForLater(prev => [...prev, item]);
      removeFromCart(productId);
    }
  };

  const moveToCart = (productId) => {
    const item = savedForLater.find(item => item.id === productId);
    if (item) {
      addToCart(item, item.quantity);
      setSavedForLater(prev => prev.filter(item => item.id !== productId));
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getEstimatedDelivery = () => {
    const today = new Date();
    const deliveryDate = new Date(today.getTime() + (2 * 24 * 60 * 60 * 1000));
    return deliveryDate.toLocaleDateString('en-KE', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getRecommendations = () => {
    if (cartItems.length === 0) return [];
    
    const categories = [...new Set(cartItems.map(item => 
      item.name.includes('Cow') || item.name.includes('Goat') ? 'livestock' : 'crops'
    ))];
    
    return [
      { id: 999, name: 'Farm Insurance', price: 5000, category: 'service' },
      { id: 998, name: 'Delivery Service', price: 500, category: 'service' }
    ];
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      recentlyAdded,
      savedForLater,
      addToCart,
      removeFromCart,
      updateQuantity,
      saveForLater,
      moveToCart,
      clearCart,
      getTotalPrice,
      getTotalItems,
      getEstimatedDelivery,
      getRecommendations
    }}>
      {children}
    </CartContext.Provider>
  );
};