import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithCustomToken } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; // Analytics removed as it needs to be initialized only once

// --- Configuration Source Definitions ---
// Using the latest hardcoded config you provided as a reliable fallback
const hardcodedConfig = {
  apiKey: "AIzaSyDSm_AMvbkhbrzoPNc7ocrKLL9gATDzJsM",
  authDomain: "farmlink360.firebaseapp.com",
  projectId: "farmlink360",
  storageBucket: "farmlink360.firebasestorage.app",
  messagingSenderId: "870641929311",
  appId: "1:870641929311:web:23fe99fc5cd43e6e871fea",
  measurementId: "G-T2WLZ1LEER"
};

let firebaseConfig = hardcodedConfig; 
// FIX: Redeclaring initialAuthToken here to ensure it's in scope for the useEffect hook
let initialAuthToken = null; 

// --- Attempt to load REQUIRED Canvas Global Variables ---
try {
  // If the Canvas environment provides a config, we MUST use it as it contains valid credentials.
  if (typeof __firebase_config !== 'undefined' && __firebase_config) {
    // Parse the mandatory global config string
    firebaseConfig = JSON.parse(__firebase_config);
    console.log("Firebase config loaded from Canvas global variable (preferred).");
  }
  
  // Get the initial auth token string
  if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
    initialAuthToken = __initial_auth_token;
    console.log("Auth token loaded from Canvas global variable.");
  }
} catch (e) {
  // Fallback to the hardcoded config if parsing fails.
  console.error("Error processing Canvas Firebase globals, ensuring hardcoded config is used:", e);
}


let initError = null;
let appInstance = null;
let authInstance = null;
export let dbInstance = null; 

// --- Initialize Firebase Services Once ---
try {
  if (!firebaseConfig || !firebaseConfig.projectId) {
    throw new Error("Firebase configuration is critically missing. Cannot initialize Firebase.");
  }

  // Check if app is already initialized before initializing
  appInstance = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  authInstance = getAuth(appInstance);
  dbInstance = getFirestore(appInstance);
  // NOTE: Analytics initialization and usage should be handled elsewhere if needed
  
  console.log("Firebase initialized successfully with final configuration.");
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
  const [isAuthReady, setIsAuthReady] = useState(!!initError); 

  useEffect(() => {
    // Exit if initialization failed or auth is not available
    if (initError || !authInstance) {
      setIsAuthReady(true);
      return;
    }

    const initializeAuth = async () => {
      try {
        const token = initialAuthToken; // Now this reference is valid!

        if (token) {
          // If the guaranteed-valid token is found, use it
          await signInWithCustomToken(authInstance, token);
          console.log("Signed in with Canvas custom token.");
        } 
        // CRITICAL CHANGE: We REMOVE the failing signInAnonymously block.
        // We rely on the host environment (Canvas) to manage the session using a valid key.

        // Set up the state listener
        const unsubscribe = onAuthStateChanged(authInstance, (user) => {
          setUserId(user ? user.uid : null);
          setIsAuthReady(true); // Signal completion of the auth check
        });

        return unsubscribe;
      } catch (error) {
        console.error("Initial auth check or sign-in failed:", error);
        setAuthError(error.message);
        setIsAuthReady(true); 
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
