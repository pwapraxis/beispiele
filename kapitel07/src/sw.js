importScripts('workbox-v3.6.1/workbox-sw.js');

self.addEventListener('message', event => {
	if (event.data === 'ping') {
		console.log('pong');
	}
});

workbox.precaching.precacheAndRoute([
  {
    "url": "app.css",
    "revision": "5ee2fc43a300c0f7a447076c06312a12"
  },
  {
    "url": "app.js",
    "revision": "6fd3ebde57172cb779e9a30ed1e223bd"
  },
  {
    "url": "index.html",
    "revision": "30a53a7ee0beb2adccb742c1a225ed7c"
  },
  {
    "url": "rain.jpg",
    "revision": "e9c2732c4320f3b13cce895fa502386e"
  },
  {
    "url": "sun.jpg",
    "revision": "859d2cb47066c0b5b89b8c2979c39fcc"
  }
]);
