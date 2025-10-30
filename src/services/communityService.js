// src/services/communityService.js (Finalized)

import api from "./api"; // Import the configured Axios instance

/**
 * Fetches the list of all posts for the Community Hub.
 * Corresponds to: GET /api/posts
 * @returns {Promise<Array>} A promise that resolves to an array of post objects.
 */
export async function fetchPosts() {
    try {
        // Confirmed path from your post_routes.py blueprint registration
        const response = await api.get("/posts"); 
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error.response ? error.response.data : error.message);
        throw error;
    }
}

/**
 * Submits a new post to the community hub.
 * Corresponds to: POST /api/posts
 * @param {object} postData - Requires 'title', 'content', and 'user_id'.
 * @returns {Promise<object>} A promise that resolves to the newly created post object.
 */
export async function createPost(postData) {
    try {
        // Confirmed path from your post_routes.py blueprint registration
        const response = await api.post("/posts", postData); 
        return response.data;
    } catch (error) {
        console.error("Error creating post:", error.response ? error.response.data : error.message);
        throw new Error(error.response?.data?.message || "Failed to submit new post.");
    }
}