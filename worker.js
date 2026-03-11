// Service Worker for Bagathsingh Fish Shop
const CACHE_NAME = 'bagathsingh-fish-v2';
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

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(ASSETS_TO_CACHE);
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
