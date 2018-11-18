self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('cache-demo-v1')
            .then(cache => cache.addAll(['/', '/index.html', '/sun.jpg', '/app.js', '/app.css']))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open('cache-demo-v1')
            .then(cache => cache.match(event.request))
            .then(response => response || fetch(event.request))
    );
});
