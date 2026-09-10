/* ==============================================================================
   SMT. CHM COLLEGE - PROGRESSIVE WEB APP SERVICE WORKER (v6.0.0)
   ============================================================================== */

const CACHE_NAME = 'chm-college-cache-v6';
const PRECACHE_ASSETS = [
  './',
  'index.html',
  'portal.html',
  'pitch-deck.html',
  'curriculum-planner.html',
  'railway-concession.html',
  'grievance.html',
  'admission.html',
  'fee-payment.html',
  'exams.html',
  'naac-iqac.html',
  'placement.html',
  'alumni.html',
  'alumni-jobs.html',
  'research.html',
  'faculty.html',
  'parent-portal.html',
  'governance.html',
  'campus-tour.html',
  'scholarships.html',
  'question-bank.html',
  'events.html',
  'digital-library.html',
  'assessment-tools.html',
  'clubs.html',
  'green-campus.html',
  'css/theme.css',
  'css/components.css',
  'css/responsive.css',
  'js/app.js',
  'js/ai-bot.js',
  'js/student-portal.js',
  'js/persona-switcher.js',
  'js/admission.js',
  'js/fee-system.js',
  'js/exam-portal.js',
  'assets/images/logo.png',
  'manifest.json'
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
      if (cachedResponse) {
        // Revalidate in background
        fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse);
            });
          }
        }).catch(() => {});
        return cachedResponse;
      }

      // Not cached - fetch from network and cache
      return fetch(event.request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // Offline fallback for navigation requests
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('index.html');
        }
      });
    })
  );
});
