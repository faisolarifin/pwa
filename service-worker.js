const CACHE_NAME = 'CACHE-01';
const toCache = [
    '/',
    'assets/js/manifest.json',
    'assets/js/register.js',
    'assets/images/favicon.png',
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(toCache)
        })
        .then(self.skipWaiting())
    )
})

self.addEventListener("fetch", (evt) => {
    console.log("[ServiceWorker] Fetch", evt.request.url);
    if (evt.request.url.includes("faisolarifin.github.io/pwa/")) {
        evt.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                return cache.match(evt.request).then(
                    (cacheResponse) =>
                    cacheResponse ||
                    fetch(evt.request).then((networkResponse) => {
                        cache.put(evt.request, networkResponse.clone());
                        return networkResponse;
                    })
                );
            })
        );
    } else {
        evt.respondWith(fetch(evt.request));
    }
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
        .then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('Hapus cache lama', key)
                    return caches.delete(key)
                }
            }))
        })
        .then(() => self.clients.claim())
    )
})
