import api from "./api"; // Import the configured Axios instance

/**
 * Fetches the list of all crops (listings).
 * Corresponds to: GET /api/market
 * Used in Marketplace.jsx to display all crops.
 * @returns {Promise<Array>} Array of crop listing objects.
 */
export async function fetchCrops() {
    try {
        const response = await api.get("/market"); 
        return response.data;
    } catch (error) {
        console.error("Error fetching crops:", error.response ? error.response.data : error.message);
        throw error;
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
        const response = await api.post("/market", listingData); 
        return response.data;
    } catch (error) {
        console.error("Error creating listing:", error.response ? error.response.data : error.message);
        throw new Error(error.response?.data?.message || "Failed to create market listing.");
    }
}
