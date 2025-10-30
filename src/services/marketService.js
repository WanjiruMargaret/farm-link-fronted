// ⚠️ We still assume this import works based on your last FirebaseContext.jsx file.
import { db } from '../contexts/FirebaseContext'; 
import { collection, query, getDocs, orderBy } from 'firebase/firestore'; 

/**
 * Fetches all crop listings from the 'crops' collection in Firestore.
 */
export const fetchCrops = async () => {
    console.log("Attempting to fetch crops from Firestore...");

    // CRITICAL CHECK: Ensure the database is initialized
    if (!db) {
        console.error("Database (db) instance is null. Firebase initialization failed.");
        throw new Error("Database connection unavailable.");
    }

    try {
        // 2. Define the query: target 'crops' collection, sort by date added
        const q = query(collection(db, 'crops'), orderBy('createdAt', 'desc'));
        
        const querySnapshot = await getDocs(q);
        
        // 3. Map the Firestore documents to a clean array of product objects
        const cropsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            rating: 4.5, // Placeholder rating
            ...doc.data()
        }));
        
        console.log("Crops fetched successfully:", cropsData.length);
        return cropsData;

    } catch (error) {
        console.error("FIREBASE ERROR fetching crops:", error);
        // Throw an error so the Marketplace component's try/catch can handle it
        throw new Error("Could not connect to Firebase to fetch crops.");
    }
};

/**
 * Fetches all livestock listings from the 'livestock' collection in Firestore.
 */
export const fetchLivestock = async () => {
    // CRITICAL CHECK: Ensure the database is initialized
    if (!db) {
        console.error("Database (db) instance is null. Firebase initialization failed.");
        throw new Error("Database connection unavailable.");
    }

    try {
        // 4. Define the query for 'livestock'
        const q = query(collection(db, 'livestock'), orderBy('createdAt', 'desc'));
        
        const querySnapshot = await getDocs(q);
        
        const livestockData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            rating: 4.0, 
            ...doc.data()
        }));

        console.log("Livestock fetched successfully:", livestockData.length);
        return livestockData;

    } catch (error) {
        console.error("FIREBASE ERROR fetching livestock:", error);
        throw new Error("Could not connect to Firebase to fetch livestock.");
    }
};
