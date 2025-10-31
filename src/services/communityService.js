// src/services/communityService.js

import api from "./api"; // Import the configured ApiService instance

/**
 * Fetches the list of all posts for the Community Hub.
 * Corresponds to the method defined in api.js: api.getPosts()
 * @returns {Promise<Array>} A promise that resolves to an array of post objects.
 */
export async function fetchPosts(category = 'all', page = 1, limit = 10) {
    try {
        // 🛑 FIX 1: Using the correct method: api.getPosts
        // The api object is an instance of ApiService, which defines 'getPosts'
        const response = await api.getPosts(category, page, limit); 
        return response; // ApiService's request() method already returns parsed JSON data
    } catch (error) {
        // You should see the detailed error from your ApiService if the API call fails
        console.error("Error fetching posts:", error.message);
        throw new Error(error.message || "Failed to load community posts.");
    }
}

/**
 * Submits a new post to the community hub.
 * Corresponds to the method defined in api.js: api.createPost(postData)
 * @param {object} postData - Requires 'title', 'content', and 'user_id'.
 * @returns {Promise<object>} A promise that resolves to the newly created post object.
 */
export async function createPost(postData) {
    try {
        // 🛑 FIX 1: Using the correct method: api.createPost
        const response = await api.createPost(postData); 
        return response; // ApiService's request() method already returns parsed JSON data
    } catch (error) {
        console.error("Error creating post:", error.message);
        throw new Error(error.message || "Failed to submit new post.");
    }
}