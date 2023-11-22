// notification.js

document.addEventListener("DOMContentLoaded", () => {
  // Check if the Notification API is supported
  if ("Notification" in window) {
    // Request permission for notifications
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        console.log("Notification permission granted. Reminders will be shown.");
        // Set default interval to 1 hour
        let interval = 3600000; // 1 hour in milliseconds

        // Prompt the user to set the interval (hours, minutes, or seconds)
        const userInput = prompt("Set the interval for notifications (e.g., 1h, 30m, or 45s):");

        if (userInput) {
          const match = userInput.match(/^(\d+)(h|m|s)$/);
          if (match) {
            const value = parseInt(match[1]);
            const unit = match[2];

            if (unit === "h") {
              interval = value * 3600000; // Convert hours to milliseconds
            } else if (unit === "m") {
              interval = value * 60000; // Convert minutes to milliseconds
            } else if (unit === "s") {
              interval = value * 1000; // Convert seconds to milliseconds
            }
          }
        }

        // Fixed icon path (replace with the path to your business logo)
        const iconPath = "/logo.png";

        // Schedule reminder based on the user-defined interval
        setInterval(() => {
          showNotification(iconPath);
        }, interval);
      } else {
        console.log("Notification permission denied. Reminders will not be shown.");
      }
    });
  }
});

function showNotification(iconPath) {
  // Check if the user has granted permission
  if (Notification.permission === "granted") {
    // Create a notification
    const notification = new Notification("Aqua-Lyfe Reminder", {
      body: "It's time to take a sip and stay hydrated!",
      icon: iconPath,
      vibrate: [200, 100, 200], // Default vibration pattern
      tag: "aqua-lyfe-reminder", // Tag for grouping notifications
    });

    // Close the notification after 5 seconds
    setTimeout(() => {
      notification.close();
    }, 5000);
  }
}
