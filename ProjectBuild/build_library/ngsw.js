
console.log("Refreshing the Service Worker");
const precacheResource = "precacheResource-" + "swVersion";
const realtimeResource = "realtimeResource-" + "swVersion";
const remoteResource = "remoteResource-" + "swVersion";

// A list of local resources we always want to be cached.
const precache_urls = [
    replacement_script_goes_here
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(precacheResource)
            // turn off integrated debugging with Visual Studio to remove exception thrown on addAll
            .then(cache => cache.addAll(precache_urls))
            .then(self.skipWaiting())
    );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener("activate", event => {
    const currentCaches = [precacheResource, realtimeResource];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        }).then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.delete(cacheToDelete);
            }));
        }).then(() => self.clients.claim())
    );
});

// The fetch handler serves responses
// If no response is found, it populates the realtimeResource, or remoteResource cache with the response
self.addEventListener("fetch", event => {
    // service on GETs
    if (event.request.method !== "GET") { return; }
    // but not GETs that are using real-time notifications
    if (event.request.url.indexOf("messagePump") !== -1) { return; }

    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return caches.open(realtimeResource).then(cache => {
                    return fetch(event.request).then(response => {
                        // Put a copy of the response in the realtimeResource cache.
                        return cache.put(event.request, response.clone()).then(() => {
                            return response;
                        });
                    });
                });
            })
                .catch(err => {  // fallback mechanism, which accommodates a refresh; this will reload the app, and the reload will navigate to the current angular feature
                    return caches.open(precacheResource)
                        .then(function (cache) {
                            return cache.match("/dist-desktop/index.html");
                        });
                })
        );
    } else {
        // Cache cross-origin requests
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return caches.open(remoteResource).then(cache => {
                    return fetch(event.request).then(response => {
                        // Put a copy of the response in the realtimeResource cache.
                        return cache.put(event.request, response.clone()).then(() => {
                            return response;
                        });
                    });
                });
            })
        );
    }

});
