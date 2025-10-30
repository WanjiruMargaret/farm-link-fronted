import api from "./api"; // Ensure this path is correct

/**
 * Fetches the user's latest notifications.
 * @returns {Promise<Array>} A promise that resolves to an array of notification objects.
 */
export async function fetchNotifications() {
  try {
    // FIX: Changed api.request to use api.get for a GET request
    const notifications = await api.get("/notifications"); 
    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    // Re-throw a simplified error for component consumption
    throw new Error("Failed to load notifications from the server.");
  }
}

/**
 * Marks a specific notification as read.
 * @param {string} notificationId - The ID of the notification to mark as read.
 */
export async function markNotificationAsRead(notificationId) {
  try {
    // FIX: Changed api.request to use api.put for a PUT request
    await api.put(`/notifications/${notificationId}/read`);
    console.log(`Notification ${notificationId} marked as read.`);
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw new Error("Failed to update notification status.");
  }
}

// NOTE: This function name must be used in NotificationsPage.jsx
export const markAsRead = markNotificationAsRead;
