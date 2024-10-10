const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

// Register user
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const user = await User.create({ name, email, password, role });
      const token = generateToken(user);
      res.status(201).json({ token });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Login user
  exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = generateToken(user);
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Get user profile
  exports.getProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };