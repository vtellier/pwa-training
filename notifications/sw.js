self.addEventListener('install', (...args) => {
    console.log('install', ...args);
});

self.addEventListener('notificationclick', (...args) => {
    console.log('notificationclic', ...args);
});
