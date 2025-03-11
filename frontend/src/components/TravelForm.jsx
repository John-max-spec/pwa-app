import { useState } from "react";
import "../styles/TravelForm.css";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";

const TravelForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  // Get Geolocation
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation({ type: 'Point', coordinates: [lng, lat] }); // GeoJSON format
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // actual File object
      setPreview(URL.createObjectURL(file)); // optional preview
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!location) {
      alert("Please get your location first.");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", JSON.stringify(location));
      if (image) formData.append("image", image); // real file
  
      await axios.post(`${BASE_URL}/api/trips/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(formData);
  
      alert("Trip added successfully!");
      navigate("/trip-list");
      setTitle("");
      setDescription("");
      setLocation("");
      setImage(null);
    } catch (error) {
      console.error("Error adding trip:", error);
      alert("Failed to add trip.");
    }
  };

  // Handle Go Back
  const handleGoBack = () => {
    window.location.href= "/";
  };

  return (
    <div className="travel-form-container">
      <button className="go-back" onClick={handleGoBack}>← Go Back</button>

      <form onSubmit={handleSubmit} className="travel-form">
        <h2>Add a New Trip</h2>

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

        <button type="button" onClick={getLocation}>Get Location</button>
        <p>
           {location
             ? `Lat: ${location.coordinates[1]}, Lng: ${location.coordinates[0]}`
              : "No location selected"}
        </p>


        <input type="file" accept="image/*" capture="environment" onChange={handleImageUpload} />
        {preview && <img src={preview} alt="Uploaded" width="100" />}

        <button type="submit">Add Trip</button>
      </form>
    </div>
  );
};

export default TravelForm;
