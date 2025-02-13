import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', UserSchema);

// Login Route (Always Save User)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    // Agar user nahi hai, toh register kar do
    if (!user) {
      user = new User({ email, password });
      await user.save();
      return res
        .status(201)
        .json({ message: 'User registered successfully', user });
    }

    return res.status(200).json({ message: 'User logged in', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
