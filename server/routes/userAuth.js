
import express from 'express';
const router = express.Router();
import bycryptjs from 'bcryptjs';
import User from '../models/user.js';


router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist', statusCode: 400 })
    }
    const validPassword = await bycryptjs.compare(req.body.pssw, user.pssw);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password', statusCode: 400 })
    }
    res.status(200).json({ message: 'Logged in successfully', statusCode: 200 })
    } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 })
    }
}
);

export default router;

