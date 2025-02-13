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

    let user = await User.findOne({ email });

    
    if (!user) {
      user = new User({ email, password });
      await user.save();
      console.log('✅ New User Registered:', user);
      return res
        .status(201)
        .json({ message: 'User registered successfully', user });
    }

    console.log('✅ User Logged In:', user);
    return res.status(200).json({ message: 'User logged in', user });
  } catch (error) {
    console.error('❌ Server Error:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
