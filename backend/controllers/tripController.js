// controllers/tripController.js
import cloudinary from '../config/cloudinaryConfig.js';
import Trip from '../models/Trip.js';

// Create a new trip
export const createTrip = async (req, res) => {
  try {
    const { title, description} = req.body;
    const location = JSON.parse(req.body.location);//parse string to object

    let photoUrl = null;
    if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path,{
            folder: 'trips',
        });
        photoUrl = result.secure_url;
    }
    const trip = new Trip({ title, description, location, image: photoUrl });
    const savedTrip = await trip.save();
    res.status(201).json(savedTrip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all trips
export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single trip by ID
export const getTripById = async (req, res) => {
    try {
      const trip = await Trip.findById(req.params.id);
      if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
      }
      res.json(trip);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// Update a trip
export const updateTrip = async (req, res) => {
    try {
      const { title, description } = req.body;
      let location = req.body.location;
  
      // Parse location if it exists
      if (location) {
        try {
          location = JSON.parse(location);
        } catch (err) {
          return res.status(400).json({ error: "Invalid location format", err });
        }
      }
  
      const updateData = {};
      if (title) updateData.title = title;
      if (description) updateData.description = description;
      if (location) updateData.location = location;
  
      //Upload new image to Cloudinary if provided
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'trips',
        });
        updateData.image = result.secure_url;
      }
  
      const updatedTrip = await Trip.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );
  
      if (!updatedTrip) {
        return res.status(404).json({ message: "Trip not found" });
      }
  
      res.json(updatedTrip);
    } catch (err) {
      console.error("Update Error:", err.message);
      res.status(500).json({ error: err.message });
    }
  };
  
  
  

// Delete a trip
export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json({ message: 'Trip deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
