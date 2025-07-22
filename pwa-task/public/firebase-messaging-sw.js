importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

// Replace with your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAmZks-zKWMzSUlPRDU6SjelKBmx8L_ekM",
    authDomain: "pwa-task-1546d.firebaseapp.com",
    projectId: "pwa-task-1546d",
    storageBucket: "pwa-task-1546d.firebasestorage.app",
    messagingSenderId: "957379513803",
    appId: "1:957379513803:web:a9b39e976b24f65fc43a4e"
  };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icons/icon-192x192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});