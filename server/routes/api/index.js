import express from 'express';
import user from './user';



const router = express.Router();

router.use('/auth', user);
//router.use('/trips', trip);
//router.use('/bookings', book);


export default router;
