
import { Routes, Route } from 'react-router-dom'
import './App.css'
import TravelForm from './components/TravelForm'
import TravelItem from './components/TravelItem'
import TravelList from './components/TravelList'
import HomePage from './pages/Home'
import EditTripForm from './components/UpdateTrip'
import EditTripPage from './pages/EditTripPage'
import { useEffect } from 'react'
import { clearQueue, getQueue } from './utils/offlineQueue'
import axios from 'axios'
import { BASE_URL } from './utils/config'

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
