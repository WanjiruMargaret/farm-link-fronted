import api from "./api"; // Ensure you have this configured to handle base URL and authentication headers

/**
 * Fetches the list of all notifications for the logged-in user.
 * Corresponds to: GET /api/notifications
 * The user ID is inferred from the authentication token/session on the server side.
 * @returns {Promise<Array>} A promise that resolves to an array of notification objects.
 */
export async function fetchNotifications() {
    try {
        const response = await api.get("/notifications"); 
        return response.data;
    } catch (error) {
        console.error("Error fetching notifications:", error.response ? error.response.data : error.message);
        throw error;
    }
}

/**
 * Marks a specific notification as read.
 * Corresponds to: PATCH /api/notifications/<id>/read
 * @param {number} notificationId The ID of the notification to mark as read.
 * @returns {Promise<Object>} A promise that resolves to the updated notification object.
 */
export async function markAsRead(notificationId) {
    try {
        // Send an empty body as the backend only needs the ID
        const response = await api.patch(`/notifications/${notificationId}/read`, {});
        return response.data;
    } catch (error) {
        console.error(`Error marking notification ${notificationId} as read:`, error.response ? error.response.data : error.message);
        throw error;
    }
}
