// pages/EditTripPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import EditTripForm from "../components/UpdateTrip"; // adjust if path is different

const EditTripPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/trips/${id}`);
        setTrip(res.data);
      } catch (err) {
        console.error("Failed to load trip:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  const handleCancel = () => {
    navigate('/trip-list'); // or wherever you want to go back
  };

  const handleTripUpdated = (updateTrip) => {
    navigate('/trip-list', {state:{updateTrip}}); // or you can redirect to trip list/details
  };

  if (loading) return <p>Loading trip data...</p>;
  if (!trip) return <p>Trip not found</p>;

  return (
    <EditTripForm
      trip={trip}
      onCancel={handleCancel}
      onTripUpdated={handleTripUpdated}
    />
  );
};

export default EditTripPage;
