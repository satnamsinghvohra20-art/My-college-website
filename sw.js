/* ==============================================================================
   SMT. CHM COLLEGE - PROGRESSIVE WEB APP SERVICE WORKER (v6.0.0)
   ============================================================================== */

const CACHE_NAME = 'chm-college-cache-v7';
const PRECACHE_ASSETS = [
  './',
  'index.html',
  'pages/portal.html',
  'pages/pitch-deck.html',
  'pages/curriculum-planner.html',
  'pages/railway-concession.html',
  'pages/grievance.html',
  'pages/library-kiosk.html',
  'pages/sindhi-heritage.html',
  'pages/gymkhana.html',
  'pages/admission.html',
  'pages/fee-payment.html',
  'pages/exams.html',
  'pages/naac-iqac.html',
  'pages/placement.html',
  'pages/alumni.html',
  'pages/alumni-jobs.html',
  'pages/research.html',
  'pages/faculty.html',
  'pages/parent-portal.html',
  'pages/governance.html',
  'pages/campus-tour.html',
  'pages/scholarships.html',
  'pages/question-bank.html',
  'pages/events.html',
  'pages/digital-library.html',
  'pages/assessment-tools.html',
  'pages/clubs.html',
  'pages/green-campus.html',
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
