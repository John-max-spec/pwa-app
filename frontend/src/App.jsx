
import { Routes, Route } from 'react-router-dom'
import './App.css'
import TravelForm from './components/TravelForm'
import TravelItem from './components/TravelItem'
import TravelList from './components/TravelList'
import HomePage from './pages/Home'
import EditTripForm from './components/UpdateTrip'
import EditTripPage from './pages/EditTripPage'

function App() {
  

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
