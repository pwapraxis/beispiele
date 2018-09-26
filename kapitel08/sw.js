self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('push', event => {
  const notification = event.data.json();
  self.registration.showNotification(notification.title, notification);
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll().then(windowClients => windowClients.length ? windowClients[0].focus() : clients.openWindow('/'))
  );
});
