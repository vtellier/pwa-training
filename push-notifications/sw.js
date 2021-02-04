self.addEventListener('install', (...args) => {
    console.log('install', ...args);
});

//self.addEventListener('notificationclick', (...args) => {
//    console.log('notificationclic', ...args);
//});
self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();
});
