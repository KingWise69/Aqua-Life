// service-worker.js

self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('your-cache-name').then((cache) => {
        return cache.addAll([
          '/https://aqua-life.vercel.app', // Add your root URL and other important assets to cache
          '/index.html',
          '/index.css',
          '/logo.png',
          // Add other static assets that you want to cache
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  
  self.addEventListener('push', (event) => {
    const options = {
      body: event.data.text(),
      icon: 'logo.png',
      badge: 'logo.png',
    };
  
    event.waitUntil(
      self.registration.showNotification('Aqua-Lyfe Reminder', options)
    );
  });
  
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    // Add custom handling for notification click if needed
  });
  
  self.addEventListener('notificationclose', (event) => {
    // Add custom handling for notification close if needed
  });
  