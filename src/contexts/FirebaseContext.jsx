import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged, signInAnonymously, signInWithCustomToken } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// --- Firebase Configuration using Vite env variables ---
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let initError = null;
let appInstance = null;
let authInstance = null;
let dbInstance = null;

// Initialize Firebase
try {
  if (!Object.values(firebaseConfig).every(Boolean)) {
    throw new Error("Firebase configuration is incomplete. Check your .env variables.");
  }

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
  const [isAuthReady, setIsAuthReady] = useState(!!initError);

  useEffect(() => {
    if (initError || !authInstance) {
      setIsAuthReady(true);
      return;
    }

    const initializeAuth = async () => {
      try {
        const customToken = import.meta.env.VITE_FIREBASE_CUSTOM_TOKEN || null;

        if (customToken) {
          await signInWithCustomToken(authInstance, customToken);
          console.log("Signed in with custom token.");
        } else if (!authInstance.currentUser) {
          await signInAnonymously(authInstance);
          console.log("Signed in anonymously.");
        }

        const unsubscribe = onAuthStateChanged(authInstance, (user) => {
          setUserId(user ? user.uid : null);
          setIsAuthReady(true);
        });

        return unsubscribe;
      } catch (error) {
        console.error("Initial sign-in failed:", error);
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
