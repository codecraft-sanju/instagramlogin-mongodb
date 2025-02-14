import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    console.log('🔹 Request Received:', req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    
    const newUser = new User({ email, password });
    await newUser.save();

    console.log(' New User Registered:', newUser);
    return res
      .status(201)
      .json({ message: 'User data stored successfully', user: newUser });
  } catch (error) {
    console.error(' Server Error:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
