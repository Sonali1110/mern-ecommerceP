import express from 'express';
const router = express.Router();

import { createPaymentIntent } from '../controllers/stripeController.js';
import { protect } from '../middlewares/authMiddleware.js';

router.post('/create-payment-intent', protect, createPaymentIntent);

export default router;