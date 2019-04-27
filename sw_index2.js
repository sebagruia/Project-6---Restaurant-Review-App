// This version Caches the entire site

const cacheName = 'v1';

//Call Install Event

self.addEventListener('install', event => {
    console.log('Service Worker: Installed');
});

//Call Activate Event

self.addEventListener('activate', event => {
    console.log('Service Worker: Activated');
    //Remove unwanted caches
    event.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Deleting Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});


//Call Fetch Event (Fetching the entire Site)

self.addEventListener('fetch', event => {
    console.log('Service Worker: Fetching from Cache');
    event.respondWith(
        fetch(event.request)
        .then(response => {
            //Clone the response
            const responseReplica = response.clone();
            //Open a Cache
            caches.open(cacheName).then(cache => {
                //Adding the response to cache
                cache.put(event.request, responseReplica);
            })
            return response;
        })
        .catch((err) => caches.match(event.request).then(response=>response)));
});