import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
      setShowPrompt(true);
    };

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return; // Already installed
    }

    // Show install prompt after 3 seconds if installable
    const timer = setTimeout(() => {
      if (!localStorage.getItem('farmlink-install-dismissed')) {
        setShowPrompt(true);
      }
    }, 3000);

    window.addEventListener('beforeinstallprompt', handler);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowPrompt(false);
      }
    } else {
      // Fallback for browsers that don't support beforeinstallprompt
      alert('To install: Tap the browser menu and select "Add to Home Screen"');
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('farmlink-install-dismissed', 'true');
  };

  if (!showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50 md:max-w-sm md:left-auto">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-bold mb-1">📱 Install FarmLink 360</h4>
          <p className="text-sm text-green-100 mb-3">
            Add to your home screen for quick access to all farm tools
          </p>
          <div className="flex space-x-2">
            <button
              onClick={handleInstall}
              className="flex items-center space-x-2 bg-white text-green-600 px-3 py-2 rounded font-medium text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Install Now</span>
            </button>
            <button
              onClick={handleDismiss}
              className="text-green-100 hover:text-white text-sm px-3 py-2"
            >
              Later
            </button>
          </div>
        </div>
        <button onClick={handleDismiss} className="text-green-100 hover:text-white ml-2">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default InstallPrompt;