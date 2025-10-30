import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; 

// 1. Define the configuration using VITE environment variables from the .env file.
// ✅ FIX: Changed from process.env to import.meta.env for Vite environment access
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, 
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID, 
};

// --- Initialization Logic ---
let authInstance = null;
let dbInstance = null;
let initError = null; // Variable to capture initialization error outside of state

if (firebaseConfig.projectId && firebaseConfig.apiKey) {
    try {
        const app = initializeApp(firebaseConfig);
        authInstance = getAuth(app);
        dbInstance = getFirestore(app);
        // const analytics = getAnalytics(app); // Initialize analytics if needed
        console.log("Firebase initialized successfully.");
    } catch (error) {
        console.error("Firebase initialization failed:", error);
        // Set initialization error if catch block is hit
        initError = "Firebase initialization failed. Check config and network.";
    }
} else {
    console.error("Firebase configuration is incomplete or missing. Check your .env file and restart the server.");
    // Set initialization error if config is missing
    initError = "Firebase configuration is missing.";
}

// --- NEW EXPORTS AND HELPERS ADDED HERE ---

/**
 * ⚡ FIX for 'getFirestorePath' import error.
 * Constructs the full Firestore path for a user-specific collection.
 * e.g., 'users/{userId}/records'
 */
export const getFirestorePath = (userId, collectionId) => {
    if (!userId) {
        // Return a path that would fail safely or indicate an issue
        console.error("Cannot construct Firestore path: userId is null.");
        return `public/${collectionId}`; // Example fallback, adjust as needed
    }
    // Assuming your top-level structure is `users/{userId}/{collectionId}`
    return `users/${userId}/${collectionId}`;
};

/**
 * 🎨 FIX for 'LoadingScreen' import error.
 * A simple component to display while authentication state is being checked.
 */
export const LoadingScreen = () => (
    <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        fontSize: '24px' 
    }}>
        Loading Application...
    </div>
);

// NOTE: 'renderMarkdown' was not defined. Assuming it will be defined elsewhere (e.g., in utils/markdown.js) 
// or should not be imported from this context file. Since you imported it in Records.jsx:
// If you need it to be in this file, you must define it here. Otherwise, you should import 
// it from '../utils/markdown' (based on your folder structure) instead of '../contexts/FirebaseContext'.

// 2. Define the Context structure that provides the state
const FirebaseContext = createContext({
    auth: null,
    db: null,
    userId: null,
    isAuthReady: false,
    authError: null
});

// 3. Define the custom hook for components to use
export const useFirebase = () => useContext(FirebaseContext);

// 4. Define the Provider component
export const FirebaseProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    // Initialize authError with the initial error captured outside the component
    const [authError, setAuthError] = useState(initError); 
    // isAuthReady is set to true immediately if initError exists, otherwise it starts at false
    const [isAuthReady, setIsAuthReady] = useState(!!initError); 

    useEffect(() => {
        // If initialization failed outside of useEffect, we skip the rest of the logic
        if (initError) {
            return;
        }

        const unsubscribe = onAuthStateChanged(authInstance, (user) => {
            if (user) {
                setUserId(user.uid);
                // Clear any previous sign-in errors once a user is found
                setAuthError(null);
            } else {
                setUserId(null);

                // Attempt anonymous sign-in only if auth state is not yet ready
                if (!isAuthReady) {
                    signInAnonymously(authInstance).catch(error => {
                        console.error("Anonymous sign-in failed:", error);
                        // Provide a clearer error code for debugging (like auth/api-key-not-valid)
                        setAuthError(`Anonymous sign-in failed. Error code: ${error.code}`);
                    });
                }
            }
            // Set ready state after the initial authentication check is complete
            setIsAuthReady(true);
        });
        
        return () => unsubscribe();
    }, [isAuthReady]); // Depend on isAuthReady to control initial anonymous sign-in attempt

    const contextValue = {
        auth: authInstance,
        db: dbInstance,
        userId,
        isAuthReady,
        authError
    };

    return (
        <FirebaseContext.Provider value={contextValue}>
            {children}
        </FirebaseContext.Provider>
    );
};

// Export the Provider to be used in App.jsx or main.jsx
export default FirebaseProvider;