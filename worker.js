// Service Worker for Bagathsingh Fish Shop
const CACHE_NAME = 'bagathsingh-fish-v3'; // Incremented version
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/assets/hero.png',
  '/assets/scales.png',
  '/assets/category_fresh.png',
  '/assets/logo.jpg',
  '/assets/nagarai.jpg',
  '/assets/thirukkai.jpg',
  '/assets/vilai.jpg',
  '/assets/squid.jpg',
  '/assets/prawns.png'
];

// Install Event
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force new SW to activate immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(), // Take control of all open tabs immediately
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        );
      })
    ])
  );
});

// Fetch Event - Network First Strategy
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // If network request is successful, update cache and return response
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // If network fails (offline), try to serve from cache
        return caches.match(event.request);
      })
  );
});
