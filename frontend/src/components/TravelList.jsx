import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import "../styles/TravelList.css";
import "../styles/TravelItem.css";
import { useNavigate } from "react-router-dom";
import { addToQueue } from "../utils/offlineQueue";

const TravelList = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch all trips
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/trips/get-trips`);
        let tripsData = res.data;
        const updatedTrip = location.state?.updatedTrip;
      if (updatedTrip) {
        tripsData = tripsData.map((trip) =>
          trip._id === updatedTrip._id ? updatedTrip : trip
        );
      }
        setTrips(tripsData);
      } catch (err) {
        console.error("Error fetching trips:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  // Delete a trip
  const handleDelete = async (id) => {
    if (!navigator.onLine) {
      addToQueue({ type: 'DELETE', id });
      alert('Trip queued for deletion when back online.');
      return;
    }
    const confirm = window.confirm("Are you sure you want to delete this trip?");
    if (!confirm) return;

    try {
      await axios.delete(`${BASE_URL}/api/trips/${id}`);
      setTrips((prevTrips) => prevTrips.filter((trip) => trip._id !== id));
    } catch (err) {
      console.error("Failed to delete trip:", err);
      alert("Failed to delete trip.");
    }
  };

  // Update a trip (redirect to an update form, or you can use a modal)
  const handleUpdate = (trip) => {
    if (!navigator.onLine) {
      addToQueue({ type: 'UPDATE', trip: trip });
      alert('Update queued for when you’re back online.');
      return;
    }
    // For now, we’ll log the data; you can navigate or open a modal here
    navigate(`/update-trip/${trip._id}`);
    console.log("Update trip clicked:", trip);
    
  };

  // Go back to the form
  const handleGoBack = () => {
    window.location.href = "/";
  };

  return (
    <div className="travel-list">
      <button className="go-back" onClick={handleGoBack}>← Go Back</button>
      <h2>My Travel Diary</h2>
      {loading ? (
        <p>Loading trips...</p>
      ) : trips.length === 0 ? (
        <p>No trips added yet.</p>
      ) : (
        <div className="card-grid">
          {trips.map((trip) => (
            <div key={trip._id} className="travel-card">
              {trip.image && <img src={trip.image} alt={trip.title} />}
              <div className="card-body">
                <h3>{trip.title}</h3>
                <p>{trip.description}</p>
                {trip.location?.coordinates && (
                  <p>
                    <strong>Location:</strong> Lat {trip.location.coordinates[1]}, Lng{" "}
                    {trip.location.coordinates[0]}
                  </p>
                )}
                <div className="card-actions">
                  <button onClick={() => handleUpdate(trip)}>Update</button>
                  <button className="danger" onClick={() => handleDelete(trip._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TravelList;
