// script.js

function calculateWaterIntake() {
  const weight = parseInt(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  const isPhysicallyActive = document.getElementById('active').value === 'Yes';
  const hasHealthComplications = document.getElementById('healthComplications').value === 'Yes';

  const recommendedIntake = calculateRecommendedIntake(weight, height, isPhysicallyActive, hasHealthComplications);

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

function calculateRecommendedIntake(weight, height, isPhysicallyActive, hasHealthComplications) {
  // Adjust this function based on your recommended intake calculation logic.
  // Using the provided information as a guideline.

  const mlPerKg = 35;
  const baseIntake = mlPerKg * weight / 1000;

  // Adjust based on height
  const heightMultiplier = height >= 7.0 ? 1.2 : 1.0;

  // Adjust based on health complications
  const healthComplicationMultiplier = hasHealthComplications ? 0.8 : 1.0;

  // Adjust based on physical activity
  const activityMultiplier = isPhysicallyActive ? 1.2 : 1.0;

  let recommendedIntake = baseIntake * heightMultiplier * healthComplicationMultiplier * activityMultiplier;

  // Cap the recommended intake for those over 90kg or 100kg
  if (weight > 90 && weight < 100) {
    recommendedIntake = Math.min(recommendedIntake, 4.5);
  } else if (weight >= 100) {
    recommendedIntake = Math.min(recommendedIntake, 5);
  }

  return recommendedIntake.toFixed(1);
}
