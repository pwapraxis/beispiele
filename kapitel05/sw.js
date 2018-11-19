importScripts('https://cdnjs.cloudflare.com/ajax/libs/dexie/2.0.4/dexie.min.js', 'db.js');

self.addEventListener('install', () => {
    console.log('Installing');
});

self.addEventListener('activate', event => {
    event.waitUntil(db.open());
});

self.addEventListener('fetch', event => {
    console.log('fetch', event.request);
    if (event.request.url.endsWith('/hello-world')) {
        event.respondWith(new Response('Hallo Welt!'));
    }
    if (event.request.url.endsWith('/articles')) {
        event.respondWith(db.artikel.toArray().then(artikel => new Response(JSON.stringify(artikel))));
    }
});

self.addEventListener('message', event => {
    console.log('message', event.data);
    if (event.data === 'ping') {
        event.source.postMessage('pong');
    }
});
