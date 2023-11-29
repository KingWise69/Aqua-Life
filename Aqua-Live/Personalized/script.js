function calculateWaterIntake() {
  const weight = parseInt(document.getElementById('weight').value);
  const recommendedIntake = calculateRecommendedIntake(weight);

  document.getElementById('result').innerText = `Recommended Water Intake: ${recommendedIntake} liters`;

  // Notify the user
  if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        const notification = new Notification('Hydration Reminder', {
          body: `It's time to drink water! Recommended Intake: ${recommendedIntake} liters`,
        });

        // Vibrate for 1 second
        if ('vibrate' in navigator) {
          navigator.vibrate(1000);
        }
      }
    });
  }
}

function calculateRecommendedIntake(weight) {
  // Adjust this function based on your recommended intake calculation logic.
  // Using the provided information as a guideline.
  const mlPerKg = 35;
  const recommendedIntake = Math.round(mlPerKg * weight / 1000);

  return recommendedIntake;
}
