// Analytics utility for tracking user interactions
export const trackEvent = (eventName, properties = {}) => {
  // In production, this would send to analytics service
  console.log('Analytics Event:', eventName, properties);
  
  // Store locally for demo purposes
  const events = JSON.parse(localStorage.getItem('farmlink-analytics') || '[]');
  events.push({
    event: eventName,
    properties,
    timestamp: new Date().toISOString(),
    sessionId: getSessionId()
  });
  
  // Keep only last 100 events
  if (events.length > 100) {
    events.splice(0, events.length - 100);
  }
  
  localStorage.setItem('farmlink-analytics', JSON.stringify(events));
};

export const trackPageView = (pageName) => {
  trackEvent('page_view', { page: pageName });
};

export const trackPurchase = (items, total) => {
  trackEvent('purchase', { 
    items: items.length, 
    total,
    currency: 'KES'
  });
};

export const trackAddToCart = (product) => {
  trackEvent('add_to_cart', {
    product_id: product.id,
    product_name: product.name,
    price: product.price,
    category: product.category || 'unknown'
  });
};

const getSessionId = () => {
  let sessionId = sessionStorage.getItem('farmlink-session');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('farmlink-session', sessionId);
  }
  return sessionId;
};