import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import "../styles/TravelForm.css";

const EditTripForm = ({ trip, onCancel, onTripUpdated }) => {
  const [title, setTitle] = useState(trip.title);
  const [description, setDescription] = useState(trip.description);
  const [location, setLocation] = useState({
    lat: trip.location.coordinates[1],
    lng: trip.location.coordinates[0],
  });
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocation((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append(
        "location",
        JSON.stringify({
          type: "Point",
          coordinates: [location.lng, location.lat], // Note: GeoJSON format is [lng, lat]
        })
      );
      if (image) formData.append("image", image);

      const res = await axios.put(`${BASE_URL}/api/trips/${trip._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Trip updated successfully!");
      onTripUpdated(res.data);
      console.log(res);

      console.log("Updated trip:", {
        title,
        description,
        location,
        image
    });
    } catch (error) {
      console.error("Failed to update trip:", error);
      alert("Update failed.");
    }
  };
    
  const handleGoBack = () => {
    window.location.href='/';
  }


  return (
    <>
    <div className="go-back">
     <button onClick={handleGoBack} className="go-back">← Go Back</button>
    </div>
    <form onSubmit={handleSubmit} className="travel-form">
      <h2>Edit Trip</h2>

      <input
        type="text"
        placeholder="Trip Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Trip Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <div className="location-inputs">
        <label>Latitude</label>
        <input
          type="number"
          name="lat"
          value={location.lat}
          onChange={handleLocationChange}
          step="any"
          required
        />
        <label>Longitude</label>
        <input
          type="number"
          name="lng"
          value={location.lng}
          onChange={handleLocationChange}
          step="any"
          required
        />
      </div>

      <input type="file" accept="image/*" onChange={handleImageUpload} />

      <div className="card-actions">
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onCancel} className="danger">
          Cancel
        </button>
      </div>
    </form>
    </>
  );
};

export default EditTripForm;
