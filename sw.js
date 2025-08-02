// Service Worker for MG Accounting Website
const CACHE_NAME = 'mg-accounting-v1';
const urlsToCache = [
  '/',
  '/css/bootstrap.min.css',
  '/css/core.css',
  '/css/style.css',
  '/css/custom.css',
  '/js/main.js',
  '/js/tax-calculator.js',
  '/images/cover2.jpg',
  '/images/logo-blue-black.png',
  '/images/favicon.png'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 