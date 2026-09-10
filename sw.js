/* ==============================================================================
   SMT. CHM COLLEGE - PROGRESSIVE WEB APP SERVICE WORKER (v5.0.0)
   ============================================================================== */

const CACHE_NAME = 'chm-college-cache-v5';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/portal.html',
  '/admission.html',
  '/fee-payment.html',
  '/exams.html',
  '/naac-iqac.html',
  '/placement.html',
  '/alumni.html',
  '/research.html',
  '/faculty.html',
  '/parent-portal.html',
  '/governance.html',
  '/campus-tour.html',
  '/scholarships.html',
  '/question-bank.html',
  '/events.html',
  '/digital-library.html',
  '/assessment-tools.html',
  '/clubs.html',
  '/css/theme.css',
  '/css/components.css',
  '/css/responsive.css',
  '/js/app.js',
  '/js/ai-bot.js',
  '/js/student-portal.js',
  '/assets/images/logo.png',
  '/manifest.json'
];

// 1. Install Event: Pre-cache critical core shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_ASSETS).catch(err => {
        console.warn('Some precache assets failed to fetch:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate Event: Clean up legacy caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event: Stale-while-revalidate strategy for maximum speed & offline resilience
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Fallback to cached version if offline
        return cachedResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
