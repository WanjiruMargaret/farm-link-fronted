import api from "./api"; // Ensure this path is correct

/**
 * Fetches the user's latest notifications.
 * @returns {Promise<Array>} A promise that resolves to an array of notification objects.
 */
export async function fetchNotifications() {
  try {
    // Check if backend is available before making request
    if (!api.backendAvailable && (Date.now() - api.lastBackendCheck) < api.backendCheckInterval) {
      return []; // Return empty array if backend is known to be unavailable
    }
    
    const notifications = await api.request("/notifications"); 
    
    // Safety check: Ensure the result is an array
    if (!Array.isArray(notifications)) {
        console.warn("API returned non-array data for notifications:", notifications);
        return [];
    }
    
    return notifications;
  } catch (error) {
    // Silently return empty array for connection errors
    return [];
  }
}

/**
 * Marks a specific notification as read.
 * @param {string} notificationId - The ID of the notification to mark as read.
 */
export async function markNotificationAsRead(notificationId) {
  try {
    // FIX: Changed api.put to api.request, explicitly setting the method to 'PUT'.
    await api.request(`/notifications/${notificationId}/read`, {
        method: 'PUT' 
    });
    console.log(`Notification ${notificationId} marked as read.`);
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw new Error("Failed to update notification status.");
  }
}

// NOTE: This function name must be used in NotificationsPage.jsx
export const markAsRead = markNotificationAsRead;