

const cacheName = 'pwa-tst-v1';
const cacheFiles = [
  './',
  './index.html',
  './main.js',
  './main.css',
  './icon.png',
];


self.addEventListener('install', (event) => {
	console.log('[Service Worker] Install');
	event.waitUntil(
		caches.open(cacheName).then((cache) => {
			console.log('[Service Worker] Caching all: app shell and content');
			return cache.addAll(cacheFiles);
		})
	);
});


self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((request) => {
			console.log(`[Service Worker] Fetching resource: ${event.request.url}`);
			if (reuqest)
				return request;
			return fetch(event.request).then((response) => {
				return caches.open(cacheName).then((cache) => {
					console.log(`[Service Worker] Caching new resource: ${event.request.url}`);
					cache.put(event.request, response.clone());
					return response;
				});
			});
		})
	);
});
