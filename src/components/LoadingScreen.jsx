import React from 'react';
import { Loader } from 'lucide-react';

/**
 * A simple, centered component to display while the application is loading 
 * or waiting for authentication status.
 * @returns {JSX.Element}
 */
export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4 flex items-center justify-center">
         <Loader className="w-8 h-8 text-green-600 opacity-70" />
      </div>
      <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">Authenticating FarmLink user...</p>
      <p className="text-sm text-gray-400 mt-1">Checking Firebase status...</p>
    </div>
  );
}