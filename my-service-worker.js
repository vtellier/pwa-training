const version = "1.0.0";
self.addEventListener('install', e => {
    console.log('install event:', e);
    // Here we should install all the elements we'll need to use the app offline.
    e.waitUntil(
        new Promise((resolve, reject) => {
            setTimeout(() => { resolve() }, 3000 );
        }));
});
self.addEventListener('activate', e => {
    console.log('activate event:', e);
    // Here we should clean all ressources from the previous versions we don't need anymore.
});
self.addEventListener('fetch', e => {
    console.log('fetch', e);
    const url = e.request.url;
    console.log(url);
    if(url == "http://127.0.0.1:8080/uhhh.html") {
        console.log('Hahaha i am maning in the middle');
        e.respondWith(fetch('http://127.0.0.1:8080/hello.txt'));
    }
    else if(url == "http://127.0.0.1:8080/sw/version") {
        console.log('giving version of this SW');
        const response = new Response(version, { status: 200 });
        e.respondWith(response);
    }
    else
        e.respondWith(fetch(url));
});
