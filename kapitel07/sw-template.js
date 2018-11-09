importScripts('workbox-v3.6.1/workbox-sw.js');

self.addEventListener('message', event => {
	if (event.data === 'ping') {
		console.log('pong');
	}
});

workbox.precaching.precacheAndRoute([]);
