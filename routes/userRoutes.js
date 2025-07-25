import express from 'express';
const router = express.Router();

// Example route
import {
  getUserProfile,
  getUsers,
  getUserById,
  updateUserProfile,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

import { protect, admin } from '../middlewares/authMiddleware.js';

router.get('/profile', protect,getUserProfile);
router.put('/profile', protect, updateUserProfile);

router.get('/', protect, admin, getUsers);
router.get('/:id', protect, admin, getUserById);
router.put('/:id', protect, admin, updateUser);
router.delete('/:id', protect, admin, deleteUser);

export default router;