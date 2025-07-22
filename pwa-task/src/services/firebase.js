import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Replace with your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAmZks-zKWMzSUlPRDU6SjelKBmx8L_ekM",
    authDomain: "pwa-task-1546d.firebaseapp.com",
    projectId: "pwa-task-1546d",
    storageBucket: "pwa-task-1546d.firebasestorage.app",
    messagingSenderId: "957379513803",
    appId: "1:957379513803:web:a9b39e976b24f65fc43a4e"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request permission and get token
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: 'YOUR_VAPID_KEY'
      });
      console.log('Notification token:', token);
      return token;
    } else {
      console.log('Notification permission denied');
      return null;
    }
  } catch (error) {
    console.error('An error occurred while requesting permission', error);
    return null;
  }
};

// Handle foreground messages
export const onMessageListener = () => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
};

export default messaging;