import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged, signInAnonymously, signInWithCustomToken } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// --- TEMPORARY HARDCODED CONFIGURATION ---
// IMPORTANT: Environment variables (__firebase_config and import.meta.env) are failing 
// to load in your environment. We are hardcoding the config from your image 
// to ensure Firebase initializes successfully, which is necessary to unblock your data fetching.
const firebaseConfig = {
  apiKey: "AIzaSyDie_QWmhOkbhrsoPMoDcertIL6ZgBhW",
  authDomain: "farmlinkz.firebaseapp.com",
  projectId: "farmlinkz-96c20",
  storageBucket: "farmlinkz-96c20.appspot.com",
  messagingSenderId: "379664593331",
  appId: "1:379664593331:web:23f5e9f8cc943eb4d7f6aa",
};
// NOTE: We assume no custom token is needed for initial anonymous access.
const customToken = null; 


let initError = null;
let appInstance = null;
let authInstance = null;
// Export the initialized instance immediately
export let dbInstance = null; 

// Initialize Firebase
try {
  // Final check for configuration completeness
  if (!firebaseConfig.projectId) {
    throw new Error("Firebase configuration is missing or incomplete. Cannot initialize Firebase.");
  }

  // Initialize App and Services
  appInstance = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  authInstance = getAuth(appInstance);
  dbInstance = getFirestore(appInstance);
  
  console.log("Firebase initialized successfully.");
} catch (error) {
  console.error("Firebase initialization failed:", error);
  initError = error.message;
}

// --- Context ---
const FirebaseContext = createContext({
  auth: null,
  db: null,
  userId: null,
  isAuthReady: false,
  authError: initError
});

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [authError, setAuthError] = useState(initError);
  // Set isAuthReady to true immediately if we failed to initialize, to prevent infinite loading state
  const [isAuthReady, setIsAuthReady] = useState(!!initError); 

  useEffect(() => {
    // If Firebase failed to init, or auth is not available, we can't proceed.
    if (initError || !authInstance) {
      setIsAuthReady(true);
      return;
    }

    const initializeAuth = async () => {
      try {
        const token = customToken; // Use the hardcoded token (which is null for now)

        if (token) {
          // 1. Sign in with the custom token if provided
          await signInWithCustomToken(authInstance, token);
          console.log("Signed in with custom token.");
        } else if (!authInstance.currentUser) {
          // 2. Fallback to anonymous sign-in if no token is available
          await signInAnonymously(authInstance);
          console.log("Signed in anonymously.");
        }

        // 3. Set up the state listener
        const unsubscribe = onAuthStateChanged(authInstance, (user) => {
          setUserId(user ? user.uid : null);
          setIsAuthReady(true);
        });

        return unsubscribe;
      } catch (error) {
        console.error("Initial sign-in failed:", error);
        setAuthError(error.message);
        setIsAuthReady(true); // Ensure readiness state is set even on failure
      }
    };

    initializeAuth();
  }, []);

  return (
    <FirebaseContext.Provider value={{ auth: authInstance, db: dbInstance, userId, isAuthReady, authError }}>
      {children}
    </FirebaseContext.Provider>
  );
};

// Export the db instance for use in non-component files (like services)
export const db = dbInstance;
