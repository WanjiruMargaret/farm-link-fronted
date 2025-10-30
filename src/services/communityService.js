import api from "./api"; // Ensure this path is correct

/**
 * Fetches posts from the community hub.
 * @param {string} category - The category to filter by (e.g., 'all', 'pests').
 * @param {number} page - The current page number.
 * @param {number} limit - The number of posts per page.
 * @returns {Promise<Object>} A promise that resolves to an object containing posts and pagination data.
 */
export async function fetchPosts({ category = 'all', page = 1, limit = 10 }) {
  try {
    // FIX: Change api.get to api.request
    const params = new URLSearchParams({ category, page, limit });
    const posts = await api.request(`/community/posts?${params.toString()}`);
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to load community posts.");
  }
}

/**
 * Creates a new community post.
 * @param {Object} postData - The data for the new post.
 * @returns {Promise<Object>} The created post object.
 */
export async function createPost(postData) {
  try {
    const newPost = await api.request('/community/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
    return newPost;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create new community post.");
  }
}