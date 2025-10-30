// src/services/marketService.js

import api from "./api"; // Import the ApiService instance

/**
 * Fetches the list of all crop listings.
 * Corresponds to: GET /api/market
 * @returns {Promise<Array>} Array of crop listing objects.
 */
export async function fetchCrops() {
    try {
        // FIX: Replaced api.get with api.request
        // The api.request method already returns the JSON body directly.
        const crops = await api.request("/market"); 
        return crops;
    } catch (error) {
        console.error("Error fetching crops:", error.message);
        // Rethrow the error for component handling
        throw error;
    }
}

/**
 * Fetches the list of all Livestock available in the Marketplace.
 * Corresponds to: GET /api/market/livestock
 * @returns {Promise<Array>} Array of livestock listing objects.
 */
export async function fetchLivestock() {
    try {
        // FIX: Replaced api.get with api.request
        const livestock = await api.request("/market/livestock"); 
        return livestock;
    } catch (error) {
        console.error("Error fetching livestock:", error.message);
        // Returning empty array on fetch failure as requested in the original logic
        return []; 
    }
}

/**
 * Submits a new crop listing.
 * Corresponds to: POST /api/market
 * @param {object} listingData - Requires at least 'name' and 'price'
 * @returns {Promise<object>} The newly created listing object.
 */
export async function createListing(listingData) {
    try {
        // FIX: Replaced api.post with api.request using the POST method
        const newListing = await api.request("/market", { 
            method: 'POST',
            body: JSON.stringify(listingData),
        }); 
        return newListing;
    } catch (error) {
        console.error("Error creating listing:", error.message);
        // The error object thrown by api.request contains the custom message if available
        throw new Error(error.message || "Failed to create market listing.");
    }
}