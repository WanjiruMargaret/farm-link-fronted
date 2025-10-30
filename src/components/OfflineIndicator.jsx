import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showOfflineMessage) return null;

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 p-3 text-center text-white transition-colors ${
      isOnline ? 'bg-green-600' : 'bg-red-600'
    }`}>
      <div className="flex items-center justify-center space-x-2">
        {isOnline ? (
          <>
            <Wifi className="w-4 h-4" />
            <span>Back online! All features available</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4" />
            <span>You're offline. Some features may be limited</span>
          </>
        )}
      </div>
    </div>
  );
};

export default OfflineIndicator;