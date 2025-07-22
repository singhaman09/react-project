import { useState, useEffect } from 'react';
import { requestNotificationPermission, onMessageListener } from '../services/firebase';

function NotificationButton() {
  const [permission, setPermission] = useState('default');
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  useEffect(() => {
    // Check current notification permission
    setPermission(Notification.permission);
    setNotificationEnabled(Notification.permission === 'granted');
    
    // Listen for messages when notification is enabled
    if (notificationEnabled) {
      const unsubscribe = onMessageListener().then(payload => {
        console.log('Received foreground message:', payload);
        // Show notification using the Notification API
        new Notification(payload.notification.title, {
          body: payload.notification.body,
          icon: '/icons/icon-192x192.png'
        });
      }).catch(err => console.error('Failed to receive foreground message:', err));
      
      return () => {
        // Clean up listener
        unsubscribe && unsubscribe();
      };
    }
  }, [notificationEnabled]);

  const handleEnableNotifications = async () => {
    const token = await requestNotificationPermission();
   // In the handleEnableNotifications function:
if (token) {
    // Import this at the top: import { getMessaging, subscribeToTopic } from 'firebase/messaging';
    const messaging = getMessaging();
    
    // Subscribe to a topic
    fetch(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/taskpwa`, {
      method: 'POST',
      headers: {
        'Authorization': 'key=YOUR_SERVER_KEY' // Get this from Firebase Console > Project Settings > Cloud Messaging
      }
    })
    .then(response => {
      console.log('Subscribed to topic:', response);
    })
    .catch(error => {
      console.error('Error subscribing to topic:', error);
    });
    
    setPermission('granted');
    setNotificationEnabled(true);
  }
  };

  return (
    <div className="notification-container">
      {!notificationEnabled ? (
        <button 
          className="notification-button"
          onClick={handleEnableNotifications}
          disabled={permission === 'denied'}
        >
          {permission === 'denied' 
            ? 'Notifications Blocked (check browser settings)' 
            : 'Enable Notifications'}
        </button>
      ) : (
        <div className="notification-status">Notifications Enabled ✓</div>
      )}
    </div>
  );
}

export default NotificationButton;