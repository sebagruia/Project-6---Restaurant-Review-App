const cacheName = 'v1';
//const cacheComponents = [
//    '/index.html',
//    '/restaurant.html',
//    '/js/main.js',
//    '/js/restaurant_info.js',
//    '/js/dbhelper.js',
//    '/img/1.jpg',
//    '/img/2.jpg',
//    '/img/3.jpg',
//    '/img/4.jpg',
//    '/img/5.jpg',
//    '/img/6.jpg',
//    '/img/7.jpg',
//    '/img/8.jpg',
//    '/img/9.jpg',
//    '/img/10.jpg',
//    '/data/restaurants.json',
//    '/css/media-query.css',
//    '/css/media-query-reviews.css',
//    '/css/styles.css'
// ];

//Call Install Event

self.addEventListener('install', event => {
    console.log('Service Worker: Installed');
    //    event.waitUntil(
    //        caches
    //        .open(cacheName)
    //        .then(cache => {
    //            console.log('Service Worker: Caching Files');
    //            cache.addAll(cacheComponents);
    //        })
    //
    //        .then(() => self.skipWaiting())
    //    );
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


//Call Fetch Event (the entire site)

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
        .catch((err) => caches.match(event.request)));

});