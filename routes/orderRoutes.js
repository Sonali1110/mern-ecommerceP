import express from 'express';
const router = express.Router();

// Example route
import {
  addOrder,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
} from '../controllers/orderController.js';

import { protect, admin } from '../middlewares/authMiddleware.js'

router.post('/', protect, addOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);


router.put('/:id/deliver', protect, admin, updateOrderToDelivered);
router.get('/', protect, admin, getAllOrders);

export default router;
