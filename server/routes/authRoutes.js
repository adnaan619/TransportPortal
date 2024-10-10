const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);

// Example of a protected admin route
router.get('/admin', protect, authorize(['admin']), (req, res) => {
  res.status(200).json({ message: 'Admin content' });
});

module.exports = router;