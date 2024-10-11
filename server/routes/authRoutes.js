const passport = require('passport');
const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const passwordController = require('../controllers/passwordController');

// Existing routes
router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  res.redirect('/dashboard'); // Or generate JWT and redirect accordingly
});

// Facebook OAuth
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), (req, res) => {
  res.redirect('/dashboard'); // Or generate JWT and redirect accordingly
});

// Forgot Password
router.post('/forgot-password', passwordController.forgotPassword);
router.post('/reset-password/:token', passwordController.resetPassword);

module.exports = router;
