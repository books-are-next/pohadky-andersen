/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-9d84138';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./pohadky_andersen_002.html","./pohadky_andersen_005.html","./pohadky_andersen_006.html","./pohadky_andersen_007.html","./pohadky_andersen_008.html","./pohadky_andersen_009.html","./pohadky_andersen_010.html","./pohadky_andersen_011.html","./pohadky_andersen_012.html","./pohadky_andersen_013.html","./pohadky_andersen_014.html","./pohadky_andersen_015.html","./pohadky_andersen_016.html","./pohadky_andersen_017.html","./pohadky_andersen_018.html","./pohadky_andersen_019.html","./pohadky_andersen_020.html","./pohadky_andersen_021.html","./pohadky_andersen_022.html","./pohadky_andersen_023.html","./pohadky_andersen_024.html","./pohadky_andersen_025.html","./pohadky_andersen_026.html","./pohadky_andersen_027.html","./pohadky_andersen_028.html","./pohadky_andersen_029.html","./pohadky_andersen_030.html","./pohadky_andersen_031.html","./pohadky_andersen_032.html","./pohadky_andersen_033.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/obalka.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
