// Import Workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

// Configure caching strategies
const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;
const { ExpirationPlugin } = workbox.expiration;
const { precacheAndRoute, createHandlerBoundToURL } = workbox.precaching;

// Precache static assets and the app shell
precacheAndRoute([
  { url: '/', revision: '1' },
  { url: '/index.html', revision: '1' },
  { url: '/offline.html', revision: '1' },
  { url: '/manifest.json', revision: '1' },
  { url: '/favicon.ico', revision: '1' }
]);

// App shell navigation handler
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'pages-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 25,
      }),
    ],
  })
);

// Fallback to offline page when navigation fails
const offlineFallbackPage = '/offline.html';

// This handles the case when a navigation request fails
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(offlineFallbackPage);
      })
    );
  }
});

// Cache CSS, JS, and Web Worker resources with a Stale While Revalidate strategy
registerRoute(
  ({ request }) => 
    request.destination === 'style' || 
    request.destination === 'script' || 
    request.destination === 'worker',
  new StaleWhileRevalidate({
    cacheName: 'assets-cache',
  })
);

// Cache images with a Cache First strategy
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);

// Handle push notifications
self.addEventListener('push', (event) => {
  const data = event.data.json();
  
  const options = {
    body: data.notification.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-icon.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.notification.click_action || '/',
    },
  };
  
  event.waitUntil(
    self.registration.showNotification(data.notification.title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});