const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
    
    cacheName: 'page-cache',
    
    plugins: [

            new CacheableResponsePlugin({
            statuses: [0, 200],
        }),
            new ExpirationPlugin({
            maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
    ],
});



warmStrategyCache({

    urls: ['/index.html', '/'],
    strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// I took this route from the solved mini project of Module 19, with one slight modification.
registerRoute(

    ({ request }) => ['style', 'script', 'worker', 'image'].includes(request.destination),
        
        new StaleWhileRevalidate({

        // Name of the cache storage.
        cacheName: 'asset-cache',
        plugins: [

            new CacheableResponsePlugin({
            statuses: [0, 200],
            }),
        ],
    })
);

// I took this function from activity 25 of module 19.
self.addEventListener('fetch', function (event) {
    
    // This fetch function is required for the SW to be detected and is intentionally empty
    // For a more robust, real-world SW example see: https://developers.google.com/web/fundamentals/primers/service-workers
});