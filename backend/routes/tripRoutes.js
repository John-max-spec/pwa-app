// routes/tripRoutes.js
import express from 'express';
import { createTrip, getAllTrips, deleteTrip, updateTrip, getTripById } from '../controllers/tripController.js';
import multer from 'multer';

const router = express.Router();

//Multer configuration
const storage = multer.diskStorage({});
const upload = multer({ storage: storage });

router.post('/create', upload.single('image'), createTrip);
router.get('/get-trips', getAllTrips);
router.get('/:id', getTripById);
router.put('/:id',upload.single('image'), updateTrip);
router.delete('/:id', upload.single('image'), deleteTrip);

export default router;
