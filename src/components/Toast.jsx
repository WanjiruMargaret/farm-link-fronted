import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  // Use a map for cleaner color and icon handling
  const iconMap = {
    success: { Icon: CheckCircle, classes: 'bg-green-600 text-white' },
    error: { Icon: XCircle, classes: 'bg-red-600 text-white' },
    warning: { Icon: AlertTriangle, classes: 'bg-yellow-600 text-white' },
    // Added 'info' since it's a common toast type
    info: { Icon: Info, classes: 'bg-blue-600 text-white' },
  };

  const { Icon, classes } = iconMap[type] || iconMap.info;

  // Handles auto-closing after duration
  useEffect(() => {
    if (duration > 0 && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  // Handle manual close button click
  const handleClose = () => {
    if (onClose) {
        onClose();
    }
  };

  return (
    // Positioning and Z-index match your Login.jsx usage pattern
    <div className="fixed bottom-5 right-5 z-50 transition-all duration-300 transform translate-x-0 opacity-100">
      <div className={`${classes} px-4 py-3 rounded-lg shadow-xl flex items-center space-x-3 min-w-80`}>
        <Icon className="w-5 h-5 flex-shrink-0" />
        <span className="flex-1 text-sm font-medium">{message}</span>
        <button 
          onClick={handleClose} 
          className="p-1 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;