/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAXk8XjR8XhzoU1YI3ob4522jSROLlQO1I",
  projectId: "wathuti-244",
  messagingSenderId: "142718231848",
  appId: "1:142718231848:web:1af313322abbad0d941c1d",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/pwa-192x192.png',
  });
});
