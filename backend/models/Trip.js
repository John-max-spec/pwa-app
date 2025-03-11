import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  image: { type: String },
  createdAt: { type: Date, default: Date.now }
});

tripSchema.index({ location: '2dsphere' });

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
