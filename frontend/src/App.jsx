
import { Routes, Route } from 'react-router-dom'
import './App.css'
import TravelForm from './components/TravelForm'
import TravelItem from './components/TravelItem'
import TravelList from './components/TravelList'
import HomePage from './pages/Home'
import EditTripPage from './pages/EditTripPage'
import { useEffect } from 'react'
import { clearQueue, getQueue } from './utils/offlineQueue'
import axios from 'axios'
import { BASE_URL } from './utils/config'
import { getToken, onMessage } from 'firebase/messaging'
import { messaging } from './firebase'

function App() {
  useEffect(() => {
    const syncQueue = async () => {
      const queue = getQueue();

      for (const action of queue) {
        try {
          if (action.type === 'DELETE') {
            await axios.delete(`${BASE_URL}/api/trips/${action.id}`);
          } else if (action.type === 'UPDATE') {
            await axios.put(`${BASE_URL}/api/trips/${action.trip._id}`, action.trip);
          }
        } catch (err) {
          console.warn("Failed to sync action:", action, err);
        }
      }

      clearQueue();
    };

    window.addEventListener('online', syncQueue);
    return () => window.removeEventListener('online', syncQueue);
  }, []);

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const token = await getToken(messaging, {
            vapidKey: 'YOUR_VAPID_KEY_HERE', // from Firebase
          });
          console.log("FCM Token:", token);
  
          // Optionally: Send this token to your backend to store
        } else {
          console.warn('Notification permission denied');
        }
      } catch (err) {
        console.error('FCM Error:', err);
      }
    };
  
    requestPermission();
  
    onMessage(messaging, (payload) => {
      console.log("Foreground notification:", payload);
      const { title, body } = payload.notification;
      new Notification(title, { body });
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/trip-form" element={<TravelForm />} />
        <Route path="/trip-item" element={<TravelItem />} />
        <Route path="/trip-list" element={<TravelList />} />
        <Route path="/update-trip/:id" element={<EditTripPage />} />
      </Routes>
    </>
  )
}

export default App
