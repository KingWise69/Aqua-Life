document.addEventListener("DOMContentLoaded", () => {
  // Prompt the user to set the interval (hours, minutes, or seconds)
  const userInput = prompt("Set the interval for reminders (e.g., 1h, 30m, or 45s):");

  // Set default interval to 1 hour
  let interval = 3600000; // 1 hour in milliseconds

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

  // Show an immediate pop-up message with vibration and icon
  showImmediateReminder(iconPath);

  // Schedule reminder based on the user-defined interval
  setInterval(() => {
    showImmediateReminder(iconPath);
  }, interval);
});

function showImmediateReminder(iconPath) {
  // Use vibration API if available
  if ('vibrate' in navigator) {
    navigator.vibrate([200, 100, 200]); // Default vibration pattern
  }

  // Create a temporary image element for the icon
  const iconImg = new Image();
  iconImg.src = iconPath;
  iconImg.style.width = '50px'; // Adjust the width as needed

  // Show an immediate pop-up message with icon
  alert("Aqua-Lyfe Reminder: It's time to take a sip and stay hydrated!", iconImg);
}
