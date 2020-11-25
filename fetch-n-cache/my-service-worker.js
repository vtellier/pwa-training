const version = "1.1.0";
const cacheKey = "pwa-training-cache-1.1.0";

const toCache = [
    "./img/punta-da-piedade.jpg",
    "./hello.txt"
];

self.addEventListener('install', e => {
    console.log('install event:', e);
    // Here we should install all the elements we'll need to use the app offline.
    e.waitUntil(
        caches.open(cacheKey)
            .then(cache => { return cache.addAll(toCache); })
    );
});
self.addEventListener('activate', e => {
    console.log('activate event:', e);
    // Here we should clean all ressources from the previous versions we don't need anymore.
});
self.addEventListener('fetch', e => {
    console.log('fetch', e);
    const url = e.request.url;
    console.log(url);
    if(url == "http://127.0.0.1:8080/fetch-n-cache/uhhh.html") {
        console.log('Hahaha i am maning in the middle');
        e.respondWith(fetch('http://127.0.0.1:8080/fetch-n-cache/hello.txt'));
    }
    else if(url == "http://127.0.0.1:8080/fetch-n-cache/sw/version") {
        console.log('giving version of this SW');
        const response = new Response(version, { status: 200 });
        e.respondWith(response);
    }
    else if(url == "http://127.0.0.1:8080/fetch-n-cache/sw/caches.keys") {
        e.respondWith(new Promise((resolve, reject) => {
            caches.keys().then(keys => {
                const str = 
                resolve(new Response("<p>List of caches:</p><ul>"
                    + keys.reduce((acc,curr) =>  { return acc+'<li>'+curr+'</li>' },"") + "</ul>", { status: 200 }));
            })
            .catch(err => {
                resolve(new Response(err, { status: 500 }));
            });
        }));
    }
    else if(url == "http://127.0.0.1:8080/fetch-n-cache/img/oya.jpg") {
        e.respondWith(new Promise((resolve,reject) => {
            caches.match(e.request)
            .then(r => {
                if(r === undefined) {
                    console.log("Øya is not in the cache! Let's put it into a default one.");
                    caches.open('default') // arbitrary name
                        .then(cache => {
                            cache.add(e.request)
                                .then(() => {
                                    caches.match(e.request)
                                    .then(r => { resolve(r); });
                                })
                                .catch(err => {
                                    console.log("Here's the error I got while trying to add the requested thing to the cache:", err);
                                });
                        })
                        .catch(() => { resolve(new Response("Got a problem somewhere...", { status: 404 })); });
                }
                else {
                    console.log("Here's Øya's pic from the cache:", r);
                    resolve(r);
                }
            })
        }));
    }
    else {
        caches.match(e.request)
            .then(r => {
                if(r === undefined) {
                    console.log("Not cached");
                    return fetch(e.request);
                }
                else
                    return r;
            });
        e.respondWith(fetch(url));
    }
});
