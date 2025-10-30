import React, { useEffect, useState } from "react";
// CORRECTED: Importing the function as markNotificationAsRead
import { markNotificationAsRead, fetchNotifications } from "../services/notificationService"; 
import { CheckCircle, Bell } from "lucide-react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNotifications() {
      try {
        setLoading(true);
        const data = await fetchNotifications();
        setNotifications(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    }
    loadNotifications();
  }, []);

  async function handleMarkAsRead(id) {
    try {
      // CORRECTED: Calling the function as markNotificationAsRead
      await markNotificationAsRead(id); 
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, read: true } : n
        )
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
      // Replaced alert() with console log
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-green-700 font-medium">
        Loading notifications...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
        <Bell className="w-6 h-6" />
        Notifications
      </h1>

      {notifications.length === 0 ? (
        <p className="text-gray-600">You have no notifications yet.</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg shadow-sm border flex justify-between items-center transition ${
                notification.read
                  ? "bg-white border-gray-200"
                  : "bg-green-100 border-green-400"
              }`}
            >
              <div>
                <h2 className="font-semibold text-gray-800">
                  {notification.title || "Notification"}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(notification.created_at).toLocaleString()}
                </p>
              </div>

              {!notification.read && (
                <button
                  onClick={() => handleMarkAsRead(notification.id)}
                  className="flex items-center gap-1 text-sm text-green-700 font-medium hover:text-green-900"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark as Read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}