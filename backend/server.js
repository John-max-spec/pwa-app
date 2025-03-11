// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import tripRoutes from './routes/tripRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/trips', tripRoutes);


//rest Api
app.get('/', (req, res) => {
    res.send('API is running')
})


// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
   
  })
  .catch((err) => console.error(err));

  // eslint-disable-next-line no-undef
  const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
