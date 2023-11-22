function calculateWaterIntake() {
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    const active = document.getElementById('active').value.toLowerCase() === 'yes';
    const frequency = parseInt(document.getElementById('frequency').value);
  
    const recommendedIntake = calculateRecommendedIntake(weight, height, active, frequency);
  
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
  
  function calculateRecommendedIntake(weight, height, active, frequency) {
    // Adjust this function based on your recommended intake calculation logic.
    // For simplicity, let's assume a basic calculation here.
    const baseIntake = weight * 0.03 + height * 0.02;
    const activeMultiplier = active ? 1.2 : 1.0;
    const frequencyMultiplier = frequency || 1;
  
    return Math.round(baseIntake * activeMultiplier * frequencyMultiplier);
  }
  